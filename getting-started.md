---
title: Getting Started
description: Install Ogma, start a local proxy instance, configure capture, inspect traffic, and move into replay, scanning, and reporting.
keywords: Ogma getting started, web proxy setup, HTTP interception, HTTPS proxy certificate, penetration testing proxy
---

# Getting Started

Ogma is a desktop web security toolkit for intercepting, inspecting, replaying, automating, scanning, and documenting web application traffic.

This page gets you from a fresh install to a working proxy session. For a complete first test flow, continue with [First capture](./guide/first-capture.md).

<div class="screenshot-placeholder">
  <strong>Screenshot placeholder</strong>
  <span>Ogma launcher with a healthy local instance, proxy listener, API listener, and project selection.</span>
</div>

## Requirements

- A supported desktop platform: Linux, Windows, or macOS.
- A browser or application that can use an HTTP proxy.
- For HTTPS inspection, Ogma's local CA certificate imported into the browser or operating system profile used for testing.

## Install Ogma

Download the latest release from GitHub:

<https://github.com/KaijinLab/ogma/releases>

Available packages depend on the release:

| Platform | Package | Notes |
| --- | --- | --- |
| Windows | NSIS installer | Recommended for normal users. Code signing may be added in a future release. |
| macOS | App bundle or archive | Availability depends on the release artifacts. |
| Linux | AppImage | Portable package with in-app update support. |
| Linux | `.deb` | Recommended for Debian/Ubuntu-style systems. Updates are installed through package replacement. |

## Start an Instance

1. Open Ogma.
2. On the launcher, start the local instance.
3. Open the workspace. Ogma defaults to HTTP proxy listener `127.0.0.1:8080` and API `127.0.0.1:8181` unless the instance is configured differently.
4. Create or select a project if you want persistent, separated testing data.

## Configure Capture

You can capture traffic in two ways:

| Method | Use when |
| --- | --- |
| Ogma Browser | You want the simplest setup. The built-in browser is already proxied through Ogma. |
| External browser or app | You need a specific browser profile, mobile emulator, CLI tool, or thick client. Configure it to use Ogma as an HTTP proxy. |

For HTTPS traffic, download the Ogma CA certificate from the certificate settings and import it into the browser or operating system profile you use with Ogma.

## First Workflow

1. Browse the target application.
2. Confirm new rows appear in **HTTP History**.
3. Open **Scope** and define the target host or HTTPQL expression.
4. Send a request to **Replay** to modify and resend it.
5. Run **Scanner** passive analysis on captured traffic.
6. Create **Findings** only when the evidence is clear.
7. Export findings or selected traffic when reporting.

## Operational Notes

- Project databases, exports, logs, plugin data, and backups can contain credentials, tokens, and internal traffic.
- Certificate settings include CA download, import, backup, and regeneration.
- Plugin installs, updates, and marketplace packages are managed from the **Plugins** view.

## Updates

Ogma checks GitHub Releases for updates.

- Windows installer and Linux AppImage builds can support in-app download and restart.
- Linux `.deb` builds show update notifications and link to GitHub Releases.
- Local unpacked development builds do not auto-update.

## Need help?

- Open an issue: <https://github.com/KaijinLab/ogma/issues/new/choose>
- Join Discord: <https://discord.gg/KpyamsWU3>
