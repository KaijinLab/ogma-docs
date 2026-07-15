---
title: OAST
description: Configure out-of-band application security testing callbacks in Ogma.
keywords: Ogma OAST, out-of-band testing, SSRF callback, DNS callback
---

# OAST

OAST (Out-of-Band Application Security Testing) detects vulnerabilities that produce no visible response - instead, the target makes an outbound connection to a listener you control, confirming the issue.

## How It Works

Ogma runs local listeners on multiple protocols. When a target application contacts one of these listeners, the interaction is recorded with the originating IP, timestamp, received data, and the token that was injected.

### Listener protocols

| Protocol | Default port | Use case |
|---|---|---|
| HTTP | Configurable | SSRF, blind XSS, webhooks |
| HTTPS | Configurable | SSRF over TLS |
| DNS | Configurable | Blind injection, XXE, log4shell |
| SMTP | Configurable | Email header injection, SSRF to mail services |

Configure the listener ports and the domain name used in generated tokens in the OAST settings panel.

## Generating a Callback Token

1. Open **Utilities > OAST**.
2. Click **Generate Token**. Each token is unique per test.
3. Copy the token. It includes your listener domain and a unique identifier so interactions can be matched back to the specific test.

Example token format: `[unique-id].[your-oast-domain]`

## Using Tokens in Payloads

Inject the callback token into any field where the application may make an outbound connection:

- **SSRF** - use the HTTP/HTTPS token as the target URL: `https://[token]/`
- **XXE** - reference the token in a DOCTYPE or external entity URL.
- **Log4Shell** - embed in a header: `${jndi:ldap://[token]/a}`
- **Blind XSS** - inject as a script src: `<script src="https://[token]/x.js"></script>`
- **SMTP injection** - use as a destination address or URL in email headers.

## Interactions Log

The interactions panel shows every callback received:

| Column | Description |
|---|---|
| Time | When the interaction was received |
| Protocol | HTTP, HTTPS, DNS, or SMTP |
| Source IP | IP address that made the connection |
| Token | Which token was contacted |
| Data | Request path, DNS query name, or SMTP data |

Click any row to see the full interaction details including request headers and body where applicable.

## Matching Interactions to Tests

Because each token is unique, you can inject different tokens into different parameters or requests and determine exactly which injection point triggered the callback.

## Related Pages

- [Scanner](./scanner.md)
- [Findings](../findings.md)
