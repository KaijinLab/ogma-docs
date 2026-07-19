---
title: CLI Reference
description: Run Ogma from the command line as a local proxy server, MCP process, headless pentest command, or development backend.
keywords: Ogma CLI, proxy server command line, MCP CLI, headless web security testing
---

# CLI Reference

Ogma's Rust backend can run as a local proxy server, an embedded MCP process, or a headless pentest command.

Packaged desktop users normally start Ogma from the application. CLI usage is useful for development, automation, and server-style local testing.

## Server Mode

```bash
ogma \
  --listen 127.0.0.1:8080 \
  --api-port 127.0.0.1:8181 \
  --data-dir ./ogma-data
```

### Common Flags

| Flag | Default | Purpose |
| --- | --- | --- |
| `--listen` | `127.0.0.1:8080` | Proxy listener address. |
| `--api-port` | `127.0.0.1:8181` | REST API and frontend server address. |
| `--data-dir` | `./ogma-data` | Project database, certificates, plugins, exports, and local state. |
| `--max-plugin-size` | `52428800` | Maximum plugin package size in bytes. |
| `--intercept-queue-cap` | `1000` | Maximum queued intercept items before new traffic is forwarded. |
| `--ui-dir` | unset | Directory containing built frontend files to serve from the API server. |

## OAST Flags

| Flag | Default | Purpose |
| --- | --- | --- |
| `--oast-http-port` | `8888` | HTTP callback listener. Use `0` to disable. |
| `--oast-https-port` | `8443` | HTTPS callback listener. Use `0` to disable. |
| `--oast-dns-port` | `5353` | DNS callback listener. Use `0` to disable. |
| `--oast-smtp-port` | `2525` | SMTP callback listener. Use `0` to disable. |
| `--oast-domain` | `oast.local` | Domain used for generated callback hostnames. |
| `--oast-public-ip` | unset | Public IP returned by OAST DNS A-record responses. |

## Headless Pentest Mode

The `pentest` subcommand runs discovery, passive analysis, optional active scanning, and emits a Markdown report.

```bash
ogma pentest https://example.com \
  --depth 3 \
  --concurrency 10 \
  --min-severity medium \
  --output report.md
```

### Pentest Flags

| Flag | Default | Purpose |
| --- | --- | --- |
| `--depth` | `3` | Discovery depth. `0` means unlimited. |
| `--concurrency` | `10` | Maximum concurrent requests. |
| `--no-active` | disabled | Disable active scanning; run discovery and passive analysis only. |
| `--min-severity` | `medium` | Minimum severity that returns exit code `1`. Valid: `info`, `low`, `medium`, `high`, `critical`. |
| `--output` | stdout | Write report to a file instead of stdout. |

Exit codes:

| Code | Meaning |
| --- | --- |
| `0` | Completed and no finding met the severity threshold. |
| `1` | Completed and at least one finding met the severity threshold. |
| `2` | Runtime or configuration error. |

## MCP Mode

MCP can be started from Ogma settings or through the standalone `ogma-mcp` binary. Hidden backend flags also support embedded MCP mode when Ogma launches an internal MCP process.

For normal setup, use [MCP setup](../mcp-setup.md).

### Standalone `ogma-mcp` Flags

```bash
ogma-mcp \
  --api-url http://127.0.0.1:8181 \
  --body-preview-bytes 2048
```

| Flag | Environment variable | Default | Purpose |
| --- | --- | --- | --- |
| `--api-url` | `OGMA_API_URL` | `http://127.0.0.1:8181` | Running Ogma backend API URL. |
| `--body-preview-bytes` | unset | `512` | Maximum body preview bytes returned by read tools. |
| `--allow-write-findings` | `OGMA_MCP_ALLOW_WRITE_FINDINGS` | disabled | Enable finding creation, updates, tags, and evidence linking. |
| `--allow-export-data` | `OGMA_MCP_ALLOW_EXPORT_DATA` | disabled | Enable export job creation. |
| `--allow-send-requests` | `OGMA_MCP_ALLOW_SEND_REQUESTS` | disabled | Enable tools that send traffic, drive the browser, crawl, probe, test auth, or connect to WebSockets. |
| `--max-sends-per-minute` | unset | `5` | Per-minute MCP send limit. |
| `--max-sends-per-session` | unset | `20` | Send limit for the MCP process lifetime. |
| `--allow-run-workflows` | `OGMA_MCP_ALLOW_RUN_WORKFLOWS` | disabled | Enable workflow preview, run, and cancel tools. |
| `--max-workflow-runs-per-minute` | unset | `5` | Per-minute workflow run limit. |
| `--max-workflow-runs-per-session` | unset | `20` | Workflow run limit for the MCP process lifetime. |
| `--allow-intercept-control` | `OGMA_MCP_ALLOW_INTERCEPT_CONTROL` | disabled | Enable intercept queue control, forwarding, dropping, and modification. |

MCP writes protocol messages to stdout, so runtime logging goes to stderr.

## Development Builds

Local build scripts are available at the repository root:

```bash
./build-local.sh
./build-desktop-local.sh
```

Use the desktop build when testing the packaged Electron experience. Use the backend/frontend build when testing API and web UI behavior.
