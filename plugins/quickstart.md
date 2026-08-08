---
title: Plugin Quickstart
description: Create and install your first Ogma plugin in minutes with a minimal backend example and optional frontend panel.
keywords: Ogma plugin quickstart, plugin manifest, custom plugin, Ogma SDK
---

# Plugin Quickstart

This guide gets you from blank folder to running plugin quickly.

## 1) Create a minimal backend-only plugin

Create a folder with these files:

```text
my-plugin/
  manifest.json
  backend/
    script.js
```

`manifest.json`:

```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  "version": "0.1.0",
  "plugins": [
    {
      "kind": "backend",
      "id": "my-plugin-backend",
      "entrypoint": "backend/script.js"
    }
  ]
}
```

`backend/script.js`:

```js
async function init(sdk) {
  sdk.console.log("Plugin started");

  sdk.events.onInterceptResponse(function(req, res) {
    if (!res) return;
    if (res.getCode() === 403) {
      sdk.console.warn("403 on " + req.getUrl());
    }
  });
}
```

Install from **Plugins > Install**, pick the folder, enable the plugin, and verify logs show `Plugin started`.

## 2) If you are using TypeScript

Use this structure:

```text
my-plugin/
  manifest.json
  backend/
    src/index.ts
```

Bundle with:

```bash
npx esbuild backend/src/index.ts \
  --bundle \
  --platform=neutral \
  --format=iife \
  --external:@ogma/sdk \
  --outfile=backend/script.js
```

Then install the folder as above.

## 3) Add a frontend later

Add a frontend entry and UI files only when you need a panel:

```text
my-plugin/
  frontend/
    script.js
    style.css   # optional
```

Then extend `manifest.json` with:

```json
{
  "kind": "frontend",
  "id": "my-plugin-frontend",
  "entrypoint": "frontend/script.js",
  "backend": { "id": "my-plugin-backend" }
}
```

For frontend communication, use `window.ogmaSDK.ready(...)` and keep backend calls in `sdk.api` handlers.

## 4) Permissions you almost always need

For the backend example above:

- none (safe defaults are auto-granted)

If your plugin sends outbound requests, add:

```json
"permissions": ["send_requests"]
```

If your plugin writes findings, add:

```json
"permissions": ["write_findings"]
```

Only request what you actually use.

## Troubleshooting first plugin

- `Plugin failed to initialize` → open **Logs** and confirm `init(sdk)` is defined.
- `Invalid manifest` → verify JSON commas and quotes.
- No callbacks firing → confirm plugin is enabled and that the matching event (`onInterceptResponse`) is registered.

For full API references:

- [Plugin System](./README)
- [Backend SDK](/plugins/backend-sdk)
- [Frontend SDK](/plugins/frontend-sdk)
