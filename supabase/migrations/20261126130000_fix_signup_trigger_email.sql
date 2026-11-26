-- NOG NIET UITGEVOERD op de live database (26-11-2026).
-- Probleem: de trigger on_auth_user_created roept nog de oude
-- extensions.handle_new_user() aan (uit migratie 20260623111417). Die vult
-- company_name en display_name, maar niet email. De bijgewerkte
-- public.handle_new_user() (met email, uit 20260716072245) wordt nergens gebruikt.
-- Gevolg: nieuwe registraties krijgen een leeg e-mailveld in profiles.

-- 1. Trigger naar de juiste functie laten wijzen
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Oude functie opruimen
drop function if exists extensions.handle_new_user();

-- 3. Lege e-mailadressen aanvullen vanuit auth.users
update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id and coalesce(p.email, '') = '' and u.email is not null;
