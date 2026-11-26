# Gangsheet Builder v2

DTF transfer vel builder voor [Transferpersshop](https://www.transferpersshop.nl).

## Wat is nieuw in v2

- **Origineel logo formaat**: Logo's worden op hun echte afmeting geplaatst (op basis van DPI-metadata), niet meer standaard op 25% velbreedte
- **Correcte bestandsnamen**: A3/A4/A5 exports bevatten niet langer "dtf" in de bestandsnaam
- **Selectie na uitlijning**: Objecten blijven geselecteerd na uitlijning zodat je direct opnieuw kunt uitlijnen
- **Handmatige indeling modus**: Vrij slepen, overlappen en 360° draaien
- **Rondleiding uitgebreid**: Handmatige modus toegevoegd aan de tour

## Geplande features

- Login + projectopslag (Supabase)
- Tekst toevoegen
- Strokes/outlines op objecten
- EPS bestandsondersteuning
- Performance verbeteringen voor grote vellen

## Lokaal draaien

Open `index.html` in een browser. Geen build stap nodig.

## Smoke-test

Een korte automatische test (`tests/smoke.spec.js`) laadt de builder, plaatst een logo en exporteert een PDF. Hij controleert ook dat elk CDN-script in `index.html` een exact versienummer heeft.

De test draait volledig lokaal: de bibliotheken komen uit `node_modules` (in dezelfde versie als in `index.html`) en Supabase wordt nagebootst, dus er gaat niets naar de echte database.

Zelf draaien (Node 22):

```
npm ci
npx playwright install chromium
npm test
```

### Een CDN-bibliotheek bijwerken

Pas de versie aan op twee plekken: de `<script>`-URL in `index.html` en `devDependencies` in `package.json` (`npm install --save-dev --save-exact pakket@x.y.z`). Komen ze niet overeen, dan faalt de smoke-test.

## Werkwijze: branches en pull requests

`main` is wat live staat: elke commit op `main` gaat direct naar builder.transferpersshop.nl. Werk daarom zo:

1. Maak een branch (op GitHub: branch-menu → nieuwe naam, of `git switch -c mijn-wijziging`).
2. Zet je wijzigingen op die branch (uploaden via de website mag ook: kies dan "Create a new branch" onderaan).
3. Open een pull request naar `main`. De smoke-test draait automatisch en staat onder de PR.
4. Groen? Dan mergen. GitHub Pages zet het binnen een paar minuten live.

## Hosting

GitHub Pages op `builder.transferpersshop.nl` (CNAME configuratie aanwezig).
