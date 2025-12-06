import { test, expect } from '@playwright/test';

test.describe('CGI Career Search - Austin', () => {
  test('should find at least 1 job listing in Austin', async ({ page }) => {
    // Navigate directly to the CGI career opportunities page
    await page.goto('https://cgi.njoyn.com/corp/xweb/xweb.asp?CLID=21001&page=joblisting&lang=1');

    // Wait for the search form to be ready
    const searchButton = page.getByRole('button', { name: 'Search', exact: true });
    await expect(searchButton).toBeVisible({ timeout: 30000 });

    // Enter City Search Term
    const cityField = page.getByRole('textbox', { name: 'City' });
    await cityField.fill('Austin');

    // Verify the text was entered
    await expect(cityField).toHaveValue('Austin');

    // Execute Search
    await searchButton.click();

    // Wait for search results by checking for Reset button
    await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible({ timeout: 15000 });

    // Verify Search Results - Parse the Search Results count
    const resultsLocator = page.locator('text=/Search Results \\(\\d+\\)/');
    await expect(resultsLocator.first()).toBeVisible({ timeout: 10000 });

    const resultsText = await resultsLocator.first().textContent();
    const match = resultsText?.match(/Search Results \((\d+)\)/);
    const resultCount = match ? parseInt(match[1], 10) : 0;

    // Assert at least 1 result is returned
    expect(resultCount).toBeGreaterThanOrEqual(1);

    // Verify Austin appears in the results table
    const austinCells = page.getByRole('cell', { name: 'Austin' });
    await expect(austinCells.first()).toBeVisible({ timeout: 10000 });
  });
});
