# Test Case Plan

## Metadata
- **Generated**: 2025-12-05
- **Initial URL**: https://www.cgi.com
- **Business Scenario**: Search for career opportunities in Austin and verify at least 1 listing is returned

---

## Test Objective
Verify that a user can navigate to CGI's career opportunities page and search for jobs in Austin, Texas, with at least one job listing returned in the results.

---

## Pre-conditions
1. Browser is open and accessible
2. Network connectivity to cgi.com and cgi.njoyn.com domains
3. No authentication required for this test

---

## Test Steps

### Step 1: Navigate to CGI Homepage
- **Description**: Open the CGI main website
- **Action**: Navigate to URL
- **Target URL**: `https://www.cgi.com`
- **Expected Result**: CGI homepage loads successfully with main navigation visible including "Careers" button

### Step 2: Open Careers Menu
- **Description**: Click on the Careers button in the main navigation to open the dropdown menu
- **Target Element**: `Careers navigation button`
- **Element Reference**: `button[name="Careers"]` or role `button` with name `Careers`
- **Element Selector**: `page.getByRole('button', { name: 'Careers' })`
- **Input Data**: N/A
- **Expected Result**: A dropdown menu appears showing career-related links including "Career opportunities"

### Step 3: Navigate to Career Opportunities Page
- **Description**: Click on the "Career opportunities" link in the dropdown menu
- **Target Element**: `Career opportunities link`
- **Element Reference**: `link[name="Career opportunities"]`
- **Element Selector**: `page.getByRole('link', { name: 'Career opportunities' })`
- **Input Data**: N/A
- **Expected Result**:
  - Page navigates to `https://cgi.njoyn.com/corp/xweb/xweb.asp?CLID=21001&page=joblisting&lang=1`
  - Job search form is displayed with "Keyword" and "City" input fields
  - Search Results count is displayed (e.g., "Search Results (2520)")

### Step 4: Enter City Search Term
- **Description**: Enter "Austin" in the City search field
- **Target Element**: `City textbox`
- **Element Reference**: `textbox[name="City"]`
- **Element Selector**: `page.getByRole('textbox', { name: 'City' })`
- **Input Data**: `Austin`
- **Expected Result**: "Austin" text appears in the City input field

### Step 5: Execute Search
- **Description**: Click the Search button to filter job listings
- **Target Element**: `Search button`
- **Element Reference**: `button[name="Search"]`
- **Element Selector**: `page.getByRole('button', { name: 'Search', exact: true })`
- **Input Data**: N/A
- **Expected Result**:
  - Page reloads/updates with filtered search results
  - Search Results count updates to show Austin-filtered results
  - A Reset button appears next to Search button

### Step 6: Verify Search Results
- **Description**: Verify that at least 1 job listing is returned for Austin
- **Target Element**: `Search Results count text`
- **Element Reference**: Text content showing "Search Results (N)" where N >= 1
- **Element Selector**: `page.locator('text=Search Results').first()`
- **Assertion**:
  - Extract the number from "Search Results (N)"
  - Verify N >= 1
  - Alternatively, verify the results table contains at least one row with "Austin" in the City column
- **Expected Result**:
  - Search Results shows at least 1 result (e.g., "Search Results (4)")
  - At least one job listing row displays "Austin" in the City column

---

## UI Elements Identified

| Element | Type | Selector Strategy | Description |
|---------|------|-------------------|-------------|
| CGI Logo | link/img | `page.getByRole('link', { name: 'CGI official logo' })` | Main CGI logo, navigates to homepage |
| Careers Button | button | `page.getByRole('button', { name: 'Careers' })` | Opens careers dropdown menu |
| Career opportunities Link | link | `page.getByRole('link', { name: 'Career opportunities' })` | Navigates to job search page |
| Keyword Field | textbox | `page.getByRole('textbox', { name: 'Keyword' })` | Keyword search input |
| City Field | textbox | `page.getByRole('textbox', { name: 'City' })` | City search input |
| Advanced Search Parameters | button | `page.getByRole('button', { name: 'Advanced Search Parameters' })` | Expands advanced filters |
| Search Button | button | `page.getByRole('button', { name: 'Search', exact: true })` | Executes the job search |
| Reset Button | button | `page.getByRole('button', { name: 'Reset' })` | Clears search filters (appears after search) |
| Search Results Count | text | `page.locator('.search-results-count')` or text match | Displays total matching jobs |
| Results Table | table | `page.getByRole('table')` | Contains job listing rows |
| Position ID Column | columnheader | `page.getByRole('columnheader', { name: 'Position ID' })` | Sortable column header |
| Title Column | columnheader | `page.getByRole('columnheader', { name: 'Title' })` | Sortable column header |
| Category Column | columnheader | `page.getByRole('columnheader', { name: 'Category' })` | Sortable column header |
| City Column | columnheader | `page.getByRole('columnheader', { name: 'City' })` | Sortable column header |
| Country Column | columnheader | `page.getByRole('columnheader', { name: 'Country' })` | Sortable column header |

---

## Verification Points

1. **Navigation Verification**: Confirm URL changes to the careers subdomain (cgi.njoyn.com)
2. **Search Form Presence**: Verify Keyword and City fields are visible and interactive
3. **Search Execution**: Verify Search button triggers a filter/reload
4. **Results Count**: Parse "Search Results (N)" and assert N >= 1
5. **Results Table Content**: Verify at least one row exists with "Austin" in the City cell

---

## Sample Assertions (Playwright)

```typescript
// Verify at least 1 result
const resultsText = await page.locator('text=Search Results').first().textContent();
const match = resultsText?.match(/Search Results \((\d+)\)/);
const resultCount = match ? parseInt(match[1], 10) : 0;
expect(resultCount).toBeGreaterThanOrEqual(1);

// Alternative: Verify Austin appears in results table
const austinCells = page.getByRole('cell', { name: 'Austin' });
await expect(austinCells.first()).toBeVisible();
```

---

## Additional Notes
- The careers page is hosted on a subdomain (cgi.njoyn.com) separate from the main cgi.com site
- The dropdown menu for Careers requires a click to open (not hover)
- Search results include jobs with "Any CGI location" that may match partial text - for strict Austin-only results, additional filtering may be needed
- The results table is paginated (Page X of Y) - current test only verifies first page
- Job IDs follow pattern: JMMYY-NNNN (e.g., J1125-1655)
- A 404 console error may appear during navigation but does not affect functionality

---

## Post-conditions
1. User remains on the careers search results page
2. Search filter for "Austin" is active
3. Browser can continue to interact with results (click job details, navigate pages, etc.)

---

## Test Data Requirements
- **City Search Term**: `Austin`
- **Expected Minimum Results**: 1 or more job listings
- **Sample Job IDs Found During Exploration**:
  - J1125-1655: Director of Consulting Services (Austin, United States)
  - J0225-1036: Mid-Senior Level Federal Financials ERP Business Analyst (Austin, United States)

---

## Edge Cases to Consider (Future Tests)
1. Search with no results (e.g., a city with no CGI presence)
2. Search with keyword + city combination
3. Using Advanced Search Parameters
4. Pagination through multiple pages of results
5. Sorting results by different columns
6. Testing the Reset button functionality
