---
title: Workspace AI
description: Configure and use the embedded Ogma Workspace AI assistant for request analysis, browser-assisted testing, evidence summaries, finding drafts, and local project actions.
keywords: Ogma AI workspace, AI web security assistant, MCP proxy assistant, vulnerability evidence summaries
---

# Workspace AI

The Workspace AI is an embedded chat panel inside Ogma that can read your captured traffic, take actions in the app, and help you build findings - all without leaving the workspace.

## Connecting an AI Provider

1. Open **Settings > AI**.
2. Select a provider: **Anthropic**, **OpenAI**, or **Google Gemini**.
3. Paste your API key.
4. Select a model.
5. Return to the workspace.

The API key stays local. It is sent directly from your browser to the provider API; it does not pass through any Ogma server.

## Opening the Assistant Panel

Click the AI button in the bottom-right workspace controls, or use the workspace button in the top navigation when available. The panel opens alongside the main workspace. You can maximize it or float it as a separate panel.

## What the AI Can See

The assistant receives context based on what you currently have open:

| Context | What is included |
| --- | --- |
| Active view | The current page (HTTP History, Replay, Findings, etc.) |
| Selected request | Full request and response headers and body |
| Captured history | Queryable via tools - the AI searches rather than receiving the full log |
| Findings | Existing findings the AI can read and update |
| Scope | The current in-scope host and path rules |
| Environment variables | Non-secret variable names and values |
| Notes | Project notes content |

Secret environment variables are never sent to the AI provider.

## Analyzing a Request

1. Select a request in HTTP History or Replay.
2. Open the assistant panel.
3. Ask: "What does this request do and what parameters look interesting?"

The assistant reads the selected entry and describes the request, identifies parameters, and suggests follow-up tests.

## Drafting a Finding

After identifying a vulnerability in Replay or the scanner:

1. Open the assistant.
2. Ask: "Draft a finding for this authorization bypass with the selected request as evidence."

The assistant calls the `create_finding` tool to write a structured finding with title, severity, description, reproduction steps, and remediation notes directly into your Findings list.

## Autonomous Investigation

Give the assistant a starting URL and a goal:

> "Browse to https://app.example.com, log in with the credentials in my environment variables, and identify any endpoints that look under-authorized."

The assistant uses the browser tools to navigate, captures the resulting traffic, analyzes it, and reports what it finds. It can also send requests through Replay, run passive scans, and create findings without further prompting.

## HTTPQL and StreamQL AI Assist

Throughout the app, filter bars with an AI sparkle icon accept natural-language queries. Type a description of what you want to find (e.g. "requests with JSON bodies that set a role field") and the assistant converts it to an HTTPQL or StreamQL expression.

## In-App Assistant Tools

The assistant can take these actions inside Ogma:

| Area | Available actions |
| --- | --- |
| HTTP history | Search, read entries and bodies, analyze entries |
| Findings | Search, create, update findings |
| Sitemap and analysis | Get sitemap, analyze frontend surface, fingerprint target, decode JWT |
| Replay | List sessions, update and send requests, test login flows |
| WebSocket | Search WS history, read messages, start WS capture |
| Browser | Launch, navigate, execute JS, screenshot, get page source |
| Intercept | Check queue status, forward intercepted requests |
| Automate and workflows | Create automate sessions, run passive workflows, search workflows |
| Scanner | Run passive scans |
| Scope and projects | Read scope, add to scope, list and switch projects |
| Payload helpers | Get payloads, get reverse shell snippets |
| Environment | List environment variables |

## Workspace AI vs. MCP Server

| | Workspace AI | MCP server |
| --- | --- | --- |
| Where it runs | Inside Ogma's frontend | Separate `ogma-mcp` process |
| Primary user | You, chatting inside Ogma | External clients (Claude Code, Cursor, Codex) |
| Protocol | Provider API + frontend tool calls | Model Context Protocol |
| Tool count | 39 in-app tools | 145 MCP tools |
| Best for | Interactive analysis while testing | External agent workflows and IDE access |

For external AI tools, see [MCP setup](../mcp-setup.md).

## Practical Prompts

- "Summarize what this request does and identify interesting parameters."
- "Draft reproduction steps from the selected Replay evidence."
- "Compare these two responses and explain the meaningful differences."
- "Turn this scanner evidence into a concise finding draft."
- "Suggest follow-up Replay tests for this endpoint."
- "Search history for requests that modify user account data."
