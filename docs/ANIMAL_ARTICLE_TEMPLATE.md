# Redaktionell mall – djurartiklar (förslag 2026-10-24)

**Status:** redaktionell arbetsmodell i PR, inte CMS-schema, ny samling eller ny publiceringsmetod. Alla adresser ligger kvar under `/nyttodjur/` respektive `/skadedjur/`. Tre olika läsarflöden används. Rubriker får anpassas, flyttas eller kompletteras om djurets biologi kräver det. Ingen sida ska fyllas med upprepade standardfraser för att följa mallen.

## Gemensamt för alla tre grupper

- **Rubrik och ingress:** en kort `description` (ca 1–2 meningar) visas av artikelmallen direkt under H1 och används som sidbeskrivning. **Skriv inte samma ingress igen som första brödtextstycke.** Brödtext kan däremot börja med ett *nytt* konkret exempel eller en relevant skillnad.
- **Kännetecken:** kortfattat och praktiskt. Två till fem avgörande drag, var djuret eller skadan syns och vilka förväxlingar som är vanliga. Fördjupade färger, instarlängder och mått flyttas till bildtext/livscykel om de inte är avgörande för identifiering. Illustration är inte bevis för artbestämning.
- **Miljö och årstid:** förklara var och när djuret finns samt förutsättningar för föda, skydd, reproduktion och vinterstadium. Förebyggande skötsel placeras i detta avsnitt, inte på två ställen.
- **Samspel:** koppla till relevanta nyttodjur/skadegörare; länka bara till befintliga sidor. Beskriv inte varje möjlig relation som etablerad.
- **Livscykel:** förenklad huvudcykel med tydligt markerad exempelart och eventuella försöksvillkor; aldrig hitta på saknade stadietider. Vuxenliv räknas inte till ägg–vuxen-tiden. En faktagranskad, förenklad illustration placeras intill förklaringen när en skyddad webbexport finns.
- **Källor, granskning och relaterade länkar** hanteras av befintlig sidmall och befintliga metadatafält. Undvik att upprepa dem som samma information i brödtexten.
- **Bilder:** en relevant bild vid identifiering när sådan finns; livscykelbild vid cykelavsnittet. Källa, korrekt alt-text, begränsning och AI-illustrationsstatus ska framgå. Endast redan skyddade och vattenstämplade webbexporter får refereras i det publika repot.
- **Specialavsnitt är välkomna:** till exempel hyperparasitoider, sort-/värdväxling, parasitstekelmumier, myror, vinterdiapaus, virusöverföring, skördens kvalitet eller diagnostik med mikroskop.

## 1. Skadedjur – besluta vad som ska göras

1. **Så känner du igen angreppet** – kännetecken hos djuret och hur man skiljer det från liknande problem.
2. **Skador och spår på växten** – skademekanism, typiska växtdelar, hur nya skador bedöms.
3. **Så undersöker och begränsar du angreppet** – rimlig prioritering och praktiska, skonsamma första steg; förebyggande hänvisas till miljöavsnittet.
4. **Naturliga fiender och samspel** – vilka stadier angrips av vilka nyttodjur och hur dessa skyddas.
5. **Miljö, riskperioder och övervintring** – värdväxter, årstid, temperatur, krukväxter/växthus, spridningsvägar och förebyggande.
6. **Livscykel och utveckling** – förenklad cykel med en art som exempel och tydliga begränsningar.
7. **Vid behov:** sjukdomssymptom, karantän eller speciella odlingsråd.

## 2. Naturligt förekommande nyttodjur – skapa en fungerande livsmiljö

1. **Så känner du igen dem** – framför allt stadiet som hjälper; undvik katalogmässiga färg- och måttbeskrivningar.
2. **Roll i odlingen** – byten, pollen/nectar och eventuella begränsningar.
3. **Miljö genom säsongen och övervintring** – konkret: vårens skydd och tidiga födokällor, sommarens blomning och bytesdjur, höstens ostörda miljöer, var övervintring sker beroende på art.
4. **Samspel med andra djur** – konkurrens, myror, parasitism eller födoval där det tillför något.
5. **Livscykel och utveckling** – begriplig huvudcykel; tidsstudier endast om säkert belagda.
6. **Vid fynd** *(bara vid verkligt behov)* – hur man undviker att avlägsna ägg/larver/puppor. För markdjur som jordlöpare hör generella habitatåtgärder hemma i miljöavsnittet, inte under ”Börja här vid ett fynd”.
7. **Vid behov:** säker artbestämning och små pedagogiska specialavsnitt.

## 3. Nyttodjur för biologisk bekämpning – välja och följa en insats

1. **Målskadegörare och vilka stadier som angrips** – avgränsa artens föda, inte generell ”roll i odlingen”.
2. **När metoden passar** – vilket angreppsstadium och vilken odlingsmiljö som är relevant; när andra åtgärder behövs.
3. **Förutsättningar vid utsättning** – temperatur, fukt, substrat, pollentillgång, tidigare behandlingar och krav enligt leverantören; ingen generell garanti.
4. **Så följer du resultatet** – observera skadegörare, nyttodjur och ny skada, inte bara flygande vuxna på klisterskivor.
5. **Samspel och kombinationer** – val mellan/med andra arter; möjliga begränsningar.
6. **Livscykel och utveckling** – relevant för hur snabbt insatsen kan verka, med tydliga villkor; övervintring behandlas här eller under förutsättningar, inte som ett generellt svenskt fältfenomen.
7. **Identifiering och bilder** – några viktiga kännetecken om djuren kan ses i odlingen; mikroskopi när den krävs. Exakta instarmått är oftast underordnade behandlingsvalet.
8. **Vid behov:** värdanpassning, parasitismens typ, infektionsförlopp hos nematoder eller diapause.

## Nuvarande innehållsläge

Alla 13 nyttodjursartiklar har redan kategori i **befintligt** `category`-fält: åtta ”Nyttodjur” och fem ”Nyttodjur – biologisk bekämpning”. Under `/nyttodjur/` kan dessa visas som två läsaravsnitt med länkar till samma oförändrade URL:er, utan att ändra CMS-strukturen. Det finns 15 skadedjurssidor, inklusive den generella bladlusguiden. Hänvisningar till bilder från Drive görs inte till publika bild-URL:er förrän de har genomgått befintlig skyddad export.
