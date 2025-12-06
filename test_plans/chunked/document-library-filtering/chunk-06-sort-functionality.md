# Chunk 6: Sort Functionality Tests

**Source Test Plan**: `test_plans/document_library_filtering_20251205.md`
**Test Group**: `document-library-filtering`
**Chunk**: 6 of 7
**Test Cases**: TC-016, TC-017, TC-018, TC-019 (4 tests)
**Priority**: High/Medium
**Dependencies**: None

---

## Test Environment

- **URL:** https://recovery.pr.gov/en/document-library
- **Application:** Puerto Rico Disaster Recovery Transparency Portal - COR3
- **Total Documents:** 2,819 (as of test date)

---

## Sort Component Reference

### Sort Dropdown (4 options)
| Option | Description |
|--------|-------------|
| Newest | Sort by published date descending (default) |
| Oldest | Sort by published date ascending |
| Title (A-Z) | Alphabetical sort by title |
| Title (Z-A) | Reverse alphabetical sort by title |

---

## URL Parameter Reference

| Parameter | Description | Example Values |
|-----------|-------------|----------------|
| `sorting` | Sort direction | `publishedDate%20asc`, `publishedDate%20desc` |
| `sortColumn` | Column to sort by | `publishedDate`, `title` |

---

## Test Cases

### TC-016: Test Sort by Newest (Default)
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded |
| **Steps** | 1. Verify default sort is "Newest"<br>2. Check document order in results |
| **Expected Result** | Documents sorted by published date descending (newest first) |
| **Status** | PASS |

### TC-017: Test Sort by Oldest
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded |
| **Steps** | 1. Click Sort dropdown<br>2. Select "Oldest" |
| **Expected Result** | Documents sorted by published date ascending (oldest first), URL updated with `sorting=publishedDate%20asc` |
| **Status** | PASS |

### TC-018: Test Sort by Title (A-Z)
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | Page loaded |
| **Steps** | 1. Click Sort dropdown<br>2. Select "Title (A-Z)" |
| **Expected Result** | Documents sorted alphabetically by title |
| **Status** | PASS |

### TC-019: Test Sort by Title (Z-A)
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | Page loaded |
| **Steps** | 1. Click Sort dropdown<br>2. Select "Title (Z-A)" |
| **Expected Result** | Documents sorted reverse alphabetically by title |
| **Status** | PASS |

---

## Document Table Structure

### Table Columns
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

## Known Behaviors

1. **Default Sort:** "Newest" is the default sort order when page loads
2. **URL Updates:** Sort selection updates URL with `sorting` parameter
3. **Legacy Documents:** Some older documents may not have Date Published values populated

---

## Shared Setup Requirements

- Navigate to Document Library page: https://recovery.pr.gov/en/document-library
- Wait for page to fully load
- Verify document list is displayed

## Notes

- TC-016 should verify default state without any user interaction
- For date-based sorts (Newest/Oldest), verify by checking the "Date Published" column
- For title-based sorts (A-Z/Z-A), verify by checking the first letter of document titles
- Verify URL parameters update correctly with each sort selection
