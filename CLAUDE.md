# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered Playwright test automation framework that uses Claude Code with `playwright-cli` (`@playwright/cli`) to explore web applications, generate detailed test plans, and auto-generate working TypeScript test code.

## Commands

### Test Execution
```bash
npm test                    # Run all tests headless
npm run test:headed         # Run with visible browser
npm run test:ui             # Interactive Playwright UI mode
npm run test:debug          # Debug mode with step-through
npx playwright test tests/<file>.spec.ts --project=chromium  # Run single test
```

### Setup
```bash
npm install                 # Install dependencies
npx playwright install      # Install browsers if needed
```

### Non-Interactive Automation
```bash
./create-testcase.sh BUSINESS_SCENARIOS/altstars-booking.txt  # Run full workflow headless
```

## Custom Slash Commands

| Command | Purpose |
|---------|---------|
| `/plan-testcase <URL>` | Navigate to URL, explore page with `playwright-cli`, create detailed test plan in `test_plans/` |
| `/generate-test <plan-file>` | Convert test plan to TypeScript, execute with Chromium, auto-fix failures (max 3 retries) |
| `/execute-testcase <plan-file>` | LLM executes test plan step-by-step via `playwright-cli` — resilient, self-healing, no generated code |
| `/chunk-testplan <plan-file>` | Split large test plans (>6 independent test cases) into chunks in `test_plans/chunked/<group>/` |
| `/full-testcase <URL>` | Run complete workflow: plan → generate → execute with context isolation between phases |

## Architecture

```
test_plans/              # Generated markdown test plans
  chunked/<group>/       # Chunked test plans for large test suites
tests/                   # Generated Playwright .spec.ts files
BUSINESS_SCENARIOS/      # Pre-defined test scenario descriptions
.claude/commands/        # Slash command implementations
playwright.config.ts     # Multi-browser config with anti-bot measures
```

## Test Plan Format

Test plans use a structured format with:
- **Selector chains**: Primary (getByRole/getByTestId) -> Fallback 1 -> Fallback 2 (CSS)
- **Wait strategies**: Before action, After action, Timeout (ms)
- **Data classification**: STATIC | DYNAMIC (with regex) | ENV_VAR | DATE_RELATIVE

## Credentials Handling

Never hardcode credentials. Use environment variables:
- `LOGIN_USER`, `LOGIN_PASSWORD` for auth
- `API_KEY`, `AUTH_TOKEN` for API access
- Store in `.env` file (gitignored)

## Playwright Configuration Notes

- Single worker, serial execution (avoids rate limiting)
- 60 second timeout per test
- Anti-bot headers and realistic User-Agent
- Uses real Chrome channel (not Chromium)
- Screenshots/video only on failure
