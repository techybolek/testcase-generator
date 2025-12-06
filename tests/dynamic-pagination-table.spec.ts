import { test, expect } from '@playwright/test';

test.describe('Dynamic Pagination Table', () => {
  test.beforeEach(async ({ page }) => {
    // Block ad-related requests to prevent redirects
    await page.route('**/*', (route) => {
      const url = route.request().url();
      // Block common ad networks and tracking domains
      const blockedPatterns = [
        'googlesyndication',
        'googleadservices',
        'doubleclick',
        'adservice',
        'adsense',
        'advertising',
        'adserver',
        'adnxs',
        'adsafeprotected',
        'moatads',
        'amazon-adsystem',
        'pubmatic',
        'rubiconproject',
        'openx',
        'criteo',
        'taboola',
        'outbrain',
        'mgid',
        'revcontent',
        'zergnet',
        'mintmobile',
        'tracking',
        'analytics',
        'pixel',
      ];

      if (blockedPatterns.some(pattern => url.toLowerCase().includes(pattern))) {
        route.abort();
      } else {
        route.continue();
      }
    });

    // Navigate to Dynamic Pagination Table page
    await page.goto('https://practice.expandtesting.com/dynamic-pagination-table');
    // Wait for the page to load with domcontentloaded
    await page.waitForLoadState('domcontentloaded');
    // Wait for the table to be visible with a longer timeout
    await page.locator('#example').waitFor({ state: 'visible', timeout: 30000 });
  });

  test('should verify initial state, select 5 entries, sort by name descending, and navigate pages', async ({ page }) => {
    // Step 2: Verify Initial Table State
    // Confirm table is visible with default 3 entries
    const table = page.locator('#example');
    await expect(table).toBeVisible();
    await expect(page.getByRole('status')).toContainText('Showing 1 to 3 of 10 entries');
    await expect(table.locator('tbody tr')).toHaveCount(3);

    // Verify dropdown shows "3" selected (using name attribute selector)
    const entriesDropdown = page.locator('select[name="example_length"]');
    await expect(entriesDropdown).toHaveValue('3');

    // Step 3: Select 5 Entries Per Page
    await entriesDropdown.selectOption('5');

    // Step 4: Verify 5 Entries Are Displayed
    await expect(page.getByRole('status')).toContainText('Showing 1 to 5 of 10 entries');
    await expect(table.locator('tbody tr')).toHaveCount(5);

    // Verify default ascending order (first 5 students alphabetically)
    const firstRowName = table.locator('tbody tr').first().locator('td').first();
    await expect(firstRowName).toContainText('Alice Johnson');

    // Step 5: Sort by Student Name (Descending)
    // Click Student Name column header to sort in descending order
    await page.getByRole('columnheader', { name: 'Student Name' }).click();

    // Step 6: Verify Descending Sort Order
    // First entry should now be "Sophia Anderson" (Z-A order)
    // Use longer timeout to wait for sort animation to complete
    const firstRowAfterSort = table.locator('tbody tr').first().locator('td').first();
    await expect(firstRowAfterSort).toContainText('Sophia Anderson', { timeout: 10000 });

    // Verify the order of first 5 entries in descending order
    const rows = table.locator('tbody tr');
    await expect(rows.nth(0).locator('td').first()).toContainText('Sophia Anderson');
    await expect(rows.nth(1).locator('td').first()).toContainText('Olivia Wilson');
    await expect(rows.nth(2).locator('td').first()).toContainText('Michael Davis');
    await expect(rows.nth(3).locator('td').first()).toContainText('John Doe');
    await expect(rows.nth(4).locator('td').first()).toContainText('Jane Smith');

    // Step 7: Navigate to Page 2 Using Page Number
    await page.getByRole('link', { name: '2' }).click();

    // Step 8: Verify Page 2 Content
    await expect(page.getByRole('status')).toContainText('Showing 6 to 10 of 10 entries');

    // Verify remaining 5 students in descending order
    await expect(rows.nth(0).locator('td').first()).toContainText('Ethan Thomas');
    await expect(rows.nth(1).locator('td').first()).toContainText('Emma Brown');
    await expect(rows.nth(2).locator('td').first()).toContainText('Daniel Martinez');
    await expect(rows.nth(3).locator('td').first()).toContainText('Bob Williams');
    await expect(rows.nth(4).locator('td').first()).toContainText('Alice Johnson');

    // Step 9: Navigate Back Using Previous Button
    await page.getByRole('link', { name: 'Previous' }).click();

    // Step 10: Verify Page 1 Content After Navigation
    await expect(page.getByRole('status')).toContainText('Showing 1 to 5 of 10 entries');

    // Verify first 5 students still in descending order
    await expect(rows.nth(0).locator('td').first()).toContainText('Sophia Anderson');
    await expect(rows.nth(1).locator('td').first()).toContainText('Olivia Wilson');
    await expect(rows.nth(2).locator('td').first()).toContainText('Michael Davis');
    await expect(rows.nth(3).locator('td').first()).toContainText('John Doe');
    await expect(rows.nth(4).locator('td').first()).toContainText('Jane Smith');
  });
});
