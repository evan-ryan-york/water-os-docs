---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git diff:*), Bash(git log:*), Bash(git branch:*)
description: Review changes and create meaningful, well-formatted commit(s)
---
## Context
- Files changed: !`git diff --name-status HEAD`
- Change summary: !`git diff --stat HEAD`
- Detailed diff: !`git diff HEAD`
- Already staged: !`git diff --cached --name-only`
- Current branch: !`git branch --show-current`
- Recent commit style: !`git log --oneline --format="%s" -5`

## Commit Message Format
**Type**: feat|fix|docs|refactor|chore

**Common types for this project**:
- `feat`: New page, new component, new navigation item
- `fix`: Bug fixes, broken links, rendering issues
- `docs`: Updates to existing documentation content
- `refactor`: Code restructuring without changing behavior
- `chore`: Maintenance tasks, dependency updates, config changes

**Structure**:
- First line: type(scope): summary in 50 chars or less
- Blank line (if body needed)
- Body: explain WHY (wrap at 72 chars)

**Scopes for this project**:
- `plan`, `business`, `tech`, `market`, `research`, `crm`, `links` - content by tab
- `nav` - navigation.ts changes
- `components` - React component changes
- `api` - API route changes

**Example**:
```
docs(plan): update business plan with revised GTM strategy

Incorporates feedback from investor meeting on 2025-11-20.
Revised timeline for Accra launch from Q3 to Q4 2026.
```

## Your Task
1. **Analyze**: Review all changes. Are they cohesive or should be split?
2. **Safety check**: No sensitive data (API keys, passwords) or debug code?
3. **Stage**: Use `git add .` or selectively add related files
4. **Commit message**:
   - Choose appropriate type (feat/fix/docs/refactor/chore)
   - Write clear summary (≤50 chars, imperative mood: "add" not "added")
   - Add body explaining WHY if non-obvious
5. **Execute**: Create the commit

**Note**: If changes span multiple concerns (e.g., new content + component fix), suggest splitting into multiple commits and ask for confirmation.
