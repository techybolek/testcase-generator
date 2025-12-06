# Chunked Test Plan: Document Library Filtering Test Plan

## Source
- **Original File**: `test_plans/document_library_filtering_20251205.md`
- **Test Group**: `document-library-filtering`
- **Total Test Cases**: 22
- **Number of Chunks**: 7
- **Chunk Strategy**: Grouped by functional area with related tests kept together. Dropdown population tests grouped as similar quick tests. Filter tests split by complexity (basic vs date/disaster). Combined filters merged with reset functionality. Sort tests grouped together due to similar verification patterns.

---

## Chunk Summary

| Chunk | File | Test Cases | Category | Priority | Dependencies |
|-------|------|------------|----------|----------|--------------|
| 1 | chunk-01-dropdown-population.md | TC-001, TC-002, TC-003, TC-004, TC-005 | Dropdown Population | High | None |
| 2 | chunk-02-basic-filters.md | TC-006, TC-007, TC-008 | Basic Filter Functionality | High | None |
| 3 | chunk-03-date-disaster-filters.md | TC-009, TC-010 | Date & Disaster Filters | High/Medium | None |
| 4 | chunk-04-combined-filters-reset.md | TC-011, TC-012, TC-013 | Combined Filters & Reset | High/Medium | Chunks 1-3 |
| 5 | chunk-05-search-functionality.md | TC-014, TC-015 | Search Functionality | High/Medium | None |
| 6 | chunk-06-sort-functionality.md | TC-016, TC-017, TC-018, TC-019 | Sort Functionality | High/Medium | None |
| 7 | chunk-07-url-params-pagination.md | TC-020, TC-021, TC-022 | URL Parameters & Pagination | Medium | None |

---

## Chunk Details

### Chunk 1: Dropdown Population
**File**: `chunk-01-dropdown-population.md`
**Test Cases**: TC-001, TC-002, TC-003, TC-004, TC-005
**Category**: Dropdown Population
**Priority**: High
**Dependencies**: None
**Estimated Complexity**: Low

#### Included Tests:
1. **TC-001**: Verify Category Dropdown Population - Check all 17 category options are present
2. **TC-002**: Verify Sub-Category Dropdown Population - Check dynamic sub-category options based on category
3. **TC-003**: Verify Language Dropdown Population - Check 3 language options (All, English, Spanish)
4. **TC-004**: Verify Date Published Filter Population - Check calendar picker with Before/Between/After options
5. **TC-005**: Verify Disaster Dropdown Population - Check all 9 disaster options are present

#### Shared Setup:
- Navigate to Document Library page (https://recovery.pr.gov/en/document-library)
- Page must be fully loaded

#### Notes:
- These are quick verification tests checking UI element population
- TC-002 requires selecting a category first to test dynamic behavior

---

### Chunk 2: Basic Filter Functionality
**File**: `chunk-02-basic-filters.md`
**Test Cases**: TC-006, TC-007, TC-008
**Category**: Basic Filter Functionality
**Priority**: High
**Dependencies**: None
**Estimated Complexity**: Medium

#### Included Tests:
1. **TC-006**: Test Category Filter Functionality - Filter by "Communications" category
2. **TC-007**: Test Sub-Category Filter Functionality - Filter by "Press Releases" sub-category
3. **TC-008**: Test Language Filter Functionality - Filter by "English" language

#### Shared Setup:
- Navigate to Document Library page
- Page loaded with all 2,819 documents visible

#### Notes:
- TC-007 depends on having a category selected first
- Verify URL parameters update correctly with each filter

---

### Chunk 3: Date and Disaster Filters
**File**: `chunk-03-date-disaster-filters.md`
**Test Cases**: TC-009, TC-010
**Category**: Date & Disaster Filters
**Priority**: High/Medium
**Dependencies**: None
**Estimated Complexity**: Medium

#### Included Tests:
1. **TC-009**: Test Date Published Filter - Before Option - Test calendar date picker with "Before" option
2. **TC-010**: Test Disaster Filter Functionality - Filter by "Hurricane Maria" disaster

#### Shared Setup:
- Navigate to Document Library page
- Page fully loaded

#### Notes:
- Date filter uses a calendar picker rather than dropdown
- Date filter has special URL parameters (publishedDate and publishedDateOption)
- These filters are more complex than basic dropdowns

---

### Chunk 4: Combined Filters and Reset
**File**: `chunk-04-combined-filters-reset.md`
**Test Cases**: TC-011, TC-012, TC-013
**Category**: Combined Filters & Reset
**Priority**: High/Medium
**Dependencies**: Chunks 1-3 (filter functionality should be verified first)
**Estimated Complexity**: Medium-High

#### Included Tests:
1. **TC-011**: Test Multiple Filters Combined - Apply Category + Sub-Category + Language filters progressively
2. **TC-012**: Test Filters Resulting in No Results - Apply filters that produce no matches
3. **TC-013**: Test Reset Button Functionality - Reset all filters to default state

#### Shared Setup:
- Navigate to Document Library page
- Understanding of individual filter behavior

#### Notes:
- TC-011 verifies progressive filtering (2,819 → 742 → 684 → 164)
- TC-012 requires finding a filter combination that produces zero results
- TC-013 verifies complete state reset including URL parameters

---

### Chunk 5: Search Functionality
**File**: `chunk-05-search-functionality.md`
**Test Cases**: TC-014, TC-015
**Category**: Search Functionality
**Priority**: High/Medium
**Dependencies**: None
**Estimated Complexity**: Medium

#### Included Tests:
1. **TC-014**: Test Search Textbox Basic Functionality - Search for "FEMA" keyword
2. **TC-015**: Test Search Combined with Filters - Combine search with category filter

#### Shared Setup:
- Navigate to Document Library page
- Page fully loaded

#### Notes:
- Search may auto-trigger or require Enter key press
- URL updates with `keyword` parameter
- Search works in combination with other filters

---

### Chunk 6: Sort Functionality
**File**: `chunk-06-sort-functionality.md`
**Test Cases**: TC-016, TC-017, TC-018, TC-019
**Category**: Sort Functionality
**Priority**: High/Medium
**Dependencies**: None
**Estimated Complexity**: Medium

#### Included Tests:
1. **TC-016**: Test Sort by Newest (Default) - Verify default sort order is newest first
2. **TC-017**: Test Sort by Oldest - Sort by published date ascending
3. **TC-018**: Test Sort by Title (A-Z) - Alphabetical sort by title
4. **TC-019**: Test Sort by Title (Z-A) - Reverse alphabetical sort by title

#### Shared Setup:
- Navigate to Document Library page
- Page fully loaded with documents

#### Notes:
- All 4 sort options are from the same dropdown
- URL parameters update with `sorting` and `sortColumn`
- Need to verify actual document order, not just dropdown selection

---

### Chunk 7: URL Parameters and Pagination
**File**: `chunk-07-url-params-pagination.md`
**Test Cases**: TC-020, TC-021, TC-022
**Category**: URL Parameters & Pagination
**Priority**: Medium
**Dependencies**: None
**Estimated Complexity**: Medium

#### Included Tests:
1. **TC-020**: Verify URL Updates with Filter Selections - Check URL reflects applied filters
2. **TC-021**: Verify Direct URL Access with Parameters - Navigate directly with pre-set filter parameters
3. **TC-022**: Verify Pagination Controls - Test pagination navigation and info display

#### Shared Setup:
- Navigate to Document Library page
- Understand URL parameter structure

#### Notes:
- TC-021 is marked as "NOT TESTED" in original plan - important to implement
- Pagination shows "1 - 25 of X" format with 25 results per page
- Deep linking is important for sharing filtered views

---

## Execution Order

Recommended order for executing chunks:

1. **Chunk 1** - Foundation tests (dropdowns, basic UI verification)
2. **Chunk 2** - Basic filter functionality tests
3. **Chunk 3** - Advanced filter tests (date picker, disaster)
4. **Chunk 4** - Combined filters and reset functionality (depends on filters working)
5. **Chunk 5** - Search functionality tests
6. **Chunk 6** - Sort functionality tests
7. **Chunk 7** - URL parameters and pagination (can verify deep linking)

**Parallelization Note**: Chunks 1, 2, 3, 5, 6, and 7 can run in parallel as they have no dependencies. Chunk 4 should run after Chunks 1-3 are validated.

---

## Test Generation Commands

To generate tests for each chunk, use the `/generate-test` command:

```
/generate-test test_plans/chunked/document-library-filtering/chunk-01-dropdown-population.md
/generate-test test_plans/chunked/document-library-filtering/chunk-02-basic-filters.md
/generate-test test_plans/chunked/document-library-filtering/chunk-03-date-disaster-filters.md
/generate-test test_plans/chunked/document-library-filtering/chunk-04-combined-filters-reset.md
/generate-test test_plans/chunked/document-library-filtering/chunk-05-search-functionality.md
/generate-test test_plans/chunked/document-library-filtering/chunk-06-sort-functionality.md
/generate-test test_plans/chunked/document-library-filtering/chunk-07-url-params-pagination.md
```

---

## Individual Chunk Files

All chunk files are located in: `test_plans/chunked/document-library-filtering/`

| File | Description |
|------|-------------|
| `README.md` | This summary file |
| `chunk-01-dropdown-population.md` | Dropdown population verification tests |
| `chunk-02-basic-filters.md` | Category, Sub-Category, Language filter tests |
| `chunk-03-date-disaster-filters.md` | Date picker and Disaster filter tests |
| `chunk-04-combined-filters-reset.md` | Multiple filters and reset functionality tests |
| `chunk-05-search-functionality.md` | Search textbox functionality tests |
| `chunk-06-sort-functionality.md` | Sort dropdown functionality tests |
| `chunk-07-url-params-pagination.md` | URL parameters and pagination tests |

---

*Chunked test plan generated on 2025-12-06*
