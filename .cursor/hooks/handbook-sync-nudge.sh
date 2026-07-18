#!/usr/bin/env bash
set -euo pipefail

# postToolUse (Write|StrReplace): remind to update the matching handbook chapter.

source "$(dirname "$0")/_lib.sh"
hook_input

file="$(tool_file_path)"

chapter=""
case "$file" in
  *.spec.ts | *.spec.tsx | *.test.ts | *.test.tsx | *.po.tsx)
    chapter="conventions.md#testing (Jest, Testing Library, page objects)" ;;
  *.module.css | */src/styles/* | src/styles/*)
    chapter="conventions.md (CSS Modules: mobile-first base + nested @media)" ;;
  */src/app/api/* | src/app/api/*)
    chapter="patterns.md (API routes, mutations, external services)" ;;
  */src/app/* | src/app/*)
    chapter="patterns.md (App Router pages, metadata, layouts)" ;;
  */src/components/* | src/components/* | */src/ui/* | src/ui/*)
    chapter="components.md (folder layout, CMS wiring, testing)" ;;
  */src/contentful/* | src/contentful/*)
    chapter="contentful.md (types, parsers, getters, ContentRenderer registry)" ;;
  */src/hooks/* | src/hooks/*)
    chapter="patterns.md (mutation hooks, React Query)" ;;
  */src/api/* | src/api/* | */src/lib/* | src/lib/* | */src/providers/* | src/providers/*)
    chapter="source-layout.md or patterns.md (API helpers, lib, providers)" ;;
  */next.config.ts | next.config.ts)
    chapter="platform.md (env vars, redirects, CSP, images.remotePatterns)" ;;
  *)
    exit 0 ;;
esac

ctx="Handbook-sync check: you just edited $file. If this change shifts documented behavior or conventions, update docs/handbook/$chapter in the same change so the handbook stays accurate."

advise_context "$ctx"
exit 0
