# Skyddade original och offentliga webbexporter

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
