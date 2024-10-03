import { test, expect } from '@playwright/test';

test.describe("Frontend tests", () => {
  test('Test case 1 - Create a new bill', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    

  });
})

test.describe("Backend tests", () => {
  test('Test Case 1 - Create a Bill', async ({ request }) => {
    const response = await request.post("http://localhost:3000/login",{
      data:{
        "username": `${process.env.TEST_USERNAME}`,
        "password": `${process.env.TEST_PASSWORD}`
      }
    })

  });
})

