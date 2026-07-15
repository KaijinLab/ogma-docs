---
title: Troubleshooting
description: Diagnose common Ogma setup, proxy capture, HTTPS interception, desktop runtime, plugin, MCP, scanner, and export problems.
keywords: Ogma troubleshooting, proxy capture issues, HTTPS interception errors, plugin loading issues, MCP setup problems
---

# Troubleshooting

Use this page to diagnose common Ogma setup and runtime problems.

## No Traffic Appears in HTTP History

Check:

1. The Ogma instance is running.
2. The browser or application proxy points to the instance listener, usually `127.0.0.1:8080`.
3. The target application is not bypassing the proxy.
4. VPN, system proxy, container, emulator, or mobile proxy settings are not overriding the test client.
5. The active project is open in the workspace.

If using Ogma Browser, open a new tab and confirm the **Proxied** badge is visible.

## HTTPS Requests Fail

Check:

- The Ogma CA certificate is installed in the correct trust store.
- You imported the CA into the browser profile actually being used.
- The target is not using certificate pinning.
- TLS passthrough rules are not excluding the host.
- Client certificate requirements are configured in **Settings > Client Certificates** if the target requires mTLS.

For pinned mobile or desktop applications, you may need application-specific testing setup outside Ogma.

## Intercept Pauses Too Much Traffic

Use narrower intercept rules.

Recommended steps:

1. Disable intercept.
2. Define scope.
3. Add match conditions for host, method, path, content type, or header.
4. Re-enable intercept.
5. Watch the queue size.

If the queue reaches capacity, Ogma forwards new traffic to avoid deadlocking the client.

## Scanner Reports Too Much Noise

For passive scanner noise:

- Activate scope before scanning.
- Focus on medium, high, and critical findings first.
- Treat missing-header findings as context-dependent.
- Use custom passive rules for project-specific evidence.

For active scanner noise:

- Scan selected requests before scanning all history.
- Review proof requests and response bodies.
- Confirm that the response evidence was not present in the baseline response.
- Check whether the finding confidence is likely or confirmed.

## Plugins Do Not Load

Check:

1. The plugin root contains `manifest.json`.
2. Entrypoint paths in the manifest exist after build.
3. The plugin is compiled to plain JavaScript.
4. Frontend assets are included in the plugin package.
5. Required permissions are declared and granted.
6. The plugin logs tab has no `init()` or bridge errors.
7. The plugin package size is below the configured limit.

## MCP Assistant Cannot See Ogma

Check:

- Ogma API is reachable, usually `http://127.0.0.1:8181`.
- `ogma-mcp` starts without exiting immediately.
- The MCP client config uses the correct binary path.
- The `OGMA_API_URL` environment variable matches the running instance.
- Write or send tools require explicit MCP flags.

See [MCP setup](./mcp-setup.md).

## Ogma Browser Is Blank or Mispositioned

Check:

- You are running the desktop app, not only the web frontend.
- The active tab has a real URL rather than `about:blank`.
- Try opening the browser as a separate window.
- Resize the Ogma window to force browser bounds recalculation.

## Custom JavaScript or CSS Breaks the UI

Use one of the recovery paths:

- Click **Reset custom UI**.
- Press `Ctrl+Alt+Shift+R`.

This clears custom JavaScript and CSS from local storage, desktop settings, and backend preferences, then reloads Ogma.

## Data or Project Looks Wrong

Check:

- The correct instance is open.
- The correct project is active.
- Startup preferences did not reopen a different instance.
- Filters or scope are not hiding expected rows.
- Static asset hiding is not excluding the content type you are looking for.

Create a backup before making manual project data changes.
