---
title: Settings
description: Configure Ogma appearance, shortcuts, network, DNS, certificates, AI, MCP, scanner, TLS, browser, and developer customizations.
keywords: Ogma Settings, proxy settings, MCP settings, certificate settings
---

# Settings

Settings controls how Ogma looks, captures traffic, handles TLS, routes outbound connections, and exposes AI or MCP features. Keep security-sensitive permissions disabled unless a workflow needs them.

## Appearance

Use **Appearance** for workspace comfort and readability.

| Section | What it controls |
| --- | --- |
| Theme | Light, Dark, or System color mode. |
| Syntax highlight theme | Colors used in body viewers, Replay editors, and WebSocket inspectors. |
| Layout | Table density, HTTP History auto-scroll, inspector orientation, and sidebar position. |
| Typography | UI font, UI font size, and editor font size. |
| Timestamps | 12-hour or 24-hour time, local timezone or UTC, and a live preview. |

## Shortcuts

The **Shortcuts** page lists every bound action and lets you rebind keys. Click **Edit**, press the new key combination, or use **Reset** to restore a default.

Common defaults include:

| Action | Default |
| --- | --- |
| Open Intercept | `I` |
| Open Replay | `R` |
| Open Search | `/` |
| Forward intercepted request | `F` |
| Send to Replay | `Ctrl+R` |
| Open command palette | `Ctrl+K` |

## Startup and Rendering

| Page | Use it for |
| --- | --- |
| Startup | Choose the default proxy instance to open when Ogma starts, and control startup window behavior. |
| Rendering | Reduce motion for accessibility or performance, and review hardware acceleration behavior. |

## Network

Use **Network** when Ogma must send outbound traffic through another proxy.

| Proxy type | Behavior |
| --- | --- |
| HTTP proxy | Routes outbound HTTP and HTTPS traffic through an upstream HTTP proxy. |
| SOCKS5 proxy | Routes outbound traffic through a SOCKS5 server; DNS is resolved through the SOCKS5 server. |
| Plugin proxy | Routes traffic through an Ogma plugin-defined upstream proxy. |

Each upstream entry can be enabled or disabled and ordered by priority. Use this for corporate proxies, chained testing setups, or routing traffic through another inspection tool.

## DNS

| Section | Use it for |
| --- | --- |
| Static host rewrites | Map hostnames to specific IP addresses without editing the OS hosts file. Wildcards such as `*.example.com` match one subdomain level. |
| Upstream DNS servers | Route DNS queries through a custom resolver. Leave the host pattern empty to apply a resolver globally. |

DNS rewrites are useful when testing staging services behind production hostnames or redirecting traffic to a controlled lab endpoint.

## Certificates and TLS

### Certificate Authority

Ogma generates a local CA on first launch. To intercept HTTPS traffic, your browser or OS must trust the exported CA certificate.

1. Open **Settings > Certificate**.
2. Download the public CA certificate for browser or OS trust.
3. Install it in the browser or OS trust store.

The same page can export a full CA backup, import a CA backup from another Ogma instance, manage named CAs for per-listener interception, or regenerate the active CA. CA backups include private key material; store them like secrets.

### Client Certificates

Use **Client Certificates** for targets that require mTLS. Each entry maps a host pattern, such as `*.internal.corp`, to a PEM certificate and private key.

### TLS Bypass

Use **TLS Bypass** for hosts that should be tunneled without TLS inspection. This is useful for certificate-pinned applications or traffic you intentionally do not need to decrypt.

### TLS Diagnostics

Use **TLS Diagnostics** to inspect the Ogma CA subject, SHA-256 fingerprint, validity period, database schema version, and live TLS connection test results. The connection test reports negotiated TLS version, cipher suite, upstream certificate subject, MITM certificate subject, and round-trip timing.

## WebSockets

| Setting | Description |
| --- | --- |
| Capture | Controls whether WebSocket messages are recorded. |
| Intercept WebSocket messages | Queues WebSocket messages in the Intercept panel when enabled. |

See [WebSocket and SSE History](./ws-sse-history.md) for inspection and replay workflows.

## AI

| Option | Description |
| --- | --- |
| Provider | Anthropic, OpenAI, Google Gemini, or a custom OpenAI-compatible endpoint. |
| API endpoint | Provider default endpoint or a custom base URL. |
| API key | Secret key for the selected provider. Stored locally. |
| Model | Model ID used by the Ask Bob assistant. |
| HTTP proxy | Reference field; browser-based provider calls follow system proxy behavior. |
| Advanced options | Max output tokens, temperature, request timeout, live context request count, tool context messages, and max tool iterations. |

See [Workspace AI](../guide/workspace-ai.md) for how the assistant uses traffic context and tools.

## MCP

Use **Model Context Protocol** settings to start or stop the MCP server and choose which external-agent permissions are enabled.

| Option | Description |
| --- | --- |
| Bind host | `127.0.0.1` is recommended. `0.0.0.0` exposes MCP to the network. |
| Port | MCP server port. |
| Read-only traffic tools | Always available: read project context, HTTP history, findings, workflows, and related metadata. |
| Findings write | Allows creating, updating, tagging, and linking findings. |
| Export data | Allows creating export jobs. |
| Replay send | Allows request-sending tools, browser navigation, crawling, active probes, WebSocket testing, and auth profile helpers. |
| Workflow run | Allows workflow preview, execution, and cancellation. |
| Intercept control | Allows enabling, pausing, modifying, forwarding, or dropping live intercepted traffic. |

Disable permissions you do not need. See [MCP setup](../mcp-setup.md) and [MCP resources and tools](../reference/mcp-tools.md).

## Scanner

The **Scanner** page contains the custom passive rules editor. Rules run against captured HTTP traffic and surface findings. See [Scanner](./utilities/scanner.md) for rule structure and usage.

## Timeouts

Use **Timeouts** to tune outbound connection behavior.

| Setting | Default | Description |
| --- | --- | --- |
| Connect timeout | `30000ms` | Time allowed to establish the upstream TCP connection. |
| Read timeout | `60000ms` | Time allowed to receive response data after the connection is open. |
| Write timeout | `60000ms` | Time allowed to send request data upstream. |

Presets apply common timeout profiles quickly. Increase values for slow targets; lower them when large scans should fail fast.

## Security

| Section | Description |
| --- | --- |
| Upstream TLS verification | Controls whether Ogma validates upstream TLS certificates. Keep this enabled unless you are testing a lab or broken TLS target. |
| API authentication | Protects the Ogma API with a bearer token. Required when binding to a non-localhost address. |
| Workflow requests | Warns that workflow request nodes bypass proxy settings and scope filters. Review workflows before running untrusted definitions. |

## Protobuf Schemas

Use **Protobuf Schemas** to upload `FileDescriptorSet` binary files compiled from `.proto` sources. Ogma uses these schemas for schema-based decoding in response panes and protobuf tooling.

## Developer Customization

| Page | Description |
| --- | --- |
| Custom CSS | Applies custom styles to the Ogma UI. Changes apply live. |
| Custom JavaScript | Runs JavaScript in the app context. Scripts can print output and can be configured to auto-run on startup. |

Use developer customization for local workspace personalization, not for shared project state.

## Troubleshooting and About

| Page | Description |
| --- | --- |
| Troubleshooting | Shows server and Electron versions, resets UI settings, and displays the log location. |
| About | Shows product identity, current version, build commit, update status, and release links. |

## Related Pages

- [MCP setup](../mcp-setup.md)
- [Security model](../security.md)
- [Troubleshooting](../troubleshooting.md)
