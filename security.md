---
title: Security Model
description: Review Ogma's local-first security model, project data handling, certificate management, plugin permissions, MCP controls, and update flow.
keywords: Ogma security model, local-first proxy data, plugin permissions, MCP permissions, certificate management
---

# Security Model

Ogma is built for offensive security testing. That means it may process sensitive HTTP traffic, credentials, cookies, tokens, internal hostnames, and private application data.

This page documents how Ogma handles local data, certificates, plugins, MCP, AI providers, and exports.

## Local-First Data

Ogma stores assessment data locally on the user's machine. Treat project folders, databases, plugin data, exports, backups, logs, files, and browser data as sensitive security artifacts.

Recommended handling:

- Keep project data out of Git repositories.
- Review exports before sharing them.
- Remove cookies, bearer tokens, session IDs, passwords, and private traffic from public bug reports.
- Encrypt disks on systems used for client or production testing.
- Use a separate project per engagement or target environment.
- Clear browser data between unrelated clients or targets.

## HTTPS Inspection

Ogma can inspect HTTPS traffic when the Ogma CA certificate is trusted by the test browser or operating system.

Operational model:

- Install the CA certificate in the browser or operating system profile used with Ogma.
- Remove or rotate the CA certificate when the profile no longer needs HTTPS inspection.
- Use a dedicated browser profile for proxy testing.
- Regenerate the CA if the private key may have been copied.
- Treat CA backups as secrets.

## Internal Browser

Ogma includes an internal Chromium-based browser for testing through the proxy.

The internal browser is optimized for traffic capture and proxy testing. A separate external browser profile is usually better for unrelated browsing.

## Active Scanning

Active scanning sends modified requests to the target application. It may trigger alerts, change data, create records, or affect availability.

Use active scanning when:

- The target is in scope.
- Rate and concurrency are appropriate for the environment.
- Scanner evidence will be reviewed before reporting.

Ogma's active scanner validates findings with response evidence, baseline comparison, and repeated timing checks where applicable, but scanner output still requires tester review.

## Plugins

Plugins are local extensions. They can add backend logic, frontend panels, and workflow functionality.

Ogma's plugin system is designed with isolation in mind:

- Frontend plugins run in sandboxed iframes.
- Plugin bridge calls are constrained.
- Backend plugin APIs are explicit.
- Plugin permissions are visible to the user.
- Installed plugin packages are managed under Ogma's plugin directory for stable binary distribution behavior.

Plugin review is part of the install workflow because extensions can process captured traffic and project data.

## MCP Server

The Ogma MCP server is read-only by default. Write and export capabilities require explicit startup flags.

Use the minimum permission set required for the task:

- Read-only for analysis.
- Finding writes only when you want AI-assisted finding creation.
- Export permissions only when you intentionally want export jobs created.
- Request-sending permissions only when you intentionally allow outbound traffic.
- Workflow execution permissions only when you intentionally allow automated actions.
- Intercept-control permissions only when you intentionally allow queue mutation.

## AI Providers

If you use remote AI providers from the workspace or through MCP clients, captured traffic may leave the local machine depending on provider configuration.

Before sending data to AI:

- Redact credentials and personal data.
- Prefer local or approved providers for client data.
- Verify AI-generated findings manually before reporting.

## Exports and Reports

Exports can contain full HTTP messages, response bodies, findings, Automate results, and evidence links.

Before sharing:

- Remove secrets.
- Review binary attachments and uploaded files.
- Confirm the export format includes only intended data.
- Store delivered reports according to the client's handling requirements.

## Reporting Security Issues

Report exploitable security issues privately when the report contains sensitive details.

Until a dedicated security policy is published, use the GitHub issue tracker only for non-sensitive bugs and feature requests:

<https://github.com/KaijinLab/ogma-releases/issues/new/choose>
