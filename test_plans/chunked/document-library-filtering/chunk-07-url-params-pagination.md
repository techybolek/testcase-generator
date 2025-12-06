# Chunk 7: URL Parameters and Pagination Tests

**Source Test Plan**: `test_plans/document_library_filtering_20251205.md`
**Test Group**: `document-library-filtering`
**Chunk**: 7 of 7
**Test Cases**: TC-020, TC-021, TC-022 (3 tests)
**Priority**: Medium
**Dependencies**: None

---

## Test Environment

- **URL:** https://recovery.pr.gov/en/document-library
- **Application:** Puerto Rico Disaster Recovery Transparency Portal - COR3
- **Total Documents:** 2,819 (as of test date)
- **Results Per Page:** 25

---

## URL Parameter Reference

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

## Test Cases

### TC-020: Verify URL Updates with Filter Selections
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | Page loaded |
| **Steps** | 1. Apply various filters<br>2. Check URL parameters |
| **Expected Result** | URL reflects all applied filters as query parameters |
| **Status** | PASS |

### TC-021: Verify Direct URL Access with Parameters
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | None |
| **Steps** | 1. Navigate directly to URL with filter parameters |
| **Expected Result** | Page loads with filters pre-applied based on URL parameters |
| **Status** | NOT TESTED |

### TC-022: Verify Pagination Controls
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | Results exceed page size (25) |
| **Steps** | 1. Verify pagination info shows "1 - 25 of X"<br>2. Click Next Page button |
| **Expected Result** | Navigation controls work correctly, page info updates |
| **Status** | PASS |

---

## Pagination Reference

- **Page Size:** 25 documents per page
- **Display Format:** "1 - 25 of X" where X is total document count
- **Navigation:** Next/Previous page buttons
- **URL Parameters:** `pageSize` and `pageOffset`

---

## Known Behaviors

1. **Deep Linking:** URLs with filter parameters should restore the filtered state
2. **Pagination State:** Changing filters resets pagination to first page
3. **URL Encoding:** Special characters in filter values are URL-encoded

---

## Shared Setup Requirements

- Navigate to Document Library page: https://recovery.pr.gov/en/document-library
- Wait for page to fully load
- For TC-021, have example URLs with filter parameters ready

## Example URLs for Deep Linking Tests

```
# Category filter
https://recovery.pr.gov/en/document-library?category=Communications

# Multiple filters
https://recovery.pr.gov/en/document-library?category=Communications&language=English

# Search with filter
https://recovery.pr.gov/en/document-library?keyword=FEMA&category=Communications

# Sort applied
https://recovery.pr.gov/en/document-library?sorting=publishedDate%20asc
```

## Notes

- TC-021 is marked as "NOT TESTED" in original plan - this is an important test for deep linking functionality
- Verify that bookmarking a filtered view works correctly
- Test pagination navigation both forward and backward
- Verify pagination info updates correctly when navigating pages
