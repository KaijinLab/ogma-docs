---
title: Findings
description: Create, review, deduplicate, and export Ogma findings with linked evidence.
keywords: Ogma Findings, security findings, penetration test report evidence
---

# Findings

Findings are Ogma's workspace for documenting confirmed issues, with all supporting evidence attached and ready to export.

## Creating a Finding

Create a finding in four ways:

- From **HTTP History**: right-click a row and select **Create Finding**.
- From **Replay**: right-click an attempt and select **Create Finding**.
- From **Automate**: right-click a result row and select **Create Finding**.
- From the **Findings** panel: click **New Finding** to start from a blank form.

The Active Scanner and plugins can also create findings automatically.

## Finding Fields

| Field | Description |
| --- | --- |
| Title | Short description of the issue |
| Severity | Impact rating: info, low, medium, high, or critical |
| Confidence | Strength of evidence: potential, likely, or confirmed |
| Status | Triage state: open, in-progress, resolved, or false-positive |
| Description | Full explanation of the issue and its impact |
| Remediation | Suggested fix or mitigation |
| CVSS score | Optional numeric severity score |
| CWE | Optional Common Weakness Enumeration identifier |
| PoC code | Proof-of-concept payload or script |

## Attaching Evidence

Link any HTTP History entry, Replay attempt, Automate result, or WebSocket message to a finding as evidence.

To attach the currently selected entry in HTTP History:

1. Open the finding.
2. Click **Use selected** in the evidence section.

Ogma links the entry and records the full request, including the payload, so the evidence shows exactly what triggered the issue. You can attach multiple evidence items to one finding.

## Dedupe Key

The dedupe key merges duplicate findings. If two findings share the same dedupe key, Ogma treats them as the same issue. Use this when a scanner or plugin generates repeated findings for the same underlying vulnerability.

Set the dedupe key to a consistent identifier: the CWE, the endpoint path, or a combination of both.

## AI Assist

Click **AI Assist** on a finding to generate suggested description and remediation text based on the title and evidence. Review and edit the output before saving.

## Bulk Actions

Select multiple findings using the checkbox column to apply bulk actions:

- Change severity or status across multiple findings at once.
- Delete findings.
- Export the selected set.

## Exporting

Export findings from the **Export** button in the Findings panel.

| Format | Use |
| --- | --- |
| Markdown | Paste into reports, wikis, or issue trackers |
| JSON | Import into other tools or archive for later |
| CSV | Open in spreadsheets or share with a client |

All exported formats include the finding fields and a reference to each evidence entry.

## Importing

Import findings from a JSON file using **Import** in the Findings panel. Imported findings merge with existing ones. If an imported finding shares a dedupe key with an existing finding, Ogma updates the existing record rather than creating a duplicate.

## Related Pages

- [Exports](./exports.md)
- [Scanner](./utilities/scanner.md)
- [Replay](./replay.md)
