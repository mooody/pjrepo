# Produkter 2026

Produktarkivet finns på `/produkter-2026/` och har sex befintliga produktposter och ytterligare tre nya (B2610-4, B2610-7 och B2610-8) i arbetsgrenen för PR #34.

## Visning

- På **översiktssidan** visas respektive produkts färgillustrerade webbetikett. Filnamnen och sökvägarna är samlade i `overviewImages` i `src/pages/produkter-2026/index.astro`.
- På **detaljsidan** hämtas produktbild och riktig etikett ur Markdown-filens fält `productImage` respektive `labelImage`. De befintliga produkternas riktiga etiketter är oförändrade.
- Alla färdigställda etiketter visas med bevarad text, proportioner och utformning. Inga nya vattenstämplar har lagts till. Optimerade bilder är enskilda WebP-filer under `public/product-images/`.
- **B2610-5 Röd Glöd:** produktfotot `röd-glöd-B2610-5.png` hämtades från Drive 2026-10-20 och exporterades till `public/product-images/rod-glod-foto.webp` (1200 × 1200 px, 209 kB). Det visas nu som huvudbild på detaljsidan. Webbetiketten används fortfarande enbart på översiktssidan, och originaletiketten på detaljsidan.
- **B2610-6 Ghost:** produktfoto, illustrerad webbetikett och riktig etikett finns med.

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
- **Verifiering:** GitHub-blob- och commitöverföring av alla nio filer har lyckats. Bygg- och webbläsarkontroll för senaste PR-commit ska fortfarande granskas. `draft: false` innebär att dessa produkter ingår i ett lyckat arbetsgrensbygge, **inte** att de publicerats på produktionsservern.
- Etiketterna är ännu inte försäljnings-/hållbarhetsgodkända genom detta webbuppdrag; särskilt Tropisk Glöds originaletikett bör kontrolleras mot senaste slutkorrektur innan försäljning. Ingen sådan validering eller märkning har ändrats.
- `docs/PROJECT_RULES.md` och `AGENTS.md` kontrollerades och kräver ingen regeländring. `docs/SERVER_OPERATIONS.md` berörs inte; ingen serverändring eller produktionspublicering utförd.
