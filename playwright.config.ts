import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'tests/browser',
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:4321',
    launchOptions: {
      executablePath: process.env.CHROMIUM_PATH || undefined,
      args: ['--no-sandbox'],
    },
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --ignore-lock',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
  },
  reporter: 'list',
});
