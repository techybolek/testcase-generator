# Chunk 3: Date and Disaster Filter Tests

**Source Test Plan**: `test_plans/document_library_filtering_20251205.md`
**Test Group**: `document-library-filtering`
**Chunk**: 3 of 7
**Test Cases**: TC-009, TC-010 (2 tests)
**Priority**: High/Medium
**Dependencies**: None

---

## Test Environment

- **URL:** https://recovery.pr.gov/en/document-library
- **Application:** Puerto Rico Disaster Recovery Transparency Portal - COR3
- **Total Documents:** 2,819 (as of test date)

---

## Filter Components Reference

### Date Published Filter
- **Type:** Calendar date picker (not dropdown)
- **Options:**
  - Before (selected date)
  - Between (date range)
  - After (selected date)
- **Additional:** Reset Date option to clear selection
- **Format:** MM/DD/YYYY
- **URL Parameters:** `publishedDate` and `publishedDateOption` (before/between/after)

### Disaster Dropdown (9 options)
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

---

## URL Parameter Reference

| Parameter | Description | Example Values |
|-----------|-------------|----------------|
| `publishedDate` | Date for filtering | `2025%2F11%2F14` |
| `publishedDateOption` | Date filter type | `before`, `between`, `after` |
| `disasters` | Selected disaster | `Hurricane%20Maria`, `COVID-19` |

---

## Test Cases

### TC-009: Test Date Published Filter - Before Option
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | Page loaded |
| **Steps** | 1. Click Date Published filter<br>2. Select "Before" radio option<br>3. Select a date from calendar |
| **Expected Result** | Results filtered to show documents published before selected date |
| **URL Parameters** | `publishedDate=YYYY%2FMM%2FDD&publishedDateOption=before` |
| **Status** | PASS |

### TC-010: Test Disaster Filter Functionality
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded |
| **Steps** | 1. Select "Hurricane Maria" from Disaster dropdown |
| **Expected Result** | Results filtered to show only Hurricane Maria related documents |
| **URL Parameter** | `disasters=Hurricane%20Maria` |
| **Status** | PASS |

---

## Known Behaviors

1. **Date Filter:** Date Published is a calendar picker, not a simple dropdown
2. **Legacy Documents:** Some older documents may not have Date Published values populated
3. **Overlay Behavior:** When a dropdown is open, clicking another dropdown requires first closing the current one (press Escape or click outside)

---

## Shared Setup Requirements

- Navigate to Document Library page: https://recovery.pr.gov/en/document-library
- Wait for page to fully load
- Verify document count displays

## Notes

- Date filter is more complex than regular dropdowns - it uses a calendar picker with radio options
- Date filter has two URL parameters: `publishedDate` for the date and `publishedDateOption` for the filter type
- Date format in URL is encoded (slashes become %2F)
- Consider testing both date picker interaction and URL parameter updates
