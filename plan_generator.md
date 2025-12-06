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
4. **Simulates** the user journey based on the business scenario
5. **Records** each step with element references, actions, and expected results
6. **Generates** a detailed markdown test plan file

## Output Format

The agent creates a markdown file in the `test_plans/` directory with:

- Test metadata (URL, scenario, timestamp)
- Pre-conditions
- Numbered test steps with:
  - Action description
  - Target element and reference
  - Input data (if applicable)
  - Expected result
- UI elements table
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
