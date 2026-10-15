# Produkter 2026

- Menyvalet Produkter 2026 visar etiketter, kort information och länkar till individuella produktsidor på /produkter-2026/.
- Varje produktsida visar produktfoto, komplett originaletikett, kategori och satsnummer.
- Produktdata ligger som Markdown-filer i src/content/products/. Kopiera _mall.md.example till ny-produkt.md när du vill skapa en ny produkt.
- Bilderna på webben är fristående optimerade WebP-filer i public/product-images/ med -foto.webp och -etikett.webp per produkt.
- Engångsimporten i scripts/optimize-product-images.mjs använder Sharp utan att lägga till vattenstämpel eller ändra etiketttexten. Etiketter sparas med kvalitet 95 för läsbarhet och fotografier med kvalitet 84.
- Två tidigare delade Base64-etiketter återställs till kompletta PNG i minnet, sedan exporteras de till enskilda WebP-bilder. Den tillfälliga originalkatalogen tas bort från arbetsbranchen efter lyckad import. Originalen ligger kvar på Google Drive. GitHub-historiken kan fortfarande innehålla tidigare filer.
- Decap CMS får en produktsamling med textfält och bildvägar; full CMS-inloggning väntar på separat OAuth-konfiguration.
- Detta är ännu inte en webbshop. Inga priser, orderfunktioner eller betalningar finns.
- Förändringarna hålls i feature/produkter-2026 tills de har testats. STRATO publiceras separat och manuellt.
