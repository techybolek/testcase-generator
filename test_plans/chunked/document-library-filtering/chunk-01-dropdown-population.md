# Chunk 1: Dropdown Population Tests

**Source Test Plan**: `test_plans/document_library_filtering_20251205.md`
**Test Group**: `document-library-filtering`
**Chunk**: 1 of 7
**Test Cases**: TC-001, TC-002, TC-003, TC-004, TC-005 (5 tests)
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

### Date Published Filter
- **Type:** Calendar date picker (not dropdown)
- **Options:**
  - Before (selected date)
  - Between (date range)
  - After (selected date)
- **Additional:** Reset Date option to clear selection
- **Format:** MM/DD/YYYY

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

## Test Cases

### TC-001: Verify Category Dropdown Population
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded successfully |
| **Steps** | 1. Navigate to Document Library page<br>2. Click on Category dropdown |
| **Expected Result** | Dropdown shows 17 options including "All" and all category types |
| **Status** | PASS |

### TC-002: Verify Sub-Category Dropdown Population
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded successfully |
| **Steps** | 1. Navigate to Document Library page<br>2. Select a Category (e.g., "Communications")<br>3. Click on Sub-Category dropdown |
| **Expected Result** | Dropdown shows relevant sub-categories for selected category |
| **Status** | PASS |

### TC-003: Verify Language Dropdown Population
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded successfully |
| **Steps** | 1. Navigate to Document Library page<br>2. Click on Language dropdown |
| **Expected Result** | Dropdown shows 3 options: All, English, Spanish |
| **Status** | PASS |

### TC-004: Verify Date Published Filter Population
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded successfully |
| **Steps** | 1. Navigate to Document Library page<br>2. Click on Date Published filter |
| **Expected Result** | Calendar date picker opens with Before/Between/After radio options and Reset Date link |
| **Status** | PASS |

### TC-005: Verify Disaster Dropdown Population
| Field | Value |
|-------|-------|
| **Priority** | High |
| **Preconditions** | Page loaded successfully |
| **Steps** | 1. Navigate to Document Library page<br>2. Click on Disaster dropdown |
| **Expected Result** | Dropdown shows 9 options including all disaster types |
| **Status** | PASS |

---

## Known Behaviors

1. **Dynamic Sub-Categories:** Sub-Category dropdown options update based on Category selection
2. **Date Filter:** Date Published is a calendar picker, not a simple dropdown
3. **Overlay Behavior:** When a dropdown is open, clicking another dropdown requires first closing the current one (press Escape or click outside)

---

## Shared Setup Requirements

- Navigate to Document Library page: https://recovery.pr.gov/en/document-library
- Wait for page to fully load
- Verify document count displays (should show approximately 2,819 documents)
