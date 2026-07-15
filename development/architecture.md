---
title: Architecture
description: Understand Ogma's Rust backend, Vue frontend, Electron shell, local storage, plugin runtime, MCP server, and desktop packaging architecture.
keywords: Ogma architecture, Rust proxy backend, Vue desktop app, Electron security proxy, MCP server architecture
---

# Architecture

Ogma is built as a local desktop application with a Rust backend, Vue frontend, Electron shell, local project storage, a plugin runtime, and optional MCP integration.

## High-Level Components

| Component | Location | Responsibility |
| --- | --- | --- |
| Rust proxy/API backend | `crates/proxy` | MITM proxy, REST API, storage, scanners, replay, automation, plugins, MCP, OAST, browser control endpoints. |
| Vue frontend | `frontend/src` | Workspace UI, stores, routes, editors, scanners, plugin iframes, AI workspace, utilities. |
| Electron desktop shell | `desktop` | Packaged desktop app, browser window integration, settings bridge, app lifecycle. |
| Documentation | `docs` | VitePress documentation site. |
| Data directory | `ogma-data` or platform app data | SQLite database, CA material, plugins, exports, backups, files. |

## Backend

The backend exposes a REST API and proxy listener. Major backend modules include:

- `proxy_server.rs`: HTTP interception and forwarding.
- `intercept.rs` and `intercept_rules.rs`: intercept queue and matching.
- `store.rs` and `store_actor.rs`: project database access and async store handle.
- `api.rs`: API routing and handlers.
- `replay.rs`, `automate.rs`, and `workflows.rs`: repeatable request execution.
- `passive_scanner.rs` and `active_scanner.rs`: scanner engines.
- `plugins.rs` and `plugin_runtime.rs`: plugin metadata, sandbox runtime, permissions, and events.
- `mcp.rs`: MCP resources and tools.
- `ca.rs`, `tls_cert.rs`, `client_cert.rs`: certificate and TLS support.
- `ws_history.rs`, `ws_replay.rs`, and `sse.rs`: streaming traffic support.
- `oast.rs`: out-of-band callback services.

## Frontend

The frontend is a Vue application using route-level lazy loading for most workspace views.

Key areas:

- `router/index.ts`: workspace routes and settings routes.
- `components/NavSidebar.vue`: main product navigation.
- `stores/*`: Pinia stores for history, replay, automate, findings, workflows, plugins, scope, shell, AI, and other state.
- `api/client.ts` and `api/types.ts`: typed API client surface.
- `views/*`: workspace feature pages.
- `components/WorkspacePanel.vue`: AI and reverse shell workspace panel.
- `views/PluginsView.vue` and `views/PluginPageView.vue`: plugin installation, management, and frontend iframe hosting.

## Desktop Shell

The Electron shell provides the packaged desktop experience and native bridge functions:

- Launching and controlling the app window.
- Persisting desktop settings into frontend local storage.
- Opening Ogma Browser windows and embedded browser views.
- Packaging assets and binaries for desktop distribution.

## Storage Model

Ogma keeps assessment data local. The backend migrations define project-scoped tables for:

- HTTP history and bodies.
- WebSocket and SSE traffic.
- Replay sessions and attempts.
- Automate sessions, runs, and results.
- Findings and evidence links.
- Workflows and workflow runs.
- Scope presets.
- Plugins and plugin permissions.
- Files, exports, backups, and settings.

## Plugin Runtime

Plugins can include backend components, frontend components, or both.

Backend plugins run inside a JavaScript sandbox and receive an `sdk` object. Frontend plugins run in sandboxed iframes and communicate through a bridge controlled by Ogma.

Important boundaries:

- Frontend plugins cannot access the parent DOM.
- Bridge commands are validated server-side.
- Protected backend actions require declared and granted permissions.
- Installed packages are copied into Ogma's managed plugin directory for stable runtime behavior.

See [Plugin system](../plugins/README.md).

## MCP Integration

The MCP server exposes Ogma project context to external assistants. It starts read-only by default. Write, export, request-sending, workflow-running, and intercept-control capabilities require explicit permissions.

See [MCP setup](../mcp-setup.md).

## Design Principles

- Local-first by default.
- Evidence-linked findings.
- Scope before automation.
- Explicit permission gates for AI, plugins, request sending, and exports.
- Fast navigation for repeated tester workflows.
- Compatibility with established proxy workflows while keeping Ogma extensible.
