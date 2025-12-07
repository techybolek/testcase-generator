#!/bin/bash
set -e

# Usage: ./run-testcase.sh BUSINESS_SCENARIOS/altstars-booking.txt
# Invokes Claude Code with the /full-testcase command non-interactively

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -z "$1" ]; then
    echo "Usage: $0 <scenario-file>"
    echo "Example: $0 BUSINESS_SCENARIOS/altstars-booking.txt"
    exit 1
fi

SCENARIO_FILE="$1"

if [ ! -f "$SCENARIO_FILE" ]; then
    echo "Error: File not found: $SCENARIO_FILE"
    exit 1
fi

# Verify command file exists
FULL_CMD="$SCRIPT_DIR/.claude/commands/full-testcase.md"

if [ ! -f "$FULL_CMD" ]; then
    echo "Error: Command file not found: $FULL_CMD"
    exit 1
fi

# Read scenario content (this becomes the business scenario)
SCENARIO_CONTENT=$(cat "$SCENARIO_FILE")

# Extract URL (first https:// URL in the file)
URL=$(echo "$SCENARIO_CONTENT" | grep -oE 'https?://[^ ]+' | head -1)

if [ -z "$URL" ]; then
    echo "Error: No URL found in scenario file"
    exit 1
fi

echo "========================================"
echo "Running full testcase workflow"
echo "URL: $URL"
echo "Scenario: $SCENARIO_FILE"
echo "========================================"

# Read the command file and substitute $ARGUMENTS with the URL
# Then append the business scenario so Claude doesn't need to ask for it
COMMAND_CONTENT=$(cat "$FULL_CMD" | sed "s|\$ARGUMENTS|$URL|g")

# Run Claude Code non-interactively with the command content as prompt
# Append the business scenario as a "user response" to skip the interactive question
claude -p "$COMMAND_CONTENT

---

The business scenario is:
$SCENARIO_CONTENT

Proceed with the workflow without asking for clarification." \
    --dangerously-skip-permissions \
    --verbose \
    --output-format text
