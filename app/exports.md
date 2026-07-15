---
title: Exports
description: Export Ogma HTTP history, search results, findings, and automate results.
keywords: Ogma Exports, HAR export, findings report, raw HTTP export, project backup
---

# Exports

Exports produce files from project data for reporting, handoff, and tool interoperability.

## What You Can Export

| Export type | Available formats |
| --- | --- |
| HTTP history | HAR, JSON, CSV, raw HTTP |
| Search results | HAR, JSON, CSV, raw HTTP |
| Findings | Markdown report, JSON, CSV |
| Automate results | JSON, CSV |
| Project backup | ZIP archive |

### HTTP History and Search Results

HAR (HTTP Archive) format is the most portable - accepted by browser dev tools, Postman, and most traffic replay tools. Raw HTTP exports each request and response as plain text blocks.

### Findings

The Markdown report format produces a structured document with severity, evidence, reproduction steps, and remediation notes for each finding. Use JSON or CSV to import findings into a ticket tracker.

### Project Backup (ZIP)

The project ZIP contains all captured history, findings, Replay sessions, scope configuration, notes, environment variables, and settings for the current project. It does not include secret variable values.

Use the ZIP to:
- Move a project to another machine.
- Share a completed engagement with a colleague.
- Archive the project after delivery.

## How Exports Work

Exports run as background jobs. Large history exports may take several seconds to minutes depending on the number of entries.

1. Open **Exports** from the left navigation.
2. Click **New export**.
3. Select the export type and format.
4. Optionally apply a filter (HTTPQL query) to limit which entries are included.
5. Click **Start export**.

The job appears in the export list with a progress indicator. When the status shows **Ready**, click **Download** to save the file.

## Importing a Project Backup

1. Open **File > Import project** (or the project switcher menu).
2. Select the ZIP file.
3. Ogma creates a new project and loads the archive contents.

Import is atomic: if the archive is malformed or the import fails, no partial data is written to the project.

## Related Pages

- [Findings](./findings.md)
- [HTTP History](./http-history.md)
- [Filters](./filters.md)
