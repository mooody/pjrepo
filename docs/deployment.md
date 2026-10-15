# Publicera Trädgårdsdrömmar på Debian 13

**Arkitektur (15 oktober 2026):** GitHub är källan till koden och bygger Astro-sajten med Node.js 24. Endast färdiga statiska filer från `dist/` skickas via SSH/rsync till STRATO-VPS. Nginx serverar `/var/www/tradgardsdrommar.se/public/`. VPS:en behöver **inte** köra Node.js eller innehålla Git-repot.

Det här skiljer sig från det tidigare förslaget med `releases/` och `current`-symlänk. För denna lilla statiska webbplats har vi valt ett enklare flöde utan sparade releaser på servern. Git-historiken i sig ersätter dock inte en riktig backup eller en omedelbar rollback av färdigbyggda filer.

## Befintlig server

- Debian 13, Nginx och HTTPS med Let's Encrypt.
- Domän: `tradgardsdrommar.se` och `www.tradgardsdrommar.se`.
- Dokumentrot för Nginx: `/var/www/tradgardsdrommar.se/public`.
- Brandvägg UFW tillåter SSH (22), HTTP (80), HTTPS (443).

Nginx ska ha `root /var/www/tradgardsdrommar.se/public;`, och `nginx -t` ska lyckas. `/var/www/tradgardsdrommar.se/source` är en äldre lokal klon och behövs inte för den valda publiceringen.

## GitHub Actions: bygga och publicera

Workflowen `.github/workflows/verify.yml` bygger och testar med Node.js 24 och laddar upp `dist/` som artefakten `website`. Den kör automatiskt vid ändringar i `main`.

Publiceringsjobbet är spärrat tills repository-variabeln `DEPLOY_ENABLED` sätts till `true` och produktionsmiljön är förberedd.

### Förbered SSH på VPS

Rekommenderat: skapa ett separat Linuxkonto utan sudo för deploy, till exempel `td-deploy`. Använd en *egen* Ed25519-nyckel för GitHub Actions, inte den privata nyckeln från Macens ordinarie SSH-inloggning.

På Debian (som `micke`):

```sh
sudo apt update
sudo apt install -y rsync
sudo adduser --disabled-password --gecos "" td-deploy
sudo install -d -m 700 -o td-deploy -g td-deploy /home/td-deploy/.ssh
```

Placera sedan **endast den publika** nyckeln från det dedikerade nyckelparet i `/home/td-deploy/.ssh/authorized_keys`. Sätt `chown td-deploy:td-deploy`, rättigheter 600 på authorized_keys, och se till att användaren kan skriva i Nginx-dokumentroten:

```sh
sudo chown -R td-deploy:www-data /var/www/tradgardsdrommar.se/public
sudo chmod 755 /var/www/tradgardsdrommar.se/public
```

Om `public/` redan innehåller en fungerande testsida bör den lämnas kvar tills hela kedjan är verifierad.

### Skapa dedikerad nyckel för deploy

På Mac:

```sh
ssh-keygen -t ed25519 -f ~/.ssh/tradgardsdrommar-deploy -C "github-actions-tradgardsdrommar"
```

Lägg endast `.pub`-innehållet i serverns `authorized_keys`; spara den **privata** nyckelns innehåll i GitHub Actions Secret `DEPLOY_SSH_KEY` via GitHubs inställningar. Skicka den aldrig i chatt och checka aldrig in den i Git.

Verifiera serverns SSH-hostnyckel via servern, till exempel genom fingeravtrycket från:

```sh
sudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

Hämta sedan `known_hosts`-raden från en betrodd dator med `ssh-keyscan -t ed25519 217.154.118.103`, kontrollera fingeravtrycket och lägg den verifierade raden i GitHub Secret `DEPLOY_KNOWN_HOSTS`. Hoppa inte över hostnyckelkontrollen.

### GitHub Repository Settings → Secrets and variables → Actions

Variabler:

| Namn | Värde |
| --- | --- |
| `DEPLOY_HOST` | `217.154.118.103` |
| `DEPLOY_USER` | `td-deploy` |
| `DEPLOY_PATH` | `/var/www/tradgardsdrommar.se/public` |
| `DEPLOY_ENABLED` | `true`, **först när allt är testat** |

Secrets:

| Namn | Innehåll |
| --- | --- |
| `DEPLOY_SSH_KEY` | Privat deploy-nyckel skapad för GitHub Actions |
| `DEPLOY_KNOWN_HOSTS` | Verifierad hostnyckelrad för VPS:en |

Konfigurera gärna miljön `production` för att kräva godkännande före publicering. Workflowen har redan `environment: production`. Lägg aldrig tokens eller lösenord i webbplatskoden.

## Hur publicering går till

1. Ändra innehåll/kod i GitHub, slå ihop till `main`.
2. Workflowen kör tester och `npm run build`.
3. Artefakten `website` innehåller `dist/`.
4. Om `DEPLOY_ENABLED=true`, skickas endast `dist/` till Nginx dokumentrot via `scripts/deploy.sh`.
5. Kontrollera `https://www.tradgardsdrommar.se/` och Nginx-loggarna.

Skriptet tillåter av säkerhetsskäl **bara** `DEPLOY_PATH=/var/www/tradgardsdrommar.se/public`. Det testar att `dist/index.html` finns, att SSH-anslutningen fungerar och att målkatalogen redan finns och är skrivbar. Överföring görs med rsync `--delete --delay-updates`. Detta är **inte helt atomärt**; vid stora uppdateringar kan webbplatsen kortvarigt visa en blandning av nya och gamla filer. Om det blir ett problem kan vi senare återgå till versionerade releaser.

`/.well-known/` på servern bevaras vid rsync för eventuell certifikat-/domänverifiering. Övriga filer i public/ som inte längre ingår i `dist/` kan tas bort av rsync.

## Gör repositoryt privat efter verifierad publicering

`mooody/pjrepo` används för tillfället även av GitHub Pages via `.github/workflows/pages-preview.yml`. När STRATO-publiceringen fungerar:

1. Avaktivera GitHub Pages-previewen (och dess workflow) om den inte längre behövs.
2. Ändra `pjrepo` till **Private** under GitHub Settings → General → Danger Zone.
3. Kontrollera att GitHub Actions fortfarande kan bygga och publicera till VPS:en.

GitHub Free tillåter obegränsat antal privata repositories, så Weetech kan behålla sitt separata privata repo.

## CMS

Decap CMS ligger statiskt på `/admin/` men kräver en separat OAuth-förmedlare för GitHub-inloggning. Se `docs/oauth.md`. Publicera inte OAuth-hemligheter eller API-token i Git.

## Kontroll och felsökning

```sh
sudo nginx -t
sudo systemctl status nginx
sudo ufw status
curl -I https://www.tradgardsdrommar.se
sudo tail -n 50 /var/log/nginx/tradgardsdrommar.error.log
```

Om deploy misslyckas: läs motsvarande GitHub Actions-jobb, kontrollera `DEPLOY_ENABLED`, variabler/secrets, serverns hostnyckel, `rsync` på VPS:en samt skrivrättigheter på `public/`.

Backup är medvetet uppskjuten tills Trädgårdsdrömmar och Weetech är i drift. Kom ihåg att GitHub-historik inte ersätter backup av serverinställningar, privata bildoriginal, CMS-hemligheter eller databaser.
