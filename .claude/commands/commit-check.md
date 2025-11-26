---
allowed-tools: Bash(pnpm:*), Read, Edit, Grep, Glob
description: Run build, fix TypeScript errors, and lint before committing
---

Please follow these steps in order:

## Pre-flight checks
- Verify you're in the project root directory
- Check that `package.json` exists

## Code quality checks (Fast automated checks)

Run these checks BEFORE the build to catch obvious violations:

### 1. Package manager enforcement
```bash
# Check for npm/yarn lock files (only pnpm allowed)
find . -name "package-lock.json" -o -name "yarn.lock" | grep -v node_modules
```
**Rule:** This is a pnpm-only project. If any files found, remove them.

### 2. TypeScript type safety
```bash
# Check for 'any' type usage (prohibited)
git diff --cached --name-only | grep -E '\.(ts|tsx)$' | xargs grep -n ": any" 2>/dev/null || true
```
**Rule:** Never use `any` type. Use `unknown` or proper types.

```bash
# Check for @ts-ignore (prohibited)
git diff --cached --name-only | grep -E '\.(ts|tsx)$' | xargs grep -n "@ts-ignore" 2>/dev/null || true
```
**Rule:** Never use `@ts-ignore`. Fix the type error properly.

### 3. Page header requirements
```bash
# Check staged markdown files for missing version headers
git diff --cached --name-only | grep "wateros/.*\.md$" | while read f; do
  if ! head -5 "$f" | grep -q "Version:"; then
    echo "Missing version header: $f"
  fi
done
```
**Rule:** All markdown pages must have `**Version:** X.X | **Last Updated:** YYYY-MM-DD` after the title.

### 4. Navigation consistency
```bash
# Check if navigation.ts was modified - remind to verify paths exist
git diff --cached --name-only | grep "navigation.ts" && echo "⚠️  Verify all paths in CONTENT_MAP point to existing files"
```
**Rule:** When adding items to `CONTENT_MAP`, ensure the file path exists in `wateros/` or component exists in `app/components/`.

**Action:** If ANY violations found above, fix them before proceeding to build step.

## Build and fix
1. Run `pnpm run build`
2. If there are any TypeScript errors:
   - Read the error messages carefully
   - Fix ALL errors before proceeding
   - Re-run the build to confirm fixes
   - Do not proceed until build succeeds with zero errors

## Linting
3. Run `pnpm run lint`
4. Fix any linting errors if present
5. Re-run lint to confirm fixes

## Final report
6. Provide a clear summary:
   - ✅ Code quality checks: Clean/Violations found and fixed
   - ✅ Build status: Success/Failed
   - ✅ TypeScript errors: None/Fixed
   - ✅ Linting: Clean/Fixed
   - Any warnings or notes to be aware of

## Important rules
- **Do not skip steps** - Each step must succeed before moving to the next
- **Fix, don't ignore** - All errors must be resolved, not worked around
- **Be thorough** - Check the entire output for warnings and errors
- **Report honestly** - If something can't be fixed, explain why
