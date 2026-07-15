---
title: Ogma Plugin System
description: Build, package, install, enable, and distribute Ogma plugins with backend logic, frontend panels, commands, permissions, and marketplace metadata.
keywords: Ogma plugin system, web proxy plugins, plugin marketplace, penetration testing extensions, Ogma SDK
---

# Ogma Plugin System

Ogma plugins extend the tool with custom backend logic, frontend UI panels, and workflow steps. Plugins are installed locally from a directory on disk, enabled per-project, and run in a sandboxed environment.

This document is the primary reference for plugin authors.

---

## Quick start

### Minimal backend plugin

```
my-plugin/
  manifest.json
  backend/script.js
```

`manifest.json`:
```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "plugins": [
    {
      "kind": "backend",
      "id": "my-plugin-backend",
      "entrypoint": "backend/script.js"
    }
  ]
}
```

`backend/script.js` (plain ES5/ES2020, no imports):
```js
async function init(sdk) {
  sdk.console.log("my-plugin started");

  sdk.events.onInterceptResponse(function(req, res) {
    if (res.getCode() === 403) {
      sdk.console.warn("403 on " + req.getUrl());
    }
  });
}
```

Install: **Plugins > Install**, select the `my-plugin/` directory. Then enable it.

---

## Manifest reference

`manifest.json` lives in the package root directory. All fields are case-sensitive.

### Top-level fields

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `id` | yes | string | Lowercase letters, digits, hyphens only. Max 64 chars. Unique across installed plugins. |
| `version` | yes | string | Semver: `MAJOR.MINOR.PATCH` |
| `name` | no | string | Display name shown in the UI. Defaults to `id`. |
| `description` | no | string | One-line summary. |
| `author` | no | object | `{ "name": "...", "email": "...", "url": "..." }` |
| `homepage` | no | string | URL to source repository or docs. |
| `plugins` | yes | array | One or more plugin component entries (see below). |
| `permissions` | no | array | List of permission names required (see [Permissions](#permissions)). |

### Plugin component entry

Each object in the `plugins` array describes one component.

**Backend component:**
```json
{
  "kind": "backend",
  "id": "my-plugin-backend",
  "entrypoint": "backend/script.js",
  "runtime": "javascript",
  "assets": "backend/assets"
}
```

**Frontend component:**
```json
{
  "kind": "frontend",
  "id": "my-plugin-frontend",
  "entrypoint": "frontend/script.js",
  "style": "frontend/style.css",
  "assets": "frontend/assets",
  "backend": { "id": "my-plugin-backend" }
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `kind` | yes | `"backend"` or `"frontend"` |
| `id` | yes | Unique within the manifest. Lowercase, hyphens. |
| `entrypoint` | yes | Relative path to the JS entry file. |
| `style` | no | CSS file loaded in the plugin iframe. |
| `assets` | no | Directory of static assets served under `/plugins/{id}/assets/`. |
| `backend.id` | no | Links a frontend component to its backend component for `sdk.backend.*` RPC. |
| `runtime` | no (backend only) | `"javascript"` (default and only supported value). |

---

## Backend plugin API (sdk)

The backend `sdk` object is passed to your `init(sdk)` function. All methods are synchronous unless marked `async`.

### `sdk.console`

```js
sdk.console.log("message")
sdk.console.warn("message")
sdk.console.error("message")
```

Writes to the plugin's log buffer (visible under the Logs tab). Max 500 entries retained. Each message is truncated at 1 KB.

### `sdk.meta`

```js
sdk.meta.id()          // > string: plugin id (e.g. "my-plugin")
sdk.meta.packageId()   // > string: same as id
sdk.meta.version()     // > string: semver (e.g. "1.0.0")
sdk.meta.path()        // > string: writable data directory for this plugin
```

`sdk.meta.path()` returns a path like `~/.local/share/ogma/plugins/my-plugin/data`. The directory is created automatically. Use it to persist plugin data between restarts.

**Note:** The QuickJS sandbox has no `fs` or `path` module. To read/write files from a plugin, expose them via `sdk.api` handlers that use Node.js built-ins - or, for pure-JS plugins, serialize state to a string and use `sdk.env.getVar` / store state in your own data structures (in-memory only between restarts).

### `sdk.events`

Register callbacks for Ogma events. All callbacks are called synchronously inside the QuickJS sandbox.

```js
sdk.events.onInterceptRequest(function(req) {
  // req: RequestSpecRaw
  // Return a modified RequestSpecRaw to mutate the request.
  // Return null/undefined to pass through unchanged.
});

sdk.events.onInterceptResponse(function(req, res) {
  // req: Request (read-only), res: Response (read-only)
  // Return value is ignored.
});

sdk.events.onProjectChange(function(project) {
  // project: { id, name } or null
});

sdk.events.onFindingCreated(function(finding) {
  // finding: { id, title, reporter }
});
```

### `sdk.requests`

```js
// Get a single HTTP entry by id
var entry = sdk.requests.get("entry-id");
// entry: { id, method, host, path, query, tls, ... } or null

// Search HTTP history
var results = sdk.requests.search({ limit: 20, offset: 0 });
// results: { entries: [...], total: N }

// Send an HTTP request (requires send_requests permission)
var response = await sdk.requests.send(spec);
// spec: RequestSpecRaw (see below)
// response: Response
```

`sdk.requests.send` requires the `send_requests` permission to be declared in the manifest and granted by the user. See [Permissions](#permissions).

### `sdk.findings`

```js
// Create a finding (requires write_findings permission)
sdk.findings.create({
  title: "SSRF via redirect",
  reporter: "my-plugin",
  dedupeKey: "ssrf-" + request.getId(),
  request: { id: request.getId() }
});

// Check if a finding already exists (dedup check)
var exists = sdk.findings.exists({ dedupeKey: "ssrf-abc" });

// List findings
var page = sdk.findings.list({ limit: 20, offset: 0 });

// Get a single finding
var finding = sdk.findings.get("finding-id");
```

Rate limits on `sdk.findings.create`: 10 per minute, 500 per plugin session, 3 per event callback.

### `sdk.api`

Register backend RPC functions that the frontend can call via `sdk.backend.*`:

```js
// In backend init:
sdk.api.register("getScans", function(sdk, scanId) {
  return { scans: [] };
});

// Emit an event to connected frontends:
sdk.api.send("scan:complete", { scanId: 1, status: "ok" });
```

The function receives `sdk` as its first argument, followed by any arguments passed from the frontend. Return values are JSON-serialized and sent back to the caller.

Frontend calls these via `sdk.backend.getScans(scanId)` - see [Frontend plugin API](#frontend-plugin-api-sdk).

`sdk.api.send` pushes events into a per-plugin queue (max 200 entries). Frontends poll this queue via `sdk.backend.onEvent`.

### `sdk.replay`, `sdk.projects`, `sdk.scope`, `sdk.workflows`, `sdk.matchReplace`

These are read-only query namespaces. See the [backend SDK reference](./backend-sdk.md) for full method signatures.

### Request classes

**`RequestSpecRaw`** - represents an intercepted request. You receive this in `onInterceptRequest`.

```js
spec.getMethod()          // > string
spec.setMethod("POST")
spec.getHost()            // > string
spec.setHost("example.com")
spec.getPort()            // > number
spec.getPath()            // > string
spec.setPath("/new/path")
spec.getQuery()           // > string
spec.getTls()             // > boolean
spec.getHeaders()         // > Record<string, string[]>
spec.setHeader("X-Foo", "bar")
spec.getBody()            // > Body | null
spec.setBody("new body")
spec.getRaw()             // > Uint8Array (raw bytes) or []
spec.setRaw(bytes)        // set raw bytes

// Create a new spec from a URL string:
var spec = new RequestSpecRaw("https://example.com/path?q=1");
```

**`Request`** - a read-only captured request (from `sdk.requests.get`).

```js
req.getId()
req.getMethod()
req.getHost()
req.getPort()
req.getTls()
req.getPath()
req.getQuery()
req.getUrl()           // > full URL string
req.getHeaders()       // > Record<string, string>
req.getHeader("name")
req.getBody()          // > Body | null
req.getCreatedAt()     // > Date
req.toSpec()           // > RequestSpec (mutable copy)
```

**`Response`** - a read-only captured response.

```js
res.getCode()            // > number (HTTP status)
res.getHeaders()         // > Record<string, string>
res.getHeader("name")
res.getBody()            // > Body | null
res.getRoundtripTime()   // > number (ms)
res.getCreatedAt()       // > Date
```

**`Body`**:

```js
body.toText()    // > string
body.toJson()    // > parsed object or null
body.toRaw()     // > Uint8Array
body.length      // > number (original size, may differ from toText() if truncated)
```

---

## Frontend plugin API (sdk)

Frontend plugin code runs in a sandboxed iframe loaded from `/plugins/{id}/ui`. The iframe uses `postMessage` to communicate with the Ogma host, which proxies calls to the backend.

The SDK is available via `window.ogmaSDK`. Call `ogmaSDK.ready(cb)` to receive the live SDK once the host bridge is established:

```js
ogmaSDK.ready(function(sdk) {
  // sdk is the live SDK - safe to call any method here
  sdk.log.info("frontend ready");
});
```

All SDK methods return Promises.

### `sdk.log`

```js
sdk.log.info("message")
sdk.log.warn("message")
sdk.log.error("message")
```

### `sdk.meta`

```js
var meta = await sdk.meta.get();
// { pluginId, packageId, name, version, ogmaVersion }
```

### `sdk.requests`

```js
var entry = await sdk.requests.get({ id: "entry-id" });
var result = await sdk.requests.search({ limit: 20, offset: 0, query: "host:example.com" });
```

Requires `read_http_history` permission (auto-granted; no user approval needed).

### `sdk.findings`

```js
var page = await sdk.findings.list({ limit: 20, offset: 0 });
```

Requires `read_findings` permission (auto-granted).

### `sdk.scope`

```js
var scope = await sdk.scope.getActive();
```

### `sdk.projects`

```js
var project = await sdk.projects.getCurrent();
```

### `sdk.backend` - backend RPC

Call functions registered with `sdk.api.register` on the backend:

```js
// Call a named backend function
var result = await sdk.backend.call("getScans", [scanId]);

// Poll for backend-emitted events (sdk.api.send on the backend side)
var { events, next_since } = await sdk.backend.poll(since);
// events: [{ event: "scan:complete", args: [...] }]

// Register an event listener (uses polling internally)
sdk.backend.onEvent("scan:complete", function(data) {
  console.log("scan done", data);
});
```

`sdk.backend.onEvent` uses a 2-second polling loop internally. Stop listening by calling the returned unsubscribe function:

```js
var unsub = sdk.backend.onEvent("scan:complete", handler);
// later:
unsub();
```

### `sdk.navigation`

```js
await sdk.navigation.addPage("/my-plugin", { title: "My Plugin" });
```

Registers a navigation page. Currently acknowledged by the host. Full router integration is in progress.

### `sdk.sidebar`

```js
await sdk.sidebar.registerItem("My Plugin", "/my-plugin", { icon: "puzzle" });
```

Registers a sidebar entry. Currently local to the plugin UI panel - global sidebar slot wiring is in progress.

### `sdk.commands`

```js
await sdk.commands.register("my-plugin:scan", {
  name: "Scan with My Plugin",
  handler: function(context) { /* ... */ }
});
```

Acknowledged by host. Command palette integration in progress.

### `sdk.menu`

```js
await sdk.menu.registerItem({
  type: "Request",
  commandId: "my-plugin:scan",
  leadingIcon: "shield"
});
```

Acknowledged by host. Context menu injection in progress.

### `sdk.window`

```js
sdk.window.showToast("Scan complete", { variant: "success", duration: 3000 });
```

Shows a toast notification in the plugin panel. Variants: `info`, `success`, `warning`, `error`.

### `sdk.ui`

```js
sdk.ui.resize(600);                              // request iframe height change
sdk.ui.sidebar.registerItem("name", "/path");    // alias for sdk.sidebar.registerItem
```

---

## Permissions

Declare permissions in `manifest.json`:

```json
{
  "permissions": ["send_requests", "write_findings"]
}
```

### Auto-granted permissions (no user approval needed)

These are always granted to any installed plugin:

| Permission | What it allows |
|------------|----------------|
| `read_http_history` | `sdk.requests.get`, `sdk.requests.search` |
| `read_findings` | `sdk.findings.get`, `sdk.findings.list` |
| `read_scope` | `sdk.scope.getActive` |
| `read_projects` | `sdk.projects.getCurrent`, `sdk.projects.list` |

### Protected permissions (require user approval)

These must be declared in the manifest and explicitly granted by the user from the Permissions tab:

| Permission | What it allows |
|------------|----------------|
| `send_requests` | `sdk.requests.send` - make outbound HTTP requests |
| `write_findings` | `sdk.findings.create`, `sdk.findings.update` |

The user sees a prompt when enabling a plugin that declares protected permissions. They can also grant/revoke permissions at any time from the Permissions tab.

---

## Plugin package structure

A plugin package is a directory on disk. Ogma reads it in-place; no zip or archive format is used for local installs.

```
my-plugin/
  manifest.json           - required
  backend/
    script.js             - bundled backend JS (no imports, ES2020)
  frontend/
    script.js             - bundled frontend JS
    style.css             - optional CSS
    assets/               - static assets (images, fonts, etc.)
```

### Backend script requirements

- Must be a single self-contained JS file. No `import`/`require`.
- Must export an `init(sdk)` function (or define it as a global).
- ES2020 subset supported by QuickJS: `async/await`, `Promise`, `Map`, `Set`, `Symbol`, `Proxy`, `Date`, `RegExp`, `JSON`. No `fetch`, no `fs`, no `path`, no `Buffer`.
- Max file size: 256 KB.

### Frontend script requirements

- Runs inside a sandboxed iframe. `connect-src: 'self'` is allowed so the plugin can POST to `/plugins/{id}/api/*` and poll `/plugins/{id}/events/poll`.
- CSP: `default-src 'none'; script-src 'nonce-...'; style-src 'self'; img-src data: blob: 'self'; connect-src 'self'`.
- No `allow-same-origin` in the iframe sandbox - the plugin cannot access Ogma's parent DOM or cookies.
- Use `ogmaSDK.ready(cb)` to access the SDK; do not call SDK methods before the callback fires.

---

## Building a plugin for Ogma

Since the backend must be a single bundled JS file with no imports, you must bundle your TypeScript/ES module source before installing.

Recommended toolchain:

```bash
# Install dependencies
pnpm install

# Bundle backend (outputs a single CJS/IIFE file):
esbuild packages/backend/src/index.ts \
  --bundle \
  --platform=neutral \
  --format=iife \
  --global-name=_plugin \
  --outfile=dist/backend/script.js \
  --external:caido:plugin  # shim is provided by Ogma at runtime

# Bundle frontend:
vite build packages/frontend --outDir ../../dist/frontend
```

If you are using the Caido dev toolchain (`@caido-community/dev`), run `caido-dev build` and then copy the output to an Ogma-compatible layout with `manifest.json` at the root.

---

## Installing a plugin

1. Open **Plugins** in the left sidebar.
2. Click **Install** (top of the Installed tab).
3. In the desktop app, click **Browse** to open a native folder picker. In the browser, type the full server-side path to the plugin directory.
4. Click **Validate** to check the manifest and file inventory.
5. Click **Install** if validation passes.
6. Select the plugin in the list and click **Enable**.
7. If the plugin declares protected permissions, review and grant them from the **Permissions** tab before enabling.

---

## Troubleshooting

**Plugin init fails silently:** Check the **Logs** tab. The most common causes:
- `sdk.meta.path()` called but the data directory could not be created.
- An unhandled exception in `init()`.
- A missing or misspelled `sdk.*` call.

**Frontend shows blank:** Check browser console for CSP violations. Make sure your frontend script calls `ogmaSDK.ready(cb)` before accessing any SDK method.

**`sdk.requests.send` throws `Permission denied`:** The `send_requests` permission must be declared in the manifest AND granted by the user in the Permissions tab.

**`sdk.api.register` functions not callable from frontend:** The backend must be enabled (not just installed). The function name must match exactly (case-sensitive) what the frontend passes to `sdk.backend.call`.

**Compatibility warnings show as errors:** These do not block operation but indicate API surface gaps. See the SDK mapping tables above for API coverage.
