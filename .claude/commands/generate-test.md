# Playwright Test Generator and Executor

You are a Playwright test code generator and executor. Your job is to read a detailed test case plan from a markdown file, generate working Playwright test code, execute it using Chromium, and ensure it passes.

## Input

- **Test Plan File**: $ARGUMENTS

## Instructions

1. **Read the Test Plan**: Use the Read tool to read the markdown file specified in the arguments. The file should be in the `test_plans/` directory or provided as a full path.

2. **Parse the Test Plan**: Extract the following information from the markdown:
   - **Metadata**: Initial URL, Business Scenario, Generated date
   - **Test Objective**: What the test validates
   - **Test Steps**: Each step with its action, target element, selector, input data, and expected result
   - **UI Elements**: The selector strategies from the UI Elements table
   - **Sample Assertions**: Any code snippets provided
   - **Test Data**: Required test data values

3. **Generate Playwright Test Code**: Create a TypeScript test file with:
   - Proper imports from `@playwright/test`
   - A descriptive test suite name based on the business scenario
   - Individual test steps as comments for clarity
   - Proper selectors using Playwright's recommended locator strategies (prefer `getByRole`, `getByText`, `getByLabel`)
   - Appropriate waits and assertions
   - Error handling where needed

4. **Output Location**: Save the generated test file to `tests/<scenario_name>.spec.ts`
   - Create the `tests/` directory if it doesn't exist
   - Use kebab-case for the filename derived from the scenario

## Code Generation Guidelines

### Structure Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('<Business Scenario>', () => {
  test('<Test Objective Summary>', async ({ page }) => {
    // Step 1: <Step Name>
    // <Step Description>
    await page.goto('<Initial URL>');

    // Step 2: <Step Name>
    // <Step Description>
    await page.<action>(<selector>);

    // ... continue for all steps

    // Final assertions
    await expect(<element>).<assertion>();
  });
});
```

### Best Practices to Follow

1. **Selectors**: Prefer in this order:
   - `page.getByRole()` - most resilient
   - `page.getByText()` - for text content
   - `page.getByLabel()` - for form fields
   - `page.getByPlaceholder()` - for inputs
   - `page.locator()` - last resort with CSS/XPath

2. **Waits**: Use auto-waiting where possible, add explicit waits only when needed:
   - `await page.waitForLoadState('networkidle')` - for page loads
   - `await page.waitForURL()` - for navigation
   - `await expect(element).toBeVisible()` - for element visibility

3. **Assertions**: Use Playwright's built-in assertions:
   - `expect(locator).toBeVisible()`
   - `expect(locator).toHaveText()`
   - `expect(locator).toHaveCount()`
   - `expect(page).toHaveURL()`
   - `expect(page).toHaveTitle()`

4. **Actions**: Use appropriate action methods:
   - `click()` - for buttons, links
   - `fill()` - for text inputs (clears first)
   - `type()` - for character-by-character input
   - `selectOption()` - for dropdowns
   - `check()` / `uncheck()` - for checkboxes

5. **Error Handling**: Add timeouts and retries for flaky elements:
   - Use `{ timeout: 10000 }` for slow-loading elements
   - Use `first()` when multiple elements might match

### Handling Common Patterns

**Navigation with redirect:**
```typescript
await page.goto('https://example.com');
await page.waitForLoadState('networkidle');
```

**Dropdown menus:**
```typescript
await page.getByRole('button', { name: 'Menu' }).click();
await page.getByRole('link', { name: 'Option' }).click();
```

**Form filling:**
```typescript
await page.getByRole('textbox', { name: 'Field' }).fill('value');
await page.getByRole('button', { name: 'Submit' }).click();
```

**Verifying results count:**
```typescript
const resultsText = await page.locator('text=Results').textContent();
const count = parseInt(resultsText?.match(/\d+/)?.[0] || '0', 10);
expect(count).toBeGreaterThan(0);
```

**Table verification:**
```typescript
const rows = page.getByRole('row');
await expect(rows).toHaveCount(expectedCount);
// Or verify specific cell content
await expect(page.getByRole('cell', { name: 'value' })).toBeVisible();
```

## Output and Execution

After generating the test file:

1. Display the generated code to the user
2. Save it to the `tests/` directory
3. **Execute the test using Chromium**:
   - Run the test with: `npx playwright test tests/<filename>.spec.ts --project=chromium`
   - Wait for the test to complete

4. **Analyze the test results**:
   - If the test **passes**: Report success and display the test output
   - If the test **fails**:
     - Analyze the error message and failure reason
     - Fix the test code (adjust selectors, waits, assertions, etc.)
     - Save the updated test file
     - Re-run the test
     - Repeat until the test passes (maximum 3 retry attempts)

5. **Final Report**:
   - Confirm the test passed with Chromium
   - Show the passing test output
   - Mention any fixes that were made during iteration
   - Note any assumptions or potential issues to watch for

**IMPORTANT**: Do not consider the task complete until the test has been executed and passes. The goal is a working, passing test - not just generated code.

## Debugging Failed Tests

When a test fails, use these strategies to fix it:

1. **Selector Issues**:
   - Use browser MCP tools (browser_snapshot, browser_navigate) to inspect the actual page structure
   - Try alternative selector strategies (role, text, placeholder, CSS)
   - Add `first()` if multiple elements match
   - Use more specific selectors with `{ exact: true }`

2. **Timing Issues**:
   - Add `waitForLoadState('networkidle')` after navigation
   - Add `waitForURL()` for page redirects
   - Increase timeout: `{ timeout: 30000 }`
   - Add explicit waits: `await page.waitForSelector('.element')`

3. **Dynamic Content**:
   - Wait for specific elements to appear before interacting
   - Use `toBeVisible()` assertions before clicks
   - Handle cookie consent or modal popups that might block interactions

4. **Common Fixes**:
   ```typescript
   // Wait for element to be visible before clicking
   await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
   await page.getByRole('button', { name: 'Submit' }).click();

   // Handle cookie consent popup
   const cookieButton = page.getByRole('button', { name: /accept|agree/i });
   if (await cookieButton.isVisible({ timeout: 3000 }).catch(() => false)) {
     await cookieButton.click();
   }

   // Use more robust waiting
   await page.waitForLoadState('domcontentloaded');
   await page.waitForLoadState('networkidle');
   ```

## Example

Given a test plan for "Search for jobs in Austin", generate:

```typescript
import { test, expect } from '@playwright/test';

test.describe('CGI Career Search - Austin', () => {
  test('should find at least 1 job listing in Austin', async ({ page }) => {
    // Step 1: Navigate to CGI Homepage
    await page.goto('https://www.cgi.com');

    // Step 2: Open Careers Menu
    await page.getByRole('button', { name: 'Careers' }).click();

    // Step 3: Navigate to Career Opportunities
    await page.getByRole('link', { name: 'Career opportunities' }).click();
    await page.waitForLoadState('networkidle');

    // Step 4: Enter City Search Term
    await page.getByRole('textbox', { name: 'City' }).fill('Austin');

    // Step 5: Execute Search
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await page.waitForLoadState('networkidle');

    // Step 6: Verify Search Results
    const resultsText = await page.locator('text=Search Results').first().textContent();
    const match = resultsText?.match(/Search Results \((\d+)\)/);
    const resultCount = match ? parseInt(match[1], 10) : 0;
    expect(resultCount).toBeGreaterThanOrEqual(1);

    // Alternative verification: Check for Austin in results
    await expect(page.getByRole('cell', { name: 'Austin' }).first()).toBeVisible();
  });
});
```

Now read the provided test plan file, generate the corresponding Playwright test code, execute it with Chromium, and iterate until it passes.
