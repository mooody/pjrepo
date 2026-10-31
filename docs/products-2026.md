# Produkter 2026

Produktarkivet finns på `/produkter-2026/` och omfattar tio produktposter (2026-10-31), inklusive Hett Möte (B2610-9).

## Visning

- På **översiktssidan** visas respektive produkts färgillustrerade webbetikett. Filnamnen och sökvägarna är samlade i `overviewImages` i `src/pages/produkter-2026/index.astro`.
- På **detaljsidan** hämtas produktbild och riktig etikett ur Markdown-filens fält `productImage` respektive `labelImage`. De befintliga produkternas riktiga etiketter är oförändrade.
- Alla färdigställda etiketter visas med bevarad text, proportioner och utformning. Inga nya vattenstämplar har lagts till. Optimerade bilder är enskilda WebP-filer under `public/product-images/`.
- **B2610-5 Röd Glöd:** produktfotot `röd-glöd-B2610-5.png` hämtades från Drive 2026-10-20 och exporterades till `public/product-images/rod-glod-foto.webp` (1200 × 1200 px, 209 kB). Det visas nu som huvudbild på detaljsidan. Webbetiketten används fortfarande enbart på översiktssidan, och originaletiketten på detaljsidan.
- **B2610-6 Ghost:** produktfoto, illustrerad webbetikett och riktig etikett finns med.

## Redaktionell ton i produkttexter (2026-10-31)

- Produktbeskrivningarna ska tala till besökaren: smak, råvaror, konsistens, hetta och relevanta batchuppgifter. Undvik intern redaktionell text, såsom att etikettunderlaget har lämnats orört eller att kontroller behöver göras inför försäljning.
- Varje produktsida visar redan en separat sektion **Etikett och innehåll** med etikettbild och förstoring. Upprepa inte uppmaningen ”Se etiketten nedan” i varje produkttext.
- Dokumentera frågor om slutlig etikettgranskning, tillsatsvillkor, hållbarhet, nettomängd och produktsäkerhet i respektive batchjournal och projektdokumentation, utan att ta bort dem eller ersätta dem med ogrundade säkerhetslöften på webben.
- Redovisa beräknad styrka som just uppskattad/beräknad, utan överflödiga metodförklaringar i produkternas löptext. Detta är redaktionell förenkling, inte godkännande av märkning eller produkt.
- Befintliga etikettbilder och bildrelationer ändras inte i detta arbete.

## Nya produkter

- Kopiera `src/content/products/_mall.md.example` till `src/content/products/<slug>.md` och ange fält enligt befintligt schema.
- Lägg färdiga, optimerade bilder i `public/product-images/` och ange bildvägar i produktens Markdown. Ställ `draft: true` tills innehållet är granskat.
- Lägg till katalogens illustrerade webbetikett i `overviewImages` på översiktssidan. Detta påverkar inte CMS-fält eller originaletiketter.
- Bildoriginal förvaras i Google Drive, inte i GitHub. Enbart webbanpassade WebP-filer är incheckade.
- Framöver kan produktinformationen byggas ut för webbshop, men katalogen har inga beställningar, priser eller betalningar nu.

## Publicering och kontroll

Ändringar utvecklas i separat branch och PR. Byggning och tester görs i `Validate and build`. Ingen uppdatering av STRATO-produktion ingår; produktionen använder separat manuellt publiceringsworkflow.

## 2026-10-26 – tre nya produkter och nio webbexporter i PR #34

- Tre produkter har lagts in i befintlig produktmall: Fermenterad Mangosalsa (B2610-4), Tropisk Glöd (B2610-7) och Röd Mango (B2610-8). Alla har `draft: false` **i arbetsgrenen**, efter att bildernas sökvägar blev tillgängliga. Röd Mango är en separat starkare delbatch av B2610-4.
- Tre produktbilder, tre illustrerade webbetiketter och tre fullständiga etiketter finns nu som WebP i `public/product-images/`. De nio publika exporterna bygger på redan framtagna bilder från Drive och bevarar originaletiketternas text/motiv. Etiketterna är beskurna vid ramen med alfatransparens utanför; produktfotona saknar transparens. Fotografiska original och PNG-underlag har inte checkats in.
- Produktöversiktens `overviewImages` använder webbetiketterna, detaljsidorna använder produktfoto och fullständig etikett. Befintliga sex produkter, mallar, CMS och bygg-/publiceringsflöden har inte ändrats.
- **Verifiering:** GitHub visar samtliga nio filer. Alla sex etiketternas hörnpixlar har alfavärdet 0, och en visuell kontroll av bilderna har genomförts. `Validate and build` [#40247397221](https://github.com/mooody/pjrepo/actions/runs/40247397221) avslutades med **success** för aktiveringscommit `b7cdb2ab3aed3497acdf0f7268a60091a618b804`. Denna dokumentationsuppdatering måste CI-verifieras separat. `draft: false` innebär visning i PR-bygget, **inte** publicering på produktionsservern.
- Etiketterna är ännu inte försäljnings-/hållbarhetsgodkända genom detta webbuppdrag; särskilt Tropisk Glöds originaletikett bör kontrolleras mot senaste slutkorrektur innan försäljning. Ingen sådan validering eller märkning har ändrats.
- `docs/PROJECT_RULES.md` och `AGENTS.md` kontrollerades och kräver ingen regeländring. `docs/SERVER_OPERATIONS.md` berörs inte; ingen serverändring eller produktionspublicering utförd.

## 2026-10-31 – Hett Möte (B2610-9)

- Ny produktpost `src/content/products/hett-mote.md` med kategorin chiligelé, batch B2610-9 och `draft: false`, inom befintlig produktsamling och utan schemaändringar.
- På produktöversikten används `hett-mote-webbetikett.webp`; på detaljsidan `hett-mote-foto.webp` och den fullständiga `hett-mote-etikett.webp`.
- Bildunderlag från den privata Drive-mappen: `Produkt-B2610-9`, `webbettikett-B2610-9.png`, `ettikett-B2610-9.png`. Webbexporterna är optimerade WebP-kopior. Etiketttext och bildmotiv är inte redigerade; genomskinliga marginaler är beskurna. Inga original läggs i GitHub.
- Produktens namn **Hett Möte** är hämtat från båda etiketterna och fotot; **Dundergel** är batchjournalens arbetsnamn. Angiven styrka 8/10 och CSI ≈ 43 400 är preliminära, medan 24 burkar à nominellt 41 ml är rapporterade. Nettomängd per burk är okänd.
- På befintlig etikett står kylvara och bäst före 2027-10. Det finns ännu ingen verifierad hållbarhetsbedömning eller fullständig kontroll av E211 mot produktkategori och gällande tillsatsvillkor. Före försäljning krävs kontroll av märkning, process, faktisk nettomängd och förvaring. Källjournal: `B2610-9 – Dundergel med Carolina Reaper och Ghost` på Drive.
- Ändringarna ligger endast i arbetsgren och PR för granskning; ingen merge eller produktionspublicering.
