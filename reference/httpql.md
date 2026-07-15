---
title: HTTPQL and StreamQL
description: Filter Ogma HTTP history, WebSocket traffic, Automate results, and related views with HTTPQL and StreamQL query syntax.
keywords: HTTPQL, StreamQL, Ogma filters, web proxy query language, Caido compatible filters
---

# HTTPQL and StreamQL

Ogma uses a Caido-compatible query language subset for filtering HTTP history, WebSocket traffic, Automate results, and related views.

## Syntax

Queries are composed of clauses joined by `AND` and `OR`.

```text
req.host:example.com AND resp.code:200
```

Parentheses group expressions:

```text
(req.path.cont:"/api/" OR req.path.cont:"/graphql") AND resp.code.gte:400
```

Comments are supported:

```text
// API errors
req.path.cont:"/api/" AND resp.code.gte:500
```

```text
/* focus on login */
req.path.cont:"login"
```

## Operators

| Operator | Meaning |
| --- | --- |
| `:` | Equals or default match, depending on field type |
| `.eq:` | Equals |
| `.ne:` | Not equals |
| `.cont:` | Contains, case-insensitive |
| `.ncont:` | Does not contain, case-insensitive |
| `.cont_cs:` | Contains, case-sensitive |
| `.ncont_cs:` | Does not contain, case-sensitive |
| `.like:` | SQL-like pattern match |
| `.nlike:` | Negative SQL-like pattern match |
| `.regex:` | Regular expression match |
| `.nregex:` | Negative regular expression match |
| `.lt:` | Less than |
| `.lte:` | Less than or equal |
| `.gt:` | Greater than |
| `.gte:` | Greater than or equal |
| `.exists` | Field or header exists |

## HTTP Examples

Find API traffic:

```text
req.path.cont:"/api/"
```

Find server errors:

```text
resp.code.gte:500
```

Find large responses:

```text
resp.length.gt:100000
```

Find JSON responses:

```text
resp.header["content-type"].value.cont:"application/json"
```

Find requests with cookies:

```text
req.header["cookie"].exists
```

Find likely admin paths:

```text
req.path.cont:"/admin" OR req.path.cont:"/manage"
```

Find replay or automate traffic:

```text
source:replay OR source:automate
```

## Stream Examples

StreamQL applies the same query style to WebSocket and stream views.

Find WebSocket messages containing a token field:

```text
ws.body.cont:"token"
```

Find server-to-client messages:

```text
stream.direction:server
```

Find JSON-like messages:

```text
ws.body.cont:"{" AND ws.body.cont:"}"
```

## Practical Saved Filters

| Name | Query |
| --- | --- |
| API errors | `req.path.cont:"/api/" AND resp.code.gte:400` |
| Auth endpoints | `req.path.cont:"login" OR req.path.cont:"oauth" OR req.path.cont:"session"` |
| JSON traffic | `resp.header["content-type"].value.cont:"json"` |
| Interesting methods | `req.method:POST OR req.method:PUT OR req.method:PATCH OR req.method:DELETE` |
| Potential secrets | `resp.body.cont:"api_key" OR resp.body.cont:"secret" OR resp.body.cont:"token"` |

## Limits

To keep filters predictable, Ogma limits query complexity:

- Maximum nested expression depth: 16.
- Maximum clause count: 64.

If a query becomes too complex, split it into saved filters or use Search for broader investigation.
