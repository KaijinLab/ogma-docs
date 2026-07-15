---
title: Endpoints
description: Review extracted API and JavaScript-discovered endpoints in Ogma.
keywords: Ogma Endpoints, extracted endpoints, API discovery, JS endpoint extraction
---

# Endpoints

Endpoints shows API paths and JavaScript endpoints extracted from captured traffic, including routes that you may not have visited manually.

## How Endpoints Are Extracted

Ogma runs static analysis on JavaScript responses as they pass through the proxy. It identifies:

- `fetch()` calls with URL string arguments
- `axios` calls with path strings
- URL string patterns matching common API path shapes (e.g. `/api/v1/...`)
- Path values in route definitions

Extraction happens automatically. No configuration is required.

## The Endpoint List

Each entry in the list shows:

| Column | Description |
| --- | --- |
| Path | The extracted URL path |
| Method hint | HTTP method inferred from the call (GET, POST, etc.) when available |
| Source | The HTTP history entry the path was found in |

Click any row to expand the source details and open the originating history entry.

## Filtering Endpoints

Type in the filter bar above the list to search by path string. The list narrows to matching entries as you type.

## Sending an Endpoint to Replay

1. Select an endpoint in the list.
2. Click **Send to Replay**.
3. Ogma creates a new Replay session pre-populated with the path and method hint.

Adjust the host, headers, and body in Replay before sending. The endpoint extraction provides the path; it does not reconstruct a complete request.

## Related Pages

- [Sitemap](./sitemap.md)
- [Replay](./replay.md)
- [Discovery](./utilities/discovery.md)
