---
title: Plugin Backend SDK Reference
description: Reference for Ogma backend plugin APIs, sandbox execution, storage paths, HTTP history access, findings, commands, and host integration.
keywords: Ogma backend SDK, plugin backend API, JavaScript sandbox plugin, web proxy extension SDK
---

# Plugin Backend SDK Reference

Backend plugin code runs in Ogma's JavaScript sandbox and receives an `sdk` object from the host application.

For the full plugin package format, manifest fields, permissions, and examples, start with the [plugin system guide](./README.md).

## Entry point

Backend plugins expose an `init` function:

```js
async function init(sdk) {
  sdk.console.log("plugin started");
}
```

Ogma calls `init(sdk)` when the plugin is enabled.

## Core namespaces

| Namespace | Purpose |
| --- | --- |
| `sdk.console` | Write messages to the plugin log buffer. |
| `sdk.meta` | Read plugin metadata and data paths. |
| `sdk.events` | Register callbacks for Ogma events. |
| `sdk.requests` | Query HTTP history and request data. |
| `sdk.findings` | Query or create findings when permissions allow it. |
| `sdk.scope` | Read active scope information. |
| `sdk.api` | Expose backend handlers to the plugin frontend. |

## Logging

```js
sdk.console.log("message")
sdk.console.warn("warning")
sdk.console.error("error")
```

Messages are visible in the plugin logs UI. Keep logs concise and avoid writing secrets.

## Metadata

```js
sdk.meta.id()
sdk.meta.packageId()
sdk.meta.version()
sdk.meta.path()
```

Use `sdk.meta.path()` for plugin-specific data. Do not assume access to arbitrary filesystem paths from sandboxed plugin code.

## Events

```js
sdk.events.onInterceptRequest(function(req) {
  return req
})

sdk.events.onInterceptResponse(function(req, res) {
  sdk.console.log(res.getCode())
})

sdk.events.onProjectChange(function(project) {
  sdk.console.log(project ? project.name : "no active project")
})
```

Callbacks should be fast. Long-running work should be moved behind explicit user actions or backend API handlers.

## Frontend bridge handlers

Backend plugins can expose handlers for frontend plugin panels:

```js
sdk.api.register("ping", async function(input) {
  return { ok: true, input: input };
});
```

The frontend calls the handler through the Ogma frontend SDK. See the [frontend SDK reference](./frontend-sdk.md).

## Security expectations

- Treat HTTP traffic, findings, logs, and exports as sensitive.
- Request only the permissions your plugin needs.
- Never log credentials, cookies, bearer tokens, or private traffic by default.
- Keep plugin behavior explicit and understandable to the user.
