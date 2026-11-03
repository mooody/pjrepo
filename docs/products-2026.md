# Produkter 2026

Produktarkivet finns på `/produkter-2026/` och omfattar tio aktiva produktposter från oktober 2026, inklusive Hett Möte (B2610-9). Ett ytterligare, ännu opublicerat produktutkast för B2611-1 är förberett i arbetsgren.

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

## 2026-11-03 – Habanero Red, mango- och vaniljmarmelad (B2611-1)

- **Underlag:** batchjournal och batchregister i Drive, tillverkad 1 november 2026. Mango, vaniljstång, citron, ingefära, Habanero Red och en liten mängd svartpeppar. 39 fyllda burkar av nominell storlek 106 ml. Faktisk nettovikt/fyllvolym per burk har inte mätts.
- **Styrka:** preliminärt cirka 4/10 (CSI cirka 3 400); beräkningen förutsätter att alla 54 g Habanero Red användes och använder en ungefärlig slutvikt 3 946 g.
- **Bilder:** källor i privata Drive-mappen för produktbilder: `produktbild-b2611-1.png` och `B2611-1_Habanero_Red_webbetikett_B2611-1.png`. Webboptimerade exportkopior är `habanero-red-b2611-1-foto.webp` (1057 × 1057) och `habanero-red-b2611-1-webbetikett.webp` (1348 × 846). Webbetikettens motiv och text har inte ändrats; endast helt genomskinliga ytterkanter har beskärts. Originalen i Drive är orörda.
- **Fullständig etikett tillagd 2026-11-03:** Originalet `ettikett-2611-1.png` hittades i samma privata Drive-mapp (tillagt 3 november). Webbanpassad etikett `habanero-red-b2611-1-etikett.webp` (1734 × 848 px) har kopplats till `labelImage`, medan illustrerad `webbetikett` fortsatt används på översiktskortet. Exporten bevarar text, grafik och typografi; endast den yttre ljusa kanten har gjorts transparent och webbformatet har anpassats. Originalet ligger orört i Drive.
- **Publiceringsspärr kvarstår:** `draft: true` ska behållas tills den fysiska märknings- och hållbarhetskontrollen är klar. Att fullständig etikettbild nu finns innebär inte att dess uppgifter har verifierats eller att produkten är försäljningsklar.
- **Livsmedelsuppföljning:** etiketten anger ”Kylvara”, ”Bäst före utgången av 11 2027” och ”Fruktmängd ca 65 g per 100 g”. Batchjournalen rapporterar pH 3,5 **före** tillsats av E211 och slutmängd cirka 3 946 g med instabil våg. Det är inte en verifiering av hållbarhet eller ett bekräftat värde för varje burks nettomängd. Se detaljerad kontrollista nedan.
- **Avgränsning och status:** befintlig produktmall, bildvägar och katalogkarta används utan ändring av CMS, schema, säkerhet, VPS eller publiceringsflöde. `docs/PROJECT_RULES.md` och `AGENTS.md` granskades utan behov av regeländring. Inget är mergat eller publicerat till produktion. Användaren gör merge och publicering manuellt efter separat godkännande.

### B2611-1 – kontroll inför försäljning (granskning 3 november 2026)

**Fastställt från journal och den uppladdade etikettbilden**

- 39 fyllda burkar, modell 106 ml; faktisk nettofyllning per burk ej uppmätt.
- Slutvikt beräknad cirka 3 946 g (osäker). pH 3,5 uppmätt före E211; mätning på färdig tappad produkt saknas.
- 2,0 g natriumbensoat E211 uppgavs faktiskt tillsatt till cirka 3,946 kg => cirka **507 mg/kg natriumbensoat**, motsvarande cirka **430 mg/kg räknat som fri bensoesyra**. Beräkningen är inte en verifierad analys.
- Fruktmängden på etiketten är **ca 65 g/100 g** men i batchjournalen finns endast 2 278 g mango säkert invägt; citronvikt och återförda mangobitar är inte säkert dokumenterade. Värdet kan inte låsas som kontrollerat.
- Etiketten anger kylvara och bäst före utgången av november 2027, men fylltemperatur, koktid, lockbehandling, lagringstemperatur, mikrobiologi, hållbarhetsprövning och eventuell vattenaktivitet/Brix saknas i underlaget.

**Kontroller som måste avslutas före försäljning och innan `draft: true` ändras**

1. **E211 och kategori:** Kontrollera rätt klassificering enligt aktuell bilaga II till EU-förordning (EG) nr 1333/2008. E210–E213 med högsta nivå 500 mg/kg räknat som fri syra gäller **endast under särskilda villkor, bl.a. vissa låg-sockerprodukter**, och nivån är en gräns för *tillåten användning*, inte generellt godkännande för vanlig marmelad. Bekräfta att produkten uppfyller rätt kategori och villkor, inklusive eventuella andra tillsatsmängder. Om villkoren inte är uppfyllda kan E211 inte godkännas för satsen genom att bara räkna om mängden.
2. **Ingrediensmärkning:** Etiketten har ”pektin”, ”citronsyra” och ”natriumbensoat” utan kategorinamn. Kontrollwiki anger att tillsatser måste deklareras med lämpligt kategorinamn och namn eller E-nummer. Exempel att granska mot faktisk funktion: *geleringsmedel: pektin*, *surhetsreglerande medel: citronsyra* samt *konserveringsmedel: natriumbensoat (E211)*. Detta är ett förslag för kommande etikettkorrektur – ändra inte originalbilden automatiskt.
3. **Marmeladbeteckning/fruktmängd:** Bedöm mot Livsmedelsverkets föreskrifter LIVSFS 2025:6 (gäller från 14 juni 2026, ändrade genom LIVSFS 2026:3). Kontrollera hur mango, citron och chili får räknas i fruktmängden och om ”ca 65 g per 100 g” stöds av faktiska råvaru-/slutvikter. Komplettera eller ersätt osäker siffra i ny godkänd etikettversion.
4. **Nettokvantitet och avsändare:** Väg representativa färdiga burkar på en stabil våg (tarera tom burk/lock) och dokumentera verklig nettomängd; ”106 ml” är burkmodell, inte uppmätt innehåll. Kontrollera att all obligatorisk livsmedelsinformation, inklusive ansvarig livsmedelsföretagare och kontaktuppgifter, finns på etikett/övriga relevanta försäljningsytor enligt faktisk försäljningsform.
5. **Process och pH:** Dokumentera temperatur och tid vid kokning/fyllning, rengöring och förslutning samt kontrollmät pH i representativa **färdiga** burkar med kalibrerad pH-mätare. Bedöm om ytterligare risk-/mikrobiologisk kontroll behövs; pH ensamt visar inte hållbarhet.
6. **Hållbarhet/förvaring:** ”Kylvara” behöver kopplas till definierad och övervakad kyltemperatur; bäst före november 2027 är **inte verifierat**. Dokumentera en realistisk hållbarhetsbedömning med relevanta provningar över tid och tillverknings-/förpackningsdata innan datumet används vid försäljning. Behåll satsen kyld tills säkert förvaringsförfarande bedömts. Ett antaget kortare datum får inte heller presenteras som verifierat utan underlag.

**Myndighets- och lagkällor kontrollerade 2026-11-03**

- [Kontrollwiki – Att använda godkända tillsatser](https://kontrollwiki.livsmedelsverket.se/artikel/143/att-anvanda-godkanda-tillsatser)
- [Kontrollwiki – Ingredienser (märkning av tillsatser)](https://kontrollwiki.livsmedelsverket.se/artikel/43/ingredienser)
- [EU-förordning 1333/2008, konsoliderad version 2026-08-18](https://eur-lex.europa.eu/eli/reg/2008/1333/2026-08-18/eng)
- [Livsmedelsverket – LIVSFS 2025:6, sylt, gelé och marmelad](https://kontrollwiki.livsmedelsverket.se/lagstiftning/538/livsfs-2025-6)
- [Livsmedelsverket – Vad betyder datummärkningen?](https://www.livsmedelsverket.se/livsmedel-och-innehall/text-pa-forpackning-markning/datummarkning/)

**Status:** ny etikettbild är kopplad och saknad fil är löst. Märknings-/hållbarhetsfrågor **inte godkända**; inget lagligt hållbarhetslöfte eller försäljningsgodkännande fastställt. Ingen ändring av originaletikett eller befintligt CMS/schema. Förändringen är endast i PR-gren och får inte mergeas/publiceras av agent.
