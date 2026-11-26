create extension if not exists pg_cron;
create extension if not exists pg_net with schema extensions;

create table if not exists public.mail_health_checks (
  id          bigint generated always as identity primary key,
  ran_at      timestamptz not null default now(),
  ok          boolean     not null,
  checks      jsonb       not null default '[]'::jsonb,
  alert_sent  boolean     not null default false,
  trigger     text        not null default 'cron'
);
alter table public.mail_health_checks enable row level security;
drop policy if exists "Admins lezen mailchecks" on public.mail_health_checks;
create policy "Admins lezen mailchecks" on public.mail_health_checks
  for select to authenticated using (public.is_admin());
revoke all on public.mail_health_checks from anon, authenticated;
grant select on public.mail_health_checks to authenticated;

do $$
begin
  if not exists (select 1 from vault.secrets where name = 'mail_healthcheck_secret') then
    perform vault.create_secret(encode(extensions.gen_random_bytes(32), 'hex'),
      'mail_healthcheck_secret', 'Gedeeld geheim pg_cron -> mail-healthcheck');
  end if;
end $$;

create or replace function public.verify_mail_healthcheck_secret(p_secret text)
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce(p_secret, '') <> '' and exists (
    select 1 from vault.decrypted_secrets
    where name = 'mail_healthcheck_secret' and decrypted_secret = p_secret);
$$;
revoke all on function public.verify_mail_healthcheck_secret(text) from public, anon, authenticated;
grant execute on function public.verify_mail_healthcheck_secret(text) to service_role;

create or replace function public.mail_health_missing_reg_notifications(p_hours int default 25)
returns table(email text, created_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select u.email::text, u.created_at
  from auth.users u
  where u.created_at > now() - make_interval(hours => p_hours)
    and u.created_at < now() - interval '10 minutes'
    and exists (select 1 from public.usage_logs l where l.user_id = u.id and l.action = 'signup')
    and coalesce((u.raw_app_meta_data ->> 'reg_notified')::boolean, false) = false
  order by u.created_at;
$$;
revoke all on function public.mail_health_missing_reg_notifications(int) from public, anon, authenticated;
grant execute on function public.mail_health_missing_reg_notifications(int) to service_role;

do $$
begin
  perform cron.unschedule('mail-healthcheck-daily')
  where exists (select 1 from cron.job where jobname = 'mail-healthcheck-daily');
end $$;

select cron.schedule('mail-healthcheck-daily', '0 6 * * *', $job$
  select net.http_post(
    url := 'https://nzkwkydafrnvmmqiuabt.supabase.co/functions/v1/mail-healthcheck',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56a3dreWRhZnJudm1tcWl1YWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDQ2NDEsImV4cCI6MjA5Nzc4MDY0MX0.Lb9yDQGeA64FQaurQAIvfd3wNLCGbMEyVK0gyqtbSyM',
      'x-healthcheck-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'mail_healthcheck_secret')
    ),
    body := '{"trigger":"cron"}'::jsonb,
    timeout_milliseconds := 30000
  );
$job$);
