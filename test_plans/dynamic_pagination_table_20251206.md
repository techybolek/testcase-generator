# Test Case Plan: Dynamic Pagination Table

## Metadata
- **Generated**: 2025-12-06
- **Initial URL**: https://practice.expandtesting.com/dynamic-pagination-table
- **Business Scenario**: Verify pagination table functionality including entries per page selection (5 entries), sorting by name, and pagination navigation

---

## Test Objective
Validate that the dynamic pagination table correctly:
1. Allows users to select 5 entries per page from dropdown
2. Supports sorting data by the Student Name column
3. Enables navigation between pages using pagination controls

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
| Show entries dropdown | combobox | `ref=e68` / `getByLabel('Show entries')` | Dropdown to select number of entries per page (3, 5, 10, All) |
| Search box | searchbox | `ref=e72` / `getByLabel('Search:')` | Text input to filter table data |
| Student Name header | columnheader | `ref=e78` / `getByRole('columnheader', { name: 'Student Name' })` | Sortable column header for student names |
| Gender header | columnheader | `ref=e79` | Sortable column header for gender |
| Class Level header | columnheader | `ref=e80` | Sortable column header for class level |
| Home State header | columnheader | `ref=e81` | Sortable column header for home state |
| Major header | columnheader | `ref=e82` | Sortable column header for major |
| Extracurricular header | columnheader | `ref=e83` | Sortable column header for extracurricular activity |
| Data table | table | `ref=e75` | Main data table containing student records |
| Table body | rowgroup | `ref=e84` | Table body containing data rows |
| Status text | status | `ref=e108` | Shows "Showing X to Y of Z entries" |
| Pagination list | list | `ref=e111` | Container for pagination controls |
| Previous link | link/generic | Dynamic ref | Navigate to previous page (disabled on page 1) |
| Next link | link/generic | Dynamic ref | Navigate to next page (disabled on last page) |
| Page number links | link | Dynamic ref | Direct page navigation (1, 2, etc.) |

---

## Test Data

### Students in Database (10 total, alphabetical order):
1. Alice Johnson - Female - Sophomore - Texas - Mathematics - Debate Team
2. Bob Williams - Male - Freshman - Florida - Physics - Soccer
3. Daniel Martinez - Male - Freshman - Nevada - Political Science - Football
4. Emma Brown - Female - Senior - Illinois - Engineering - Music Club
5. Ethan Thomas - Male - Junior - Michigan - Business - Basketball
6. Jane Smith - Female - Junior - New York - Biology - Chess Club
7. John Doe - Male - Senior - California - Computer Science - Basketball
8. Michael Davis - Male - Junior - Georgia - Chemistry - Drama
9. Olivia Wilson - Female - Sophomore - Ohio - English - Swimming
10. Sophia Anderson - Female - Senior - Arizona - History - Dance Club

---

## Additional Notes

- **Dynamic Element References**: Playwright element references (ref=eXXX) change on page updates. Use stable selectors like `getByRole()`, `getByLabel()`, or `getByText()` in actual test code
- **DataTables Library**: The table uses DataTables jQuery plugin which handles sorting, filtering, and pagination client-side
- **Sort Indicator**: Column headers indicate current sort state via aria labels ("activate to sort column ascending/descending")
- **Pagination State**: "Previous" and "Next" links switch between clickable `<a>` and disabled `<span>` elements
- **No Page Reload**: All interactions happen via JavaScript without page navigation (URL stays the same)

---

## Post-conditions
1. Table should be interactive and responsive to user inputs
2. Data integrity maintained across sort and pagination operations
3. No console errors during interactions

---

## Suggested Playwright Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Dynamic Pagination Table', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dynamic-pagination-table');
  });

  test('should display 5 entries when selecting from dropdown', async ({ page }) => {
    await page.getByLabel('Show entries').selectOption('5');
    await expect(page.getByRole('status')).toContainText('Showing 1 to 5 of 10 entries');
    await expect(page.locator('table tbody tr')).toHaveCount(5);
  });

  test('should sort by student name descending', async ({ page }) => {
    await page.getByRole('columnheader', { name: 'Student Name' }).click();
    const firstCell = page.locator('table tbody tr').first().locator('td').first();
    await expect(firstCell).toContainText('Sophia Anderson');
  });

  test('should navigate between pages', async ({ page }) => {
    await page.getByLabel('Show entries').selectOption('5');
    await page.getByRole('link', { name: '2' }).click();
    await expect(page.getByRole('status')).toContainText('Showing 6 to 10 of 10 entries');

    await page.getByRole('link', { name: 'Previous' }).click();
    await expect(page.getByRole('status')).toContainText('Showing 1 to 5 of 10 entries');
  });
});
```

---

## Edge Cases to Consider
- Selecting "All" entries should show all 10 records with no pagination
- Sorting while on page 2 should return to page 1 with new sort order
- Search filtering combined with pagination
- Empty search results handling
- Rapid clicking on pagination controls
