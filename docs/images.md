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
