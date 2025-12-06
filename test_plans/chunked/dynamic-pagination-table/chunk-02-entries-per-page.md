# Test Case Plan: Dynamic Pagination Table - Entries Per Page

## Metadata
- **Generated**: 2025-12-06
- **Initial URL**: https://practice.expandtesting.com/dynamic-pagination-table
- **Business Scenario**: Verify entries per page selection functionality
- **Chunk**: 2 of 4
- **Test Steps**: 3-4

---

## Test Objective
Validate that the dynamic pagination table correctly:
1. Allows users to select 5 entries per page from dropdown
2. Updates the table display and status text accordingly

---

## Pre-conditions
1. Browser is open and accessible
2. Network connectivity to https://practice.expandtesting.com
3. No authentication required (public page)
4. Page loaded with default state (3 entries)

---

## Test Steps

### Step 3: Select 5 Entries Per Page
- **Description**: Change the number of displayed entries to 5
- **Action**: Select option from dropdown
- **Target Element**: `combobox "Show entries"`
- **Element Reference**: `ref=e68`
- **Input Data**: Select value "5"
- **Expected Result**:
  - Table now displays 5 rows
  - Status updates to "Showing 1 to 5 of 10 entries"
  - Pagination updates to show 2 pages instead of 4

### Step 4: Verify 5 Entries Are Displayed
- **Description**: Confirm exactly 5 student records are visible
- **Action**: Assert/Count
- **Target Element**: Table body rows (`rowgroup[ref=e84] > row`)
- **Expected Result**: 5 rows visible with student data (default ascending by name: Alice Johnson, Bob Williams, Daniel Martinez, Emma Brown, Ethan Thomas)

---

## UI Elements Identified

| Element | Type | Selector/Reference | Description |
|---------|------|-------------------|-------------|
| Show entries dropdown | combobox | `ref=e68` / `getByLabel('Show entries')` | Dropdown to select number of entries per page (3, 5, 10, All) |
| Data table | table | `ref=e75` | Main data table containing student records |
| Table body | rowgroup | `ref=e84` | Table body containing data rows |
| Status text | status | `ref=e108` | Shows "Showing X to Y of Z entries" |
| Pagination list | list | `ref=e111` | Container for pagination controls |

---

## Test Data

### Students Visible with 5 Entries (first 5 in alphabetical order):
1. Alice Johnson - Female - Sophomore - Texas - Mathematics - Debate Team
2. Bob Williams - Male - Freshman - Florida - Physics - Soccer
3. Daniel Martinez - Male - Freshman - Nevada - Political Science - Football
4. Emma Brown - Female - Senior - Illinois - Engineering - Music Club
5. Ethan Thomas - Male - Junior - Michigan - Business - Basketball

---

## Additional Notes

- **Dropdown Options**: Available options are 3, 5, 10, and All
- **Pagination Updates**: When selecting 5 entries, total pages reduce from 4 to 2
- **No Page Reload**: All interactions happen via JavaScript without page navigation

---

## Post-conditions
1. Table should display exactly 5 rows
2. Status text should reflect "Showing 1 to 5 of 10 entries"
3. Pagination should show 2 pages

---

## Suggested Playwright Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Dynamic Pagination Table - Entries Per Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dynamic-pagination-table');
  });

  test('should display 5 entries when selecting from dropdown', async ({ page }) => {
    // Select 5 entries per page
    await page.getByLabel('Show entries').selectOption('5');

    // Verify status text updates
    await expect(page.getByRole('status')).toContainText('Showing 1 to 5 of 10 entries');

    // Verify table now shows 5 rows
    await expect(page.locator('table tbody tr')).toHaveCount(5);
  });

  test('should display correct student data with 5 entries selected', async ({ page }) => {
    // Select 5 entries per page
    await page.getByLabel('Show entries').selectOption('5');

    // Verify the 5 students are displayed in alphabetical order
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(5);

    // Verify first and last students in the list
    await expect(rows.nth(0).locator('td').first()).toContainText('Alice Johnson');
    await expect(rows.nth(4).locator('td').first()).toContainText('Ethan Thomas');

    // Verify pagination shows 2 pages
    await expect(page.getByRole('link', { name: '2' })).toBeVisible();
  });
});
```
