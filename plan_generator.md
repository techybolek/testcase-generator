# Test Case Plan Generator - Agent Instructions

This document describes how to use Claude Code with the Playwright MCP server to generate test case plans.

## How to Use

Simply ask Claude Code to generate a test plan by providing:

1. **Initial URL** - The starting page for the test
2. **Business Scenario** - What you want to test (e.g., "User login flow", "Add item to cart", "Submit contact form")

### Example Prompts

```
Generate a test plan for https://example.com to test the user registration flow
```

```
Create a test case plan for https://myapp.com/login - I want to test that users can log in with valid credentials and see their dashboard
```

```
Plan a test for https://shop.example.com to test adding a product to the cart and proceeding to checkout
```

## What the Agent Does

1. **Navigates** to the provided URL using `browser_navigate`
2. **Takes a snapshot** of the page using `browser_snapshot` to identify all interactive elements
3. **Analyzes** the page structure to understand available actions
4. **Captures multiple selector strategies** for each element (primary + 2 fallbacks)
5. **Documents wait conditions** between steps (before action, after action, timeouts)
6. **Classifies all data values** by variability type (STATIC, DYNAMIC, ENV_VAR, DATE_RELATIVE)
7. **Simulates** the user journey based on the business scenario
8. **Records** each step with element references, actions, and expected results
9. **Generates** a detailed markdown test plan file

## Output Format

The agent creates a markdown file in the `test_plans/` directory with:

- Test metadata (URL, scenario, timestamp)
- Pre-conditions
- Numbered test steps with:
  - Action description
  - Action type (`click` | `fill` | `type` | `navigate` | `assert` | `select`)
  - Target element with **Selector Chain**:
    - Primary selector (preferred: `getByTestId`, `getByRole`)
    - Fallback 1 (alternative: `getByPlaceholder`, `getByLabel`)
    - Fallback 2 (CSS selector as last resort)
  - **Wait Strategy**:
    - Wait before action (e.g., element visible, enabled)
    - Wait after action (e.g., URL change, toast appears, element visible)
    - Timeout in milliseconds
  - Input data with **Data Classification**:
    - Value
    - Type: `STATIC` | `DYNAMIC` | `ENV_VAR` | `DATE_RELATIVE`
    - Pattern/regex (for DYNAMIC values)
    - Environment variable name (for ENV_VAR values)
  - Expected result
- UI elements table (with Primary + Fallback selectors)
- Data classification summary
- Wait strategies reference
- Post-conditions
- Test data requirements

## MCP Tools Used

| Tool | Purpose |
|------|---------|
| `browser_navigate` | Navigate to URLs |
| `browser_snapshot` | Capture page structure and elements |
| `browser_click` | Click on elements |
| `browser_type` | Enter text in fields |
| `browser_fill_form` | Fill multiple form fields |
| `browser_select_option` | Select dropdown options |
| `browser_wait_for` | Wait for elements/text |
| `browser_take_screenshot` | Capture visual state |

## Data Classification Reference

When documenting test data, classify each value using these types:

| Type | Description | Example |
|------|-------------|---------|
| `STATIC` | Fixed value, same every test run | Service name: `"Men's Alterations"` |
| `DYNAMIC` | Changes per execution, use regex pattern | Confirmation code: `/^[A-Z0-9]{6}$/` |
| `ENV_VAR` | Loaded from environment/.env file | Email: `process.env.LOGIN_USER` |
| `DATE_RELATIVE` | Calculated from current date | Available date: `"today + 1 day"` |

### Security: Credentials Handling

**IMPORTANT: Never hardcode credentials in test plans or generated test code.**

All sensitive data MUST be classified as `ENV_VAR` and reference environment variables:

| Credential Type | Environment Variable | Plan Format |
|-----------------|---------------------|-------------|
| Email/Username | `LOGIN_USER` | `process.env.LOGIN_USER` |
| Password | `LOGIN_PASSWORD` | `process.env.LOGIN_PASSWORD` |
| API Keys | `API_KEY` | `process.env.API_KEY` |
| Auth Tokens | `AUTH_TOKEN` | `process.env.AUTH_TOKEN` |

When documenting steps with credentials:
```markdown
- **Input Data**:
  - Value: `[MASKED]`
  - Classification: `ENV_VAR`
  - Env Var: `LOGIN_PASSWORD`
  - Note: Never log or screenshot password fields
```

The generated test code should load credentials from `.env` file or CI/CD secrets.

## Wait Strategies Reference

Use appropriate wait strategies based on the action context:

| Trigger | Wait Before | Wait After | Recommended Timeout |
|---------|-------------|------------|---------------------|
| Page navigation | - | `networkidle` or URL contains | 10000ms |
| Modal/Dialog open | - | Element `visible` | 5000ms |
| Form submission | Element enabled | URL change OR success toast | 10000ms |
| API-triggered action | - | Loading spinner gone OR response element visible | 15000ms |
| Button click | Element visible + enabled | State change OR navigation | 5000ms |
| Text input | Element visible + enabled | - | 3000ms |

## Enhanced Step Format Template

Each test step should follow this structure:

```markdown
### Step N: [Step Name]
- **Description**: [What this step accomplishes]
- **Action**: click | fill | type | navigate | assert | select
- **Target Element**: [Human-readable element name]
- **Selectors**:
  - Primary: `getByTestId('...')` or `getByRole('...', { name: '...' })`
  - Fallback 1: `getByPlaceholder('...')` or `getByLabel('...')`
  - Fallback 2: `locator('css-selector')`
- **Wait Before**: [Condition] (e.g., "Element visible and enabled")
- **Wait After**: [Condition] (e.g., "URL contains '/dashboard'")
- **Timeout**: [milliseconds]
- **Input Data** (if applicable):
  - Value: `[the value]`
  - Classification: `STATIC` | `DYNAMIC` | `ENV_VAR` | `DATE_RELATIVE`
  - Pattern: [regex for DYNAMIC] or Env Var: [name for ENV_VAR]
- **Expected Result**: [What should happen after this step]
```

## UI Elements Table Format

Document all interactive elements with fallback selectors:

| Element | Type | Primary Selector | Fallback 1 | Fallback 2 | Notes |
|---------|------|------------------|------------|------------|-------|
| Sign In Button | button | `getByRole('button', { name: 'Sign In' })` | `getByTestId('sign-in-btn')` | `locator('button[type="submit"]')` | Submits login form |
| Email Input | textbox | `getByRole('textbox', { name: 'Enter your email' })` | `getByPlaceholder('Enter your email')` | `locator('input[type="email"]')` | Login email field |
