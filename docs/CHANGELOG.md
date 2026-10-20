# Ändringslogg – Trädgårdsdrömmar

**Omfattning:** ändringar av innehåll, kod, CMS, bilder, GitHub-workflows, OAuth, server, DNS, certifikat och publicering. Lägg en tydlig post per uppdrag/PR även när ändringen bara gäller innehåll. Granska samtidigt [PROJECT_RULES.md](PROJECT_RULES.md) och relevant dokumentation; uppdatera dem när beskrivningen eller reglerna påverkas.

**Mall för varje ny ändring:**

```md
## 2026-10-19 – Chilins arter och lättlästa styrkebeskrivningar
- Genomfört: ny artikel `src/content/pages/chiliarter.md` med de fem stora odlade arterna och 38 vilda arter enligt Barboza med flera (2022). Länkad från Chili.
- Genomfört: tio sortsidor har fått lättlästa styrkebeskrivningar; ungefärliga SHU anges där underlaget räcker, annars beskrivande ord och befintlig leverantörsskala. Källspecifika testförbehåll borttagna ur lästexten. En gemensam förklaring om variation och SHU finns i sortöversikten. Styrkan visas även på sortkorten.
- Källor: artmonografin (doi:10.3897/phytokeys.200.71667), Oxford, Rutgers, NMSU och sorternas fröleverantörer; befintliga källänkar bevarade och kompletterade. Listans 38 vilda namn kontrollerade mot monografins tabell 1.
- Berörda filer: artikeln, tio filer under `src/content/chilies`, `src/pages/chili/index.astro`, `src/components/Card.astro`, `src/data/sections.json` och denna logg.
- Dokumentation: projektreglerna granskade och oförändrade. CMS, bildhantering och drift oförändrade.
- Verifiering: typkontroll, byggning och 14 tester godkända; lokala webbläsartester kunde inte starta utan Chromium. Installationsförsöket fick en ogiltig ZIP från nedladdningskällan. GitHub Actions återstår.
- Status: arbetsgren/PR, inte publicerat. Återstår: granskning och merge; produktion kräver separat godkänd publicering.

## 2026-10-19 – Ta bort avsnittet om fröfria chilifrukter
- Genomfört: hela avsnittet ”Kan chili få frukter utan frön?” borttaget från `src/content/pages/chilifortplantning.md`. Efterföljande avsnitt omnumrerat från 7 till 6.
- Syfte: avgränsad innehållsändring enligt användarens önskemål.
- Dokumentation: projektreglerna granskade och oförändrade; ingen ändring av CMS, bilder eller drift.
- Verifiering: `npm ci`, typkontroll, byggning och 14 tester godkända. Lokala webbläsartester kunde inte starta eftersom Playwrights Chromium saknas; GitHub Actions återstår.
- Status: arbetsgren/PR; inte publicerat. Återstår: granskning, merge och separat godkänd produktionspublicering.

## ÅÅÅÅ-MM-DD – Kort rubrik
- Område/miljö: [innehåll | CMS | GitHub | bildflöde | STRATO-preview | produktion | annan]
- Ändrat: [berörda filer, tjänster och vad som ändrats]
- Skäl och påverkan: [varför; eventuella kompatibilitets- eller säkerhetseffekter]
- Verifiering: [faktiska tester, länkar till workflow/PR, eller ”ej verifierat”]
- Publicering: [endast gren/PR | main | preview | produktion]
- Dokumentation: [vilka dokument uppdaterades, eller att reglerna granskades och är oförändrade]
- Återstår: [nästa steg, avvikelser eller ”inget känt”]
```

Registrera även resultat från **manuella ändringar på VPS** när det går, med stöd av serverutskrift eller utfört test. Skriv **aldrig** hemligheter, lösenord, token, privata nycklar, autentiseringshashar eller råa besöksloggar här. GitHub-commits/PR:er är en separat detaljerad revisionshistorik; denna logg förklarar vad som hände och dess konsekvenser.

---

## 2026-10-19 – SEO-granskning och grundoptimering
- Område: SEO i arbetsgren seo/grundoptimering-20261019, inte publicerat.
- Gjort: bättre sidtitlar/metabeskrivningar, WebSite- och BreadcrumbList-JSON-LD, sociala metataggar, justerat guidetext och interna länkar för chiliodling och bladlöss.
- Filer: src/layouts/Base.astro, flera Astro-rutter, befintligt innehåll och src/data/sections.json, tests/seo.test.mjs och docs/SEO_AUDIT.md.
- Verifierat: GitHub Actions Validate and build https://github.com/mooody/pjrepo/actions/runs/39260913328 avslutades med success, inklusive npm ci, npm run verify och nya SEO-tester. Live-webb och Search Console kunde inte kontrolleras här.
- Gränser: CMS, OAuth, bildflöde, server, Nginx och produktion har inte ändrats.
- Dokumentation: PROJECT_RULES.md granskad och oförändrad. SERVER_OPERATIONS.md påverkas inte av detta uppdrag. CMS-förslag och genvägar redovisas i SEO_AUDIT.md.
- Konfliktlösning 2026-10-20: `main` med produkt-PR #13 integrerat i SEO-grenen. Produkternas webbetiketter, produktfoton och originaletiketter bevaras samtidigt med SEO-titlar och strukturerade brödsmulor. Ny gemensam CI-verifiering inväntas.
- Status: endast SEO-arbetsgrenen/PR #12; produkternas PR #13 är redan mergad till `main`. Godkännande krävs för SEO-merge och senare manuell deploy.

## 2026-10-19 – Webbetiketter och produktblad för B2610-5 och B2610-6
- Område: produktarkiv 2026, bilder och text på en separat arbetsgren.
- Genomfört: sex produkter i katalogen, inklusive ny produktsida för Röd Glöd (B2610-5) och Ghost (B2610-6). Översikten använder sex nya illustrerade webbetiketter, medan originaletiketterna visas på produktsidorna.
- Bilder: tio separata, optimerade WebP-filer från Drive (inklusive Röd Glöds produktfoto tillagt 2026-10-20); inga fotografiska original incheckade i GitHub, ingen ytterligare vattenstämpel. Originaltexter och etiketter oförändrade.
- Uppföljning 2026-10-20: `röd-glöd-B2610-5.png` hittades i Drive-mappen och ersätter den tillfälliga illustrerade webbetiketten som huvudbild på Röd Glöds detaljsida. Optimerad fil `rod-glod-foto.webp` 1200 × 1200 px (209 kB).
- Berörda filer: `src/content/products/rod-glod.md`, `src/content/products/ghost.md`, `src/pages/produkter-2026/index.astro`, `src/pages/produkter-2026/[slug].astro`, `tests/products.test.mjs`, tio filer under `public/product-images`, samt dokumentation.
- Verifiering: WebP-header och Git blob-SHA för tillagt produktfoto kontrollerade lokalt. `Validate and build` för commit `d897260a` godkänd i GitHub Actions-körning [39390925643](https://github.com/mooody/pjrepo/actions/runs/39390925643). Denna logguppdatering är dokumentation och får en ny kontrollkörning.
- Dokumentation: `docs/products-2026.md` uppdaterad. `docs/PROJECT_RULES.md` granskad och oförändrad; CMS-arkitektur, säkerhet, deployment och serverkonfiguration oförändrade.
- Status 2026-10-20: produkt-PR #13 mergad till `main` i commit `2e72f49b`; GitHub Actions `Validate and build` och GitHub Pages-preview godkända för den commiten. Separat STRATO-publicering av denna produktversion har inte utförts.

## 2026-10-19 – Vår historia och chilins smaker
- Område/miljö: publikt innehåll, bildtexter och presentation; separat arbetsgren.
- Ändrat: Om-sidan och dess menyval heter nu Vår historia. Texten bygger på användarens uppgifter om över 30 års chiliodling, biologiskt odlingsintresse och ambitionen att använda fler ekologiska råvaror. Befintligt foto av Habanero Red ersätter burkbilden på sidan.
- Ändrat: Förädla, startsidans introduktion och förädlingsprojektet fokuserar på smak och användning. Salt, oljor och godis beskrivs som framtida idéer. Försöks- och anteckningsspråk har tagits bort från dessa presentationer.
- Bilder: egna bildtexter visar motivbeskrivningar utan fotokredit och återkommande licensrad. Namnet Micke har ersatts med Trädgårdsdrömmar i bildbiblioteket och tagits bort från Om-sidan. Rutinmässiga kommentarer om bildbearbetning har tagits bort även i två sortartiklar. Tredjepartsbilders attribution, vattenstämplar och bildvillkor bevaras.
- Verifiering: npm ci, typkontroll, byggning och alla 14 Node-tester passerade lokalt. Playwright kunde inte starta lokalt eftersom Chromium saknas; GitHub Actions ska köra hela verifieringen. Mobilnavigationens befintliga test följer det nya menynamnet.
- Publicering: endast arbetsgren/PR; ingen merge eller publicering på server utförd i uppdraget.
- Dokumentation: PROJECT_RULES.md granskad och oförändrad; docs/images.md uppdaterad om publika bildtexter. CMS, schema, exportflöde och serverdrift är oförändrade.
- Återstår: granskning och godkännande av PR. Ett framtida huvudfoto kan visa en skördekorg med flera chilisorter bland plantorna, i mjukt dagsljus.

## 2026-10-17 – Chiliartiklar: Pequena Amarilla, Sipka Zitronen och Okrasny Zvonek Red
- Område/miljö: webbplatsinnehåll och vattenstämplade bildexporter; GitHub-arbetsgren.
- Ändrat: befintlig artikel `src/content/chilies/pequena-amarilla.md` har kompletterats med fotoobservation och texterna `src/content/chilies/sipka-zitronen.md` och `src/content/chilies/okrasny-zvonek-red.md` har skapats med befintligt CMS-schema. Källor är fröförädlaren Culinaris, Fröbanken och RHS.
- Skäl och påverkan: komplettera sortbiblioteket med två nya sorter och dokumentera bilden av Pequena Amarilla. Sortspecifik hetta hålls isär från skattningar och leverantörsskalor.
- Bilder: 24 färdiga, vattenstämplade WebP-varianter från tre valda bearbetade foton har lagts under `web-images/`; bild-ID och metadata har lagts till i `src/data/images.json` och `web-images/index.json`. De tre sortartiklarna refererar nu till bilderna. Oskyddade fotooriginal har inte lagts in i repositoryt.
- Verifiering: 24 webbexporters mått, WebP-format och frånvaro av EXIF kontrollerades före import. GitHub Actions `Validate and build` körning #43 (commit `4215164744dd2cf7c332dab471f78cfa87ab8631`) slutfördes med resultat `success`, inklusive bilder och artiklar. Slutlig visuell granskning i en publicerad miljö är ännu inte genomförd.
- Publicering: endast arbetsgren/PR; inte sammanslaget med `main` och inte publicerat på STRATO.
- Dokumentation: `docs/PROJECT_RULES.md` och `docs/images.md` granskades, oförändrade; inga server- eller CMS-ändringar.
- Återstår: granska artikelkort och bildbeskärning visuellt i preview före merge; publicering kräver separat godkännande.

## 2026-10-16 – Artikel om chilifortplantning och undermeny
- Område/miljö: webbplatsinnehåll och presentation; GitHub-arbetsgren.
- Ändrat: `src/content/pages/chilifortplantning.md` med faktabaserad artikel i befintliga CMS-samlingen Vanliga sidor, samt `src/data/settings.json`, `src/layouts/Base.astro`, `src/styles/global.css` och `src/pages/chili/index.astro` för menyvalet Chili med kortlänkar till Chilisorter och Chilifortplantning. Befintligt CMS-schema och konfiguration har behållits oförändrade. Anpassat Playwright-navigationstestet i `tests/browser/site.spec.ts` efter avläst ursprungligt testfel.
- Skäl och påverkan: gör fortplantningsbiologi och praktisk korspollinering tillgängliga utan CMS-migrering. Fyra illustrationer från Drive har identifierats, fått beskrivande namn och infogats vid relevanta avsnitt: `public/illustrationer/chiliblommans-anatomi.png`, `chili-dubbel-befruktning.png`, `chili-kontrollerad-korsning.png` och `chili-sortakta-fron.png`. Illustrationerna är separata från det skyddade fotografiska originalflödet.
- Verifiering: GitHub-filernas innehåll granskat före ändring; föregående GitHub Actions-körning visade 14 godkända Node-tester och 4/5 webbläsartester; Playwright hittade inte tidigare menyvalet Chilisorter i den utfällbara menyn. Ny verifiering inväntar Actions.
- Publicering: endast arbetsgren/pull request; inte sammanslaget med `main`, inte publicerat på STRATO.
- Dokumentation: `PROJECT_RULES.md` granskad och oförändrad, inga serverändringar.
- Återstår: verifiera PR-teststatus; granska bildtexter, bildstorlek och tillgänglighet i faktiskt byggd webbplats före merge; vid behov konvertera illustrationernas PNG till mindre webbformat i separat kontrollerad ändring.

## 2026-10-16 – Inventering av serverdrift och krav på löpande loggning
- Område/miljö: dokumentation; GitHub.
- Ändrat: dokumenterat de tre webbplatserna, Nginx-rotkataloger, certifikat, preview-skydd, driftsättning och kvarstående arbetssteg i [SERVER_OPERATIONS.md](SERVER_OPERATIONS.md). Uppdaterat [PROJECT_RULES.md](PROJECT_RULES.md) med krav på loggning och dokumentationsgranskning.
- Skäl och påverkan: olika chattar ska kunna följa samma verifierade driftstatus utan att skriva över varandras eller andra webbplatsers konfiguration.
- Verifiering: jämförelse med användarens serverutskrifter och aktuella GitHub-workflow-filer. **Ingen ny SSH-kontroll eller driftsändring utförd.**
- Publicering: endast dokumentationsgren/pull request tills den har granskats och slagits ihop.
- Dokumentation: denna logg och serverhandboken nyskapade; projektregler granskade och uppdaterade.
- Återstår: godkännande av PR; senare automatisk preview-deploy som separat uppdrag.

## 2026-10-16 – STRATO-preview fick eget HTTPS och åtkomstskydd
- Område/miljö: STRATO-preview (historisk dokumentation av redan genomförda manuella steg).
- Ändrat: subdomänen `preview.tradgardsdrommar.se`; webbrot `/var/www/tradgardsdrommar-preview/public`; separat Nginx-site `tradgardsdrommar-preview`; robots.txt, `X-Robots-Tag`, Certbot-certifikat och Basic Auth med separat htpasswd-fil.
- Skäl och påverkan: skapa privat testmiljö som inte indexeras och inte rör produktion eller Kumlamark.
- Verifiering: användaren visade Nginx/Certbot-utskrifter och bekräftade fungerande lösenordsinloggning. Certifikat för preview giltigt till 2027-01-14 enligt utskrift. **Ingen automatisk GitHub→STRATO-preview-uppdatering har implementerats.**
- Publicering: testplats på STRATO; för närvarande tillfällig testsida. Ingen produktionsförändring genom detta steg.
- Dokumentation: nu sammanfattat i [SERVER_OPERATIONS.md](SERVER_OPERATIONS.md).
- Återstår: separat preview-deploy samt full kontroll av auth/noindex efter byte till riktigt bygginnehåll.

## 2026-10-15–16 – Produktionspublicering och CMS-inloggning verifierade
- Område/miljö: produktion, GitHub Actions, CMS/OAuth (historik från uppdrag).
- Ändrat: produktionens statiska publicering från godkänd `website`-artefakt via manuellt GitHub Actions-flöde. GitHub OAuth för Decap CMS via Cloudflare Worker etablerades och fungerande inloggning samt sparning till PR verifierades av användaren.
- Skäl och påverkan: kontrollerad webbpublicering med användarstyrt godkännande; CMS kan redigera innehåll utan direkt serveråtkomst.
- Verifiering: manuell produktion-deploy-run `38855960944` gick igenom; commit `c1d2bb0686ec707382c4206f5c94603d300ace24`. Användaren verifierade CMS-inloggning och innehållsändring på `Förädla` i PR. GitHub-workflows granskade.
- Publicering: produktion enligt föregående lyckade deploy; nyare commits är inte automatiskt publicerade där.
- Dokumentation: [deployment.md](deployment.md), [oauth.md](oauth.md), [PROJECT_RULES.md](PROJECT_RULES.md).
- Återstår: ingen utökning av produktionens publiceringsbehörighet; preview-flow separat.

## 2026-10-15 – Kumlamark etablerades som separat webbplats
- Område/miljö: annan webbplats på samma STRATO VPS (historisk dokumentation).
- Ändrat: separat Nginx-site/dokumentrot för `kumlamark.se` samt `www.kumlamark.se`, certifikat från Let's Encrypt.
- Verifiering: användarens `sites-enabled`-lista och Certbot-lista; giltigt certifikat till 2027-01-13 i dåvarande utskrift.
- Publicering: separat från Trädgårdsdrömmar; **får inte ändras av detta projekts arbetsflöden**.
- Dokumentation: [SERVER_OPERATIONS.md](SERVER_OPERATIONS.md) innehåller endast läsinventering.
- Återstår: inget inom detta projekts mandat.

## 2026-10-12 – Trädgårdsdrömmar körs på VPS med Nginx och HTTPS
- Område/miljö: produktion (historisk serverinventering).
- Ändrat: separat Nginx-site för `tradgardsdrommar.se` och `www.tradgardsdrommar.se`, dokumentrot `/var/www/tradgardsdrommar.se/public`, Certbot/HTTPS.
- Verifiering: datum för Nginx-site enligt användarens lista, senare utskrift av Nginx-konfiguration och giltigt certifikat (till 2027-01-10 i utskrift).
- Dokumentation: [deployment.md](deployment.md), [SERVER_OPERATIONS.md](SERVER_OPERATIONS.md).
- Återstår: inget i detta historiska steg.

**Obs:** Äldre poster är en sammanställning från tillgängliga serverutskrifter och GitHub-historik, inte en fullständig revisionslogg över varje utfört kommando. För framtida ändringar förs löpande logg med verifierad status.
