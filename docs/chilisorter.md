# Chilisorter – redaktionell mall och källbedömning

Beslutad med användaren 20–21 oktober 2026. Genomförd i arbetsgren 21 oktober; merge och publicering är separata steg.

## Sidornas ordning

1. Sortnamn, kort ingress och befintligt vattenstämplat foto.
2. Faktaruta med **Art**, **Ungefärlig styrka** (SHU-intervall) och **Utseende**. Saknas underbyggt intervall visas `SHU-intervall saknas`; leverantörens tiogradiga skala räknas inte om till SHU.
3. Kort markering om hetta/karaktär, exempelvis ”Extremt het – en liten bit räcker långt.” Inga Scovillesiffror upprepas i denna markering.
4. En individuell rubrik och inledning som berättar om just sorten. Verifierad historik får vävas in, men inget obligatoriskt historikavsnitt.
5. **Smak och karaktär**.
6. **Odling i Sverige**: tidighet, mognad, friland kontra skyddad odling, storlek och stöd där relevant. Gemensamma så- och ljusråd länkas till odlingsguiden.
7. **Användning**: lämpliga användningsområden; ingen återkommande redovisning av egna tester eller avsikter.
8. Källor och granskningsdatum längst ned.

Skriv direkt om sorten utan återkommande ”leverantören beskriver”. Allmän sortkunskap får inte omvandlas till påhittade egna provsmakningar. Bildtexter ska inte innehålla ”bekräftad av odlaren” eller motsvarande. Smakprofil, ursprung och odlingsråd hör inte hemma i den övre faktarutan för chili.

## Källjämförelse av styrka, 21 oktober 2026

Intervallen är avrundad läsarorientering för färsk chili, inte ett statistiskt beräknat min/max eller garanti för varje frukt. Medelvärden och rekordtoppar blandas inte till ett påstått försöksintervall. Källorna länkas från respektive sortsida.

| Sort | Presentation | Underlag och bedömning |
| --- | --- | --- |
| Habanero Red | 100 000–350 000 SHU | Chilli Hills, Budget Seeds och Speciality Seeds anger 100 000–350 000. Rutgers anger 150 000–350 000 för habanerotyper. Bredare vanligt sortintervall används; inte specifik underlinje som Caribbean Red. |
| Habanero Lemon | 100 000–350 000 SHU | Piccolo 100 000–300 000; Hometown Seeds 150 000–325 000; Fröbanken 200 000–350 000; Sow Seeds cirka 300 000. Avrundad sammanfattning av varierande sortbeskrivningar. |
| Habanero Chocolate | 300 000–700 000 SHU | Baker Creek cirka 300 000; True Leaf Market cirka 435 000–577 000; NMSU listar ett testvärde på 700 000. Brett ungefärligt spann, inte påstått typintervall från en gemensam studie. Tyler Farms ger lägre värden (100 000–350 000), vilket visar variation och osäkerhet i handelsnamnet. |
| Red Savina | 350 000–580 000 SHU | Renee’s Garden 380 000–500 000; Tyler Farms 350 000–577 000; Michigan Heirlooms 350 000–580 000. Avrundat vanligt handelsintervall. Lägre försöksvärden förekommer; detta är ingen nedre biologisk gräns. |
| Bhut Jolokia Red | 850 000–1 050 000 SHU | NMSU cirka 1 miljon; Bosland och Baral (2007) omkring 1 001 304; SpiceQuest och Mr Naga återger det vanliga intervallet 855 000–1 041 427. Avrundat. SpiceQuest redovisar även en svagare egen lot – enskilda skördar kan ligga utanför. |
| Carolina Reaper | 1 400 000–2 200 000 SHU | Garden Hoard och Tyler Farms anger detta intervall. PepperHead anger toppar över 2,2 miljoner och medel kring 1,64 miljoner; Guinness anger medel kring 1,64 miljoner. Webbtexten använder det vanliga ungefärliga intervallet utan att kalla maxvärdet medelvärde eller dagens världsrekord. |
| Jalapeño Leon | SHU-intervall saknas | ReinSaat och Bioverita kontrollerade. ReinSaat anger 4–5/10, inte SHU. Generiska jalapeñovärden överförs inte till Leon. |
| Pequeña Amarilla | SHU-intervall saknas | ReinSaat och Fröbanken kontrollerade. ReinSaat anger 6/10. Andra Guindilla Amarilla-namn kan avse annat frömaterial. |
| Sipka Zitronen | SHU-intervall saknas | Culinaris, Fröbanken och Beetfreunde ger 6/10; en fransk plantsäljare anger 10 000–12 000 SHU utan tillräcklig bekräftelse. Inget numeriskt intervall publiceras ännu. |
| Okrasny Zvonek Red | SHU-intervall saknas | MoravoSeed anger baccatum och högväxande planta. PNOS/Legutko och återförsäljare anger ofta 200 000 SHU men blandar baccatum, annuum och chinense. Inget robust intervall för det egna sortmaterialet är fastställt. |

Tre källnamn betyder inte alltid tre oberoende mätningar. När flera återger samma uppgift räknas det som samstämmig beskrivning, inte nya laboratorieresultat. Kvarstående fyra intervall ska bara fyllas när underlaget räcker; använd inte gissade siffror.

## Historik och Okrasny

- Red Savina: Renee’s Garden namnger Frank Garcia vid GNS Spices som förädlare. Det omtalade fyndåret 1989 publiceras inte utan starkare ursprungsunderlag.
- Carolina Reaper: Ed Currie och första Guinnessrekordet 2013 bekräftas av Guinness. Rekordåret anges inte som året då förädlingen började eller slutfördes.
- Okrasny: MoravoSeeds katalog 2026–2027 (tryckt sida 43, PDF-sida 45) beskriver högväxande baccatum med hängande klockfrukter. Detta ersätter tidigare osäkra kompakthetsuppgifter.
- Påståendet om generell sjukdomsresistens hos Garden Seeds Market saknar specificerad sjukdom och oberoende underlag. Det publiceras inte. Campanula-/blåklocksträffar räknas inte som underlag för Capsicum.

## Teknisk avgränsning

Befintliga innehållsfält och bild-ID:n används. Presentationen i `src/pages/[section]/[id].astro` begränsar endast chilisorternas faktaruta till tre rader; andra kunskapssidors extrafakta behålls. Inga CMS-, schema-, OAuth-, bildexport- eller publiceringsflöden ändras.
