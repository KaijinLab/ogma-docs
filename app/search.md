---
title: Search
description: Search Ogma project traffic and findings with HTTPQL and content filters.
keywords: Ogma Search, HTTPQL search, proxy traffic search
---

# Search

Search gives you a persistent query workspace that runs HTTPQL expressions across all captured traffic in the current project.

## Opening Search

Click **Search** in the left navigation. The query input is focused by default. Results populate below as you type or after you press Enter.

## HTTPQL Syntax

HTTPQL is a structured query language for HTTP traffic. It matches against request and response fields using typed operators.

### Fields

| Field | Matches |
|-------|---------|
| `req.host` | Request hostname. |
| `req.path` | Request path. |
| `req.method` | HTTP method (GET, POST, etc.). |
| `req.body` | Request body content. |
| `resp.code` | Response status code (integer). |
| `resp.len` | Response body length in bytes (integer). |
| `resp.body` | Response body content. |
| `resp.header["Name"]` | Value of the named response header. |
| `req.has_finding` | True when the request has at least one finding attached. |
| `req.tag` | Tag string applied to the request. |

### Operators

| Operator | Applies to | Meaning |
|----------|-----------|---------|
| `eq` | string, integer | Exact match. |
| `ne` | string, integer | Not equal. |
| `cont` | string | Contains substring. |
| `ncont` | string | Does not contain substring. |
| `regex` | string | Matches regular expression. |
| `gt` | integer | Greater than. |
| `gte` | integer | Greater than or equal. |
| `lt` | integer | Less than. |
| `lte` | integer | Less than or equal. |
| `exists` | any | Field is present and non-empty. |

### Combining Expressions

Use `AND`, `OR`, and `NOT` to combine conditions. Parentheses control precedence.

```text
(req.method.eq:POST OR req.method.eq:PUT) AND resp.code.gte:500
```

## Example Queries

Find POST requests that returned a 500-range error:

```text
req.method.eq:POST AND resp.code.gte:500
```

Find requests with an Authorization header:

```text
resp.header["Authorization"].exists
```

Find large responses from a specific host:

```text
req.host.eq:api.example.com AND resp.len.gt:100000
```

Find requests tagged for follow-up:

```text
req.tag.eq:followup
```

Find all requests that have a finding attached:

```text
req.has_finding.eq:true
```

Find requests where the response body contains a known error string:

```text
resp.body.cont:"stack trace"
```

## Saved Searches

Click **Save** after entering a query to store it as a named tab.

- Saved searches appear as tabs in the Search panel header.
- Click a tab to restore the query and re-run it.
- Right-click a tab to rename or delete it.
- Saved searches persist across sessions within the project.

## Inspecting Results

Click any row in the results table to open the request and response in the inspector panel. The inspector is the same view used in HTTP History: you can switch between raw and pretty views, copy headers or body, and add findings directly from this panel.

## AI Assist

Click the **AI Assist** button next to the query input to describe what you want to find in plain language. Ogma generates the HTTPQL expression. Review the query before running it.

- "POST requests returning server errors" > `req.method.eq:POST AND resp.code.gte:500`
- "Responses larger than 50 KB from the API subdomain" > `req.host.cont:api AND resp.len.gt:51200`
- "Requests that have findings attached" > `req.has_finding.eq:true`

## Related Pages

- [HTTPQL and StreamQL](../reference/httpql.md)
- [HTTP History](./http-history.md)
- [Filters](./filters.md)
