# Instruktioner för kodassistenter – Trädgårdsdrömmar

**Läs och följ [docs/PROJECT_RULES.md](docs/PROJECT_RULES.md) innan du ändrar någonting i detta repository.** Dokumentet anger arkitektur, säkerhetsgränser, kodflöde och aktuell preview-/produktionsstatus.

## Särskilt viktiga regler

1. **Ändra inte CMS-struktur, schemas, collections, fältnamn, bildrelationer eller OAuth utan uttryckligt godkännande.** Detta omfattar bland annat `public/admin/config.yml`, `src/content.config.ts`, `src/lib/schema.ts` och `public/admin/bootstrap.js`. Redigera befintligt innehåll inom nuvarande schema.
2. **Publicera aldrig automatiskt till produktion.** Endast användargodkänd manuell GitHub Actions-publicering via `Publish approved build to STRATO` får ändra produktionsfiler.
3. **Skydda bildoriginal, lösenord, token, SSH-nycklar och andra hemligheter.** Originalfoton ska inte läggas i detta repository. Följ bildexportflödet och bevara vattenstämplar och exakt etiketttext.
4. **Kontrollera live-status i GitHub först:** senaste `main`, öppna PR:er och workflows. Arbeta normalt på separat gren med små ändringar och öppna PR för granskning; ingen merge utan godkännande.
5. **Förväxla inte preview och produktion.** STRATO-preview har egen katalog, HTTPS, Basic Auth och noindex men automatisk deployment dit är ännu inte implementerad. Befintlig GitHub Pages-preview är en separat lösning.
6. **Rör inte `kumlamark.se`** eller andra webbplatser på samma VPS.
7. **Kör verifiering** (`npm run verify`/GitHub Actions), åtgärda testfel utan att kringgå kontroller och redovisa ärligt vad som faktiskt slutförts.

**Princip:** gör endast det uppdragna arbetet inom befintliga ramar; fråga före strukturella eller riskfyllda ändringar.
