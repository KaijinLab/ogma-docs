---
title: Settings
description: Configure Ogma appearance, shortcuts, network, DNS, certificates, AI, MCP, scanner, TLS, browser, and developer customizations.
keywords: Ogma Settings, proxy settings, MCP settings, certificate settings
---

# Settings

Settings controls every aspect of how Ogma looks, captures traffic, handles TLS, and integrates with AI tools.

## Appearance

| Option | Description |
| --- | --- |
| Theme | Light, Dark, or System (follows OS setting) |
| Font size | Base font size for the workspace |
| Compact mode | Reduces row height in traffic tables for more visible entries |

## Keyboard Shortcuts

The Shortcuts page lists every bound action with its current key combination. Common defaults:

| Action | Default |
| --- | --- |
| Open Intercept | `I` |
| Open Replay | `R` |
| Open Search | `/` |
| Forward intercepted request | `F` |
| Send to Replay | `Ctrl+R` |
| Open command palette | `Ctrl+K` |

To change a shortcut, click the key combination next to the action and press the new keys.

## Proxy

| Option | Description |
| --- | --- |
| Listener host | IP address the proxy binds to (default `127.0.0.1`) |
| Listener port | Port the proxy listens on (default `8080`) |
| Upstream proxy | Optional HTTP/HTTPS proxy to forward traffic through (e.g. a corporate proxy or Burp Suite in line) |

Changes to the listener take effect after restarting the listener. The upstream proxy field accepts `http://host:port` and `https://host:port`.

## TLS

### Certificate Authority

Ogma generates a local CA on first launch. To intercept HTTPS traffic your browser or OS must trust this CA.

1. Go to **Settings > TLS > Certificate Authority**.
2. Click **Export CA certificate** to download the PEM file.
3. Install it:
   - **Browser:** Import via the browser's certificate settings (Authorities tab in Chrome/Firefox).
   - **OS (Linux):** Copy to `/usr/local/share/ca-certificates/` and run `update-ca-certificates`.
   - **OS (macOS):** Open Keychain Access, add the cert, and mark it trusted for SSL.

### Client Certificates

Add client certificates for targets that require mTLS. Each certificate entry maps a host pattern to a certificate and key file (PEM or PKCS#12).

1. Click **Add client certificate**.
2. Enter the host pattern (e.g. `api.example.com`).
3. Upload the certificate and key files.

### TLS Passthrough

Add hosts to the passthrough list to forward their TLS connections without decryption. Useful for certificate-pinned apps or hosts you do not need to inspect.

## DNS

| Option | Description |
| --- | --- |
| Custom rewrites | Map a hostname to a specific IP (overrides system DNS for that host) |
| Upstream DNS | Custom DNS server address to use instead of the OS resolver |

DNS rewrites are useful for redirecting traffic from a production hostname to a local or staging server without modifying hosts files.

## AI

| Option | Description |
| --- | --- |
| Provider | Anthropic, OpenAI, or Google Gemini |
| API key | Secret key for the selected provider |
| Model | Model name or ID (e.g. `claude-opus-4-5`, `gpt-4o`, `gemini-2.5-pro`) |

The API key is stored locally and is never sent to Ogma servers. See [Workspace AI](../guide/workspace-ai.md) for how the assistant uses this configuration.

## MCP

| Option | Description |
| --- | --- |
| Enable MCP server | Start the MCP server so external AI clients can connect |
| Read HTTP history | Allow MCP clients to query captured traffic |
| Write findings | Allow MCP clients to create and update findings |
| Send requests | Allow MCP clients to send HTTP requests through the proxy |
| Run workflows | Allow MCP clients to trigger workflow execution |

Disable permissions you do not need. See [MCP setup](../mcp-setup.md) for client configuration.

## Scanner

The Scanner settings page includes a custom passive rules editor. Rules are YAML and run against every captured request/response pair. See [Scanner](./utilities/scanner.md) for the rule format.

## Browser

Set the path to an external browser binary if Ogma cannot detect it automatically. This path is used when launching an external browser with proxy settings pre-applied.

## Developer

| Option | Description |
| --- | --- |
| Custom CSS | CSS loaded into the workspace at startup for visual customization |
| Custom JavaScript | JavaScript loaded into the workspace at startup |

These settings are for workspace personalization. Changes take effect after reloading the window.

## About

The About page shows the running version, build date, and links to troubleshooting documentation. Use **Export CA certificate** here as an alternative to the TLS settings page.

## Related Pages

- [MCP setup](../mcp-setup.md)
- [Security model](../security.md)
- [Troubleshooting](../troubleshooting.md)
