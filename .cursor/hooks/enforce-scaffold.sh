#!/usr/bin/env bash
set -euo pipefail

# preToolUse (Write): steer new component creation through the scaffold script.

source "$(dirname "$0")/_lib.sh"
hook_input

file="$(tool_file_path)"

[ -z "$file" ] && exit 0

if [[ ! "$file" =~ (^|/)src/components/([^/]+)/([^/]+)\.component\.tsx$ ]]; then
  exit 0
fi

folder="${BASH_REMATCH[2]}"
base="${BASH_REMATCH[3]}"

if [ "$base" != "$folder" ] || [[ ! "$folder" =~ ^[A-Z] ]]; then
  exit 0
fi

dir="$(dirname "$(abs_path "$file")")"

if [ -d "$dir" ]; then
  exit 0
fi

reason="Blocked: create new components with the scaffold, not by hand. Run \`./scripts/scaffold_component.sh ${folder}\` from the repo root, then edit the generated files to match project conventions (CSS Modules, arrow components, page objects). See docs/handbook/components.md."

deny_tool "$reason"
exit 0
