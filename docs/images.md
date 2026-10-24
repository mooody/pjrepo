# Skyddade original och offentliga webbexporter

## Redaktionellt återbruk på djursidor – 24 oktober 2026 (PR under granskning)

Tre **befintliga** och redan exporterade vattenstämplade bilder används även i nya sammanhang, utan omexport: `guldogonslanda-larv-foto` som exempel på en naturlig fiende i den generella bladlusguiden, `mangfald-stubbe` som illustrativ markmiljö hos jordlöpare och `mangfald-nyttodjur` som schematisk miljöillustration hos blomflugor. Bildtexterna skiljer uttryckligen eget foto från digital illustration och **gör ingen ny artbestämning**. Webbfilernas ID, skydd, licens och original är oförändrade.

Google Drive innehåller separata stadieillustrationer och faktakontroll för 27 djur samt katalogen **Webbguide – förenklade livscykelcirklar** (27 PNG och ett ZIP-paket). Exempelvis visar nyckelpigemappen sju stadiebilder och sköldlusmappen en omstridd nymfindelning. **Inga nya Drive-original eller diagram har ännu importerats till offentliga GitHub.** En framtida import ska använda `processImages` och projektets skyddade exportflöde innan det skapas nya poster i `src/data/images.json` och `web-images/index.json`. Inför publicering måste anatomi, etiketter, bildtexter och läsbarhet granskas. Ska inte gå via direkta Drive-länkar eller oskyddade original.

## Guldögonsländor – 24 oktober 2026

Tre befintliga AI-illustrationer ur Drive-förarbetet används på den befintliga djursidan: `guldogonslanda-vuxen` som huvudbild samt `guldogonslanda-larv` och `guldogonslanda-livscykel` i artikelns relevanta avsnitt. Livscykeln använder den förenklade fyrfasversionen. Fullbilderna ligger kvar i naturligt format; larvbild och livscykel kan öppnas i större format genom länkar i bildtexterna. Bildfilerna används som pedagogiska gruppexempel, inte som fotografiska artbelägg.

Bildtexter och huvudtext skiljer gruppkännetecken från carnea-studiens temperaturbundna tider. Huvudbilden visar en motivbeskärning av den vuxna insekten utan planschens etiketter; originalet bevaras. Larvbildens och livscykelns etiketter bevaras. Exportkopior har fått extra marginal i samma bakgrundsfärg så att standardvattenstämpeln inte skymmer etiketter eller befintlig märkning. Ingen djuranatomi eller diagramtext har genererats om. Därefter har befintlig `processImages` skapat 24 metadatafria, vattenstämplade WebP-varianter i separat exportkatalog. Bara de nya posterna och filerna har fogats till det publika bildbiblioteket; alla originalsökvägar är tomma. Drive-original, hämtade PNG-filer och exportkopior hålls utanför repositoryt. Bildkomponent, CMS, schema och vattenstämpelinställningar är oförändrade.

## Höstbild till täckodlingsåret – 24 oktober 2026

`tackodling-hostlov` bygger på Mickes foto av en påbörjad lövtäckning. Den godkända versionen är beskuren och digitalt ljus-/färgbearbetad med AI-stöd. Den används som huvudbild i `tackodling-genom-aret.md`, med beskrivande alt-text och bildtext som anger att arbetet påbörjats och att fotot är digitalt bearbetat. Bilden ska inte tolkas som ett färdigt täcklager eller ett dokumenterat odlingsresultat.

Åtta WebP-varianter skapade med befintlig `processImages`, med ordinarie vattenstämpel efter varje beskärning. Exporten gjordes i en separat arbetskatalog och endast den nya bildens filer/indexpost fogades till webbexporterna. Tidigare bilder har inte exporterats om. Originalfotot och den bearbetade PNG-bilden hålls utanför repositoryt; publika `source` är tomt. CMS, bildschema och exportmetod är oförändrade.

Repositoryt är offentligt. Inga fotografiska original ska sparas, läggas till med git eller laddas upp via CMS här. Katalognamnet private-images innebär inget åtkomstskydd.

## Två skilda steg

1. Original och ett exportmanifest ligger på en separat skyddad plats. Originalen bevaras; de behöver säkerhetskopieras där de lagras.
2. `node scripts/export-images.mjs /skyddad/exportmanifest.json /skyddad/originalkatalog` skapar endast beskurna, vattenstämplade webbversioner under `web-images/`. Dessa får sparas i det offentliga repositoryt.

Exportmanifestets `images` har samma id, ägare, fotograf och alt-text som bildbiblioteket, men fältet `source` är filnamnet inne i originalkatalogen. Använd inte offentliga originalsökvägar. Den vanliga byggningen använder inte exportmanifestet eller originalen, utan kopierar endast validerade WebP-varianter till `/media/`.

## Bildvarianter

Varje beskärning görs före vattenstämpeln. Fullversioner har naturligt format, kort har 3:2, huvudbild har 4:5 och delningsbild har cirka 1,905:1. Bildmått och srcset kommer från exportens index. Alla publicerade egna varianter är vattenstämplade. Metadata från originalen förs inte vidare.

Efter ändrad vattenstämpel eller beskärningsposition behövs en ny skyddad export. CMS kan ändra alt-text, bildtext och val av bild på en sida. Originaluppladdning i CMS är avstängd; nya exporter måste skapas med ovanstående arbetsflöde. Ett separat privat bildrepo kan automatisera detta senare men har inte skapats här.

## Första urvalet

Odlingslotten, chiliplantan utan säker sortetikett, fermenteringskärlet, såsflaskorna och burkarna. Bildbiblioteket anger Trädgårdsdrömmar som fotograf för egna bilder. Publika bildtexter visar motivbeskrivningen utan fotokredit eller upprepad licenstext; villkoren finns på sidan Bildvillkor. Tredjepartsbilder behåller sin fotokredit och licens. Ingen bild används som bevis på pH, recept, hållbarhet eller säker sortidentitet.

## Redaktionella bildtexter – 21 oktober 2026

Bildtexter för chilisorterna beskriver motivet kort, utan formuleringar om att sorten är bekräftad av odlaren. Detta ändrar bara texten i manifestet; bild-ID:n, exportfiler, vattenstämplar och bildhantering är oförändrade.

## Trädgårdsguider – bearbetade bilder 21 oktober 2026

Fem nya bilder till jord, täckodling och biologisk mångfald har exporterats genom samma skyddade arbetsprincip som övriga egna bilder: endast bearbetade och vattenstämplade WebP-filer i `web-images/`, manifestposter med tomt `source`, och bildvariantindex med befintlig vattenstämpel. Fotografiska användaroriginal har inte lagts i GitHub. Publicerade bildvarianter har anpassats till full-, kort-, huvud- och delningsformat. Dokumentationen innebär ingen ändring av kod i `scripts/images.mjs` eller CMS.

Bilder från odlingslotten och jordrullen är bearbetningar av egna foton, medan jordgenomskärningen och mångfaldsöversikten är pedagogiska illustrationer. Stubbmiljön är en digital bearbetning, inte en dokumentär registrering av arterna i bilden. Infografikens förenklade illustrationer används inte som artbestämningsbevis.

## Jordliv och kompost – illustrationer 22 oktober 2026

Två AI-genererade illustrationer har kopplats till fortsättningsartiklarna i PR #20: `jordliv-rot-mykorrhiza` till jordlivsartikeln och `kompost-tre-stadier` till kompostartikeln. De används som huvudbilder i naturligt fullformat, med bildtexter under bilden som anger deras illustrativa karaktär. Rotbilden skiljer mykorrhiza vid levande rötter från nedbrytning av dött material och är inte skalenlig. Kompostbilden visar tre ungefärliga stadier utan tidslöften.

Bildfälten och samtliga exporter använder befintlig struktur. Varje bild har åtta WebP-varianter: tre full-, två kort-, två stående huvud- och en delningsvariant. Artiklarna använder fullformatet; de stående beskärningarna lämpar sig inte för att läsa hela den breda illustrationens märkning. Inga mallar eller formatregler har ändrats.

De genererade PNG-originalen finns utanför repositoryt. Särskilda exportkopior har fått sin provisoriska inbyggda varumärkesmärkning borttagen för att undvika dubbel märkning; originalen bevaras. Den ordinarie exportfunktionen i `scripts/images.mjs` lägger därefter på webbplatsens befintliga vattenstämpel efter varje beskärning. Endast dessa metadatafria, vattenstämplade WebP-varianter lagras i repositoryt. Bildmanifestets publika `source` är tomt. Bild-ID:n, alt-texter och bildtexter följer befintligt CMS-schema; ingen ny uppladdningsväg eller bildhanteringsmetod har införts.


## Förtydligad jordlivsillustration – 22 oktober 2026

Efter Mickes granskning har `jordliv-rot-mykorrhiza` omarbetats: ett finare, förgrenat nät av svamptrådar visas över en större jordvolym utanför roten. Märkningen ”Svamptrådar (hyfer)” pekar på svamptrådarna i stället för en rot. Separat nedbrytning av dött material finns kvar. Färgerna är pedagogiska och bilden är inte skalenlig; detta framgår av bildtexten.

Befintligt bild-ID och befintlig exportfunktion behålls. De åtta vattenstämplade WebP-varianterna ersätts, och manifestets alt-text samt bildtext uppdateras. Den nya genererade PNG-bilden och den tidigare versionen bevaras utanför repositoryt. Inga ändringar av CMS, bildschema, vattenstämpelinställningar eller exportmetod.


## 2026-10-24 – Bild till Att odla med naturen

`odla-med-naturen` återanvänder bilden som är förankrad i slutet av filosofikapitlet i ”Arbetet om nyttodjur”. Dokumentets bildobjekt och placering kontrollerade före hämtning. Motivet visar ordnade grönsaksbäddar, blommande stråk, buskar och växthus. Den publiceras som AI-genererad illustration av en tänkt miljö, utan påstående att det är fotografi av egen odling eller dokumenterad odlingseffekt. Inga detaljer används för artbestämning.

Bildoriginalet hålls utanför repositoryt. Åtta WebP-varianter skapade med befintlig `processImages` och oförändrade vattenstämpelinställningar i separat exportkatalog; tidigare exporter bevarade. Bara metadatafria vattenstämplade exporter samt manifest/index införs. Samma bild används i artikel och automatiskt artikelkort; ingen bildgenerering eller ändring av bildhanteringen ingår.


## 2026-10-24 – Egna foton av skaftägg och bladluslejon, etapp 3

Mickes bifogade `6230.jpg` (ägg) och `1792825861124.jpeg` (larv) används som originalunderlag för `guldogonslanda-agg-foto` respektive `guldogonslanda-larv-foto`. Fotograf: Mikael Forsberg. Originalen hålls utanför det publika repositoryt.

Ett försök att justera ljus med bildverktyget gav ändrade små detaljer och underkändes. De AI-bearbetade versionerna används inte på webbplatsen och är inte identifikationsunderlag. Publicerade exporter kommer från användarens original, med enbart ordinarie webbexport: beskärning av kort/hero/delningsbild, förminskning, WebP och befintlig vattenstämpel efter beskärning. Ingen ljusändring införd. Artikeln visar 3:2-beskärningarna med länkar till hela webbversionen. Äggets hela skaft och larvens hela kropp/käkar finns kvar i visningen. Befintlig larvillustration finns kvar och nås som jämförelselänk; livscykeln behålls.

Kännetecken jämförda med UC IPM:s namngivna foton av skaftägg och larv i Green Lacewings. Referensbildernas bildtexter och motiv kontrollerade; inga externa referensfoton återpubliceras. Benämningen bladluslejon kontrollerad mot Lunds universitet, Fråga en biolog. Foton används på grupp-/livsstadienivå, utan påstående om säker artbestämning. Bildmanifest/index kompletterat med två egna foton och 16 exporter genom oförändrad processImages i separat exportkatalog.
