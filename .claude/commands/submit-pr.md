---
allowed-tools: Bash(git push:*), Bash(git log:*), Bash(git diff:*), Bash(git branch:*), Bash(gh:*)
description: Push branch to remote and create a pull request
---

## Context

- Current branch: !`git branch --show-current`
- Branch commits (not in main): !`git log main..HEAD --oneline 2>/dev/null || echo "No commits ahead of main"`
- Files changed: !`git diff main...HEAD --name-status 2>/dev/null || echo "No diff from main"`
- Diff summary: !`git diff main...HEAD --stat 2>/dev/null || echo "No changes"`

## Your task

Follow these steps:

### 1. Push the branch to remote
- Run `git push -u origin $(git branch --show-current)` to push the branch
- If the branch already exists remotely, `git push` is sufficient

### 2. Create a high-quality PR

Use the GitHub CLI to create the PR with a comprehensive description:
```bash
gh pr create --title "Your PR Title" --body "$(cat <<'EOF'
Your PR Description here
EOF
)"
```

## PR Writing Guidelines

### Title
- Be concise but descriptive (50-72 characters)
- Use imperative mood ("Add feature" not "Added feature")
- Don't end with a period

### Description Structure

**Summary**
- Start with a clear 1-3 sentence summary of what this PR does
- Explain the "why" - what problem does this solve?

**Changes**
- List the key changes made, organized logically
- Highlight any breaking changes or important notes
- Group changes by area (e.g., Components, Documentation, Navigation)

**Testing**
- Describe how you tested these changes
- For this project: mention if `pnpm build` and `pnpm lint` pass

**Related Issues** (if applicable)
- Reference related issues using "Fixes #123" or "Relates to #456"

### PR Template for This Project

```markdown
## Summary
[1-3 sentence description of what this PR accomplishes]

## Changes

### Components
- [Component changes]

### Documentation
- [Markdown file changes]

### Navigation
- [navigation.ts changes]

### Other
- [Config, dependencies, etc.]

## Testing
- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes
- [ ] Verified pages render correctly in dev

## Notes
[Any additional context, trade-offs, or future work]

---
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

### 3. Confirm PR creation
- After creating the PR, provide the PR URL
- Summarize what was included in the PR
