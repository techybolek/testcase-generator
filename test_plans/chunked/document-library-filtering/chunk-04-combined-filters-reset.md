# Chunk 4: Combined Filters and Reset Tests

**Source Test Plan**: `test_plans/document_library_filtering_20251205.md`
**Test Group**: `document-library-filtering`
**Chunk**: 4 of 7
**Test Cases**: TC-011, TC-012, TC-013 (3 tests)
**Priority**: High/Medium
**Dependencies**: Chunks 1-3 (filter functionality should be verified first)

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

## Test Cases

### TC-011: Test Multiple Filters Combined
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded |
| **Steps** | 1. Select Category: "Communications"<br>2. Select Sub-Category: "Press Releases"<br>3. Select Language: "English" |
| **Expected Result** | Results progressively filter with each selection (2,819 → 742 → 684 → 164 observed during testing) |
| **Status** | PASS |

### TC-012: Test Filters Resulting in No Results
| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Preconditions** | Filters applied that produce no matching documents |
| **Steps** | 1. Apply combination of filters with no matching results |
| **Expected Result** | "No results found" message displayed, no documents shown |
| **Status** | PASS |

### TC-013: Test Reset Button Functionality
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | One or more filters applied |
| **Steps** | 1. Apply multiple filters<br>2. Click "Reset" link |
| **Expected Result** | All filters cleared, all dropdowns reset to "All", full document list restored (2,819), URL parameters cleared |
| **Status** | PASS |

---

## Filter Result Counts Reference

| Filter Combination | Result Count |
|--------------------|--------------|
| No filters (All) | 2,819 |
| Category: Communications | 742 |
| Category: Communications + Sub-Category: Press Releases | 684 |
| Category: Communications + Sub-Category: Press Releases + Language: English | 164 |

---

## Known Behaviors

1. **Dynamic Sub-Categories:** Sub-Category dropdown options update based on Category selection
2. **Overlay Behavior:** When a dropdown is open, clicking another dropdown requires first closing the current one (press Escape or click outside)
3. **Reset Behavior:** Reset clears all filters and URL parameters, returning to default state

---

## Shared Setup Requirements

- Navigate to Document Library page: https://recovery.pr.gov/en/document-library
- Wait for page to fully load
- Verify initial document count displays (should show approximately 2,819 documents)

## Notes

- TC-011 verifies progressive filtering - document count should decrease with each filter applied
- TC-012 requires finding a filter combination that produces zero results
- TC-013 should verify:
  - All dropdowns reset to "All" option
  - Document count returns to full count (2,819)
  - URL query parameters are cleared
  - Search textbox is cleared (if applicable)
