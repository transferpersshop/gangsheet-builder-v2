# Supabase-schema

Database van de Gangsheet Builder (Supabase-project `nzkwkydafrnvmmqiuabt`, eu-west-1).

`migrations/` bevat de migraties precies zoals ze in Supabase zijn uitgevoerd
(tabel `supabase_migrations.schema_migrations`), plus één nieuwe migratie:

| Migratie | Status |
|---|---|
| `20260623085348` t/m `20261001094118` (9 stuks) | Uitgevoerd op live |
| `20261126130000_fix_signup_trigger_email` | **Nog niet uitgevoerd**, wacht op akkoord |

## Beveiliging in het kort

- RLS staat aan op alle tabellen in `public`.
- Admin = `profiles.role = 'admin'` en niet geblokkeerd (`public.is_admin()`).
- Gewone gebruikers kunnen hun eigen `role`, `approved` en `blocked` niet wijzigen
  (trigger `protect_profile_privileged_columns`); elke wijziging daarvan komt in `admin_audit_log`.
- `app_settings`: iedereen die ingelogd is mag lezen, alleen admins mogen schrijven.
- Projecten en usage logs alleen voor de eigenaar zelf (en lezen door admins);
  niet-goedgekeurde of geblokkeerde gebruikers hebben geen toegang tot projecten.
- `anon` (niet ingelogd) heeft geen rechten op tabellen.

Gecontroleerd op 26-11-2026 door als gewone gebruiker te proberen admin te worden,
andere profielen en `app_settings` te wijzigen en andermans data te lezen, in een
transactie die werd teruggedraaid. Alles werd geweigerd.

## Niet in de migraties (via het dashboard aangemaakt)

- Storage-bucket `thumbnails` (privé, leeg) met policies voor upload/update/delete
  in de eigen map `<user_id>/...`. Er is geen SELECT-policy.
- Edge Function `mail-healthcheck`.

Een lege database opbouwen vanuit deze migraties werkt daarom niet zonder meer:
migratie `20260623085553` verwijdert een storage-policy die alleen in het dashboard bestond.
