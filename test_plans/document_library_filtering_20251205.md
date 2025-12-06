# Document Library Filtering Test Plan

**Application URL:** https://recovery.pr.gov/en/document-library
**Test Date:** 2025-12-05
**Application:** Puerto Rico Disaster Recovery Transparency Portal - COR3

---

## 1. Overview

This test plan covers comprehensive testing of the Document Library page filtering, search, and sorting functionality. The page allows users to search and filter through disaster recovery documents using multiple criteria.

---

## 2. Test Environment

- **URL:** https://recovery.pr.gov/en/document-library
- **Total Documents:** 2,819 (as of test date)
- **Available Filters:** Category, Sub-Category, Language, Date Published, Disaster
- **Additional Features:** Search textbox, Sort dropdown, Reset button, Pagination

---

## 3. Filter Components Inventory

### 3.1 Category Dropdown (17 options)
| Option | Description |
|--------|-------------|
| All | Default - shows all categories |
| Communications | Press releases, official letters, public briefings |
| COR3 Policy Chapters | Policy documentation |
| Environmental and Historic Preservation | EHP related documents |
| Financial Transparency | Financial reports and transparency documents |
| Hazard Mitigation | Hazard mitigation program documents |
| Helpful Links | External resource links |
| Improvement Plans | Planning documents |
| Legal & Regulatory | Legal and regulatory documents |
| Policies & Procedures | Policy and procedure documents |
| Procurement Process | RFPs, contracts, procurement documents |
| Programs - CDBG-DR | CDBG-DR program documents |
| Programs - HMGP | Hazard Mitigation Grant Program documents |
| Programs - PA | Public Assistance program documents |
| Quarterly Reports | Quarterly reporting documents |
| Supporting Agencies | Partner agency documents |
| Technical Documents | Technical documentation |

### 3.2 Sub-Category Dropdown
- **Behavior:** Dynamic - options change based on selected Category
- **Default:** "All"
- **Example for "Communications" category:**
  - All
  - Official Letters
  - Press Releases
  - Public Briefings
  - Reports
  - Webinar Presentations

### 3.3 Language Dropdown (3 options)
| Option | Description |
|--------|-------------|
| All | Shows documents in all languages |
| English | English language documents only |
| Spanish | Spanish language documents only |

### 3.4 Date Published Filter
- **Type:** Calendar date picker (not dropdown)
- **Options:**
  - Before (selected date)
  - Between (date range)
  - After (selected date)
- **Additional:** Reset Date option to clear selection
- **Format:** MM/DD/YYYY
- **URL Parameters:** `publishedDate` and `publishedDateOption` (before/between/after)

### 3.5 Disaster Dropdown (9 options)
| Option | Description |
|--------|-------------|
| All | Shows documents for all disasters |
| COVID-19 | COVID-19 pandemic related documents |
| Earthquake | Earthquake related documents |
| Emergency Declaration Hurricane Irma | Hurricane Irma emergency documents |
| Hurricane Fiona | Hurricane Fiona related documents |
| Hurricane Irma | Hurricane Irma related documents |
| Hurricane Maria | Hurricane Maria related documents |
| Severe Storms | Severe storms related documents |
| Tropical Storm Ernesto | Tropical Storm Ernesto related documents |

### 3.6 Sort Dropdown (4 options)
| Option | Description |
|--------|-------------|
| Newest | Sort by published date descending (default) |
| Oldest | Sort by published date ascending |
| Title (A-Z) | Alphabetical sort by title |
| Title (Z-A) | Reverse alphabetical sort by title |

---

## 4. Test Cases

### 4.1 Dropdown Population Tests

#### TC-001: Verify Category Dropdown Population
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded successfully |
| **Steps** | 1. Navigate to Document Library page<br>2. Click on Category dropdown |
| **Expected Result** | Dropdown shows 17 options including "All" and all category types |
| **Status** | PASS |

#### TC-002: Verify Sub-Category Dropdown Population
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded successfully |
| **Steps** | 1. Navigate to Document Library page<br>2. Select a Category (e.g., "Communications")<br>3. Click on Sub-Category dropdown |
| **Expected Result** | Dropdown shows relevant sub-categories for selected category |
| **Status** | PASS |

#### TC-003: Verify Language Dropdown Population
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded successfully |
| **Steps** | 1. Navigate to Document Library page<br>2. Click on Language dropdown |
| **Expected Result** | Dropdown shows 3 options: All, English, Spanish |
| **Status** | PASS |

#### TC-004: Verify Date Published Filter Population
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded successfully |
| **Steps** | 1. Navigate to Document Library page<br>2. Click on Date Published filter |
| **Expected Result** | Calendar date picker opens with Before/Between/After radio options and Reset Date link |
| **Status** | PASS |

#### TC-005: Verify Disaster Dropdown Population
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded successfully |
| **Steps** | 1. Navigate to Document Library page<br>2. Click on Disaster dropdown |
| **Expected Result** | Dropdown shows 9 options including all disaster types |
| **Status** | PASS |

### 4.2 Individual Filter Functionality Tests

#### TC-006: Test Category Filter Functionality
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded with all 2,819 documents |
| **Steps** | 1. Select "Communications" from Category dropdown |
| **Expected Result** | Results filtered to show only Communications documents (742 results observed during testing) |
| **URL Parameter** | `category=Communications` |
| **Status** | PASS |

#### TC-007: Test Sub-Category Filter Functionality
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Category filter applied (Communications) |
| **Steps** | 1. Select "Press Releases" from Sub-Category dropdown |
| **Expected Result** | Results further filtered to show only Press Releases within Communications |
| **URL Parameter** | `subcategory=Press%20Releases` |
| **Status** | PASS |

#### TC-008: Test Language Filter Functionality
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded |
| **Steps** | 1. Select "English" from Language dropdown |
| **Expected Result** | Results filtered to show only English language documents |
| **URL Parameter** | `language=English` |
| **Status** | PASS |

#### TC-009: Test Date Published Filter - Before Option
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | Page loaded |
| **Steps** | 1. Click Date Published filter<br>2. Select "Before" radio option<br>3. Select a date from calendar |
| **Expected Result** | Results filtered to show documents published before selected date |
| **URL Parameters** | `publishedDate=YYYY%2FMM%2FDD&publishedDateOption=before` |
| **Status** | PASS |

#### TC-010: Test Disaster Filter Functionality
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded |
| **Steps** | 1. Select "Hurricane Maria" from Disaster dropdown |
| **Expected Result** | Results filtered to show only Hurricane Maria related documents |
| **URL Parameter** | `disasters=Hurricane%20Maria` |
| **Status** | PASS |

### 4.3 Combined Filter Tests

#### TC-011: Test Multiple Filters Combined
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded |
| **Steps** | 1. Select Category: "Communications"<br>2. Select Sub-Category: "Press Releases"<br>3. Select Language: "English" |
| **Expected Result** | Results progressively filter with each selection (2,819 → 742 → 684 → 164 observed during testing) |
| **Status** | PASS |

#### TC-012: Test Filters Resulting in No Results
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | Filters applied that produce no matching documents |
| **Steps** | 1. Apply combination of filters with no matching results |
| **Expected Result** | "No results found" message displayed, no documents shown |
| **Status** | PASS |

### 4.4 Reset Functionality Tests

#### TC-013: Test Reset Button Functionality
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | One or more filters applied |
| **Steps** | 1. Apply multiple filters<br>2. Click "Reset" link |
| **Expected Result** | All filters cleared, all dropdowns reset to "All", full document list restored (2,819), URL parameters cleared |
| **Status** | PASS |

### 4.5 Search Functionality Tests

#### TC-014: Test Search Textbox Basic Functionality
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded |
| **Steps** | 1. Type "FEMA" in search textbox<br>2. Press Enter or wait for auto-search |
| **Expected Result** | Results filtered to show documents containing "FEMA" (633 results observed during testing) |
| **URL Parameter** | `keyword=FEMA` |
| **Status** | PASS |

#### TC-015: Test Search Combined with Filters
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | Page loaded |
| **Steps** | 1. Apply a Category filter<br>2. Type search term in textbox |
| **Expected Result** | Results filtered by both category and search term |
| **Status** | PASS |

### 4.6 Sort Functionality Tests

#### TC-016: Test Sort by Newest (Default)
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded |
| **Steps** | 1. Verify default sort is "Newest"<br>2. Check document order in results |
| **Expected Result** | Documents sorted by published date descending (newest first) |
| **Status** | PASS |

#### TC-017: Test Sort by Oldest
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded |
| **Steps** | 1. Click Sort dropdown<br>2. Select "Oldest" |
| **Expected Result** | Documents sorted by published date ascending (oldest first), URL updated with `sorting=publishedDate%20asc` |
| **Status** | PASS |

#### TC-018: Test Sort by Title (A-Z)
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | Page loaded |
| **Steps** | 1. Click Sort dropdown<br>2. Select "Title (A-Z)" |
| **Expected Result** | Documents sorted alphabetically by title |
| **Status** | PASS |

#### TC-019: Test Sort by Title (Z-A)
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | Page loaded |
| **Steps** | 1. Click Sort dropdown<br>2. Select "Title (Z-A)" |
| **Expected Result** | Documents sorted reverse alphabetically by title |
| **Status** | PASS |

### 4.7 URL Parameter Tests

#### TC-020: Verify URL Updates with Filter Selections
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | Page loaded |
| **Steps** | 1. Apply various filters<br>2. Check URL parameters |
| **Expected Result** | URL reflects all applied filters as query parameters |
| **Status** | PASS |

#### TC-021: Verify Direct URL Access with Parameters
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | None |
| **Steps** | 1. Navigate directly to URL with filter parameters |
| **Expected Result** | Page loads with filters pre-applied based on URL parameters |
| **Status** | NOT TESTED |

### 4.8 Pagination Tests

#### TC-022: Verify Pagination Controls
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | Results exceed page size (25) |
| **Steps** | 1. Verify pagination info shows "1 - 25 of X"<br>2. Click Next Page button |
| **Expected Result** | Navigation controls work correctly, page info updates |
| **Status** | PASS |

---

## 5. Document Table Structure

### 5.1 Table Columns
| Column | Description |
|--------|-------------|
| File Type Icon | Visual indicator of file type (PDF, XLSX, DOC, etc.) |
| Title | Document title with link to download |
| Category | Document category |
| Sub-Category | Document sub-category |
| Language | Document language (English, Spanish, Both) |
| Date Published | Publication date |
| Actions | Download and Share (email) buttons |

---

## 6. Known Behaviors and Notes

1. **Dynamic Sub-Categories:** Sub-Category dropdown options update based on Category selection
2. **Date Filter:** Date Published is a calendar picker, not a simple dropdown
3. **Legacy Documents:** Some older documents may not have Date Published values populated
4. **Language "Both":** Some documents are marked as "Both" languages
5. **Overlay Behavior:** When a dropdown is open, clicking another dropdown requires first closing the current one (press Escape or click outside)

---

## 7. URL Parameter Reference

| Parameter | Description | Example Values |
|-----------|-------------|----------------|
| `category` | Selected category | `Communications`, `Programs%20-%20PA` |
| `subcategory` | Selected sub-category | `Press%20Releases`, `Official%20Letters` |
| `language` | Selected language | `English`, `Spanish` |
| `publishedDate` | Date for filtering | `2025%2F11%2F14` |
| `publishedDateOption` | Date filter type | `before`, `between`, `after` |
| `disasters` | Selected disaster | `Hurricane%20Maria`, `COVID-19` |
| `keyword` | Search term | `FEMA` |
| `sorting` | Sort direction | `publishedDate%20asc`, `publishedDate%20desc` |
| `sortColumn` | Column to sort by | `publishedDate`, `title` |
| `pageSize` | Results per page | `25` |
| `pageOffset` | Pagination offset | `0`, `25`, `50` |
| `lang` | Page language | `en`, `es` |

---

## 8. Test Execution Summary

| Category | Total | Passed | Failed | Not Tested |
|----------|-------|--------|--------|------------|
| Dropdown Population | 5 | 5 | 0 | 0 |
| Individual Filters | 5 | 5 | 0 | 0 |
| Combined Filters | 2 | 2 | 0 | 0 |
| Reset Functionality | 1 | 1 | 0 | 0 |
| Search Functionality | 2 | 2 | 0 | 0 |
| Sort Functionality | 4 | 4 | 0 | 0 |
| URL Parameters | 2 | 1 | 0 | 1 |
| Pagination | 1 | 1 | 0 | 0 |
| **TOTAL** | **22** | **21** | **0** | **1** |

---

## 9. Recommendations

1. **Date Filter Clarity:** Consider adding clearer labels or tooltips for the date filter options
2. **Empty Date Fields:** Investigate why some documents lack Date Published values
3. **Accessibility:** Ensure all dropdowns are keyboard accessible and screen reader friendly
4. **Performance:** Monitor load times when applying multiple filters
5. **Deep Linking:** Test direct URL access with pre-set parameters for sharing filtered views

---

## 10. Appendix: Test Data Samples

### Filter Result Counts (as observed during testing)
| Filter Combination | Result Count |
|--------------------|--------------|
| No filters (All) | 2,819 |
| Category: Communications | 742 |
| Category: Communications + Sub-Category: Press Releases | 684 |
| Category: Communications + Sub-Category: Press Releases + Language: English | 164 |
| Search: "FEMA" | 633 |

---

*Test plan generated by automated testing session on 2025-12-05*
