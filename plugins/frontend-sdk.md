---
title: Plugin Frontend SDK Reference
description: Reference for Ogma frontend plugin APIs, iframe integration, bridge calls, UI panels, commands, and host communication.
keywords: Ogma frontend SDK, plugin UI API, web proxy frontend plugin, iframe plugin bridge
---

# Plugin Frontend SDK Reference

Plugin frontend code runs inside a sandboxed iframe. This document is the low-level reference. For a higher-level introduction, see [README.md](./README.md).

---

## Security model

| Property | Value |
|----------|-------|
| Iframe sandbox | `allow-scripts` only (no `allow-same-origin`) |
| CSP `script-src` | nonce-gated; only the entrypoint script loads |
| CSP `connect-src` | `'self'` - plugin can POST to `/plugins/{id}/api/*` and poll `/plugins/{id}/events/poll` |
| CSP `default-src` | `'none'` |
| Parent DOM access | Blocked (no `allow-same-origin`) |
| Ogma session cookies | Inaccessible to plugin |
| Cross-plugin communication | Not available |

All bridge calls are authorized server-side on every request. The permission cache shown in the Permissions tab is for display only; it does not gate execution.

---

## Bridge protocol

Plugin JS communicates with the Ogma host via `postMessage`. The host sits in `PluginsView.vue` and handles `bridge_request` messages.

### Request envelope

```ts
interface BridgeRequest {
  type: 'bridge_request'
  sessionId: string     // nonce assigned when the bridge is set up; prevents stale messages
  requestId: string     // caller-generated correlation id (max 128 chars)
  command: string       // e.g. "ogma.requests.get"
  payload?: unknown     // command-specific input
}
```

Max total message size: 65 536 bytes.

### Response envelope

```ts
interface BridgeResponse {
  type: 'bridge_response'
  requestId: string
  ok: boolean
  result?: unknown
  error?: string
  code?: string
}
```

### Using the SDK (recommended)

Do not send raw `postMessage` bridge requests manually. Use the `ogmaSDK` global:

```js
ogmaSDK.ready(function(sdk) {
  sdk.meta.get().then(function(meta) {
    sdk.log.info("running as " + meta.pluginId);
  });
});
```

The SDK wraps all bridge communication and handles request correlation, sessionId management, and Promise resolution.

---

## Command reference

### `ogma.meta.get`

No payload required.

Returns `{ pluginId, packageId, name, version, ogmaVersion }`.

### `ogma.requests.get`

Payload: `{ id: string }`

Returns a projected HTTP entry. Fields: `id`, `method`, `host`, `path`, `query`, `status`, `response_length`, `response_time_ms`, `tls`, `source`, `created_at`.

Requires: `read_http_history` (auto-granted).

### `ogma.requests.search`

Payload: `{ limit?: number, offset?: number, query?: string }`

`query` supports HTTPQL filter expressions. Max `limit`: 20. Returns `{ entries: [...], total: number }`.

Requires: `read_http_history` (auto-granted).

### `ogma.findings.list`

Payload: `{ limit?: number, offset?: number }`

Returns `{ findings: [...], total: number }`.

Requires: `read_findings` (auto-granted).

### `ogma.scope.getActive`

No payload. Returns active scope preset or `null`.

Requires: `read_scope` (auto-granted).

### `ogma.projects.getCurrent`

No payload. Returns `{ id, name }` or `null`.

Requires: `read_projects` (auto-granted).

### `ogma.log`

Payload: `{ message: string }`

Writes to the plugin log buffer.

### `ogma.ui.resize`

Payload: `{ height: number }` (max 2000)

Requests the host to set the iframe height.

### `ogma.ui.sidebar.registerItem`

Payload: `{ name: string, path: string }` (name max 64 chars, path max 256 chars)

Registers a local navigation stub. Max 20 items per plugin.

### `ogma.backend.call`

Payload: `{ method: string, args: unknown[] }`

Calls a backend RPC handler registered via `sdk.api.register(method, fn)`. The method name max length is 64 chars.

Returns whatever the backend handler returned, JSON-serialized.

### `ogma.backend.onEvent`

Payload: none required.

Acknowledged only. Use `ogma.events.poll` for actual event retrieval.

### `ogma.events.poll`

Payload: `{ since: number }` (index from last poll; start at 0)

Returns `{ events: [{ event: string, args: unknown[] }], next_since: number }`.

### `ogma.navigation.addPage`

Payload: `{ path: string, title?: string }`

Acknowledged. Full router integration in progress.

### `ogma.window.showToast`

Payload: `{ message: string, variant?: "info"|"success"|"warning"|"error", duration?: number }`

Shows a toast in the plugin panel. Duration in ms (max 10000, default 3000).

### `ogma.commands.register`

Payload: `{ id: string, name: string }`

Acknowledged. Command palette integration in progress.

### `ogma.menu.registerItem`

Payload: `{ type: string, commandId: string, leadingIcon?: string }`

Acknowledged. Context menu injection in progress.

---

## Error codes

| Code | Meaning |
|------|---------|
| `PERMISSION_DENIED` | Plugin lacks the required permission. |
| `PLUGIN_DISABLED` | Plugin is not currently enabled. |
| `UNKNOWN_COMMAND` | Command is not in the supported list. |
| `INVALID_PAYLOAD` | A required payload field is missing or has the wrong type. |
| `NOT_FOUND` | The requested resource does not exist. |
| `LIMIT_EXCEEDED` | A per-plugin count limit was reached (e.g. sidebar items). |
| `SERVER_ERROR` | Internal error. Check plugin logs. |

---

## Supported commands list

`ogma.meta.get`, `ogma.log`, `ogma.ui.resize`, `ogma.ui.sidebar.registerItem`, `ogma.requests.get`, `ogma.requests.search`, `ogma.findings.list`, `ogma.scope.getActive`, `ogma.projects.getCurrent`, `ogma.backend.call`, `ogma.backend.onEvent`, `ogma.events.poll`, `ogma.navigation.addPage`, `ogma.window.showToast`, `ogma.commands.register`, `ogma.menu.registerItem`.
