import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('startsida på dator: navigation, tillgänglighet och layout', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Chili att odla',
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole('navigation').getByRole('link', { name: 'Chili', exact: true }).click();
  await expect(page).toHaveURL(/\/chili\/$/);
  await page.getByRole('main').getByRole('link', { name: /Chilisorter/ }).click();
  await expect(page).toHaveURL(/chilisorter/);
});
test('mobilmeny går att öppna, använda och stänga', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Meny' });
  await expect(menu).toBeVisible();
  await expect(page.getByRole('navigation')).toBeHidden();
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Vår historia', exact: true })
    .click();
  await expect(page).toHaveURL(/om/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test('sökning och ämnesfilter visar rätt sorter och tomt resultat', async ({
  page,
}) => {
  await page.goto('/chilisorter/');
  await page.getByRole('searchbox').fill('ghost');
  await expect(page.locator('.search-entry:visible')).toHaveCount(1);
  await expect(page.getByRole('status')).toHaveText('1 träffar');
  await page.getByRole('searchbox').fill('');
  await page.getByLabel('Filtrera efter ämne').selectOption('Capsicum chinense');
  await expect(page.locator('.search-entry:visible')).toHaveCount(6);
  await page.getByRole('searchbox').fill('finnsinte');
  await expect(page.getByText('Inga träffar.')).toBeVisible();
});
test('faktasida är tillgänglig och visar källor', async ({ page }) => {
  await page.goto('/chilisorter/jalapeno-leon/');
  await expect(
    page.getByRole('heading', { name: 'Källor och granskning' }),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test('alla chilisorter har samma läsordning och tre grundfakta', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const slug of [
    'habanero', 'habanero-lemon', 'chocolate-habanero', 'red-savina',
    'ghost-pepper', 'carolina-reaper', 'jalapeno-leon', 'pequena-amarilla',
    'sipka-zitronen', 'okrasny-zvonek-red',
  ]) {
    await page.goto(`/chilisorter/${slug}/`);
    await expect(page.locator('.facts dt')).toHaveText([
      'Art', 'Ungefärlig styrka', 'Utseende',
    ]);
    const heat = page.locator('.facts dd').nth(1);
    await expect(heat).toContainText('SHU');
    if (['jalapeno-leon', 'pequena-amarilla', 'sipka-zitronen', 'okrasny-zvonek-red'].includes(slug)) {
      await expect(heat).toHaveText('SHU-intervall saknas');
    } else {
      await expect(heat).toHaveText(/Cirka .+–.+ SHU/);
    }
    await expect(page.locator('.prose h2')).toHaveCount(4);
    await expect(page.locator('.prose h2').nth(1)).toHaveText('Smak och karaktär');
    await expect(page.locator('.prose h2').nth(2)).toHaveText('Odling i Sverige');
    await expect(page.locator('.prose h2').nth(3)).toHaveText('Användning');
    await expect(page.locator('article > .notice')).not.toContainText('SHU');
    await expect(page.locator('article')).not.toContainText('bekräftad av odlaren');
    await expect(page.getByRole('heading', { name: 'Källor och granskning' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test('trädgårdsguiderna visas under Livet i trädgården', async ({ page }) => {
  await page.goto('/biologisk-odling/');
  await expect(page.getByRole('heading', { name: 'Jord och trädgårdsliv' })).toBeVisible();
  for (const [slug, title] of [
    ['jord-och-kompost', 'Jord – sand, silt, lera och livet under ytan'],
    ['tackodling', 'Täckodling – låt marken vara skyddad'],
    ['biologisk-mangfald', 'Biologisk mångfald i trädgården'],
  ]) {
    await expect(
      page.getByRole('link', { name: title, exact: true }),
    ).toHaveAttribute('href', new RegExp(`/odlingsmetoder/${slug}/$`));
    await page.goto(`/odlingsmetoder/${slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page.getByRole('heading', { name: 'Källor och granskning' })).toBeVisible();
    await page.goto('/biologisk-odling/');
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('trädgårdsguiderna har rätt brödsmulor och publicerade bilder', async ({ page }) => {
  for (const [slug, primary] of [
    ['jord-och-kompost', 'odlingslott-jord'],
    ['tackodling', 'tackodling-genomskarning'],
    ['biologisk-mangfald', 'mangfald-stubbe'],
  ]) {
    await page.goto(`/odlingsmetoder/${slug}/`);
    const crumbs = page.getByRole('navigation', { name: 'Brödsmulor' });
    await expect(crumbs.getByRole('link', { name: 'Livet i trädgården' })).toHaveAttribute('href', /biologisk-odling\\/$/);
    await expect(crumbs).not.toContainText('Chiliodling och växtskydd');
    await expect(page.locator('article.detail img').first()).toHaveAttribute('src', new RegExp(`/media/${primary}-full-800.webpimport { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('startsida på dator: navigation, tillgänglighet och layout', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Chili att odla',
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole('navigation').getByRole('link', { name: 'Chili', exact: true }).click();
  await expect(page).toHaveURL(/\/chili\/$/);
  await page.getByRole('main').getByRole('link', { name: /Chilisorter/ }).click();
  await expect(page).toHaveURL(/chilisorter/);
});
test('mobilmeny går att öppna, använda och stänga', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Meny' });
  await expect(menu).toBeVisible();
  await expect(page.getByRole('navigation')).toBeHidden();
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Vår historia', exact: true })
    .click();
  await expect(page).toHaveURL(/om/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test('sökning och ämnesfilter visar rätt sorter och tomt resultat', async ({
  page,
}) => {
  await page.goto('/chilisorter/');
  await page.getByRole('searchbox').fill('ghost');
  await expect(page.locator('.search-entry:visible')).toHaveCount(1);
  await expect(page.getByRole('status')).toHaveText('1 träffar');
  await page.getByRole('searchbox').fill('');
  await page.getByLabel('Filtrera efter ämne').selectOption('Capsicum chinense');
  await expect(page.locator('.search-entry:visible')).toHaveCount(6);
  await page.getByRole('searchbox').fill('finnsinte');
  await expect(page.getByText('Inga träffar.')).toBeVisible();
});
test('faktasida är tillgänglig och visar källor', async ({ page }) => {
  await page.goto('/chilisorter/jalapeno-leon/');
  await expect(
    page.getByRole('heading', { name: 'Källor och granskning' }),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test('alla chilisorter har samma läsordning och tre grundfakta', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const slug of [
    'habanero', 'habanero-lemon', 'chocolate-habanero', 'red-savina',
    'ghost-pepper', 'carolina-reaper', 'jalapeno-leon', 'pequena-amarilla',
    'sipka-zitronen', 'okrasny-zvonek-red',
  ]) {
    await page.goto(`/chilisorter/${slug}/`);
    await expect(page.locator('.facts dt')).toHaveText([
      'Art', 'Ungefärlig styrka', 'Utseende',
    ]);
    const heat = page.locator('.facts dd').nth(1);
    await expect(heat).toContainText('SHU');
    if (['jalapeno-leon', 'pequena-amarilla', 'sipka-zitronen', 'okrasny-zvonek-red'].includes(slug)) {
      await expect(heat).toHaveText('SHU-intervall saknas');
    } else {
      await expect(heat).toHaveText(/Cirka .+–.+ SHU/);
    }
    await expect(page.locator('.prose h2')).toHaveCount(4);
    await expect(page.locator('.prose h2').nth(1)).toHaveText('Smak och karaktär');
    await expect(page.locator('.prose h2').nth(2)).toHaveText('Odling i Sverige');
    await expect(page.locator('.prose h2').nth(3)).toHaveText('Användning');
    await expect(page.locator('article > .notice')).not.toContainText('SHU');
    await expect(page.locator('article')).not.toContainText('bekräftad av odlaren');
    await expect(page.getByRole('heading', { name: 'Källor och granskning' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test('trädgårdsguiderna visas under Livet i trädgården', async ({ page }) => {
  await page.goto('/biologisk-odling/');
  await expect(page.getByRole('heading', { name: 'Jord och trädgårdsliv' })).toBeVisible();
  for (const [slug, title] of [
    ['jord-och-kompost', 'Jord – sand, silt, lera och livet under ytan'],
    ['tackodling', 'Täckodling – låt marken vara skyddad'],
    ['biologisk-mangfald', 'Biologisk mångfald i trädgården'],
  ]) {
    await expect(
      page.getByRole('link', { name: title, exact: true }),
    ).toHaveAttribute('href', new RegExp(`/odlingsmetoder/${slug}/$`));
    await page.goto(`/odlingsmetoder/${slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page.getByRole('heading', { name: 'Källor och granskning' })).toBeVisible();
    await page.goto('/biologisk-odling/');
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

));
    await expect(page.getByRole('link', { name: '← Livet i trädgården' })).toBeVisible();
  }
  await page.goto('/biologisk-odling/');
  await expect(page.locator('article.topic img')).toHaveCount(3);
});

test('admin initierar CMS med konfigurerad OAuth-förmedlare', async ({ page }) => {
  // Kontrollera bootstrap utan att genomföra riktig GitHub OAuth-inloggning.
  await page.route('**/admin/vendor/decap-cms.js', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: `window.CMS = {
        registerMediaLibrary() {},
        init() { document.body.dataset.cmsInitialized = 'true'; }
      };`,
    }),
  );

  await page.goto('/admin/');
  await expect(page.locator('body')).toHaveAttribute('data-cms-initialized', 'true');
  await expect(page.locator('#cms-status')).toBeHidden();

  const config = await page.request.get('/admin/config.yml');
  expect(config.ok()).toBe(true);
  expect(await config.text()).toContain(
    'base_url: https://sveltia-cms-auth.mikael-forsberg74.workers.dev',
  );
});
