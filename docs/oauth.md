# Decap-inloggning med GitHub

Du behöver inget Decap-konto. Du använder ditt GitHub-konto med skrivrättighet till `mooody/pjrepo`. Inloggningen kräver en separat OAuth-förmedlare eftersom en statisk webbplats inte kan hålla en klienthemlighet.

## Vald lösning

[Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth) är en liten befintlig OAuth-förmedlare, dokumenterat kompatibel med Decap/Netlify CMS. Vi använder endast autentiseringsdelen; CMS är fortfarande Decap. Den kan köras på Cloudflare Workers fria nivå medan hela webbplatsen ligger på din VPS. Ingen egen inloggningskod eller administrativ backend byggs. Cloudflare-konto behövs; villkor och fria kvoter bestäms av leverantören.

Referenser: [Decaps externa OAuth-klienter](https://decapcms.org/docs/external-oauth-clients/), [GitHub-backend](https://decapcms.org/docs/github-backend/) och [förmedlarens installationsguide](https://github.com/sveltia/sveltia-cms-auth#how-to-use-it). Läs aktuell guide när installationen görs.

## Manuella steg

1. Använd upstream-projektets "Deploy to Cloudflare Workers"-knapp. Välj din egen Worker-instans. Kopiera URL:en, till exempel `https://sveltia-cms-auth.ditt-konto.workers.dev`.
2. Öppna [GitHubs OAuth Apps](https://github.com/settings/applications/new). Namn: `Trädgårdsdrömmar CMS`. Homepage: din webbplats. Callback: `https://din-worker.workers.dev/callback`.
3. Skapa Client Secret. I Workers inställningar lägger du `GITHUB_CLIENT_ID` och `GITHUB_CLIENT_SECRET` som hemligheter. Värdena ska aldrig in i detta repo, frontend eller offentliga filer.
4. Sätt `ALLOWED_DOMAINS` till din exakta webbplatsdomän, och eventuell www-variant. Använd inte ett öppet `*`. För lokala tester kan `localhost` läggas till tillfälligt.
5. I `public/admin/config.yml` ändrar du `backend.base_url` från `https://oauth.example.com` till din Worker-URL. Behåll `auth_endpoint: auth`, `repo: mooody/pjrepo` och `branch: main`. Uppdatera `site_url` och `display_url` till webbplatsdomänen.
6. Bygg/publicera webbplatsen och öppna `/admin/`. Klicka GitHub-inloggning och godkänn OAuth-appen. Kontrollera att rätt GitHub-konto har skrivrättighet till repot. Privat repo kan kräva organisationsgodkännande.
7. Skapa ett utkast, spara, kontrollera arbetsgren/pull request i GitHub och granska. För publicering: `draft: false`, publicera/merge till `main` och kontrollera byggningen i Actions.

## Vad är testat?

Den lokala Decap-appen laddar konfigurationen och visar GitHub-inloggningen i webbläsare. OAuth-roundtrip, tokenutfärdande och skrivning genom CMS kan inte testas före dessa kontosteg. Klicka inte inloggning med platshållaradressen och förvänta dig att den fungerar.

Den publika webbplatsen fortsätter fungera om OAuth, CMS eller GitHub ligger nere. OAuth behövs endast när en redaktör vill logga in.
