# Publicera på Debian 13

Inga serverändringar har gjorts av kodassistenten. GitHub Actions bygger och testar; automatisk VPS-publicering är avstängd från början. VPS:en behöver endast Nginx, SSH, rsync och vid behov Certbot. Webbplatsen kräver ingen Node.js, databas eller CMS-process där.

## Förbered domän och bygg

Ange din domän i `src/data/settings.json` (`url`) och `public/admin/config.yml`. `SITE_URL` kan användas som byggvariabel, men den normala källan är CMS-inställningen. Uppdatera kontaktuppgifter och granska exempeltexterna.

```sh
npm ci
npm run build
```

Publicera innehållet i `dist/`. Kopiera inte projektkatalogen, `private-images/` eller `node_modules/` till webbservern.

## Server, som du själv konfigurerar

Exempel på katalogstruktur:

```text
/var/www/tradgardsdrommar/
  releases/
    20261013-1/
    20261014-1/
  current -> releases/20261014-1
```

Skapa en separat SSH-användare med skrivrätt till den här katalogen och utan behov av sudo för publicering. Installera Nginx och rsync. Anpassa `docs/nginx.conf` med riktig domän och katalog, lägg den under `/etc/nginx/sites-available/`, aktivera och kör `nginx -t` innan reload. Domänens DNS ska peka på VPS:en.

För HTTPS: installera `certbot` och `python3-certbot-nginx`, kör `sudo certbot --nginx -d din-domän.se` och kontrollera `sudo certbot renew --dry-run`. Öppna HTTP/HTTPS i serverns brandvägg. Konfigurationen i repot är en HTTP-grund som Certbot kompletterar.

## Manuell publicering

Skapa en ny releasekatalog, överför `dist/` med rsync och byt `current` först när alla filer finns på plats. `scripts/deploy.sh` kan användas från din dator:

```sh
DEPLOY_HOST=din-server.se DEPLOY_USER=deploy \
DEPLOY_PATH=/var/www/tradgardsdrommar RELEASE_ID=20261013-1 \
bash scripts/deploy.sh
```

SSH-nyckel och verifierad host key ska redan vara konfigurerade på datorn. Skriptet accepterar ett enkelt värdnamn, användarnamn och sökväg under `/var/www/`. Symlink-bytet görs atomärt efter lyckad överföring.

## Valfri GitHub Actions-publicering

Byggjobbet kör automatiskt på `main` och pull requests. Den färdiga webbplatsen finns som artefakten `website` i Actions. Ladda ner, packa upp och publicera den manuellt om du vill.

För automatisk överföring behöver du själv skapa GitHub Environment `production` och följande inställningar. Lägg gärna till environment approval och branch protection.

| Typ | Namn | Värde |
| --- | --- | --- |
| Variable | `DEPLOY_HOST` | VPS-domän/IP |
| Variable | `DEPLOY_USER` | Separat publiceringsanvändare |
| Variable | `DEPLOY_PATH` | `/var/www/tradgardsdrommar` |
| Secret | `DEPLOY_SSH_KEY` | Privat SSH-nyckel för publicering |
| Secret | `DEPLOY_KNOWN_HOSTS` | Verifierad SSH-hostnyckelrad |
| Repository variable | `DEPLOY_ENABLED` | `true` när du vill aktivera överföringen |

Verifiera serverns hostnyckelfingeravtryck via en betrodd kanal. Flödet använder aldrig `StrictHostKeyChecking=no`. Sätt inte `DEPLOY_ENABLED=true` innan servern är förberedd. När variabeln saknas eller är `false` sker endast byggning och tester.

## Återställning och backup

Återställ `current` till en tidigare komplett release med en temporär symlink och atomärt `mv -Tf`. Nginx behöver inte startas om när symlänken byts. Behåll några releaser och rensa äldre manuellt efter kontroll.

Säkerhetskopiera GitHub-repositoryt inklusive Git-historik, privata bildoriginal, Nginx-konfiguration och åtkomstkonfiguration. Förvara hemligheter i en separat säker lösenordshanterare/backup; aldrig i Git. Testa återställning genom en ny checkout och byggning. Om GitHub eller CMS är nere fortsätter Nginx att visa senast publicerade statiska filer.
