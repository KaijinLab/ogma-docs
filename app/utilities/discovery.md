---
title: Discovery
description: Discover paths and target surface from Ogma Utilities.
keywords: Ogma Discovery, content discovery, endpoint discovery
---

# Discovery

Discovery sends HTTP probes to find paths and files that are not linked from the application's visible surface.

## Target Configuration

| Field | Description |
|---|---|
| Host | Hostname or IP address of the target |
| Port | TCP port (default: 80 or 443) |
| HTTPS | Toggle to send probes over TLS |
| Base path | Prefix prepended to every probe (e.g. `/api/v1`) |

## Wordlist Options

- **Built-in** - approximately 9,300 paths from the dirsearch project, covering common directories, files, and application paths.
- **Uploaded file** - supply your own wordlist; one path per line.

## Technology Presets

Clicking a preset adds the file extensions and path patterns associated with that technology to the current probe list.

| Preset | What it adds |
|---|---|
| WordPress | wp-admin, wp-content, plugin paths, `.php` extensions |
| PHP | `.php`, `.php5`, `.phtml`, config and backup patterns |
| Java | `.jsp`, `.jspx`, `.do`, `.action`, WEB-INF paths |
| .NET | `.aspx`, `.ashx`, `.asmx`, `.config` patterns |
| Node.js | `.js`, package files, common Express/Next paths |
| Python | `.py`, `wsgi.py`, Django and Flask common paths |

Presets stack - selecting multiple adds all their extensions and patterns together.

## Extensions Field

Enter a comma-separated list of extensions (e.g. `php,asp,bak,old`) to append to every probe. Extensions apply on top of the wordlist, so each entry generates one plain probe and one probed per extension.

## Concurrency and Timing

- **Concurrency slider** - number of parallel requests. Higher values complete faster but are more likely to trigger rate limiting.
- **HTTP method** - GET returns full response bodies; HEAD returns only headers and is faster when status code and size are sufficient.
- **User agent** - override the default to match a browser or tool profile.
- **Request delay** - milliseconds between requests; use with low concurrency for slow-rate testing.

## Running a Scan

1. Fill in the target host, port, and HTTPS toggle.
2. Select a wordlist and any technology presets.
3. Add extensions if applicable.
4. Adjust concurrency and delay for the target environment.
5. Click **Start**. A live progress bar shows completed probes, total probes, and current request rate.
6. Click **Cancel** at any time to stop.

## Results

The results table updates in real time as probes complete.

| Column | Description |
|---|---|
| Path | The probed path |
| Status | HTTP response status code |
| Size | Response body size in bytes |
| Time | Response time in milliseconds |
| Actions | Send to Replay, View in History |

Every successful probe automatically appears in **HTTP History** and **Sitemap**, so you can continue analysis in those panels without manual import.

## Related Pages

- [Sitemap](../sitemap.md)
- [HTTP History](../http-history.md)
- [Scanner](./scanner.md)
