#!/bin/bash
set -e

# Usage: ./create-testcase.sh <scenario-file-or-content>
# Invokes Claude Code with the /full-testcase command non-interactively
# Input can be a file path or direct business scenario content

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -z "$1" ]; then
    echo "Usage: $0 <scenario-file-or-content>"
    echo "Examples:"
    echo "  $0 BUSINESS_SCENARIOS/scenario.txt"
    echo "  $0 \"https://example.com - User logs in and views dashboard\""
    exit 1
fi

INPUT="$1"

# Detect if input is a file or direct content
if [ -f "$INPUT" ]; then
    echo "Input mode: File"
    SCENARIO_CONTENT=$(cat "$INPUT")
    INPUT_DISPLAY="$INPUT"
else
    echo "Input mode: Direct content"
    SCENARIO_CONTENT="$INPUT"
    INPUT_DISPLAY="(inline)"
fi

# Verify command file exists
FULL_CMD="$SCRIPT_DIR/.claude/commands/full-testcase.md"

if [ ! -f "$FULL_CMD" ]; then
    echo "Error: Command file not found: $FULL_CMD"
    exit 1
fi

# SCENARIO_CONTENT is already set above based on input mode

# Extract URL (first https:// URL in the file)
URL=$(echo "$SCENARIO_CONTENT" | grep -oE 'https?://[^ ]+' | head -1)

if [ -z "$URL" ]; then
    echo "Error: No URL found in scenario file"
    exit 1
fi

echo "========================================"
echo "Running full testcase workflow"
echo "URL: $URL"
echo "Scenario: $INPUT_DISPLAY"
echo "========================================"

# Read the command file and substitute $ARGUMENTS with the URL
# Then append the business scenario so Claude doesn't need to ask for it
COMMAND_CONTENT=$(cat "$FULL_CMD" | sed "s|\$ARGUMENTS|$URL|g")

# Run Claude Code non-interactively with the command content as prompt
# Append the business scenario as a "user response" to skip the interactive question
OUTPUT=$(claude -p "$COMMAND_CONTENT

---

The business scenario is:
$SCENARIO_CONTENT

Proceed with the workflow without asking for clarification." \
    --dangerously-skip-permissions \
    --verbose \
    --output-format text)

# Display full output
echo "$OUTPUT"

# Extract test file path from the final report table
TEST_FILE=$(echo "$OUTPUT" | grep -E "\| *Test File" | sed 's/.*| *\([^ |]*\.spec\.ts\).*/\1/' | head -1)

# Extract status (PASSED/FAILED)
STATUS=$(echo "$OUTPUT" | grep -E "\| *Status" | grep -oE "PASSED|FAILED" | head -1)

echo ""
echo "========================================"
echo "SUMMARY"
echo "========================================"
echo "Generated Test File: ${TEST_FILE:-Not found}"
echo "Status: ${STATUS:-Unknown}"
echo "========================================"

# Exit with appropriate code
if [ "$STATUS" = "PASSED" ]; then
    exit 0
elif [ "$STATUS" = "FAILED" ]; then
    exit 1
else
    exit 0
fi
