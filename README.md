# Trädgårdsdrömmar

> **Viktigt för alla som arbetar i repositoryt:** Läs [projektreglerna](docs/PROJECT_RULES.md) innan ändringar. Kodassistenter börjar i [AGENTS.md](AGENTS.md). CMS-strukturen får inte byggas om utan godkännande, och produktion publiceras alltid separat och manuellt. Efter varje ändringsuppdrag: granska reglerna och uppdatera [ändringsloggen](docs/CHANGELOG.md) samt vid serverändringar [serverhandboken](docs/SERVER_OPERATIONS.md).

En svensk informationswebbplats för småskalig chiliodling och biologisk mångfald. Astro genererar statiska filer; VPS:en behöver ingen Node-process eller databas. Ingen webbshop eller spårning ingår.

## Kom igång

Installera Node.js 24 och Git. I projektkatalogen:

```sh
npm ci
npm run dev
```

Öppna `http://localhost:4321`. `npm run dev` förbereder även bilder och lokala CMS-filer. Starta om utvecklingsservern efter ändringar i bildbibliotek eller vattenstämpel.

```sh
npm run check        # TypeScript och innehållsscheman
npm run build        # Validering, CMS-filer, bilder och statisk webbplats i dist/
npm run preview      # Förhandsvisa produktionsbygget
npm test             # Bildbehandling, CMS och byggda länkar; bygg först
npx playwright install chromium
npm run verify       # Alla ovanstående kontroller inklusive webbläsartester
```

På ett system med befintlig Chromium kan `CHROMIUM_PATH` ange dess sökväg. I den här molnmiljön kördes verifieringen med `ASTRO_TELEMETRY_DISABLED=1 CHROMIUM_PATH=/usr/bin/chromium npm run verify`.

## Vad finns i första versionen?

- Startsida, biologisk odling, faktabibliotek, blogg, projekt, om, kontakt och bildvillkor.
- Fem chilisorter, tre grupper av nyttodjur, bladlöss, fyra odlingsmetoder, fyra projekt och två exempelartiklar.
- Sökning, taggfilter och mobilmeny med stöd för tangentbord.
- Åtta Markdown-samlingar med schema, källor, relaterade länkar, utkast och uppgiftstyp.
- Decap på `/admin/`, svenska standardformulär och GitHub editorial workflow.
- CMS-inställningar för meny, namn, slogan, färger, logotyp, startsida och bilder.
- Inbränd vattenstämpel på egna fotografier, WebP och skydd mot bildvägar utanför originalkatalogen.
- SEO-metadata, sitemap, robots.txt och statiskt 404-innehåll.
- GitHub Actions med tester och byggartefakt; VPS-publicering är avstängd från början.

Bildytorna är tydligt märkta illustrationer. Chiliuppgifter och artiklar markerade som exempel behöver redaktionell granskning före skarp publicering. Inga personliga odlingsresultat eller produktlöften har hittats på.

## Redigera innehåll

Direkt i GitHub: redigera Markdown i `src/content/` eller JSON i `src/data/`, helst genom en pull request. Frontmatter kan skrivas som vanlig YAML; den medföljande JSON-formen är också giltig YAML. `draft: true` utesluter en text från webbplatsen. För publicering ska `draft` vara `false` och ändringen sammanfogas till `main`.

I Decap: öppna `/admin/` efter [OAuth-konfigurationen](docs/oauth.md), logga in med GitHub och välj samling. Editorial workflow skapar en arbetsgren/pull request som kan granskas. Att markera "ready" i CMS ändrar inte automatiskt fältet `draft`; slå av det före publicering. Aktivera branch protection för `main` om du vill kräva granskning innan merge.

Bilder väljs från bildbiblioteket med bild-ID. Fler bilder läggs till via gallerifältet. Markdown-redigeraren laddar inte upp original direkt i sidtexten. För inline-bilder kan en redan bearbetad bild användas som `![Alt-text](/media/bild-id.webp)`.

## Filstruktur

| Katalog/fil | Syfte |
| --- | --- |
| `src/pages/` | Startsida, innehållsrutter, index och SEO |
| `src/components/`, `src/layouts/` | Små återanvändbara komponenter och sidram |
| `src/styles/global.css` | Responsiv design och CSS-variabler |
| `src/content/` | Markdown för sidor, artiklar och faktainnehåll |
| `src/content.config.ts` | Innehållsschema |
| `src/data/` | Webbplatsinställningar, startsida och bildmanifest |
| `public/admin/config.yml` | Decaps standardkonfiguration |
| `private-images/` | Skyddade original; kopieras aldrig till dist |
| `scripts/` | Validering, bildbearbetning, CMS-filer och publicering |
| `tests/` | Node-tester och webbläsartester |
| `docs/` | CMS, bilder och drift |

## Återstående kontosteg

1. Ange riktig domän i `src/data/settings.json` och `public/admin/config.yml`. `https://example.com` är en platshållare; den används också i sitemap och canonical tills den ändras.
2. Fyll i e-post och eventuella sociala länkar.
3. Konfigurera [Decap/GitHub OAuth](docs/oauth.md). GitHub-åtkomsten för en kodassistent ersätter inte CMS-inloggningen.
4. Lägg till riktiga fotografier när de finns. Läs [bildguiden](docs/images.md) innan original laddas upp.
5. Publicera `dist/` enligt [Debian-guiden](docs/deployment.md). Ingen produktionsserver har ändrats.

## Underhåll

Versioner och lockfil är incheckade. Kör `npm outdated`, granska ändringsloggar och uppdatera ett paket i taget med `npm install --save-exact paket@version`. Kör `npm run verify` och `npm audit` efteråt. Checka in både `package.json` och `package-lock.json`.

Decaps officiella paket har äldre transitiva beroenden och npm kan visa peer-varningar samt audit-anmärkningar. CMS används endast av betrodda redaktörer; dess JavaScript finns enbart under `/admin/`. Det levereras som paketets färdiga bundle, så npm-overrides av underberoenden ändrar inte säkert den levererade CMS-koden. Ändra inte externa pakets källkod eller använd `npm audit fix --force` blint. Se [verifieringsrapporten](docs/verification.md).

Projektets egen kod använder MIT-licens. Beroenden behåller sina respektive licenser. Redaktionellt innehåll och fotografier har egna villkor; MIT-licensen överför inte rättigheter till framtida fotografier.
