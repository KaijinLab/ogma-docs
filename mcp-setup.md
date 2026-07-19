---
title: Ogma MCP Server Setup
description: Configure the Ogma MCP server for AI assistants to inspect scoped project context, proxy history, findings, workflows, replay sessions, and notes.
keywords: Ogma MCP server, model context protocol, AI security testing assistant, proxy MCP integration
---

# Ogma MCP Server Setup

The Ogma MCP server (`ogma-mcp`) lets compatible AI assistants inspect scoped Ogma project context: proxy traffic, findings, workflows, Replay sessions, Automate runs, scope, notes, and related security data.

MCP is for external tools such as Codex, Claude Code, Cursor, and other Model Context Protocol clients. It is not the same feature as the in-app Workspace AI assistant.

<img class="ogma-screenshot ogma-ss-dark" src="/mcp-dark.webp" alt="MCP settings in dark mode" loading="lazy">
<img class="ogma-screenshot ogma-ss-light" src="/mcp-light.webp" alt="MCP settings in light mode" loading="lazy">

For the full resource and tool list, see [MCP resources and tools](./reference/mcp-tools.md).

## When to Use MCP

Use MCP when an external assistant should help you:

- Summarize captured traffic.
- Triage findings.
- Draft evidence-based report text.
- Review workflows and Replay sessions.
- Prepare scoped actions that you explicitly approve.

Use [Workspace AI](./guide/workspace-ai.md) when you want the embedded assistant window inside Ogma instead.

## Requirements

- Ogma daemon running (default: `http://127.0.0.1:8181`)
- The `ogma-mcp` binary (built from source)

## Build

```bash
cargo build --bin ogma-mcp --release
```

The binary is at `target/release/ogma-mcp`.

## Run

```bash
# Connect to Ogma running on the default port
./ogma-mcp

# Connect to a custom address
./ogma-mcp --api-url http://127.0.0.1:9090

# Use a larger body preview
./ogma-mcp --body-preview-bytes 2048
```

The server exits immediately if it cannot reach the Ogma API.

## In-App MCP Settings

Packaged Ogma builds can manage MCP from **Settings > MCP**. Use the settings screen when you want Ogma to start or stop the embedded MCP process for the active instance.

Use the standalone `ogma-mcp` binary when your AI client expects to launch the MCP server directly.

## Claude Code

Add to `~/.claude.json`:

```json
"mcpServers": {
  "ogma": {
    "type": "stdio",
    "command": "/path/to/ogma-mcp",
    "args": [],
    "env": {
      "OGMA_API_URL": "http://127.0.0.1:8181"
    }
  }
}
```

Reload Claude Code. Verify with: "What projects does Ogma have?"

## Cursor

Create `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "ogma": {
      "command": "/path/to/ogma-mcp",
      "args": [],
      "env": {
        "OGMA_API_URL": "http://127.0.0.1:8181"
      }
    }
  }
}
```

Restart Cursor. Verify in Settings > Tools & MCP.

## Read-Only Mode

By default, the MCP server is read-only. These operations are not available unless explicitly enabled:

- Sending requests (Replay)
- Driving the embedded browser, crawler, auth capture, and active probe helpers
- Running workflows
- Creating or modifying findings
- Modifying scope or match-replace rules
- Modifying or forwarding intercepted traffic
- Deleting data
- Accessing secret environment variable values
- Exporting data

Body content is capped at 512 bytes by default. Use `--body-preview-bytes` to adjust.

## Finding Write Tools

To enable AI-assisted finding creation, restart ogma-mcp with write permissions:

```bash
./ogma-mcp --allow-write-findings
```

Or set the environment variable:
```bash
OGMA_MCP_ALLOW_WRITE_FINDINGS=1 ./ogma-mcp
```

### Write tools available

| Tool | Description |
|------|-------------|
| `ogma_preview_finding_from_evidence` | Preview a finding draft from an HTTP entry (read-only, always available) |
| `ogma_create_finding` | Create a finding with severity, status, tags, and evidence links |
| `ogma_update_finding` | Update an existing finding |
| `ogma_add_finding_tag` | Add tags to a finding without replacing existing tags |
| `ogma_link_finding_evidence` | Link HTTP entry, Replay attempt, Automate result, or WS message to a finding |

### Example: AI-assisted finding creation

With `--allow-write-findings`:

1. "Analyze HTTP entry {id} for security issues. If you find a real issue, use ogma_create_finding to document it."
2. The AI will call `ogma_get_http_entry` to inspect the request
3. If evidence supports a finding, it will call `ogma_create_finding` with the evidence linked

### Still not available with finding writes only

- Replay sending
- Workflow execution
- Export creation
- Finding deletion
- Bulk update
- Any proxy or scope mutations

## Export Tools

To enable AI-assisted export job creation, restart ogma-mcp with export permissions:

```bash
./ogma-mcp --allow-export-data
```

Or set the environment variable:
```bash
OGMA_MCP_ALLOW_EXPORT_DATA=1 ./ogma-mcp
```

### Export tools available

| Tool | Permission required | Description |
|------|--------------------|-------------|
| `ogma_preview_export_plan` | None (read-only) | Preview what would be included in an export |
| `ogma_list_export_jobs` | None (read-only) | List recent export jobs |
| `ogma_get_export_job` | None (read-only) | Check export job status |
| `ogma_get_export_download_info` | None (read-only) | Get download URL for completed export |
| `ogma_create_export_job` | export_data | Create an export job |

### Supported export kinds and formats

| Kind | Description | Formats |
|------|-------------|---------|
| `http_history` | All proxied HTTP requests | json, csv, raw_http |
| `search` | Filtered HTTP requests | json, csv, raw_http |
| `findings` | Security findings | json, csv |
| `automate_results` | Automate session results | json, csv |

Note: `raw_http` format is only valid for `http_history` and `search` kinds.

### Security warning

Export files may contain full HTTP request and response bodies, which can include passwords, tokens, and personal data. Handle export files with appropriate care.

### Still not available with export permissions only

- Export file deletion
- Export file renaming
- Streaming export content through MCP
- Replay sending
- Workflow execution

## Replay Request Sending

Warning: this enables sending real outbound HTTP traffic through Ogma Replay.

To enable:

```bash
./ogma-mcp --allow-send-requests
```

With custom rate limits:
```bash
./ogma-mcp --allow-send-requests --max-sends-per-minute 3 --max-sends-per-session 10
```

Or via environment variables:
```bash
OGMA_MCP_ALLOW_SEND_REQUESTS=1 OGMA_MCP_MAX_SENDS_PER_MINUTE=3 ./ogma-mcp
```

### Prerequisites

1. Ogma proxy must be running
2. An active scope must be configured in **Scopes** (required for all sends)
3. The target host must be in the active scope

### Send tools

| Tool | Permission | Description |
|------|-----------|-------------|
| `ogma_preview_replay_send` | send_requests | Prepare a send, get confirmation token |
| `ogma_send_replay_request` | send_requests | Execute send with confirmation token |
| `ogma_create_replay_session_from_history` | send_requests | Create Replay session |
| `ogma_create_replay_session_raw` | send_requests | Create Replay session from a raw request definition |
| `ogma_repeat_request` | send_requests | Repeat a captured request with optional changes |
| `ogma_replay_with_modifications` | send_requests | Replay a captured request with field-level overrides |
| `ogma_http_request` | send_requests | Send a direct HTTP request |
| `ogma_fetch_url` | send_requests | Fetch a URL and return status, headers, and preview |
| `ogma_follow_redirect` | send_requests | Follow a redirect chain and report each hop |
| `ogma_bulk_send_requests` | send_requests | Send a bounded batch of requests |
| `ogma_fuzz_parameter` | send_requests | Replace a `{{FUZZ}}` placeholder with wordlist values |
| `ogma_multipart_upload` | send_requests | Send multipart form-data requests for upload testing |
| `ogma_websocket_connect` | send_requests | Connect to a WebSocket URL and exchange messages |
| `ogma_login_replay_auto` | send_requests | Submit a browser login form and capture an auth profile |
| `ogma_auth_capture_profile` | send_requests | Capture browser cookies, storage, auth tokens, and CSRF candidates |
| `ogma_auth_apply_profile` | send_requests | Apply a captured auth profile to the browser |
| `ogma_auth_refresh_csrf` | send_requests | Refresh CSRF candidates from browser state |
| `ogma_authz_matrix_test` | send_requests | Replay one request as multiple auth profiles |
| `ogma_run_active_probe_workflow` | send_requests | Run bounded vulnerability-specific active probes |
| `ogma_browser_navigate` and browser interaction tools | send_requests | Drive the embedded browser and capture resulting traffic |
| `ogma_crawl_site` | send_requests | Crawl a scoped target through the embedded browser |
| `ogma_get_replay_session` | None | View Replay session metadata |
| `ogma_get_replay_attempt` | None | View Replay attempt metadata |
| `ogma_list_replay_sessions` | None | List Replay sessions |

### Two-step workflow

Every send requires two tool calls to prevent accidental sends:

1. `ogma_preview_replay_send` - review the request, get a confirmation token
2. `ogma_send_replay_request` - confirm and send with the token

Confirmation tokens expire in 5 minutes and are single-use.

### Rate limits

Default: 5 sends per minute, 20 sends per session (resets on restart).

To adjust: `--max-sends-per-minute N --max-sends-per-session N`

### Example session

```
User: Resend HTTP entry abc123 and check the response
AI: (calls ogma_preview_replay_send with http_entry_id="abc123")
    - shows request preview, confirmation token, scope status --
AI: (calls ogma_send_replay_request with token and hash)
    - shows response status, timing, response preview --
```

### Still not available with request-sending permissions only

- Workflow execution
- Finding creation or update
- Deletion

Direct request tools can target arbitrary URLs, but scope checks and rate limits still apply where the tool sends traffic through Ogma's guarded send path. Keep the active scope narrow before enabling these tools.

## Intercept Control

Warning: intercept control lets an MCP client forward, drop, or modify live traffic currently held in Ogma's intercept queue.

To enable:

```bash
./ogma-mcp --allow-intercept-control
```

Or via environment variable:

```bash
OGMA_MCP_ALLOW_INTERCEPT_CONTROL=1 ./ogma-mcp
```

### Intercept tools

| Tool | Permission | Description |
|------|-----------|-------------|
| `ogma_get_intercept_status` | intercept_control | Read request, response, and WebSocket intercept state |
| `ogma_set_intercept_enabled` | intercept_control | Enable or disable intercept modes |
| `ogma_list_intercept_queue` | intercept_control | List currently held items |
| `ogma_get_intercept_item` | intercept_control | Inspect one queued item |
| `ogma_forward_intercept_item` | intercept_control | Forward a queued item, optionally modified |
| `ogma_drop_intercept_item` | intercept_control | Drop a queued item |
| `ogma_intercept_and_modify` | intercept_control | Wait for a matching item, modify it, and forward it |

## Workflow Execution

Warning: workflow execution runs workflow logic. Some workflows send HTTP traffic or create findings.

To enable:

```bash
./ogma-mcp --allow-run-workflows
```

With custom rate limits:
```bash
./ogma-mcp --allow-run-workflows --max-workflow-runs-per-minute 2 --max-workflow-runs-per-session 10
```

### Workflow execution tools

| Tool | Permission | Description |
|------|-----------|-------------|
| `ogma_get_workflow_safety` | None (read-only) | Classify workflow side effects |
| `ogma_preview_workflow_run` | run_workflows | Preview and get confirmation token |
| `ogma_run_workflow` | run_workflows | Execute with confirmation token |
| `ogma_cancel_workflow_run` | run_workflows | Cancel a running active workflow |

### Cross-permission requirements

Workflows that use `sdk.requests.send` also require `--allow-send-requests`.
Workflows that use `sdk.findings.create` also require `--allow-write-findings`.

Detection is based on static text analysis - see the advisory note below.

### Safety classification advisory note

Workflow safety classification inspects JavaScript source code text for patterns like `sdk.requests.send`. This detection is not exhaustive - obfuscated or dynamically constructed SDK method calls may not be detected. Always review workflow JavaScript source before running untrusted workflows.

### Still not available with workflow permissions only

- Passive workflow manual triggering
- Automate execution
- Deletion
- Env var mutation

## Example Prompts

Once connected:

- "Show me the last 20 HTTP requests to example.com"
- "Are there any high or critical findings in this project?"
- "Which workflows are currently enabled?"
- "Check if the HTTPQL query `req.method.eq:\"POST\"` is valid"
- "Summarize the security state of the current project"
- "Analyze HTTP entry {id} for security issues"

## Troubleshooting

**Connection refused:** Start Ogma first (`ogma --data-dir ./ogma-data`).

**MCP client shows no tools:** Confirm the path to `ogma-mcp` is correct in your client config.

**Empty results:** Ogma needs traffic captured first. Browse with your proxy configured to forward traffic through Ogma.
