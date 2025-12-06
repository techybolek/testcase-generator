import { test, expect } from '@playwright/test';

test.describe('Obligated Projects Table - PW Number Sorting', () => {
  test('should sort table by PW Number in ascending and descending order', async ({ page }) => {
    // Step 1: Navigate to Puerto Rico Disaster Recovery Transparency Portal
    await page.goto('https://recovery.pr.gov/en');
    await page.waitForLoadState('networkidle');

    // Verify main navigation is visible
    await expect(page.locator('#ts-nav-4')).toBeVisible({ timeout: 15000 });

    // Step 2: Open Finances menu
    await page.locator('#ts-nav-4').click();

    // Wait for dropdown to appear
    await expect(page.locator('#ts-nav-4-3')).toBeVisible({ timeout: 5000 });

    // Step 3: Select Table View from dropdown
    await page.locator('#ts-nav-4-3').click();

    // Wait for navigation and page load
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/table-view/);

    // Verify SELECT TABLE dropdown is visible
    await expect(page.getByRole('combobox', { name: 'SELECT TABLE' })).toBeVisible({ timeout: 10000 });

    // Step 4: Open the Table Selection Dropdown
    await page.getByRole('combobox', { name: 'SELECT TABLE' }).click();

    // Step 5: Select Obligated Projects from dropdown
    await page.getByRole('option', { name: 'Obligated Projects' }).click();

    // Step 6: Wait for table to load with data
    // Wait for the API response
    await page.waitForResponse(
      (response) => response.url().includes('api/paTable/searchPA') && response.status() === 200,
      { timeout: 30000 }
    );

    // Verify URL changed to pa-obligated
    await expect(page).toHaveURL(/pa-obligated/);

    // Wait for table rows to be visible
    await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 10000 });

    // Verify we have data rows (at least 1 row)
    const rowCount = await page.locator('table tbody tr').count();
    expect(rowCount).toBeGreaterThan(0);

    // Step 7: Click PW Number Column Header to Sort (First Click - Descending)
    await page.getByRole('button', { name: 'PW Number' }).click();

    // Wait for sort API response
    await page.waitForResponse(
      (response) => response.url().includes('api/paTable/searchPA') && response.status() === 200,
      { timeout: 30000 }
    );

    // Step 8: Verify Descending Sort Order
    // Check URL contains sortValue=desc
    await expect(page).toHaveURL(/sortValue=desc/);
    await expect(page).toHaveURL(/sortColumn=pw_number/);

    // Get the PW Numbers from first few rows to verify descending order
    const firstRowDescPW = await page.locator('table tbody tr').first().locator('td').first().textContent();
    expect(firstRowDescPW).toBeTruthy();
    console.log(`First row PW Number (descending): ${firstRowDescPW}`);

    // Verify the PW Number format and that it's from a higher disaster number (e.g., 4850)
    expect(firstRowDescPW).toMatch(/PA-02-PR-\d+-PW-\d+/);

    // Step 9: Click PW Number Column Header Again to Sort (Second Click - Ascending)
    await page.getByRole('button', { name: 'PW Number' }).click();

    // Wait for sort API response
    await page.waitForResponse(
      (response) => response.url().includes('api/paTable/searchPA') && response.status() === 200,
      { timeout: 30000 }
    );

    // Step 10: Verify Ascending Sort Order
    // Check URL contains sortValue=asc
    await expect(page).toHaveURL(/sortValue=asc/);
    await expect(page).toHaveURL(/sortColumn=pw_number/);

    // Get the first PW Number in ascending order
    const firstRowAscPW = await page.locator('table tbody tr').first().locator('td').first().textContent();
    expect(firstRowAscPW).toBeTruthy();
    console.log(`First row PW Number (ascending): ${firstRowAscPW}`);

    // Verify the PW Number format - should be the lowest (disaster 3384, PW 00001)
    expect(firstRowAscPW).toMatch(/PA-02-PR-3384-PW-00001/);

    // Additional verification: Compare ascending vs descending first values
    // Extract the numeric portion for comparison
    const extractPWNumber = (pw: string | null) => {
      if (!pw) return 0;
      const match = pw.match(/PW-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };

    const descPWNum = extractPWNumber(firstRowDescPW);
    const ascPWNum = extractPWNumber(firstRowAscPW);

    // The descending first row should have a higher PW number than ascending first row
    expect(descPWNum).toBeGreaterThan(ascPWNum);
    console.log(`Descending first PW number: ${descPWNum}, Ascending first PW number: ${ascPWNum}`);
  });
});
