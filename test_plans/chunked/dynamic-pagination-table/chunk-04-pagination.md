# Test Case Plan: Dynamic Pagination Table - Pagination

## Metadata
- **Generated**: 2025-12-06
- **Initial URL**: https://practice.expandtesting.com/dynamic-pagination-table
- **Business Scenario**: Verify pagination navigation functionality
- **Chunk**: 4 of 4
- **Test Steps**: 7-10

---

## Test Objective
Validate that the dynamic pagination table correctly:
1. Enables navigation between pages using page number links
2. Enables navigation using Previous/Next buttons
3. Updates status text and button states appropriately

---

## Pre-conditions
1. Browser is open and accessible
2. Network connectivity to https://practice.expandtesting.com
3. No authentication required (public page)
4. 5 entries per page selected (to have 2 pages for testing)

---

## Test Steps

### Step 7: Navigate to Page 2 Using Page Number
- **Description**: Click on page 2 link to view remaining entries
- **Action**: Click
- **Target Element**: `link "2"` in pagination
- **Element Reference**: `ref=e161` (or current page 2 link ref)
- **Expected Result**:
  - Table shows entries 6-10
  - Status updates to "Showing 6 to 10 of 10 entries"
  - Page 2 becomes active/highlighted
  - "Previous" link becomes clickable
  - "Next" becomes disabled/inactive

### Step 8: Verify Page 2 Content
- **Description**: Confirm correct entries are shown on page 2
- **Action**: Assert
- **Target Element**: Table body rows
- **Expected Result**: Shows remaining 5 students in descending name order: Ethan Thomas, Emma Brown, Daniel Martinez, Bob Williams, Alice Johnson

### Step 9: Navigate Back Using Previous Button
- **Description**: Click Previous link to return to page 1
- **Action**: Click
- **Target Element**: `link "Previous"` in pagination
- **Element Reference**: `ref=e209` (or current Previous link ref)
- **Expected Result**:
  - Returns to page 1
  - Status shows "Showing 1 to 5 of 10 entries"
  - "Previous" becomes disabled
  - "Next" becomes clickable

### Step 10: Verify Page 1 Content After Navigation
- **Description**: Confirm page 1 content is correctly restored
- **Action**: Assert
- **Target Element**: Table body rows, status
- **Expected Result**: Shows first 5 students (still in descending order): Sophia Anderson, Olivia Wilson, Michael Davis, John Doe, Jane Smith

---

## UI Elements Identified

| Element | Type | Selector/Reference | Description |
|---------|------|-------------------|-------------|
| Data table | table | `ref=e75` | Main data table containing student records |
| Table body | rowgroup | `ref=e84` | Table body containing data rows |
| Status text | status | `ref=e108` | Shows "Showing X to Y of Z entries" |
| Pagination list | list | `ref=e111` | Container for pagination controls |
| Previous link | link/generic | Dynamic ref | Navigate to previous page (disabled on page 1) |
| Next link | link/generic | Dynamic ref | Navigate to next page (disabled on last page) |
| Page number links | link | Dynamic ref | Direct page navigation (1, 2, etc.) |

---

## Test Data

### Students on Page 1 (Descending, with 5 entries):
1. Sophia Anderson
2. Olivia Wilson
3. Michael Davis
4. John Doe
5. Jane Smith

### Students on Page 2 (Descending, with 5 entries):
1. Ethan Thomas
2. Emma Brown
3. Daniel Martinez
4. Bob Williams
5. Alice Johnson

---

## Additional Notes

- **Pagination State**: "Previous" and "Next" links switch between clickable `<a>` and disabled `<span>` elements
- **No Page Reload**: All interactions happen via JavaScript without page navigation (URL stays the same)
- **Dynamic Element References**: Playwright element references change on page updates. Use stable selectors

---

## Post-conditions
1. Pagination should be functional and responsive
2. Data integrity maintained across page navigation
3. Previous/Next button states should correctly reflect current position

---

## Suggested Playwright Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Dynamic Pagination Table - Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dynamic-pagination-table');
    // Set 5 entries per page to have 2 pages
    await page.getByLabel('Show entries').selectOption('5');
  });

  test('should navigate to page 2 using page number link', async ({ page }) => {
    // Click page 2 link
    await page.getByRole('link', { name: '2' }).click();

    // Verify status updates
    await expect(page.getByRole('status')).toContainText('Showing 6 to 10 of 10 entries');

    // Verify Previous becomes clickable and Next is disabled
    await expect(page.getByRole('link', { name: 'Previous' })).toBeVisible();
  });

  test('should show correct content on page 2', async ({ page }) => {
    // Sort descending first for predictable order
    await page.getByRole('columnheader', { name: 'Student Name' }).click();

    // Navigate to page 2
    await page.getByRole('link', { name: '2' }).click();

    // Verify page 2 content (remaining 5 students in descending order)
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(5);

    // First on page 2 should be Ethan Thomas
    await expect(rows.nth(0).locator('td').first()).toContainText('Ethan Thomas');
    // Last should be Alice Johnson
    await expect(rows.nth(4).locator('td').first()).toContainText('Alice Johnson');
  });

  test('should navigate back using Previous button', async ({ page }) => {
    // Navigate to page 2 first
    await page.getByRole('link', { name: '2' }).click();
    await expect(page.getByRole('status')).toContainText('Showing 6 to 10 of 10 entries');

    // Click Previous
    await page.getByRole('link', { name: 'Previous' }).click();

    // Verify back on page 1
    await expect(page.getByRole('status')).toContainText('Showing 1 to 5 of 10 entries');
  });

  test('should show correct page 1 content after navigation', async ({ page }) => {
    // Sort descending for predictable order
    await page.getByRole('columnheader', { name: 'Student Name' }).click();

    // Navigate to page 2 and back
    await page.getByRole('link', { name: '2' }).click();
    await page.getByRole('link', { name: 'Previous' }).click();

    // Verify page 1 content restored
    const rows = page.locator('table tbody tr');
    await expect(rows.nth(0).locator('td').first()).toContainText('Sophia Anderson');
  });

  test('should disable Previous on page 1 and Next on last page', async ({ page }) => {
    // On page 1, Previous should be disabled (no link role)
    await expect(page.locator('.paginate_button.previous.disabled')).toBeVisible();

    // Navigate to last page (page 2)
    await page.getByRole('link', { name: '2' }).click();

    // On last page, Next should be disabled
    await expect(page.locator('.paginate_button.next.disabled')).toBeVisible();
  });
});
```
