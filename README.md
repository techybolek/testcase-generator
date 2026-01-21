# AI-Powered Playwright Test Generator

Generate Playwright tests automatically using Claude Code with the Playwright MCP server.

## Prerequisites

### 1. Install Dependencies

```bash
npm install
npx playwright install
```

### 2. Install Playwright MCP Server

```bash
claude mcp add playwright -- npx @anthropic-ai/mcp-server-playwright
```

### 3. Configure Headed Mode

The MCP server must run with a visible browser (headed, not headless). Add to your Claude Code MCP config (`~/.claude/mcp.json`):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-server-playwright", "--headless=false"]
    }
  }
}
```

## Workflow

Use Claude Code slash commands to generate tests:

| Command | Description |
|---------|-------------|
| `/plan-testcase <URL>` | Explore page and create test plan |
| `/generate-testcase <plan>` | Generate and execute TypeScript test |
| `/full-testcase <URL>` | Complete workflow: plan → generate → execute |
| `/chunk-testplan <plan>` | Split large plans into smaller chunks |

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
