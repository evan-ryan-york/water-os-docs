# User Research Transcripts

This directory contains interview transcripts for the Water OS market research.

## How to Add New Transcripts

To add a new transcript to the User Research page:

1. **Edit the UserResearch component** at `apps/web/src/components/UserResearch.tsx`

2. **Add a new transcript object** to the `transcripts` array:

```typescript
{
  id: "driver-001",  // Unique identifier
  name: "Driver Interview - John Doe",  // Display name
  date: "2025-11-05",  // Interview date (YYYY-MM-DD)
  type: "driver",  // Type: "driver" | "residential" | "commercial" | "depot"
  content: `# Driver Interview - John Doe

**Date:** November 5, 2025
**Location:** Spintex, Accra
**Interviewer:** Anna

## Background
[Interview context and background]

## Key Insights
- Key insight 1
- Key insight 2
- Key insight 3

## Full Transcript
[Full transcript content here...]
`
}
```

3. **Transcript Types:**
   - `driver` - Fleet owners and truck drivers (blue tag)
   - `residential` - Residential customers (green tag)
   - `commercial` - Hotels, restaurants, schools, etc. (purple tag)
   - `depot` - Depot owners and managers (orange tag)

4. **Content Format:**
   - Use markdown formatting in the `content` field
   - Include sections for background, key insights, and full transcript
   - Add any relevant metadata at the top

## Example Transcript Structure

```markdown
# Interview Title

**Date:** [Date]
**Type:** [Type]
**Location:** [Location]
**Interviewer:** [Name]
**Duration:** [Duration]

## Summary
Brief overview of the interview and main takeaways.

## Participant Profile
- Name/Pseudonym
- Role (e.g., Fleet owner with 5 trucks)
- Experience (e.g., 10 years in business)
- Location/Area served

## Key Insights
- Insight 1: [Description]
- Insight 2: [Description]
- Insight 3: [Description]

## Pain Points Identified
1. [Pain point 1]
2. [Pain point 2]
3. [Pain point 3]

## Full Transcript

**Interviewer:** Question 1?

**Participant:** Answer 1...

**Interviewer:** Question 2?

**Participant:** Answer 2...

[Continue with full transcript...]

## Follow-up Items
- [ ] Action item 1
- [ ] Action item 2
```

## Features

The User Research page provides:

- **Filtering:** Filter by interview type (driver, residential, commercial, depot)
- **Multi-select:** View multiple transcripts simultaneously
- **Copy functionality:** Copy individual transcripts or all visible transcripts at once
- **Search-ready:** All transcripts on one page makes it easy to search (Cmd+F)

## Tips

- Keep transcript IDs unique and descriptive (e.g., `driver-spintex-001`)
- Use consistent date formatting (YYYY-MM-DD)
- Include metadata at the top of each transcript for quick reference
- Add key insights section for easy scanning
- Use clear section headers for better readability
