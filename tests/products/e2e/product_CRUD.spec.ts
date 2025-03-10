import { test, expect } from '@playwright/test';
import { ProductEditPage } from './pages/ProductEditPage';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test.describe('Structure Tests', () => {

  test('has title', async ({ page }) => {

    await expect(page).toHaveTitle(/TestManagerClient/);
  });

});

test.describe('CRUD', () => {

    // TODO: Remove Product via API
    // TODO : Use Faker-Library für Name und Description
   

  test('create via page object', async ({ page }) => {
    const testName = 'Test Product';
    const testName2 = 'Alpha 1';

    await page.click('text=Add Product');

    const productEditPage = new ProductEditPage(page);

    await productEditPage.setName(testName);
    await productEditPage.setDescription("Dies ist ein Hugo");
    await productEditPage.doSave();

    await expect(page.locator('table')).toContainText(testName);

     // Finaly remove the new entry
     const drow = page.locator(`table tr:has-text("${testName}")`);
     await drow.locator('button:has-text("Delete")').click();


  });

  test('Edit via page object', async ({ page }) => {

    const testName = 'Test Product';
    const testName2 = 'Alpha 1';

    await page.click('text=Add Product');

    const productAddPage = new ProductEditPage(page);

    await productAddPage.setName(testName);
    await productAddPage.setDescription("Dies ist ein Hugo");
    await productAddPage.doSave();

    await expect(page.locator('table')).toContainText(testName);

    const erow = page.locator(`table tr:has-text("${testName}")`);
    await erow.locator('button:has-text("Edit")').click();

    await productAddPage.setName(testName2);
    await productAddPage.doSave();

    await expect(page.locator('table')).toContainText(testName2);

    // Finaly remove the new entry
    const drow = page.locator(`table tr:has-text("${testName2}")`);
    await drow.locator('button:has-text("Delete")').click();

  });


  test('Create Invalid Name (leading Number)', async ({ page }) => {

    const testName = '1Test Product';

    await page.click('text=Add Product');

    const inputField = page.getByTestId('name');
    await inputField.fill(testName);

    await page.getByPlaceholder('Ex. It makes me feel...').fill('Dies sind 10 Hugos');
    await page.click('text=Submit');

    await expect(page.locator('table')).not.toContainText(testName);
  });

  test('Create Invalid Name (leading blanks)', async ({ page }) => {

    const testName = ' Test Product';

    await page.click('text=Add Product');

    const inputField = page.getByTestId('name');
    await inputField.fill(testName);

    await page.getByPlaceholder('Ex. It makes me feel...').fill('Dies sind 10 Hugos');
    await page.click('text=Submit');

    await expect(page.locator('table')).not.toContainText(testName);
  });
});
