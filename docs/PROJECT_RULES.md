# Trädgårdsdrömmar – projektregler och teknisk handbok

**Gäller alla ändringar av webbplatsen, dess innehåll, GitHub-repository, CMS och driftsmiljö.**

Detta dokument är en gemensam referens för utvecklingschattar och kodassistenter. Läs också [`AGENTS.md`](../AGENTS.md). Dokumentet är ett arbetssätt, inte en teknisk behörighetsspärr. Om användarens aktuella uttryckliga instruktioner avviker från detta dokument, uppmärksamma konflikten och inhämta godkännande innan riskfyllda ändringar.

> **Huvudregel:** Förbättra innehåll inom befintliga strukturer. Ändra inte fungerande CMS, driftsättning, bildhantering, säkerhet eller gemensam arkitektur utan uttryckligt godkännande.

## 1. Syfte, språk och kvalitet

Trädgårdsdrömmar är en växande webbplats för odling, chili, nyttodjur, växtkunskap, förädling och framtida trädgårdsverksamhet. Det är **inte enbart ett chilisåsvarumärke** eller en färdig webbshop.

- Slogan: **odlat med omsorg, förädlat med passion**.
- Språk: svenska; saklig, pedagogisk och tydlig text.
- Utseende: varm, mörk, jordnära profil. Befintliga färger och designkomponenter ska återanvändas.
- Odling, biologi och livsmedelsuppgifter ska faktagranskas; skilj på dokumenterade erfarenheter, etablerad kunskap, uppskattningar och hypoteser.
- Ange källor där sakuppgifter kräver det. Hitta inte på sortbestämningar, skördevärden, mätvärden, produktinnehåll eller säkerhetslöften.
- Bevara redan beslutade innehålls- och menyval. Återinför inte avvecklade sektioner som odlingsdagbok eller ett allmänt `Odla`-menyval utan nytt uppdrag.

### Biologiskt växtskydd – beslutad navigering (2026-10-24)

Micke har beställt en egen ingång **Biologiskt växtskydd**, `/biologiskt-vaxtskydd/`, i huvudmenyn. Samlingssidan redigeras som en vanlig sida i befintlig CMS-samling och innehåller i ordning: filosofisk artikel, näringsväv, Skadedjur, Nyttodjur och Köpa in nyttodjur. Ännu oskrivna texter märks tydligt som kommande utan länkar till saknade sidor. Befintliga djurartiklar behåller sina adresser under `/skadedjur/` och `/nyttodjur/`; deras navigeringsförälder är Biologiskt växtskydd. Filosofiartikeln ”Att odla med naturen i stället för bredvid den” använder befintlig samling Odlingsmetoder på `/odlingsmetoder/att-odla-med-naturen/`, med Biologiskt växtskydd som direkt navigeringsförälder. Näringsvävsartikeln införs på samma sätt på `/odlingsmetoder/naringsvaven-i-odlingen/` i separat PR efter #27. Guiderna under Livet i trädgården finns kvar. Meny, filosofiartikel, fotokomplettering och utskriftsstöd från PR #27 är mergade i main 2026-10-24 (`05a8eb2`); näringsvävsartikeln är för granskning i arbetsgren. Detta anger inte produktionspublicering.

### Artikellogga och utskrift – beställt 2026-10-24

Alla artikelsidor ska bära Trädgårdsdrömmars logga både på skärm och vid utskrift. På skärm används det gemensamma sidhuvudet. Vid utskrift av artikelmallarna används en separat avsändarrad med samma centrala `settings.logo`, webbplatsens namn och artikelns canonical-adress. Ett framtida byte av logga görs centralt; lägg inte manuella loggor i artikeltexterna. Den nuvarande loggan används tills en ny uttryckligen väljs. Detta ändrar inte bildvattenstämplarna.

`ArticleTools.astro` används i befintliga mallar för samlingsartiklar och Vanliga sidor. Knappen ”Skriv ut / spara som PDF” öppnar webbläsarens utskrift och inväntar artikelbilderna. Ctrl/Cmd+P fungerar också. `print.css` ger de markerade sidorna vit bakgrund, mörk text, logga, läsbara bilder/bildtexter och utskrivna käll-URL:er. Huvudmeny, sidfot och navigeringsknappar döljs. Förhandsgranska faktiska PDF-sidor vid ändringar av utskriftslayouten. Inga nya CMS-fält, PDF-tjänster eller serverdelar införs. Implementerad i PR #27 och mergad i main 2026-10-24; detta innebär inte produktionspublicering.

## 2. Nuvarande arkitektur och platser

| Del | Faktiskt upplägg |
| --- | --- |
| Webbplatsens källkod | GitHub: `mooody/pjrepo`, huvudgren `main` |
| Webbplats | Astro, statisk generering, Node.js 24 i byggflödet |
| Redaktionellt CMS | Decap CMS, `/admin/`, GitHub-backend och `editorial_workflow` |
| CMS-inloggning | GitHub OAuth via separat Cloudflare Worker |
| OAuth-kod | `mooody/sveltia-cms-auth`, separat repository |
| Produktion | `https://www.tradgardsdrommar.se`, STRATO VPS |
| Produktionskatalog | `/var/www/tradgardsdrommar.se/public` |
| STRATO-preview | `https://preview.tradgardsdrommar.se` |
| Preview-katalog | `/var/www/tradgardsdrommar-preview/public` |
| Historisk GitHub Pages-preview | `https://mooody.github.io/pjrepo/` |

Driftfiler, certifikat, Nginx-lokalisering och loggar dokumenteras separat i [`docs/SERVER_OPERATIONS.md`](SERVER_OPERATIONS.md). Ändringshistoriken dokumenteras i [`docs/CHANGELOG.md`](CHANGELOG.md).

**Status per 2026-10-16:** STRATO-preview har separat Nginx-konfiguration, HTTPS, HTTP Basic Auth, `robots.txt` med `Disallow: /` och `X-Robots-Tag: noindex, nofollow, noarchive`. **Automatisk publicering till STRATO-preview är ännu inte byggd.** GitHub Pages-preview finns tills vidare som ett separat befintligt workflow. Repositoryt är för närvarande publikt; privat läge är en plan, inte ett genomfört steg. Kontrollera live-status innan du påstår något annat.

STRATO-servern kör också **`kumlamark.se`**. Dess filer, DNS, Nginx, certifikat och publicering hör inte till detta uppdrag och får aldrig ändras av misstag.

## 3. Skyddad CMS-arkitektur – kräver godkännande

**Ändra inte CMS:ets struktur eller beteende utan att först beskriva konsekvenserna och få uttryckligt godkännande.** Detta gäller även om förändringen framstår som en liten förbättring.

Skyddade delar omfattar:

- `public/admin/config.yml` – collections, formulärfält, namn, widgettyper, standardvärden, backend, editorial workflow och bildrelationer.
- `public/admin/bootstrap.js`, `public/admin/index.html`, CMS-bundle och OAuth-inloggning.
- `src/content.config.ts`, `src/lib/schema.ts`, frontmatter-konventioner, filnamn och katalogstruktur.
- Samlingarnas relationer till artiklar, chilisorter, nyttodjur, odlingsmetoder, vanliga sidor och produkter.
- Migrering, utbyte eller parallellinstallation av CMS (Decap ska behållas tills ett annat beslut fattas).
- Omstrukturering av befintliga produktmallar inför framtida webbshop.

**Tillåtet utan separat arkitekturgodkännande när uppdraget gäller innehåll:** ändra eller skapa sidor i de redan definierade samlingarna enligt befintligt schema, rätta stavning, lägga till granskad artikeltext och använda befintliga bild-ID:n.

CMS kan skriva om frontmatter från JSON-liknande YAML till vanlig YAML; detta är i sig ingen anledning att bygga om systemet. Minimera orelaterade diffar och uppmärksamma eventuella oavsiktliga fältförändringar. Fältet `example` ska **inte** återinföras för samlingen **Vanliga sidor**.

## 4. GitHub – samarbete mellan chattar

GitHub och faktiska driftsfiler är källan till aktuell teknisk status; äldre chattuppgifter kan vara inaktuella.

1. Läs relevanta filer, befintliga dokument, senaste `main`, öppna pull requests och pågående Actions **före** ändringar.
2. Kontrollera att annan chatt inte redan arbetar med samma filer eller område. Fortsätt i rätt arbetsgren/PR när det är lämpligt och undvik dubbletter.
3. Skapa normalt en särskild arbetsgren per uppdrag; gör små, fokuserade commits. Arbeta inte direkt i `main` utan uttrycklig instruktion.
4. Rör inte orelaterade filer. Undvik massomformatering, breda migreringar, force-push och skrivningar som riskerar annat arbete.
5. Skapa pull request med sammanfattning, filförteckning, risker och testresultat. Slå inte ihop utan godkännande.
6. Kör befintliga kontroller. Vid fel: undersök loggar, rätta grundorsaken och testa om. Kringgå inte säkerhetsgrindar eller ta bort tester för att få grönt.
7. Redovisa tydligt skillnaden mellan **sparat i arbetsgren**, **PR**, **sammanslaget med main**, **godkänt bygge** och **publicerat på server**.
8. Använd aldrig gamla bygg-ID:n som om de gällde nya commits; verifiera alltid aktuell commit och Actions-körning.

**Minimikontroller:** `npm ci` och `npm run verify` där miljön tillåter. I GitHub Actions körs `Validate and build` via `.github/workflows/verify.yml`, och en godkänd byggartefakt heter `website`.

## 5. Publicering – produktionen får inte påverkas automatiskt

**Produktionspublicering till STRATO är alltid manuell och kräver uttryckligt användargodkännande.** Detta är en hård gräns mellan kodändring och publicering.

- `.github/workflows/verify.yml`: tester och byggning, inklusive artefakten `website`.
- `.github/workflows/publish-production.yml`: manuellt `workflow_dispatch` med `build_run_id` från en avslutad lyckad `Validate and build` på `main`; kontrollerar byggningen och skickar exakt godkänd artefakt till STRATO.
- `.github/workflows/pages-preview.yml`: befintlig GitHub Pages-preview som körs efter push till `main`.
- **Planerad**: separat GitHub Actions-publicering till STRATO-preview från `main`, först efter godkänd implementation och test. Den finns **inte** ännu.
- Om repositoryt blir privat kan GitHub Pages-preview påverkas beroende på GitHub-plan. Byt först över till fungerande, skyddad STRATO-preview och verifiera driftsättningen.

**Förbjudet utan separat godkännande:** SSH- eller rsync-publicering till produktion, ändring av produktionsdeploy till automatisk, omdirigering av preview till produktionskatalog, kringgående av godkänd byggartefakt, eller sammanblandning av GitHub Pages och STRATO-preview.

`draft: true` döljer ett innehåll i Astro-byggningen. CMS-status, merge till `main` och faktisk publicering på produktionen är olika steg.

## 6. Nginx, HTTPS och åtkomstskydd

- Ändra enbart den avsedda serverkonfigurationen. Skydda `tradgardsdrommar.se` och `kumlamark.se` från sidoeffekter.
- Skapa säkerhetskopia, kontrollera med `sudo nginx -t` och ladda bara om Nginx om konfigurationen är giltig.
- Bevara Certbot och automatisk certifikatförnyelse.
- För STRATO-preview: behåll HTTPS, lösenordsskydd, `robots.txt` (`Disallow: /`) och `X-Robots-Tag` (`noindex, nofollow, noarchive`). `robots.txt` ensamt är inte autentisering.
- Preview och produktion ska ha separata kataloger, webbserverblock och publiceringsmål.
- Förändra aldrig hemligheter, SSH-nycklar eller Basic Auth-uppgifter i kod eller chatt. Be aldrig användaren klistra in lösenord eller token.
- Cloudflare Worker lagrar `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` och `ALLOWED_DOMAINS` i runtime-inställningar; inga hemligheter ska skrivas till GitHub. Bevara `keep_vars = true` i OAuth-repots `wrangler.toml`.

## 7. Bilder och etiketter

- **Fotografiska original ska skyddas och hållas utanför det publika repositoryt.** Att döpa en mapp till `private-images` ger inget verkligt skydd. Fortsätt även skydda original när repositoryt blir privat.
- Egna publicerade fotografier ska vara webbanpassade, korrekt beskurna och försedda med diskret, synlig vattenstämpel. Vattenstämpeln får inte ändras eller tas bort oavsiktligt.
- Respektera befintliga bild-ID:n, manifest i `src/data/images.json`, exportindex i `web-images/index.json`, bearbetning i `scripts/images.mjs` och rutin i [`docs/images.md`](images.md).
- För produktfoton och etiketter ska originaltext, vikt, ingredienser och typografi återges **oförändrade**, om användaren inte uttryckligen beställer textändring.
- Använd inte externa bilder utan tillstånd/licens som stödjer användningen. Märk illustrationer och bearbetningar när det har betydelse.
- Nuvarande CMS väljer redan exporterade bilder genom bild-ID. Skapa **inte** nya uppladdningsvägar som kan publicera oskyddade original. En säker automatisk uppladdning kräver separat designbeslut.
- Produktkatalogen under `src/content/products` med produktfoto och etikett ska bevaras; blanda inte ihop innehållskatalog och framtida webbshop.

## 8. Integritet och säkra ändringar

- Lägg inte credentials, personuppgifter, privata filer, hemliga anslutningsuppgifter eller bildoriginal i webbens `public/`, byggartefakter eller Git-historik.
- Betrakta tidigare offentlig Git-historik som potentiellt spridd även om repositoryt blir privat.
- Installera inte nya beroenden eller externa tjänster utan att kontrollera motiv, säkerhet, kostnad och hur nuvarande flöden påverkas.
- Föreslå förbättringar, men bygg inte om arkitektur som bieffekt av ett innehållsuppdrag.

## 9. Dokumentationsplikt och ändringslogg – gäller varje uppdrag

**Efter varje ändring ska både projektreglerna och ändringsloggen hanteras.** Detta gäller även innehållsändringar och manuella serveråtgärder, inte bara större kodprojekt. Syftet är att nästa chatt alltid ska kunna läsa vad som gjordes, varför och vilken miljö som berördes.

1. **Registrera genomfört arbete i [`docs/CHANGELOG.md`](CHANGELOG.md)** som en post för uppdraget/PR:en: datum, ändrat område, syfte, berörda filer/tjänster, tester, faktisk publiceringsstatus och kvarstående steg. Flera mindre textändringar inom samma PR får sammanfattas i en post.
2. **Granska alltid denna `docs/PROJECT_RULES.md`** när något ändras. **Uppdatera den i samma PR** om ändringen påverkar arkitektur, principer, skyddsregler, publiceringsrutiner, godkännandekrav, faktiskt införda system eller uppgifter om projektstatus. Om ingen regel behöver ändras, skriv i loggposten att reglerna granskats och är oförändrade.
3. Vid ändringar av VPS, DNS, Nginx, HTTPS, SSH, behörigheter, preview, serverns loggar eller driftsättning: **uppdatera dessutom [`docs/SERVER_OPERATIONS.md`](SERVER_OPERATIONS.md)**, med faktiska verifierade uppgifter och tydlig skillnad mellan gjort och planerat.
4. Vid ändringar i annan teknisk funktion: uppdatera motsvarande driftdokument (t.ex. `docs/deployment.md`, `docs/oauth.md` eller `docs/images.md`) om befintlig beskrivning annars blir fel.
5. **Logga även manuella förändringar** som användaren gör utanför GitHub, utifrån visad serverutskrift eller tydlig återkoppling. Ange verifieringsnivå. Anta aldrig att ett kommando genomförts bara för att det föreslagits.
6. Låt dokumentationsändringarna gå genom samma granskning och PR som övriga ändringar, eller genom en separat dokumentations-PR när den faktiska serveråtgärden inte skedde via GitHub. Dokumentation är inte i sig ett godkännande att ändra system.
7. Spara **aldrig** autentiseringsuppgifter, lösenord, nycklar, token, hashvärden eller råa åtkomstloggar i repositoryts ändringslogg. GitHub Actions- och Nginx-loggar används för felsökning men ersätter inte ändringsloggen.
8. Kontrollera att ingen annan chatt redan har uppdaterat samma logg/dokument på `main` eller i öppna PR:er; undvik att skriva över poster.

Serverns nuvarande verifierade läge och säker felsökning finns i [`docs/SERVER_OPERATIONS.md`](SERVER_OPERATIONS.md); bestående ändringshistorik finns i [`docs/CHANGELOG.md`](CHANGELOG.md).

## 10. Praktisk checklista före avslut

- [ ] Har jag läst aktuella filer och öppna PR:er?
- [ ] Håller jag mig till användarens avgränsade uppdrag?
- [ ] Har jag lämnat CMS, OAuth och publiceringsregler oförändrade, eller fått uttryckligt godkännande?
- [ ] Har jag skyddat originalbilder, etiketttext och privata uppgifter?
- [ ] Har jag testat och redovisat faktisk status, utan att påstå att PR = produktion?
- [ ] Har jag lämnat produktion och andra webbplatser orörda?
- [ ] Har jag granskat och vid behov uppdaterat `docs/PROJECT_RULES.md` och andra relevanta driftdokument?
- [ ] Har jag lagt till en verifierbar post i `docs/CHANGELOG.md`, även för innehållsändringar och manuella serveråtgärder?
- [ ] Har jag länkat PR/commit och dokumenterat relevanta beslut?

**Vid osäkerhet:** stanna före den riskfyllda ändringen, förklara exakt vad som behöver ändras och be om godkännande. Fortsätt gärna självständigt med ofarligt, avgränsat innehållsarbete under tiden.
