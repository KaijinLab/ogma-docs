---
title: Ogma vs Caido
description: Side-by-side comparison of Ogma and Caido web security proxies - features, pricing, workflow, and which tool suits which use case.
keywords: Ogma vs Caido, Caido alternative, web proxy comparison, security testing tools
---

# Ogma vs Caido

Both Ogma and Caido are modern web security proxies built as alternatives to Burp Suite. Both are written in Rust, ship on Linux, macOS, and Windows, and target the same professional testing workflows. The main differences are licensing model, scanner depth, and plugin runtime.

## Summary

| Feature | Ogma | Caido |
|---------|------|-------|
| Price | Free to use | Free tier (limited); Individual ~$200/yr; Team and Enterprise tiers |
| License | Proprietary | Commercial |
| Account required | No | Yes |
| Platform | Linux, macOS, Windows | Linux, macOS, Windows |
| HTTPS proxy | Yes | Yes |
| WebSocket proxy | Yes | Yes |
| HTTP/2 | Yes | Yes |
| Intercept | Yes | Yes |
| Replay / Repeater | Yes | Yes |
| Automate (fuzzing) | Yes - Sniper, Pitchfork, Cluster Bomb | Yes - via workflows |
| Passive scanner | Yes | Not included (community plugin) |
| Active scanner | Yes - 8 check categories | Not included (community plugin) |
| Content discovery | Yes - 9,300-path wordlist (dirsearch) | Not included |
| Workflows | Yes - passive and active, node-based | Yes - node-based, Free tier limited to 7 |
| Plugin system | Yes - sandboxed JS (QuickJS), JSON manifest | Yes - TypeScript/HTML/CSS/JS |
| AI assistant | Yes - Anthropic, OpenAI, Google | Yes - multi-LLM AI agents |
| MCP integration | Yes - 125+ tools, external agent support | No |
| CLI / headless | Yes - server mode + `ogma pentest <url>` | Yes - headless mode |
| Project export/import | Yes - full ZIP archive, 26+ tables | Yes |
| Free tier limits | No limits (fully open) | Up to 2 projects, up to 7 workflows |

## Pricing and access

Ogma is free to use. There is no account, no license key, and no feature gating. Every feature - scanner, workflows, plugins, AI assistant - is available without a subscription.

Caido has a free tier that limits you to 2 projects and 7 workflows. The Individual plan (~$200/year) removes those limits and adds team collaboration features. Team and Enterprise plans exist for shared workspaces and enterprise support.

## Features in depth

### Filtering and search

Both tools use HTTPQL for filtering HTTP history. The query syntax is compatible enough that filters written for one tool will mostly work on the other.

Ogma also has StreamQL for filtering WebSocket and SSE traffic. Caido does not have a documented equivalent for stream filtering at time of writing.

### Automation

Ogma's Automate tool maps directly to Burp's Intruder attack modes: Sniper (one position, one list), Pitchfork (parallel lists), and Cluster Bomb (cartesian product). Both Ogma and Caido support node-based passive and active workflows for custom automation pipelines.

Caido's free tier limits you to 7 total workflows. Ogma has no limit.

### Scanning

Ogma includes a passive scanner that runs continuously on captured traffic, and an active scanner with 8 check categories (SQLi, XSS, SSTI, SSRF, path traversal, open redirect, header injection, misconfiguration). Both are built in and require no plugins.

Caido does not ship a built-in scanner. Scanning is available via community plugins from the marketplace.

### Content discovery

Ogma includes a content discovery module with a built-in 9,300-path wordlist (from dirsearch). Caido does not ship a built-in discovery tool.

### Plugins

Both tools use web technology for plugins. The differences are in the runtime and toolchain.

Ogma plugins run backend code in a QuickJS sandbox (ES2020 subset - no `fetch`, no `fs`, no `Buffer`). Frontend plugin code runs in a sandboxed iframe. The manifest is a plain JSON file. No build step is required for simple plugins; for TypeScript source, use `esbuild` or `vite` to produce a single bundled file.

Caido plugins are written in TypeScript, compiled to JavaScript, and support HTML/CSS/JS frontends. Caido's dev toolchain (`@caido-community/dev`) handles bundling. The plugin API surface is larger and more stable - Caido has a longer plugin ecosystem history.

If you are migrating an existing Caido plugin to Ogma, review the [backend SDK](../plugins/backend-sdk) and [frontend SDK](../plugins/frontend-sdk) for API coverage. Most common APIs (requests, findings, events, console, meta) are present. Some Caido-specific APIs may require adaptation.

### AI features

Both tools support Anthropic, OpenAI, and Google as AI providers.

Ogma embeds an AI assistant in the Replay and Intercept views with an agentic tool loop (36 tools for browsing, scanning, replaying, and editing requests). It also ships an MCP server with 125+ tools, so external AI agents (Claude Desktop, Cursor, etc.) can drive Ogma directly.

Caido has AI agents built into the workflow system. It does not ship an MCP server.

### CLI and headless

Both tools support running without a GUI. Ogma server mode starts the proxy and API without an Electron window. The `ogma pentest <url>` command runs a full crawl-and-scan pass and writes a Markdown report to stdout with an exit code suitable for CI/CD pipelines (0 = no findings, 1 = low/medium, 2 = high/critical).

## Which to choose

- **Choose Ogma if:** no subscription is a requirement, you prefer no account or subscription, you need a built-in active scanner and content discovery, or you want to drive testing from external AI agents via MCP.
- **Choose Caido if:** you want a polished commercial product with a larger plugin ecosystem, team and enterprise collaboration features, or a vendor-supported subscription.
