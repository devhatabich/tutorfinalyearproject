import { defineConfig, devices } from '@playwright/test';
export default defineConfig({

  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: [
    {
      command: 'cd ../back && node index.js',
      port: 4000,
      reuseExistingServer: !process.env.CI,
      timeout: 180 * 1000,
      env: {
        NODE_ENV: 'test',
        PORT: '4000',
        DB_URL: 'mongodb://127.0.0.1:27017/tutorme',
        JWT_PRIVATE_KEY: 'secret',
        GOOGLE_CLIENT_ID: 'fake_google_client_id',
      }
    },
    {
      command: 'npm run dev',
      port: 5173,
      reuseExistingServer: !process.env.CI,
      timeout: 180 * 1000,
    }
  ],
});