---
title: Replay and Automation
description: Use Ogma Replay, WebSocket Replay, Automate, Workflows, and environment variables to repeat and scale web security tests.
keywords: Ogma Replay, web proxy automation, HTTP fuzzing, WebSocket replay, workflow automation
---

# Replay and Automation

Ogma provides multiple ways to repeat traffic: Replay for individual requests, Automate for high-volume request campaigns, and Workflows for structured multi-step logic.

## Replay

Replay is for manually modifying and resending HTTP requests.

Use it for:

- Authorization checks.
- Parameter tampering.
- Header and cookie experiments.
- Body mutation.
- Confirming scanner evidence.
- Capturing proof requests for Findings.

Common flow:

1. Select a row in **HTTP History**.
2. Send it to **Replay**.
3. Edit method, path, query, headers, cookies, or body.
4. Send the request.
5. Compare attempts and link confirmed evidence to a finding.

Replay sessions can use collection and session variables for repeated work.

## WebSocket Replay

WS Replay lets you reconnect and send messages based on captured WebSocket history.

Use it when testing:

- Message authorization.
- Event subscriptions.
- Client-side trust boundaries.
- Real-time race conditions.
- Server-side message validation.

## Automate

Automate is for repeated request sending across payload sets or parameter changes.

Use it for:

- Fuzzing parameters.
- Repeated checks with controlled rate and payload lists.
- Testing many candidate IDs.
- Running a payload list through a stable request template.
- Comparing response status, length, timing, and extracted values.

Use rate limits and scope. Automate can generate substantial traffic.

## Workflows

Workflows are reusable logic pipelines. They can be active, passive, or convert-oriented depending on the node graph and execution mode.

Use workflows when a test requires:

- Multi-step request handling.
- Extraction from one response and injection into a later request.
- Passive processing of history.
- Reusable transformation logic.
- Repeatable checks that should be shared across projects.

Workflow runs record status and step output, which can support triage and evidence gathering.

## Environment Variables

Environment variables centralize values reused across Replay, Automate, Workflows, and other tools.

Use them for:

- Hostnames.
- API base paths.
- Test account IDs.
- Tokens that rotate often.
- Values that differ between staging and production.

Mark sensitive values as secret when available, and avoid exporting them unintentionally.

## Choosing the Right Tool

| Need | Use |
| --- | --- |
| Modify one request by hand | Replay |
| Repeat one template with many values | Automate |
| Reconnect or replay WebSocket messages | WS Replay |
| Chain extraction, transformation, and sending | Workflows |
| Let an MCP assistant inspect or prepare actions | MCP with explicit permissions |
