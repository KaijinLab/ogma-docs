---
title: Ogma Browser
description: Use the built-in Ogma Browser to browse through the proxy without configuring a separate browser profile.
keywords: Ogma Browser, proxied browser, web security proxy browser
---

# Ogma Browser

The built-in browser lets you browse a target through Ogma's proxy without any manual proxy configuration.

## Opening a URL

1. Click **Browser** in the left navigation or the browser icon in the top bar.
2. Type a URL into the address bar and press Enter.
3. Browse the target normally.
4. Captured traffic appears in **HTTP History** as you navigate.

The proxy is pre-configured. You do not need to set a proxy address, install a profile, or adjust browser network settings.

## Browser Modes

| Mode | When to use |
| --- | --- |
| Embedded | Keep the browser inside the Ogma window while you work alongside HTTP History or Replay |
| Separate window | Open the browser in its own window when you need more screen space |

Click the **Pop out** icon in the browser toolbar to switch between modes.

## What Gets Captured

All HTTP and HTTPS requests the browser makes pass through the active proxy listener. WebSocket connections are also captured. The Ogma CA is pre-installed in the browser's trust store, so HTTPS traffic decrypts without extra steps.

## Built-in Browser vs. External Browser

| | Built-in browser | External browser |
| --- | --- | --- |
| Setup | None | Configure proxy + install CA |
| Isolation | Shared with Ogma process | Separate process |
| Extensions | None | Full extension support |
| Best for | Quick checks, initial enumeration | Complex JS apps, sites requiring specific extensions |

Use the built-in browser for fast access when you want to start capturing immediately. Use an external browser when the target requires browser extensions, specific profiles, or more complete JavaScript engine compatibility.

## Clearing Browser Data

Click the **Clear data** button in the browser toolbar to delete cookies, storage, and cache for the current session. Do this when switching between test accounts or target applications.

## Related Pages

- [HTTP History](./http-history.md)
- [First capture](../guide/first-capture.md)
- [TLS setup](./settings.md#tls)
