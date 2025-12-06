# Test Case Plan: Dynamic Pagination Table - Sorting

## Metadata
- **Generated**: 2025-12-06
- **Initial URL**: https://practice.expandtesting.com/dynamic-pagination-table
- **Business Scenario**: Verify table sorting functionality by Student Name column
- **Chunk**: 3 of 4
- **Test Steps**: 5-6

---

## Test Objective
Validate that the dynamic pagination table correctly:
1. Supports sorting data by the Student Name column
2. Displays data in correct descending order after clicking header

---

## Pre-conditions
1. Browser is open and accessible
2. Network connectivity to https://practice.expandtesting.com
3. No authentication required (public page)
4. Table displayed with data (default state has ascending sort)

---

## Test Steps

### Step 5: Sort by Student Name (Descending)
- **Description**: Click Student Name column header to sort in descending order
- **Action**: Click
- **Target Element**: `columnheader "Student Name"`
- **Element Reference**: `ref=e78`
- **Expected Result**:
  - Table re-sorts in descending order (Z-A)
  - First 5 entries now: Sophia Anderson, Olivia Wilson, Michael Davis, John Doe, Jane Smith
  - Column header changes to "activate to sort column ascending"

### Step 6: Verify Descending Sort Order
- **Description**: Confirm the data is sorted correctly in descending order
- **Action**: Assert
- **Target Element**: First cell in each row
- **Expected Result**: Names appear in reverse alphabetical order starting with "Sophia Anderson"

---

## UI Elements Identified

| Element | Type | Selector/Reference | Description |
|---------|------|-------------------|-------------|
| Student Name header | columnheader | `ref=e78` / `getByRole('columnheader', { name: 'Student Name' })` | Sortable column header for student names |
| Data table | table | `ref=e75` | Main data table containing student records |
| Table body | rowgroup | `ref=e84` | Table body containing data rows |

---

## Test Data

### Students in Descending Order (Z-A):
1. Sophia Anderson - Female - Senior - Arizona - History - Dance Club
2. Olivia Wilson - Female - Sophomore - Ohio - English - Swimming
3. Michael Davis - Male - Junior - Georgia - Chemistry - Drama
4. John Doe - Male - Senior - California - Computer Science - Basketball
5. Jane Smith - Female - Junior - New York - Biology - Chess Club
6. Ethan Thomas - Male - Junior - Michigan - Business - Basketball
7. Emma Brown - Female - Senior - Illinois - Engineering - Music Club
8. Daniel Martinez - Male - Freshman - Nevada - Political Science - Football
9. Bob Williams - Male - Freshman - Florida - Physics - Soccer
10. Alice Johnson - Female - Sophomore - Texas - Mathematics - Debate Team

---

## Additional Notes

- **Sort Indicator**: Column headers indicate current sort state via aria labels ("activate to sort column ascending/descending")
- **Default Sort**: Table starts with ascending sort (A-Z) by Student Name
- **Click Behavior**: First click on a column sorts ascending, second click sorts descending
- **DataTables Library**: The table uses DataTables jQuery plugin for client-side sorting

---

## Post-conditions
1. Table should be sorted in descending order by Student Name
2. Column header should indicate sort direction
3. First visible entry should be "Sophia Anderson"

---

## Suggested Playwright Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Dynamic Pagination Table - Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dynamic-pagination-table');
  });

  test('should sort by student name descending when clicking header', async ({ page }) => {
    // Click Student Name column header to sort descending
    // Note: Default is ascending, so first click changes to descending
    await page.getByRole('columnheader', { name: 'Student Name' }).click();

    // Verify first row shows "Sophia Anderson" (last alphabetically)
    const firstCell = page.locator('table tbody tr').first().locator('td').first();
    await expect(firstCell).toContainText('Sophia Anderson');
  });

  test('should verify complete descending sort order', async ({ page }) => {
    // Click Student Name column header to sort descending
    await page.getByRole('columnheader', { name: 'Student Name' }).click();

    // Get all name cells in the first column
    const nameCells = page.locator('table tbody tr td:first-child');
    const names = await nameCells.allTextContents();

    // Verify names are in descending order (first 3 visible by default)
    expect(names[0]).toContain('Sophia Anderson');
    expect(names[1]).toContain('Olivia Wilson');
    expect(names[2]).toContain('Michael Davis');
  });

  test('should toggle sort direction on subsequent clicks', async ({ page }) => {
    const header = page.getByRole('columnheader', { name: 'Student Name' });

    // First click - descending
    await header.click();
    let firstCell = page.locator('table tbody tr').first().locator('td').first();
    await expect(firstCell).toContainText('Sophia Anderson');

    // Second click - back to ascending
    await header.click();
    firstCell = page.locator('table tbody tr').first().locator('td').first();
    await expect(firstCell).toContainText('Alice Johnson');
  });
});
```
