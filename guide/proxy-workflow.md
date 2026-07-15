---
title: Proxy Workflow
description: Learn Ogma's end-to-end proxy workflow across HTTP history, intercept, match and replace, WebSocket history, sitemap, search, and findings.
keywords: Ogma proxy workflow, HTTP history, intercept proxy, match and replace, web security findings
---

# Proxy Workflow

Ogma's proxy workflow starts with capture and ends with reusable evidence. The core views are organized around how penetration testers move through traffic: discover, inspect, test, confirm, and report.

<div class="screenshot-placeholder">
  <strong>Screenshot placeholder</strong>
  <span>Main proxy workspace with navigation, HTTP History, request inspector, response inspector, and findings workflow.</span>
</div>

## Workspace Layout

| Section | Views |
| --- | --- |
| Overview | Sitemap, Endpoints, Scopes, Filters |
| Proxy | Intercept, HTTP History, WS / SSE History, Match & Replace |
| Testing | Replay, Automate, Workflows, Environment |
| Utilities | Scanner, OAST, Decoder, Compare, Sequencer, Race / Smuggling, notes, and token tools |
| Analysis | Search, Findings, Exports |
| Workspace | Files, Plugins |

## HTTP History

HTTP History is the primary evidence table. Use it to:

- Inspect request and response headers and bodies.
- Filter by method, host, path, status, source, tags, body content, and timing.
- Tag or color entries for triage.
- Send requests to Replay, Automate, Scanner, Findings, or external exports.
- Hide noisy static assets while preserving the underlying capture.

Recommended workflow:

1. Capture a representative user journey.
2. Filter to the active scope.
3. Tag authentication, state-changing, upload, admin, and API requests.
4. Send high-value requests to Replay.
5. Promote confirmed issues to Findings with linked evidence.

## Intercept

Intercept pauses matching traffic before it is forwarded.

Use Intercept when you need to:

- Modify requests before they hit the target.
- Drop unwanted requests.
- Observe application behavior at a precise state transition.
- Test request smuggling, race conditions, or authorization boundaries with controlled traffic.

Keep the queue bounded. If the intercept queue fills, Ogma protects the workflow by forwarding new traffic rather than indefinitely blocking the client.

## Match & Replace

Match & Replace automatically mutates traffic that passes through the proxy.

Common uses:

- Add test headers.
- Replace bearer tokens or cookies.
- Force feature flags.
- Normalize noisy headers.
- Inject tracing headers for log correlation.

Use narrow match criteria. Broad rules can corrupt unrelated traffic and make findings harder to reproduce.

## WebSocket and SSE

Ogma tracks WebSocket and server-sent event traffic separately from HTTP request/response rows.

Use **WS / SSE History** to:

- Inspect connection metadata.
- Review message payloads.
- Search stream content.
- Send WebSocket flows to WS Replay when you need to reconnect or test message variants.

## Sitemap and Endpoints

Use these overview views early and often:

- **Sitemap** shows the captured host/path structure.
- **Endpoints** surfaces API paths and routes discovered from JavaScript, responses, and captured traffic.

These views help identify untested areas before you move into active testing.

## Search and Filters

Ogma supports HTTPQL-style filtering. Use saved filters for repeatable triage queries.

Examples:

```text
req.host:example.com AND resp.code:500
```

```text
req.path.cont:"/admin" OR req.path.cont:"/api/"
```

```text
resp.header["set-cookie"].exists
```

See [HTTPQL and StreamQL](../reference/httpql.md) for syntax.

## Findings

Findings are the reporting layer. A good finding should include:

- A short title.
- Severity and confidence.
- The affected host, path, or feature.
- Linked evidence from HTTP history, Replay, Automate, or WebSocket traffic.
- Reproduction steps.
- Impact and remediation.

Scanner output is a starting point. Link clear request and response evidence before exporting findings.
