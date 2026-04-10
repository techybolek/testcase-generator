# AI-Powered Playwright Test Generator

Generate Playwright tests automatically using Claude Code with `playwright-cli` (`@playwright/cli`) for token-efficient browser exploration.

## Prerequisites

### 1. Install Dependencies

```bash
npm install
npx playwright install
```

### 2. Install Playwright CLI

```bash
npm install -g @playwright/cli
```

The `playwright-cli` skill at `~/.claude/skills/playwright-cli/SKILL.md` provides Claude Code with the full command reference.

## Workflow

Use Claude Code slash commands to generate tests:

| Command | Description |
|---------|-------------|
| `/plan-testcase <scenario>` | Explore page and create test plan |
| `/generate-testcase <plan-file>` | Generate and execute TypeScript test |
| `/execute-testcase <plan-file>` | LLM executes test plan step-by-step via playwright-cli (resilient, self-healing) |
| `/full-testcase <scenario>` | Complete workflow: plan → generate → execute |
| `/chunk-testplan <plan-file>` | Split large plans into smaller chunks |

**Business scenario**: Include the URL and what to test. Pass inline or as a file path:
```
/plan-testcase Go to https://www.saucedemo.com/ and buy a bike light
/plan-testcase SAMPLE-BUSINESS_SCENARIOS/sauce-demo-1.txt
```

## Running Generated Tests

```bash
npm test                # Headless
npm run test:headed     # With browser
npm run test:ui         # Interactive UI
npm run test:debug      # Debug mode
```

## Project Structure

```
test_plans/     # Generated test plans (markdown)
tests/          # Generated Playwright tests (.spec.ts)
.claude/commands/  # Slash command definitions
```

## Credentials

Use environment variables in `.env`:

```
LOGIN_USER=your_user
LOGIN_PASSWORD=your_pass
```

## License

ISC
