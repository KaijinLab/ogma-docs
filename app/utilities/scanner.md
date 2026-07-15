---
title: Scanner
description: Use Ogma passive and active scanners to analyze captured traffic and confirm issues.
keywords: Ogma Scanner, passive scanner, active scanner, vulnerability checks
---

# Scanner

Scanner has two tabs - Passive Scanner and Active Scanner - each targeting a different phase of analysis.

## Passive Scanner

The passive scanner reviews traffic you have already captured. It does not send any additional requests.

- Rules run against request and response content: headers, cookies, tokens, body patterns, error messages, and exposed files.
- Each rule shows its **severity**, **category**, and a plain-language **description** of what it detects.
- **Scan All History** applies every enabled rule to the full set of captured traffic.
- Findings created by passive rules appear in the Findings panel with the matched evidence.

Because no new requests are sent, passive scanning is safe to run against any captured session, including production traffic.

## Active Scanner

The active scanner sends modified requests with injection payloads and creates findings only when the response provides matching evidence.

### Checks and severity levels

| Check | Severity |
|---|---|
| SQL Injection | High |
| Cross-Site Scripting (XSS) | High |
| Path Traversal | High |
| Command Injection | Critical |
| Server-Side Template Injection (SSTI) | Critical |
| Server-Side Request Forgery (SSRF) | Critical |
| Open Redirect | Medium |

### Evidence requirements

- A finding is only created when the response contains evidence that matches the check logic - not simply because the server returned HTTP 200.
- Time-based checks (blind SQLi, blind command injection) require a measured delay above the response-time baseline. The scanner establishes a baseline before sending timing payloads.
- SSRF checks require a callback to the OAST listener; configure OAST before running those checks.

### Running the active scanner

1. Open **Utilities > Scanner** and select the **Active Scanner** tab.
2. Review the check list and disable any checks not applicable to the target.
3. Click **Active Scan All** to run all enabled checks against recent captured traffic.
4. Monitor the progress indicator; findings appear in the Findings panel as they are confirmed.

**Active scanning sends real requests to the target.** Do not run it against systems you do not have permission to test.

## Related Pages

- [Scanning workflow](../../guide/scanning.md)
- [Findings](../findings.md)
- [HTTP History](../http-history.md)
- [OAST](./oast.md)
