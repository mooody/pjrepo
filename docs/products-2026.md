# Produkter 2026

Produktarkivet finns på `/produkter-2026/` och består av sex produkter, inklusive Röd Glöd (B2610-5) och Ghost (B2610-6).

## Visning

- På **översiktssidan** visas respektive produkts färgillustrerade webbetikett. De sex filnamnen och sökvägarna är samlade i `overviewImages` i `src/pages/produkter-2026/index.astro`.
- På **detaljsidan** hämtas produktbild och riktig etikett ur Markdown-filens fält `productImage` respektive `labelImage`. De befintliga fyra produkternas riktiga etiketter är oförändrade.
- Alla etiketter visas med bevarad text, proportioner och utformning. Inga nya vattenstämplar har lagts till. Optimerade bilder är enskilda WebP-filer under `public/product-images/`.
- **B2610-5 Röd Glöd:** produktfotografi saknas i den angivna Drive-mappen vid granskning 2026-10-19. Den illustrerade webbetiketten används även som tillfällig huvudbild på detaljsidan. När fotot finns uppdateras endast `productImage` och `productImageAlt` samt en ny optimerad bildfil; originaletiketten behålls.
- **B2610-6 Ghost:** produktfoto, illustrerad webbetikett och riktig etikett finns med.

## Nya produkter

- Kopiera `src/content/products/_mall.md.example` till `src/content/products/<slug>.md` och ange fält enligt befintligt schema.
- Lägg färdiga, optimerade bilder i `public/product-images/` och ange bildvägar i produktens Markdown. Ställ `draft: true` tills innehållet är granskat.
- Lägg till katalogens illustrerade webbetikett i `overviewImages` på översiktssidan. Detta påverkar inte CMS-fält eller originaletiketter.
- Bildoriginal förvaras i Google Drive, inte i GitHub. Enbart webbanpassade WebP-filer är incheckade.
- Framöver kan produktinformationen byggas ut för webbshop, men katalogen har inga beställningar, priser eller betalningar nu.

## Publicering och kontroll

Ändringar utvecklas i separat branch och PR. Byggning och tester görs i `Validate and build`. Ingen uppdatering av STRATO-produktion ingår; produktionen använder separat manuellt publiceringsworkflow.
