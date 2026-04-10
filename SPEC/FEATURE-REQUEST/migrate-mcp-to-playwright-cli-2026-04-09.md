# Feature Request: Migrate Custom Commands from Playwright MCP to Playwright CLI

**Date:** 2026-04-09
**Status:** Refined

## Overview

Replace all Playwright MCP server tool calls in the project's custom Claude Code commands with `playwright-cli` (`@playwright/cli`) Bash commands. This is a direct swap — no fallback, no dual-mode support.

## Problem Statement

The current custom commands (`/plan-testcase`, `/generate-testcase`) use the Playwright MCP server for browser interaction during test planning and debugging. MCP streams full accessibility trees and screenshot data into the LLM's context window on every call, consuming ~4x more tokens than necessary. This increases cost and slows down autonomous workflows, especially the non-interactive `create-testcase.sh` pipeline.

## Users & Stakeholders

- **Primary Users:** Developers and QA engineers who run `/plan-testcase`, `/generate-testcase`, `/full-testcase`, and `create-testcase.sh`
- **Permissions:** No role changes needed

## Functional Requirements

### 1. Update `/plan-testcase` command (`.claude/commands/plan-testcase.md`)

Replace all MCP tool references with playwright-cli equivalents:

| Current MCP Tool | Replacement CLI Command |
|---|---|
| `mcp__playwright__browser_navigate` | `playwright-cli goto <url>` (or `playwright-cli open <url>` for initial launch) |
| `mcp__playwright__browser_snapshot` | `playwright-cli snapshot` |
| `mcp__playwright__browser_click` | `playwright-cli click <ref>` |
| `mcp__playwright__browser_type` | `playwright-cli fill <ref> <text>` or `playwright-cli type <text>` |

Specific changes:
- Line 16: Replace `mcp__playwright__browser_navigate` with `playwright-cli open` / `playwright-cli goto`
- Line 18: Replace `mcp__playwright__browser_snapshot` with `playwright-cli snapshot`
- Line 29: Replace `mcp__playwright__browser_click`, `mcp__playwright__browser_type` references with `playwright-cli click`, `playwright-cli fill`, etc.
- All instructions should direct Claude to use Bash tool with playwright-cli commands instead of MCP tools
- Add instruction to call `playwright-cli open <url>` first to launch the browser, then `playwright-cli goto` for subsequent navigation
- Reference the playwright-cli skill for the full command set

### 2. Update `/generate-testcase` command (`.claude/commands/generate-testcase.md`)

- Lines 157-158: Replace "Use browser MCP tools (browser_snapshot, browser_navigate)" debugging guidance with playwright-cli equivalents
- Update the debugging section to reference `playwright-cli snapshot`, `playwright-cli goto`, `playwright-cli screenshot` instead of MCP tools

### 3. No changes needed for:

- `/chunk-testplan` — Does not use browser interaction
- `/full-testcase` — Orchestrates the other commands by reference, so it inherits changes automatically
- `playwright.config.ts` — Test execution is already via `npx playwright test`, unrelated to MCP
- `create-testcase.sh` — Orchestration shell script, no MCP references

### 4. Update project documentation

- `README.md`: Remove MCP server setup instructions, replace with playwright-cli setup
- `CLAUDE.md`: Update architecture description to reference playwright-cli instead of MCP

### 5. Remove Playwright MCP server dependency

- Remove the `playwright` MCP server entry from `~/.claude/mcp.json` (or the project-specific MCP config)
- The `@playwright/mcp` npm package can be uninstalled if no other projects depend on it

## User Flow

No change to user-facing flow. Users still run:
1. `/plan-testcase <URL>` — Claude explores the page and generates a test plan
2. `/generate-testcase <plan-file>` — Claude generates and executes Playwright test code
3. `/full-testcase <URL>` — Full autonomous pipeline
4. `./scripts/create-testcase.sh <scenario>` — Non-interactive batch mode

The difference is internal: Claude uses `playwright-cli` Bash commands instead of MCP tool calls.

## Acceptance Criteria

- [ ] `/plan-testcase` contains zero references to `mcp__playwright__` tools
- [ ] `/plan-testcase` uses `playwright-cli open`, `playwright-cli goto`, `playwright-cli snapshot`, `playwright-cli click`, `playwright-cli fill` via Bash
- [ ] `/generate-testcase` debugging section references `playwright-cli` commands instead of MCP tools
- [ ] `README.md` documents playwright-cli setup instead of MCP server setup
- [ ] `CLAUDE.md` reflects the updated architecture
- [ ] Playwright MCP server entry removed from MCP config
- [ ] End-to-end test: `/full-testcase` on a sample URL successfully generates a test plan and passing test using only playwright-cli (no MCP)

## User Experience

- **Interface:** CLI (Claude Code custom commands) — unchanged
- **Key Interactions:** Identical from user's perspective
- **Feedback:** Same output format (test plans in `test_plans/`, tests in `tests/`)
- **Observable difference:** Faster execution, lower token usage during planning phase

## Technical Requirements

- **Dependencies:**
  - `@playwright/cli` (v0.1.6 — already available via npx)
  - Existing playwright-cli skill at `~/.claude/skills/playwright-cli/SKILL.md` — already installed
- **Performance:** ~4x token reduction in planning phase (114k → ~27k tokens per session based on Microsoft benchmarks)
- **Security:** No change — credentials remain in env vars
- **Platform:** Linux (WSL2) — current environment

## Command Mapping Reference

| Action | MCP Tool | playwright-cli Command |
|---|---|---|
| Launch browser + navigate | `mcp__playwright__browser_navigate` | `playwright-cli open <url>` |
| Navigate (browser already open) | `mcp__playwright__browser_navigate` | `playwright-cli goto <url>` |
| Capture page state | `mcp__playwright__browser_snapshot` | `playwright-cli snapshot` |
| Click element | `mcp__playwright__browser_click` | `playwright-cli click <ref>` |
| Type into field | `mcp__playwright__browser_type` | `playwright-cli fill <ref> <text>` |
| Take screenshot | `mcp__playwright__browser_screenshot` | `playwright-cli screenshot` |
| Go back | `mcp__playwright__browser_go_back` | `playwright-cli go-back` |
| Select dropdown | `mcp__playwright__browser_select_option` | `playwright-cli select <ref> <val>` |
| Hover | `mcp__playwright__browser_hover` | `playwright-cli hover <ref>` |
| Close browser | `mcp__playwright__browser_close` | `playwright-cli close` |

## Edge Cases & Error Handling

1. **Browser not launched** — `playwright-cli` commands (except `open`) fail if no browser is running. Commands must call `playwright-cli open <url>` before any interaction.
2. **Stale element refs** — After navigation or page mutation, snapshot refs change. Commands should re-snapshot after navigation, same as with MCP.
3. **Headless vs. headed** — `playwright-cli` is headless by default. For visible browser debugging, use `playwright-cli open --headed <url>`. The `create-testcase.sh` script should use headless (default).
4. **Session management** — playwright-cli keeps sessions in memory by default. For multi-step planning, no special session handling is needed within a single Claude invocation. Between subagent boundaries in `/full-testcase`, the browser should be closed and reopened.

## Dependencies

- **Requires:** `@playwright/cli` npm package (already available)
- **Requires:** playwright-cli skill (already installed at `~/.claude/skills/playwright-cli/SKILL.md`)
- **Blocks:** Nothing

## Out of Scope

- Changing the test plan format or structure
- Changing the generated test code format
- Modifying `playwright.config.ts` or test execution strategy
- Adding new browser interaction capabilities beyond current MCP feature set
- Supporting both MCP and playwright-cli simultaneously

## Success Metrics

- Token usage per planning session reduced by ~60-75%
- Planning phase completes faster (fewer round-trips, less context overhead)
- Generated test plans are equivalent quality to MCP-based plans
- `/full-testcase` end-to-end pipeline produces passing tests

## Files to Modify

| File | Change |
|---|---|
| `.claude/commands/plan-testcase.md` | Replace all MCP tool references with playwright-cli commands |
| `.claude/commands/generate-testcase.md` | Update debugging section to use playwright-cli |
| `README.md` | Replace MCP setup with playwright-cli setup |
| `CLAUDE.md` | Update architecture description |
| `~/.claude/mcp.json` (or project MCP config) | Remove playwright MCP server entry |

## Notes

- The playwright-cli skill (`~/.claude/skills/playwright-cli/SKILL.md`) already provides comprehensive documentation of all available commands. The custom commands should reference this skill rather than duplicating command documentation.
- `chunk-testplan` and `full-testcase` need no direct changes — chunk-testplan has no browser interaction, and full-testcase delegates to the other commands by spawning agents that read the command files.
- The `@playwright/cli` package is separate from `@playwright/test` — both coexist. Test execution continues to use `npx playwright test`.
