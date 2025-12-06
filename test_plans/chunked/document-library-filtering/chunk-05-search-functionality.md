# Chunk 5: Search Functionality Tests

**Source Test Plan**: `test_plans/document_library_filtering_20251205.md`
**Test Group**: `document-library-filtering`
**Chunk**: 5 of 7
**Test Cases**: TC-014, TC-015 (2 tests)
**Priority**: High/Medium
**Dependencies**: None

---

## Test Environment

- **URL:** https://recovery.pr.gov/en/document-library
- **Application:** Puerto Rico Disaster Recovery Transparency Portal - COR3
- **Total Documents:** 2,819 (as of test date)

---

## Search Component Reference

### Search Textbox
- **Location:** Main filter area on Document Library page
- **Behavior:** Filters documents by keyword
- **Trigger:** Press Enter or auto-search after typing
- **URL Parameter:** `keyword=<search term>`

---

## URL Parameter Reference

| Parameter | Description | Example Values |
|-----------|-------------|----------------|
| `keyword` | Search term | `FEMA` |
| `category` | Selected category | `Communications` |
| `subcategory` | Selected sub-category | `Press%20Releases` |
| `language` | Selected language | `English`, `Spanish` |

---

## Test Cases

### TC-014: Test Search Textbox Basic Functionality
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded |
| **Steps** | 1. Type "FEMA" in search textbox<br>2. Press Enter or wait for auto-search |
| **Expected Result** | Results filtered to show documents containing "FEMA" (633 results observed during testing) |
| **URL Parameter** | `keyword=FEMA` |
| **Status** | PASS |

### TC-015: Test Search Combined with Filters
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | Page loaded |
| **Steps** | 1. Apply a Category filter<br>2. Type search term in textbox |
| **Expected Result** | Results filtered by both category and search term |
| **Status** | PASS |

---

## Filter Result Counts Reference

| Filter Combination | Result Count |
|--------------------|--------------|
| No filters (All) | 2,819 |
| Search: "FEMA" | 633 |

---

## Known Behaviors

1. **Search Trigger:** Search may auto-trigger after typing or require Enter key press
2. **Combined Filtering:** Search works in combination with dropdown filters
3. **URL Updates:** Search term appears as `keyword` parameter in URL

---

## Shared Setup Requirements

- Navigate to Document Library page: https://recovery.pr.gov/en/document-library
- Wait for page to fully load
- Verify document count displays

## Notes

- Verify search works with various keywords
- Check that search combines properly with other filters
- Confirm URL parameter updates correctly
- Test both Enter key submission and auto-search (if applicable)
