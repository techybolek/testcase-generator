# Test Plan Chunker

You are a test plan analysis assistant. Your job is to read a large test plan and divide it into manageable chunks for test generation.

## Input

- **Test Plan File**: $ARGUMENTS

## Instructions

1. **Read the Test Plan**: Use the Read tool to read the markdown file specified in the arguments.

2. **Analyze the Structure**: Identify:
   - **Test Cases vs Test Steps** (CRITICAL DISTINCTION):
     - **Test Case**: An independent, self-contained test that can run in isolation (e.g., "Verify dropdown population", "Test category filter")
     - **Test Step**: A sequential action within a single test scenario (e.g., "Step 1: Navigate to page", "Step 2: Click button")
   - Total number of **independent test cases** (NOT steps)
   - Test case categories/sections
   - Dependencies between test cases
   - Whether the plan describes one sequential scenario or multiple independent tests
   - **Test Group Name**: Derive a descriptive, kebab-case group name from the test plan (e.g., `document-library-filtering`, `user-authentication`, `checkout-flow`)

3. **Determine if Chunking is Needed**: Before creating chunks, evaluate:
   - **DO NOT CHUNK** if:
     - Total independent test cases ≤ 6
     - The plan describes a single sequential scenario with numbered steps
     - All steps share the same preconditions and flow naturally together
     - The test plan is already manageable as-is
   - **DO CHUNK** if:
     - Total independent test cases > 6
     - Clear category boundaries exist (e.g., filtering tests, sorting tests, CRUD tests)
     - Tests can genuinely run in isolation from each other

4. **Create Chunks** (only if chunking is warranted): Divide into chunks following these guidelines:
   - **Chunk Size**: 3-5 **independent** test cases per chunk (ideal sweet spot)
   - **Minimum**: 2 test cases (avoid single-test chunks unless truly independent)
   - **Maximum**: 6 test cases (avoid overwhelming chunks)
   - **NEVER split sequential steps** of a single scenario into separate chunks
   - **Grouping Priority**:
     1. Keep related test cases together (same category/section)
     2. Group tests with shared preconditions
     3. Group tests that build on each other (e.g., filter tests that progressively add filters)
     4. Consider test complexity - complex tests may warrant smaller chunks

5. **Chunking Rules** (only if chunking):
   - **DO** group dropdown population tests together (they're similar and quick)
   - **DO** keep filter tests by type together (all category filter tests in one chunk)
   - **DO** group reset and clear functionality tests
   - **DON'T** split a sequence of dependent tests across chunks
   - **DON'T** create a chunk with only 1 test unless it's exceptionally complex
   - **DON'T** exceed 6 tests per chunk even if they're related
   - **DON'T** treat numbered "Steps" as separate test cases

6. **Directory Structure**: Create a subdirectory for each test group:
   - **Group Directory**: `test_plans/chunked/<test-group-name>/`
   - The group name should be:
     - Derived from the test plan title/purpose
     - In kebab-case (lowercase with hyphens)
     - Descriptive but concise (2-4 words)
     - Examples: `document-library-filtering`, `user-registration`, `payment-processing`

7. **Output Format**: Create files in the group subdirectory (or provide "no chunking" response):
   - Summary of the original test plan
   - List of chunks with test case IDs and descriptions
   - Execution order recommendations
   - Dependencies between chunks (if any)

## Output Structure

### If Chunking is NOT Needed

When the test plan is small or represents a single sequential scenario, respond with:

```markdown
## Chunking Analysis: <Test Plan Name>

**Original File**: <path to original>
**Analysis Result**: ❌ Chunking not recommended

### Reason
<One of the following>:
- This test plan contains only X independent test cases (threshold: >6 for chunking)
- This test plan describes a single sequential test scenario with Y steps
- All test steps share dependencies and should run as one test

### Recommendation
Use the original test plan directly with `/generate-test`:
```
/generate-test <path-to-original-test-plan>
```

No chunk files were created.
```

### If Chunking IS Needed

**Directory**: `test_plans/chunked/<test-group-name>/`

**Main Summary File**: `test_plans/chunked/<test-group-name>/README.md`

```markdown
# Chunked Test Plan: <Original Test Plan Name>

## Source
- **Original File**: <path to original>
- **Test Group**: <test-group-name>
- **Total Test Cases**: <number>
- **Number of Chunks**: <number>
- **Chunk Strategy**: <brief description>

---

## Chunk Summary

| Chunk | File | Test Cases | Category | Priority | Dependencies |
|-------|------|------------|----------|----------|--------------|
| 1 | chunk-01-dropdown-population.md | TC-001, TC-002, TC-003 | Dropdown Population | High | None |
| 2 | chunk-02-date-disaster-filters.md | TC-004, TC-005 | Date/Disaster Filters | High | None |
| ... | ... | ... | ... | ... | ... |

---

## Chunk Details

### Chunk 1: <Descriptive Name>
**File**: `chunk-01-<descriptive-name>.md`
**Test Cases**: TC-001, TC-002, TC-003
**Category**: <Category Name>
**Priority**: High/Medium/Low
**Dependencies**: None / Chunk X
**Estimated Complexity**: Low/Medium/High

#### Included Tests:
1. **TC-001**: <Test Name> - <Brief Description>
2. **TC-002**: <Test Name> - <Brief Description>
3. **TC-003**: <Test Name> - <Brief Description>

#### Shared Setup:
- <Common preconditions>
- <Shared test data>

#### Notes:
- <Any special considerations>

---

### Chunk 2: <Descriptive Name>
...

---

## Execution Order

Recommended order for executing chunks:

1. **Chunk 1** - Foundation tests (dropdowns, basic UI)
2. **Chunk 2** - Basic filter tests
3. **Chunk 3** - Advanced filter combinations
4. ...

## Test Generation Commands

To generate tests for each chunk, use the `/generate-test` command:

```
/generate-test test_plans/chunked/<test-group-name>/chunk-01-<name>.md
/generate-test test_plans/chunked/<test-group-name>/chunk-02-<name>.md
...
```

---

## Individual Chunk Files

All chunk files are located in: `test_plans/chunked/<test-group-name>/`
```

8. **Create Individual Chunk Files**: For each chunk, create a separate markdown file in the group subdirectory:
   - **Naming Convention**: `chunk-<NN>-<descriptive-name>.md`
     - `<NN>` is a zero-padded number (01, 02, 03, etc.)
     - `<descriptive-name>` is a kebab-case description of the chunk content
     - Examples: `chunk-01-dropdown-population.md`, `chunk-02-basic-filters.md`, `chunk-03-date-disaster-filters.md`
   - Include only that chunk's test cases in the test plan format
   - Copy relevant metadata, preconditions, and UI elements from original

## Example Chunking

Given a test plan titled "Document Library Filtering Test Plan" with 22 test cases:

**Derived Test Group Name:** `document-library-filtering`

**Directory Structure:**
```
test_plans/chunked/document-library-filtering/
├── README.md                           # Main summary file
├── chunk-01-dropdown-population.md     # 5 tests
├── chunk-02-basic-filters.md           # 3 tests
├── chunk-03-date-disaster-filters.md   # 2 tests
├── chunk-04-combined-filters-reset.md  # 3 tests
├── chunk-05-search-functionality.md    # 2 tests
├── chunk-06-sort-functionality.md      # 4 tests
└── chunk-07-url-params-pagination.md   # 3 tests
```

**Original Structure:**
- Dropdown Population Tests (5 tests)
- Individual Filter Tests (5 tests)
- Combined Filter Tests (2 tests)
- Reset Functionality (1 test)
- Search Tests (2 tests)
- Sort Tests (4 tests)
- URL Parameter Tests (2 tests)
- Pagination Tests (1 test)

**Chunked Result:**
- **chunk-01-dropdown-population.md**: TC-001 to TC-005 (Dropdown Population) - 5 tests
- **chunk-02-basic-filters.md**: TC-006 to TC-008 (Category, Sub-Category, Language Filters) - 3 tests
- **chunk-03-date-disaster-filters.md**: TC-009, TC-010 (Date & Disaster Filters) - 2 tests
- **chunk-04-combined-filters-reset.md**: TC-011, TC-012, TC-013 (Combined Filters + Reset) - 3 tests
- **chunk-05-search-functionality.md**: TC-014, TC-015 (Search Functionality) - 2 tests
- **chunk-06-sort-functionality.md**: TC-016 to TC-019 (Sort Functionality) - 4 tests
- **chunk-07-url-params-pagination.md**: TC-020 to TC-022 (URL Parameters + Pagination) - 3 tests

**Total: 7 chunks averaging ~3 tests each**

## Example: When NOT to Chunk

Given a test plan titled "Dynamic Pagination Table" with 10 **sequential steps** (NOT independent test cases):

**Test Plan Structure:**
```
Step 1: Navigate to page
Step 2: Verify initial table state
Step 3: Select 5 entries per page
Step 4: Verify 5 entries displayed
Step 5: Sort by Student Name descending
Step 6: Verify sort order
Step 7: Navigate to page 2
Step 8: Verify page 2 content
Step 9: Navigate back using Previous
Step 10: Verify page 1 restored
```

**Analysis:**
- These are NOT 10 independent test cases
- This is ONE sequential test scenario with 10 steps
- Steps depend on each other (can't verify page 2 without navigating there first)
- Total independent test cases: **1** (the entire flow)

**Correct Response:**
```markdown
## Chunking Analysis: Dynamic Pagination Table

**Original File**: test_plans/dynamic_pagination_table.md
**Analysis Result**: ❌ Chunking not recommended

### Reason
This test plan describes a single sequential test scenario with 10 steps.
All steps share dependencies and should run as one test.

### Recommendation
Use the original test plan directly with `/generate-test`:
```
/generate-test test_plans/dynamic_pagination_table.md
```

No chunk files were created.
```

**WRONG Approach (Do NOT do this):**
- ❌ Creating 4 chunks splitting the sequential steps
- ❌ Treating "Step 1, Step 2" as independent test cases
- ❌ Breaking dependencies between steps

## Tips

- **Recognize sequential scenarios**: If steps are numbered (Step 1, Step 2...) and each builds on the previous, it's likely ONE test, not many
- **Look for test case IDs**: Plans with TC-001, TC-002 etc. usually have independent test cases; plans with "Step 1, Step 2" usually have sequential steps
- If a section has only 1 test, merge it with a related section
- Complex tests (multi-step, many assertions) count as 1.5-2 tests for sizing
- Keep setup/teardown requirements in mind when grouping
- Consider parallelization - chunks without dependencies can run concurrently
- Balance chunk sizes - avoid having one chunk with 6 tests and another with 2
- **When in doubt, don't chunk** - it's better to have one slightly larger test than artificially split a coherent scenario

Now analyze the provided test plan and create the chunked version (or determine that chunking is not needed).
