# Produkter 2026

Produktarkivet finns på `/produkter-2026/` och har sex befintliga publicerade produktposter samt tre nya produktutkast i arbetsgrenen (B2610-4, B2610-7 och B2610-8).

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

## 2026-10-26 – tre nya produktutkast (väntar på bilder)

- Tre Markdown-poster inom befintligt produktschema: `fermenterad-mangosalsa.md` (B2610-4), `tropisk-glod.md` (B2610-7) och `rod-mango.md` (B2610-8). Produkttexterna utgår från respektive batchjournal på Drive. Röd Mango är en **separat** extra stark batch av restsås från B2610-4.
- `overviewImages` kompletterad med samma tre produkt-ID:n och deras illustrerade webbetiketter. Befintliga sex kort oförändrade.
- **Bildbearbetning klar lokalt, överföring till GitHub återstår.** Nio optimerade WebP-filer – vardera en produktbild, webbetikett och fullständig etikett per produkt – har skapats från de faktiska Drive-underlagen. Etiketterna har behållit sin text och motiv; genomskinlig bakgrund utanför den yttre ramen verifierad. De nio filerna är samlade i ett överlämningspaket med förväntade paths `public/product-images/<filnamn>.webp`.
- GitHub-verktygets säkerhets-/storlekskontroll blockerade överföring av fullupplösta binärfiler. Därför är de tre sidorna **`draft: true`** och visas inte i byggd katalog förrän bilderna har lagts in. **För att slutföra:** lägg de nio färdiga WebP-filerna från överlämningspaketet i `public/product-images/`, verifiera bildlänkar och innehåll, sätt `draft: false`, kör `npm run verify` och låt PR gå genom ordinarie granskning. Inga interna mall-/schema- eller publiceringsmetoder ändras.
- Livsmedelsmärkning och hållbarhet är inte verifierade som försäljningsgodkända; produkttexterna lämnar inga sådana löften. Särskilt Tropisk Glöds fullständiga etikett bör stämmas av mot senast godkända korrektur innan försäljning.
