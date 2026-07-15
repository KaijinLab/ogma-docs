---
title: Match & Replace
description: Automatically modify captured HTTP and WebSocket traffic with Ogma Match & Replace rules.
keywords: Ogma Match Replace, proxy rewrite rules, request modification
---

# Match & Replace

Match & Replace automatically modifies traffic as it passes through the proxy, without pausing or requiring manual action on each request.

## How Rules Work

Each rule defines what to look for and what to do with it. When a request or response matches the conditions, the rule applies its transformation immediately.

Rules apply in the order they appear in the list. If two rules target the same header, the first matching rule applies first, and subsequent rules see the result of that change.

## Rule Fields

| Field | Description |
| --- | --- |
| Name | Label for the rule. Use a descriptive name to identify its purpose. |
| Direction | Whether the rule applies to requests, responses, or both |
| Operation | What transformation to perform (see operations table below) |
| Match mode | How to identify the target: literal string or regular expression |
| Match value | The string or pattern to find |
| Replace value | The value to substitute in |
| Enabled | Toggle to activate or deactivate the rule without deleting it |

### Operations

| Operation | What it does |
| --- | --- |
| Add header | Adds a new header with a fixed name and value |
| Remove header | Deletes a header by name |
| Replace header | Replaces the value of an existing header |
| Replace body | Replaces a portion of the body using the match value |

## Match Modes

**Literal** matches the exact string. Use this for fixed tokens, header names, or specific values.

**Regex** matches using a regular expression. Use this when the target varies - for example, to match a token that changes with each session, or to capture and reuse a group in the replacement.

In regex replacements, use capture groups with `$1`, `$2`, etc. to reference matched portions in the replace value.

## Reordering Rules

Drag a rule row to reposition it in the list. Order matters when rules modify overlapping parts of the same request or response.

## AI Assist

Click **AI Assist** on the rule editor and describe what you want to change in plain language. Ogma generates the rule fields based on your description. Review and adjust the generated values before enabling the rule.

Examples of prompts that work well:
- "Remove the X-Frame-Options header from all responses"
- "Replace the Authorization header value with my test token"
- "Add a header named X-Debug with value true to all requests"

## Testing a Rule

Before enabling a rule for live traffic, test it with a sample request:

1. Open the rule editor.
2. Paste a raw HTTP request into the **Test** panel.
3. Click **Test**. The panel shows the request after the rule applies.
4. Verify the output matches what you expect.
5. Enable the rule.

## Match & Replace vs. Intercept

**Match & Replace** is automatic. Once a rule is enabled, it transforms every matching request or response without any action from you.

**Intercept** pauses traffic and waits for a manual decision. Use Intercept when the right change depends on context you need to evaluate per-request. Use Match & Replace when the same transformation should apply every time without review.

## Common Uses

- Swap a session cookie across all requests to test another account.
- Add a header that enables a debug or admin mode.
- Remove security headers from responses to evaluate client-side behavior.
- Replace a hardcoded host in redirect responses.
- Rewrite a request path prefix.

## Related Pages

- [Intercept](./intercept.md)
- [HTTP History](./http-history.md)
- [Workflows](./workflows.md)
