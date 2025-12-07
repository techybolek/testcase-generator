# Full Test Case Workflow (Plan → Generate → Execute)

You are a test automation orchestrator that runs the complete test workflow using isolated subagents for context efficiency.

## Input

- **URL**: $ARGUMENTS
- **Business Scenario**: (Ask the user)

## Workflow

### Step 1: Gather Business Scenario

If no business scenario is provided, ask the user:
- What business scenario do you want to test?
- Example: "User logs in and books an appointment"

### Step 2: Planning Phase (Isolated Context)

Use the **Task tool** to spawn a planning agent with isolated context:

```
Task tool parameters:
- subagent_type: "general-purpose"
- description: "Plan test case"
- prompt: <see below>
```

**Agent Prompt:**
```
First, read the instructions in .claude/commands/plan-testcase.md and follow them exactly.

## Context for this run:
- URL: <URL from arguments>
- Business Scenario: <scenario from user>

## Important:
- Follow ALL instructions from plan-testcase.md including tips about credentials
- Return ONLY the absolute path to the generated test plan file as your final message
```

**After the agent completes:** Extract the plan file path from its response.

### Step 3: Generation Phase (Isolated Context)

Use the **Task tool** to spawn a generation agent with isolated context:

```
Task tool parameters:
- subagent_type: "general-purpose"
- description: "Generate and execute test"
- prompt: <see below>
```

**Agent Prompt:**
```
First, read the instructions in .claude/commands/generate-testcase.md and follow them exactly.

## Context for this run:
- Test Plan File: <path from Step 2>

## Important:
- Follow ALL instructions from generate-testcase.md including debugging strategies
- Return your final message with: test file path, status (PASSED/FAILED), iterations needed, fixes made
```

### Step 4: Final Report

After both agents complete, display a summary:

```
## Test Automation Complete

| Item | Value |
|------|-------|
| Test Plan | <path from Step 2> |
| Test File | <path from Step 3> |
| Status | PASSED / FAILED |
| Iterations | X |

### Notes
<Any fixes, warnings, or observations from the generation phase>
```

## Error Handling

- **Planning fails**: Report the error and stop. Do not proceed to generation.
- **Generation fails after 3 retries**: Report partial progress, show the last error, and save whatever test code exists.

## Important Notes

- Each Task agent has **isolated context** - this is automatic context clearing
- Only the plan file path is passed between phases (minimal data transfer)
- For large test plans (>6 independent test cases), run `/chunk-testplan` first, then run `/full-testcase` on each chunk
- The orchestrator (you) coordinates but doesn't do the actual planning/generation work

## Example Usage

```
User: /full-testcase https://example.com/login
Assistant: What business scenario would you like to test?
User: User logs in with valid credentials and sees the dashboard
Assistant: Starting full test workflow...

[Spawns planning agent]
Planning complete: test_plans/user_login_dashboard_20251207.md

[Spawns generation agent]
Generation complete: tests/user-login-dashboard.spec.ts
Status: PASSED (2 iterations - fixed selector for submit button)

## Test Automation Complete
| Test Plan | test_plans/user_login_dashboard_20251207.md |
| Test File | tests/user-login-dashboard.spec.ts |
| Status | PASSED |
| Iterations | 2 |
```
