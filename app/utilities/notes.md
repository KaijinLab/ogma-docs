---
title: Notes
description: Keep project notes and testing observations in Ogma.
keywords: Ogma Notes, project notes, pentest notes
---

# Notes

Notes is a persistent scratchpad for the current project - a place to record observations, plans, and findings-in-progress without leaving the Ogma workspace.

## Creating a Note

1. Open **Utilities > Notes**.
2. Click **New Note**.
3. Enter a **title** (required).
4. Select a **category** from the dropdown.
5. Write the note content in the editor. Notes support plain text and Markdown formatting.
6. Notes save automatically as you type.

### Categories

| Category | When to use it |
|---|---|
| Findings | Observations that may become formal findings |
| Methodology | Steps you are following or deviating from |
| Questions | Things to investigate or confirm later |
| Plan | Remaining scope, test order, priorities |
| General | Everything else |

## Searching Notes

The search bar at the top of the panel filters notes by title and content as you type. Results update immediately. Clear the search to return to the full list.

## Persisting Across Sessions

Notes are stored within the current project. They persist across Ogma restarts as long as you open the same project. Notes do not transfer automatically when you switch to a different project.

## Useful Patterns During an Engagement

- Keep a **Plan** note open with the remaining test scope. Check items off by editing the note as you go.
- Use **Questions** to track anything that needs confirmation - then revisit them before closing the engagement.
- Draft a **Findings** note for every potential issue before promoting it to the Findings panel. Include the reproduction steps and response evidence.
- Record discovered credentials, API keys, or internal paths in a note immediately so they are not lost if you close a tab.
- Note the time you first observed an anomaly - useful when the client asks about when testing covered a specific area.

## Related Pages

- [Findings](../findings.md)
- [Projects and data](../../guide/projects-data.md)
