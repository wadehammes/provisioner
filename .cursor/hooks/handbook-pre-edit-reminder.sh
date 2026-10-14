#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/_lib.sh"
hook_input

file="$(tool_file_path)"
case "$file" in
  docs/handbook/* | *.md) exit 0 ;;
esac

ctx="Handbook check: before this edit, confirm you have read the docs/handbook chapter matching this change (see docs/handbook/llms.md). CSS/React/tests → conventions.md; component layout and CMS wiring → components.md; Contentful types/parsers/getters → contentful.md; App Router pages/API/hooks/forms → patterns.md; package scripts, CI, next.config, env, CSP, proxy, Cursor hooks → platform.md; sitemaps → distribution.md; stack and data flow → architecture.md; where a file lives (api, hooks, providers) → source-layout.md; machine setup and first run → root README.md. If this change shifts documented behavior or conventions, update that chapter in the same change. If you move, rename, or delete a file, grep docs/handbook/ and README.md for its old path in the same change."

advise_context "$ctx"
exit 0
