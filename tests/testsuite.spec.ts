import { test, expect } from '@playwright/test';

test.describe("Frontend tests", () => {
  test('Test case 1 - Create a new bill and assert relevant fields', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

    //click on bills
    await page.locator("div.block:nth-child(3) > a:nth-child(4)").click();
    //create bill button
    await page.locator("a.btn:nth-child(2)").click();

    await expect(page.locator("div.field:nth-child(1) > input:nth-child(2)")).toBeEditable();
    await expect(page.locator("div.field:nth-child(1) > input:nth-child(2)")).toBeVisible(); 
    await expect(page.locator(".checkbox")).toBeEnabled();
    await expect(page.locator("a.btn:nth-child(2)")).toBeVisible();


    await (page.locator("div.field:nth-child(1) > input:nth-child(2)")).fill("1500");
    await (page.locator(".checkbox")).click();
    await (page.locator("a.btn:nth-child(2)")).click();
    
    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1) > div:nth-child(1)")).toBeVisible();
    await (page.locator("a.btn:nth-child(1)")).click();

    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1)")).toBeVisible();

  });
  
  test('Test case 2 - Delete all rooms that exist on a fresh start of the application and assert that there are no more rooms.', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
    await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
    await page.getByRole('button', { name: 'Login' }).click();

    //go to rooms
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

    await page.locator("div.block:nth-child(1) > a:nth-child(3)").click();
    await page.locator("div.card:nth-child(1) > div:nth-child(3) > img:nth-child(1)").click();
    await page.locator(".menu > a:nth-child(2)").click();
    await page.locator("div.card:nth-child(1) > div:nth-child(3) > img:nth-child(1)").click();
    await page.locator(".menu > a:nth-child(2)").click();


    await expect(page.locator("div.container:nth-child(2) > div:nth-child(3) > p:nth-child(1)")).toBeVisible();

  });




})

test.describe("Backend tests", () => {
  test('Test Case 1 - Create a Bill', async ({ request }) => {
    const response = await request.post("http://localhost:3000/login", {
      data: {
        "username": `${process.env.TEST_USERNAME}`,
        "password": `${process.env.TEST_PASSWORD}`
      }
    });
      //expect(response.ok()).toBeTruthy();
  });
});

