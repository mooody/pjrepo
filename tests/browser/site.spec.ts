import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('startsida på dator: navigation, tillgänglighet och layout', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'En liten odling',
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Chilisorter' })
    .click();
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
    .getByRole('link', { name: 'Kontakt', exact: true })
    .click();
  await expect(page).toHaveURL(/kontakt/);
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
  await page.getByLabel('Filtrera efter ämne').selectOption('het');
  await expect(page.locator('.search-entry:visible')).toHaveCount(2);
  await page.getByRole('searchbox').fill('finnsinte');
  await expect(page.getByText('Inga träffar.')).toBeVisible();
});
test('faktasida är tillgänglig och visar källor', async ({ page }) => {
  await page.goto('/skadedjur/bladloss/');
  await expect(
    page.getByRole('heading', { name: 'Källor & granskning' }),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test('Decap laddar och visar GitHub-inloggning utan konfigurationsfel', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/admin/');
  await expect(page.getByRole('button', { name: /GitHub/i })).toBeVisible({
    timeout: 30000,
  });
  expect(errors).toEqual([]);
});
