---
title: Scanning Workflow
description: Use Ogma passive and active scanners, understand detection rules, review evidence, and reduce false positives.
keywords: Ogma scanner, passive scanner, active scanner, vulnerability detection rules, web security testing
---

# Scanning

Ogma includes passive and active scanners. Passive scanning analyzes captured traffic. Active scanning sends modified requests and validates findings from response behavior, timing, reflection, and baseline comparison.

## Passive Scanner

The passive scanner evaluates captured HTTP entries without sending new traffic.

It detects categories such as:

- SQL, NoSQL, LDAP, template, deserialization, and XML error disclosure.
- Missing or weak security headers.
- Cookie flag issues.
- CORS misconfigurations.
- Exposed secrets, private keys, service account data, webhooks, and tokens.
- Exposed source control, configuration, API documentation, or sensitive files.
- JWT concerns such as `none` algorithm, long expiration, and HMAC usage.
- Slow responses and dangerous HTTP methods.

Passive findings are useful for triage, but they still require review. Header and policy findings often depend on application context.

### Running Passive Analysis

1. Capture traffic.
2. Open **Utilities > Scanner**.
3. Select **Passive Scanner**.
4. Click **Scan All History**.
5. Review created findings in **Findings**.

Custom passive rules are configured in **Settings > Scanner**.

## Active Scanner

The active scanner injects payloads into candidate request locations and validates the target response.

Implemented check families:

| Check | Confirmation behavior |
| --- | --- |
| SQL injection | Looks for SQL errors, or repeatable time delay above measured baseline for time-based payloads. |
| Reflected XSS | Requires payload reflection in an HTML response without expected encoding. |
| Path traversal / LFI | Requires file-content indicators that were not present in the baseline response. |
| OS command injection | Requires command output, or repeatable delay above measured baseline for time payloads. |
| SSTI | Uses deterministic template math payloads and requires the computed result in the response. |
| SSRF | Requires metadata or service-banner evidence from injected URL payloads. |
| Open redirect | Requires a redirect response pointing to the injected external domain. |

The scanner deliberately does not treat a generic `200 OK` response as proof of a vulnerability.

### Stubbed Checks

The active check list can include checks marked as stubbed. Stubbed checks are visible for roadmap clarity but do not create findings. In the current backend, XXE and insecure upload are not automatically confirmed without out-of-band or application-specific verification.

## Active Scan All

**Active Scan All** tests recent captured requests by injecting payloads into:

- Query parameters.
- Form body parameters.
- JSON values.
- Path segments.
- Selected headers when enabled.

Use scope before active scanning to keep traffic and results focused.

Recommended workflow:

1. Define and activate scope.
2. Capture representative target traffic.
3. Start with passive analysis.
4. Run active scans on selected requests before using **Active Scan All**.
5. Review proof requests and response evidence in Findings.
6. Remove false positives rather than reporting raw scanner output.

## Evidence Quality

A high-quality scanner finding should answer:

- Which parameter or input was tested?
- Which payload was used?
- What changed in the response?
- Was the behavior absent from the baseline response?
- Is the issue repeatable?
- Is there linked evidence in Ogma?

When evidence is uncertain, lower confidence or keep the result as a note until it is confirmed.
