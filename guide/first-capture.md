---
title: First Capture
description: Capture your first HTTP and HTTPS traffic in Ogma using the built-in browser or an external browser, then define scope and inspect history.
keywords: Ogma first capture, HTTP history, HTTPS interception, Ogma browser, proxy setup
---

# First Capture

This guide walks through the first successful traffic capture in Ogma.

## 1. Start Ogma

1. Open Ogma.
2. Start the local instance from the launcher.
3. Open the workspace.
4. Confirm the instance health indicator is healthy.

The default local proxy listener is `127.0.0.1:8080`. The default API listener is `127.0.0.1:8181`.

## 2. Choose a Capture Method

### Ogma Browser

Use the Ogma Browser when you want the fastest path to captured traffic.

1. Click **Open Ogma Browser**.
2. Enter the target URL.
3. Browse the application normally.
4. Return to **HTTP History** and confirm requests are appearing.

Use a dedicated browser profile when you want proxy, certificate, and session settings to stay separate from other work.

### External Browser or Tool

Use an external browser, mobile emulator, CLI client, or thick client when the target requires a specific runtime.

Configure the application proxy:

| Setting | Value |
| --- | --- |
| HTTP proxy host | `127.0.0.1` |
| HTTP proxy port | `8080` or the instance listener port |
| HTTPS proxy | Same host and port |

For Firefox or Chromium profiles, a dedicated profile keeps Ogma's CA and proxy settings isolated from other browser profiles.

## 3. Enable HTTPS Inspection

1. Open **Settings > Certificate**.
2. Download the Ogma CA certificate.
3. Import it into the test browser or operating system trust store.
4. Restart the browser if required.
5. Browse an HTTPS target and confirm decrypted traffic appears in **HTTP History**.

Manage, replace, or regenerate the CA certificate later from **Settings > Certificate**.

## 4. Define Scope

Scope keeps proxy data focused and makes filters, scanner runs, search, automation, and exports easier to manage.

1. Open **Scopes**.
2. Create a preset for the target host, domain, or HTTPQL expression.
3. Activate the preset.
4. Use scope-aware filters in History, Search, Scanner, Automate, and MCP workflows.

Example HTTPQL expression:

```text
req.host:example.com OR req.host:api.example.com
```

## 5. Inspect Captured Traffic

Use these views for the first pass:

| View | Purpose |
| --- | --- |
| **HTTP History** | Main request and response table. Tag, color, filter, inspect bodies, and send traffic to other tools. |
| **Sitemap** | Host and path-oriented overview of captured web surface. |
| **Endpoints** | Extracted API and JavaScript-discovered endpoints. |
| **WS / SSE History** | WebSocket connections, messages, and server-sent event streams. |
| **Search** | Cross-history search with HTTPQL filters. |

## 6. Continue Testing

After capture works:

- Send an interesting request to [Replay](./replay-automation.md).
- Run passive checks in [Scanning](./scanning.md).
- Create confirmed evidence in **Findings**.
- Export selected evidence from **Exports**.

## Quick Diagnostics

| Symptom | Check |
| --- | --- |
| No traffic appears | Confirm the browser/application proxy points to the running Ogma listener. |
| HTTPS sites fail | Confirm the Ogma CA is trusted in the correct browser profile or OS trust store. |
| Only unrelated traffic appears | Activate scope and use scoped filters. |
| Requests bypass Ogma | Check system proxy settings, browser DNS-over-HTTPS, VPN split tunneling, and app-specific proxy overrides. |
