# Test Case Plan: Dynamic Pagination Table - Initial State

## Metadata
- **Generated**: 2025-12-06
- **Initial URL**: https://practice.expandtesting.com/dynamic-pagination-table
- **Business Scenario**: Verify page loads correctly and displays default table state
- **Chunk**: 1 of 4
- **Test Steps**: 1-2

---

## Test Objective
Validate that the dynamic pagination table page:
1. Loads successfully with correct title and structure
2. Displays default state with 3 entries per page

---

## Pre-conditions
1. Browser is open and accessible
2. Network connectivity to https://practice.expandtesting.com
3. No authentication required (public page)

---

## Test Steps

### Step 1: Navigate to Dynamic Pagination Table Page
- **Description**: Open the dynamic pagination table page
- **Action**: Navigate to URL
- **Target Element**: Browser navigation
- **Input Data**: `https://practice.expandtesting.com/dynamic-pagination-table`
- **Expected Result**: Page loads with title "Dynamic pagination Table page for Automation Testing Practice", table displays with default 3 entries, status shows "Showing 1 to 3 of 10 entries"

### Step 2: Verify Initial Table State
- **Description**: Confirm the table is displayed with default settings
- **Action**: Assert/Verify
- **Target Element**: Table (`table[ref=e75]`), Status (`status[ref=e108]`)
- **Expected Result**:
  - Table is visible with 6 columns: Student Name, Gender, Class Level, Home State, Major, Extracurricular Activity
  - Default shows 3 entries
  - Dropdown shows "3" selected
  - Status text: "Showing 1 to 3 of 10 entries"

---

## UI Elements Identified

| Element | Type | Selector/Reference | Description |
|---------|------|-------------------|-------------|
| Show entries dropdown | combobox | `ref=e68` / `getByLabel('Show entries')` | Dropdown to select number of entries per page (3, 5, 10, All) |
| Student Name header | columnheader | `ref=e78` / `getByRole('columnheader', { name: 'Student Name' })` | Sortable column header for student names |
| Gender header | columnheader | `ref=e79` | Sortable column header for gender |
| Class Level header | columnheader | `ref=e80` | Sortable column header for class level |
| Home State header | columnheader | `ref=e81` | Sortable column header for home state |
| Major header | columnheader | `ref=e82` | Sortable column header for major |
| Extracurricular header | columnheader | `ref=e83` | Sortable column header for extracurricular activity |
| Data table | table | `ref=e75` | Main data table containing student records |
| Table body | rowgroup | `ref=e84` | Table body containing data rows |
| Status text | status | `ref=e108` | Shows "Showing X to Y of Z entries" |

---

## Test Data

### Default Visible Students (first 3 in alphabetical order):
1. Alice Johnson - Female - Sophomore - Texas - Mathematics - Debate Team
2. Bob Williams - Male - Freshman - Florida - Physics - Soccer
3. Daniel Martinez - Male - Freshman - Nevada - Political Science - Football

---

## Additional Notes

- **Dynamic Element References**: Playwright element references (ref=eXXX) change on page updates. Use stable selectors like `getByRole()`, `getByLabel()`, or `getByText()` in actual test code
- **DataTables Library**: The table uses DataTables jQuery plugin which handles sorting, filtering, and pagination client-side

---

## Post-conditions
1. Table should be visible and properly rendered
2. All 6 column headers should be present
3. Default 3 entries should be displayed

---

## Suggested Playwright Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Dynamic Pagination Table - Initial State', () => {
  test('should load page with correct title and default table', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dynamic-pagination-table');

    // Verify page title
    await expect(page).toHaveTitle(/Dynamic pagination Table/i);

    // Verify table is visible
    await expect(page.getByRole('table')).toBeVisible();

    // Verify status shows default 3 entries
    await expect(page.getByRole('status')).toContainText('Showing 1 to 3 of 10 entries');
  });

  test('should display table with correct column structure and default entries', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dynamic-pagination-table');

    // Verify all 6 column headers are present
    await expect(page.getByRole('columnheader', { name: 'Student Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Gender' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Class Level' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Home State' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Major' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Extracurricular Activity' })).toBeVisible();

    // Verify default 3 rows are displayed
    await expect(page.locator('table tbody tr')).toHaveCount(3);

    // Verify dropdown shows "3" selected
    await expect(page.getByLabel('Show entries')).toHaveValue('3');
  });
});
```
