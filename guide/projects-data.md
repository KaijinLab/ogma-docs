---
title: Projects and Data
description: Understand Ogma instances, projects, local data storage, backups, exports, imports, and certificate management.
keywords: Ogma projects, local proxy data, web security exports, HAR import, Ogma backups
---

# Projects and Data

Ogma is local-first. Project data, captured traffic, findings, exports, backups, plugin packages, and local settings live on the workstation running Ogma.

<div class="screenshot-placeholder">
  <strong>Screenshot placeholder</strong>
  <span>Project launcher and project data overview with backups, exports, and certificate controls.</span>
</div>

## Instances

An instance represents a running Ogma proxy and API process.

Typical defaults:

| Listener | Default |
| --- | --- |
| Proxy | `127.0.0.1:8080` |
| API | `127.0.0.1:8181` |
| Data directory | `./ogma-data` for local CLI/dev runs, platform-specific app data for packaged desktop builds |

Use the launcher to start, stop, open, edit, or remove local instances.

## Projects

Projects separate testing data. Use one project per client, application, assessment phase, or lab target.

Project-scoped data includes:

- HTTP history.
- WebSocket and SSE history.
- Findings.
- Replay sessions.
- Automate sessions and runs.
- Workflows and workflow runs.
- Scope presets.
- Custom passive rules.
- Exports and imported data.

## Backups and Exports

Backups are for restoring Ogma project state. Exports are for reporting, review, or tool interop.

| Artifact | Purpose | Treat as sensitive |
| --- | --- | --- |
| Project backup | Restore local Ogma state | Yes |
| HAR export | Share captured HTTP traffic | Yes |
| Findings report | Reporting and triage | Yes |
| Raw HTTP export | Reproduce or audit requests | Yes |
| CSV/JSON exports | External analysis | Yes |

Review exports before sharing when you need to remove cookies, bearer tokens, passwords, internal hostnames, or personal data.

## Imports

Ogma supports importing traffic and assessment data from several sources, including HAR, Burp exports, API specifications, and findings imports.

Use imports to:

- Bring previous test evidence into a project.
- Seed targets from an API specification.
- Continue analysis from another proxy or capture source.
- Normalize findings into Ogma's reporting workflow.

## Project Organization

Recommended setup:

- Use a dedicated project per assessment.
- Use clear names for projects, exports, and backups.
- Keep evidence, notes, and findings linked inside the same project.
- Store backups next to the engagement or lab materials they belong to.
- Review plugin logs before sharing diagnostics.
- Clear browser data when switching between unrelated targets.

## Certificates

Ogma manages local CA material for HTTPS inspection. Certificate settings include CA download, backup/import, regeneration, named CAs, and TLS diagnostics.

Use certificate profiles to separate work between projects or environments when that makes the setup easier to reason about.
