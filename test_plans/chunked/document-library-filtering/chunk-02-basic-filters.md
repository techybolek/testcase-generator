# Chunk 2: Basic Filter Functionality Tests

**Source Test Plan**: `test_plans/document_library_filtering_20251205.md`
**Test Group**: `document-library-filtering`
**Chunk**: 2 of 7
**Test Cases**: TC-006, TC-007, TC-008 (3 tests)
**Priority**: High
**Dependencies**: None

---

## Test Environment

- **URL:** https://recovery.pr.gov/en/document-library
- **Application:** Puerto Rico Disaster Recovery Transparency Portal - COR3
- **Total Documents:** 2,819 (as of test date)

---

## Filter Components Reference

### Category Dropdown (17 options)
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

### Sub-Category Dropdown (Dynamic)
- **Behavior:** Options change based on selected Category
- **Default:** "All"
- **Example for "Communications" category:**
  - All
  - Official Letters
  - Press Releases
  - Public Briefings
  - Reports
  - Webinar Presentations

### Language Dropdown (3 options)
| Option | Description |
|--------|-------------|
| All | Shows documents in all languages |
| English | English language documents only |
| Spanish | Spanish language documents only |

---

## URL Parameter Reference

| Parameter | Description | Example Values |
|-----------|-------------|----------------|
| `category` | Selected category | `Communications`, `Programs%20-%20PA` |
| `subcategory` | Selected sub-category | `Press%20Releases`, `Official%20Letters` |
| `language` | Selected language | `English`, `Spanish` |

---

## Test Cases

### TC-006: Test Category Filter Functionality
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded with all 2,819 documents |
| **Steps** | 1. Select "Communications" from Category dropdown |
| **Expected Result** | Results filtered to show only Communications documents (742 results observed during testing) |
| **URL Parameter** | `category=Communications` |
| **Status** | PASS |

### TC-007: Test Sub-Category Filter Functionality
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Category filter applied (Communications) |
| **Steps** | 1. Select "Press Releases" from Sub-Category dropdown |
| **Expected Result** | Results further filtered to show only Press Releases within Communications |
| **URL Parameter** | `subcategory=Press%20Releases` |
| **Status** | PASS |

### TC-008: Test Language Filter Functionality
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded |
| **Steps** | 1. Select "English" from Language dropdown |
| **Expected Result** | Results filtered to show only English language documents |
| **URL Parameter** | `language=English` |
| **Status** | PASS |

---

## Known Behaviors

1. **Dynamic Sub-Categories:** Sub-Category dropdown options update based on Category selection
2. **URL Updates:** Each filter selection updates the URL with corresponding query parameters
3. **Overlay Behavior:** When a dropdown is open, clicking another dropdown requires first closing the current one (press Escape or click outside)

---

## Filter Result Counts Reference

| Filter Combination | Result Count |
|--------------------|--------------|
| No filters (All) | 2,819 |
| Category: Communications | 742 |

---

## Shared Setup Requirements

- Navigate to Document Library page: https://recovery.pr.gov/en/document-library
- Wait for page to fully load
- Verify initial document count displays (should show approximately 2,819 documents)

## Notes

- TC-007 depends on having a category selected first (Communications)
- Verify URL parameters update correctly with each filter selection
- Check that document count updates after each filter is applied
