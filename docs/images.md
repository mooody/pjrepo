# Bilder och vattenstämpel

Första versionen har inga fotografier. Bildplatshållarna är illustrationer och inga original har laddats upp.

## Innan original laddas upp

Det enklaste CMS-flödet använder samma **privata GitHub-repository** för kod, innehåll och original. Kontrollera först under GitHub → Settings att `pjrepo` verkligen är privat. Ett offentligt repository skyddar inte original genom `.gitignore`. Om koden ska vara offentlig måste bildoriginal ligga i ett separat privat repo/skyddad byggkälla, och CMS-uppladdning till detta repo ska inte användas. Variabeln `IMAGE_SOURCE_DIR` kan peka byggningen mot en sådan katalog; checkout/åtkomst ordnas då separat.

CI stoppar bildbyggningen om manifestet innehåller bilder och repositoryt är offentligt. Detta är en extra kontroll; den kan inte göra en redan uppladdad originalfil privat.

## CMS-flöde i ett privat repo

1. Öppna Webbplatsinställningar → Bildbibliotek.
2. Lägg till ett unikt bild-ID, exempelvis `habanero-rod`, originalfil, alt-text, bildtext, fotograf, ägare och licens.
3. Egna bilder: välj "Företagets egen bild". Ange exempelvis licenstexten "Fri användning med bibehållen vattenstämpel". Tredjepartsbilder kräver dessutom en giltig licensadress.
4. Välj bild-ID i sidans bildfält eller i galleriet. Startsidan har ett eget huvudbildsfält.
5. Spara/granska/publicera. Originalet sparas under `private-images/`; endast `/media/bild-id.webp` hamnar i `dist/`.

## Lokalt

Placera original under `private-images/` och lägg till en post i `src/data/images.json`:

```json
{
  "images": [{
    "id": "habanero-rod",
    "source": "private-images/habanero.jpg",
    "alt": "En mogen röd habanero på plantan",
    "caption": "Bild från odlingen",
    "photographer": "Ditt namn",
    "ownership": "own",
    "license": "Fri användning med bibehållen vattenstämpel"
  }]
}
```

Original är git-ignorerade lokalt. Lägg dem aldrig till i ett offentligt repo. I ett bekräftat privat repo kan du explicit lägga till originalet med `git add -f private-images/habanero.jpg`, eller använda Decap. GitHub Actions måste kunna läsa originalen för att bygga bilderna.

## Bearbetning

`scripts/images.mjs` orienterar efter EXIF, begränsar längsta sidan till 1600 pixlar, tar bort metadata och skriver WebP. Egna bilder får en skalad textstämpel längst ned till höger. Text och opacitet finns i CMS-inställningarna. Valfri transparent logotyp pekar på en fil i den skyddade originalkatalogen och får samma opacitet. Tredjepartsbilder får ingen företagsstämpel; licensen och fotografen visas vid bilden.

Gamla genererade bilder rensas före varje bildbyggning. Originalmappen ligger utanför Astros publika katalog och kopieras aldrig till webbplatsen. Skyddade originalsökvägar och symlänkar utanför katalogen stoppas. En originalfil som redan finns i ett offentligt GitHub-repo är fortfarande offentlig även om den senare tas bort; välj därför privat lagring innan uppladdning.

Efter byte av vattenstämpel behöver hela webbplatsen byggas om. De tillgängliga galleri- och bildfälten använder bearbetade bilder. Inline-Markdown ska referera `/media/id.webp`, aldrig `private-images`.
