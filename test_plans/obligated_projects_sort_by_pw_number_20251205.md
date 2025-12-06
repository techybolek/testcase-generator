# Test Case Plan: Sort Obligated Projects Table by PW Number

## Metadata
- **Generated**: 2025-12-05
- **Initial URL**: https://recovery.pr.gov/en
- **Business Scenario**: Navigate to Finances > Table View, select Obligated Projects, sort the table by PW Number column, and verify the rows are properly sorted

---

## Test Objective
Verify that users can navigate to the Obligated Projects table view and successfully sort the data by the PW Number column in both ascending and descending order.

---

## Pre-conditions
1. Browser is open and accessible
2. User has internet connectivity to access https://recovery.pr.gov
3. The recovery.pr.gov website is operational
4. No authentication is required (public portal)

---

## Test Steps

### Step 1: Navigate to the Portal Home Page
- **Description**: Open the Puerto Rico Disaster Recovery Transparency Portal
- **Action**: Navigate to URL
- **Target URL**: `https://recovery.pr.gov/en`
- **Expected Result**: Page loads with the main navigation menu visible, including "Finances" menu item

### Step 2: Open the Finances Menu
- **Description**: Click on the Finances menu to reveal the dropdown options
- **Action**: Click
- **Target Element**: `Finances menu item`
- **Element Selector**: `#ts-nav-4` or `text=Finances`
- **Element Reference**: `ref="e56"`
- **Expected Result**: Dropdown menu appears showing submenu options including "Table View"

### Step 3: Select Table View
- **Description**: Click on Table View from the Finances dropdown menu
- **Action**: Click
- **Target Element**: `Table View menu option`
- **Element Selector**: `#ts-nav-4-3` or `text=Table View`
- **Element Reference**: `ref="e101"`
- **Expected Result**:
  - URL changes to `https://recovery.pr.gov/en/financial-analysis/table-view#`
  - Page displays "SELECT TABLE TO BEGIN" message
  - A dropdown selector labeled "SELECT TABLE" is visible

### Step 4: Open the Table Selection Dropdown
- **Description**: Click on the SELECT TABLE dropdown to view available table options
- **Action**: Click
- **Target Element**: `SELECT TABLE combobox`
- **Element Selector**: `role=combobox[name="SELECT TABLE"]`
- **Element Reference**: `ref="e271"`
- **Expected Result**: Dropdown expands showing table options organized by category:
  - FEMA Funds (header, disabled)
    - Public Assistance (header, disabled)
      - Obligated Projects
      - Project Formulation
      - Private Property Debris Removal
    - Individual Assistance
    - Hazard Mitigation Grant Program
    - Other FEMA Funds
    - CARES Act
  - American Rescue Plan Act (header, disabled)
    - Coronavirus Local Fiscal Recovery Funds
    - Coronavirus State Fiscal Recovery Funds
  - Other Funds

### Step 5: Select Obligated Projects
- **Description**: Select the "Obligated Projects" option from the dropdown
- **Action**: Click
- **Target Element**: `Obligated Projects option`
- **Element Selector**: `role=option[name="Obligated Projects"]`
- **Element Reference**: `ref="e297"`
- **Expected Result**:
  - URL changes to `https://recovery.pr.gov/en/financial-analysis/table-view/pa-obligated`
  - Data table loads with columns: PW Number, Disaster Name, Applicant Name, Sector, Project Cost, Obligated, Disbursed, Cost Share
  - Pagination shows total record count (e.g., "1 - 15 of 15597")
  - Summary totals displayed below the table

### Step 6: Wait for Table to Load
- **Description**: Ensure the table data has fully loaded before interacting
- **Action**: Wait for element
- **Target Element**: `Table body with data rows`
- **Element Selector**: `table tbody tr` or wait for cell content to appear
- **Wait Condition**: Table rows are visible with data populated
- **Expected Result**: Table displays 15 rows of data (default page size)

### Step 7: Click PW Number Column Header to Sort (First Click - Descending)
- **Description**: Click on the PW Number column header button to sort the table
- **Action**: Click
- **Target Element**: `PW Number column header button`
- **Element Selector**: `role=button[name="PW Number"]`
- **Element Reference**: `ref="e350"`
- **Expected Result**:
  - Table data reloads sorted by PW Number in **descending** order (highest to lowest)
  - URL updates with query parameters: `?sortColumn=pw_number&sortValue=desc&pageSize=15&pageOffset=0&lang=en`
  - First row should show highest PW Number (e.g., `PA-02-PR-4850-PW-00458`)
  - Sort indicator icon changes to show descending sort active

### Step 8: Verify Descending Sort Order
- **Description**: Validate that the table rows are correctly sorted in descending order by PW Number
- **Action**: Verify/Assert
- **Verification Points**:
  1. URL contains `sortValue=desc`
  2. PW Number values decrease as you go down the rows
  3. Example sequence: 00458 > 00457 > 00456 > 00454 > 00448...
- **Expected Result**: All visible rows follow descending PW Number order

### Step 9: Click PW Number Column Header Again to Sort (Second Click - Ascending)
- **Description**: Click the PW Number column header again to toggle sort direction
- **Action**: Click
- **Target Element**: `PW Number column header button`
- **Element Selector**: `role=button[name="PW Number"]`
- **Element Reference**: `ref="e350"`
- **Expected Result**:
  - Table data reloads sorted by PW Number in **ascending** order (lowest to highest)
  - URL updates with: `?sortColumn=pw_number&sortValue=asc&pageSize=15&pageOffset=0&lang=en`
  - First row should show lowest PW Number (e.g., `PA-02-PR-3384-PW-00001`)
  - Sort indicator icon changes to show ascending sort active

### Step 10: Verify Ascending Sort Order
- **Description**: Validate that the table rows are correctly sorted in ascending order by PW Number
- **Action**: Verify/Assert
- **Verification Points**:
  1. URL contains `sortValue=asc`
  2. PW Number values increase as you go down the rows
  3. Example sequence: 00001 < 00002 < 00003 < 00004 < 00005...
- **Expected Result**: All visible rows follow ascending PW Number order

---

## UI Elements Identified

| Element | Type | Selector | Reference | Description |
|---------|------|----------|-----------|-------------|
| Finances Menu | Menu Item | `#ts-nav-4` | `ref="e56"` | Main navigation menu item |
| Table View | Menu Option | `#ts-nav-4-3` | `ref="e101"` | Submenu option under Finances |
| SELECT TABLE Dropdown | Combobox | `role=combobox[name="SELECT TABLE"]` | `ref="e271"` | Dropdown to select table type |
| Obligated Projects | Option | `role=option[name="Obligated Projects"]` | `ref="e297"` | Table selection option |
| Data Table | Table | `table` | `ref="e346"` | Main data table element |
| PW Number Header | Button | `role=button[name="PW Number"]` | `ref="e350"` | Sortable column header |
| Disaster Name Header | Button | `role=button[name="Disaster Name"]` | `ref="e357"` | Sortable column header |
| Applicant Name Header | Button | `role=button[name="Applicant Name"]` | `ref="e364"` | Sortable column header |
| Sector Header | Button | `role=button[name="Sector"]` | `ref="e371"` | Sortable column header |
| Project Cost Header | Button | `role=button[name="Project Cost"]` | `ref="e378"` | Sortable column header |
| Obligated Header | Button | `role=button[name="Obligated"]` | `ref="e385"` | Sortable column header |
| Disbursed Header | Button | `role=button[name="Disbursed"]` | `ref="e392"` | Sortable column header |
| Cost Share Header | Button | `role=button[name="Cost Share"]` | `ref="e399"` | Sortable column header |
| Pagination Info | Generic | `text=/1 - 15 of \d+/` | `ref="e547"` | Shows current page range and total |
| Previous Page Button | Button | `role=button[name="Previous Page"]` | - | Disabled on first page |
| Next Page Button | Button | `role=button[name="Next Page"]` | `ref="e548"` | Navigate to next page |
| Search Button | Paragraph | `text=Search` | `ref="e283"` | Opens search functionality |
| Filter Button | Paragraph | `text=Filter` | `ref="e285"` | Opens filter panel |
| Export to Excel | Paragraph | `text=Export to Excel` | `ref="e287"` | Exports data to Excel |
| Reset Button | Paragraph | `text=Reset` | `ref="e289"` | Resets filters and search |

---

## Additional Notes

### Observations about the Application
- The table uses server-side sorting (API call is made when sort is clicked)
- Sort direction toggles between ascending and descending on consecutive clicks
- The URL reflects the current sort state via query parameters
- Default page size is 15 rows
- Some PW Numbers may be missing in sequence (e.g., 00006 jumps to 00008)

### Dynamic Elements
- Sort indicator icons change based on sort state and direction
- Table content updates dynamically via API calls
- Pagination info updates based on total results

### Wait Conditions to Consider
- Wait for API response after clicking sort header (`api/paTable/searchPA`)
- Wait for table rows to be visible after data loads
- Network request may take 1-3 seconds

### Potential Edge Cases
1. **Empty results**: Filter combination that returns no data
2. **Large dataset pagination**: Verify sorting persists across pages
3. **Network timeout**: Slow connection handling
4. **Multiple rapid clicks**: Ensure sort state is consistent

### API Endpoints Observed
- `POST /tpbackend_prod/api/paTable/searchPA` - Fetches table data with sorting
- `GET /tpbackend_prod/api/paTable/pa-rfd/en` - Gets table configuration

---

## Post-conditions
1. Table is displayed sorted by PW Number in ascending order
2. URL reflects sort parameters: `sortColumn=pw_number&sortValue=asc`
3. User can continue to interact with the table (pagination, other sorts, filtering)

---

## Test Data Requirements
- No specific test data input required (read-only table view)
- Expected data patterns:
  - PW Number format: `PA-02-PR-XXXX-PW-YYYYY` where XXXX is disaster ID and YYYYY is project number
  - Disaster declarations include: Hurricane Irma (3384), Tropical Storm Ernesto (4850), etc.
  - Total records: ~15,597 (as of test execution date)

---

## Suggested Playwright Test Code Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Obligated Projects Table - PW Number Sorting', () => {
  test('should sort table by PW Number in ascending and descending order', async ({ page }) => {
    // Step 1: Navigate to portal
    await page.goto('https://recovery.pr.gov/en');

    // Step 2: Open Finances menu
    await page.locator('#ts-nav-4').getByText('Finances').click();

    // Step 3: Select Table View
    await page.locator('#ts-nav-4-3').getByText('Table View').click();
    await expect(page).toHaveURL(/table-view/);

    // Step 4: Open table selector dropdown
    await page.getByRole('combobox', { name: 'SELECT TABLE' }).click();

    // Step 5: Select Obligated Projects
    await page.getByRole('option', { name: 'Obligated Projects' }).click();

    // Step 6: Wait for table to load
    await page.waitForResponse('**/api/paTable/searchPA');
    await expect(page.locator('table tbody tr')).toHaveCount(15);

    // Step 7: Sort by PW Number (descending)
    await page.getByRole('button', { name: 'PW Number' }).click();
    await page.waitForResponse('**/api/paTable/searchPA');

    // Step 8: Verify descending sort
    await expect(page).toHaveURL(/sortValue=desc/);
    const firstRowDesc = await page.locator('table tbody tr').first().locator('td').first().textContent();
    expect(firstRowDesc).toContain('PA-02-PR-4850'); // Higher disaster number

    // Step 9: Sort by PW Number (ascending)
    await page.getByRole('button', { name: 'PW Number' }).click();
    await page.waitForResponse('**/api/paTable/searchPA');

    // Step 10: Verify ascending sort
    await expect(page).toHaveURL(/sortValue=asc/);
    const firstRowAsc = await page.locator('table tbody tr').first().locator('td').first().textContent();
    expect(firstRowAsc).toBe('PA-02-PR-3384-PW-00001'); // Lowest PW number
  });
});
```
