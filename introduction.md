---
title: Introduction
description: Learn what Ogma is, how its proxy-first workflow is organized, and where to start in the documentation.
keywords: Ogma introduction, web security proxy, intercepting proxy, replay, scanner, plugins, MCP
---

# Introduction

Ogma is a desktop web security toolkit for penetration testers, application security engineers, and researchers. It combines an intercepting proxy, Replay, Automate, Workflows, scanners, utilities, plugins, and AI integration in one local project workspace.

## What Ogma Is

Ogma is local-first. It captures HTTP, WebSocket, and SSE traffic on the workstation running the app, stores data in local projects, and keeps the daily testing workflow close to the traffic table.

## Key Features

- **HTTPS and WebSocket proxy** - captures and decrypts HTTPS and WSS traffic using a local CA; intercept, edit, forward, or drop any request or message.
- **Replay** - resend any captured request with modifications; chain sessions and save templates for regression testing.
- **Automate** - fuzz parameters across a request with payload lists, similar to Burp Intruder; supports sequential and concurrent modes.
- **Passive and active scanner** - passive rules run against all captured traffic; active checks send targeted payloads for common vulnerability classes.
- **Content discovery** - crawl paths from wordlists against in-scope hosts to find hidden endpoints.
- **Plugins** - extend Ogma with JavaScript plugins; install from a folder, ZIP, or the marketplace; compatible with the Caido plugin API surface.
- **AI assistant** - embedded chat panel that can read traffic, create findings, control the browser, and run tests; connects to Anthropic, OpenAI, or Google Gemini.
- **MCP integration** - exposes 164 tools over the Model Context Protocol so external AI clients (Claude Code, Cursor, Codex) can query history, send requests, drive scoped testing workflows, and update findings.

## Use Ogma To

- Capture and inspect HTTP, WebSocket, and SSE traffic.
- Pause, edit, forward, or drop traffic with Intercept.
- Send requests to Replay, Automate, Workflows, Scanner, Findings, or Exports.
- Build project evidence with linked requests and responses.
- Install plugins from folders, zip archives, or the marketplace.
- Connect scoped project context to AI assistants through MCP.

## Documentation Map

| Goal | Page |
| --- | --- |
| Install and launch Ogma | [Getting started](./getting-started.md) |
| Capture your first request | [First capture](./guide/first-capture.md) |
| Understand the daily workflow | [Proxy workflow](./guide/proxy-workflow.md) |
| Run passive and active checks | [Scanning](./guide/scanning.md) |
| Build or install plugins | [Plugin system](./plugins/README.md) |
| Use the embedded AI assistant | [Workspace AI](./guide/workspace-ai.md) |
| Connect an external MCP client | [MCP setup](./mcp-setup.md) |

## Main Areas

| Area | Start here |
| --- | --- |
| Proxy | [HTTP History](./app/http-history.md), [Intercept](./app/intercept.md), [Replay](./app/replay.md) |
| Analysis | [Search](./app/search.md), [Findings](./app/findings.md), [Exports](./app/exports.md) |
| Utilities | [Scanner](./app/utilities/scanner.md), [Decoder](./app/utilities/decoder.md), [JWT](./app/utilities/jwt.md) |
| Automation | [Automate](./app/automate.md), [Workflows](./app/workflows.md), [Environment](./app/environment.md) |
| Extensions | [Plugins](./app/plugins.md), [Backend SDK](./plugins/backend-sdk.md), [Frontend SDK](./plugins/frontend-sdk.md) |
