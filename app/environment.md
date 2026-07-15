---
title: Environment
description: Manage Ogma environment variables for Replay, Automate, Workflows, and testing context.
keywords: Ogma Environment, environment variables, replay variables
---

# Environment

Environment variables store reusable values you can reference in requests across Replay, Automate, and Workflows.

## Creating and Editing Variables

1. Open **Environment** from the left navigation.
2. Click **Add variable**.
3. Enter a name (letters, numbers, and underscores; no spaces).
4. Enter the value.
5. Toggle **Secret** if the value is sensitive (API keys, tokens, passwords). Secret values are masked in the UI and excluded from AI context.
6. Click **Save**.

To edit an existing variable, click its row and update the name or value.

## Using Variables in Requests

Reference a variable anywhere in a request using double-brace syntax:

```
{{VARIABLE_NAME}}
```

Examples:

- Base URL field: `{{BASE_URL}}/api/v1/users`
- Authorization header: `Bearer {{AUTH_TOKEN}}`
- Request body: `{"tenant": "{{TENANT_ID}}"}`

Ogma substitutes the variable value at send time. If a variable is not found, the literal `{{VARIABLE_NAME}}` string is sent instead.

## Variable Scope

Variables are project-level. Each project has its own variable set. Switching projects changes which variables are available. There is no global variable scope shared across projects.

## AI Assistant Access

The AI assistant can read non-secret variable names and values to provide context when you ask it to analyze a request or draft a test plan. Secret variables are never included in AI context.

## Common Uses

| Variable | Example value |
| --- | --- |
| `BASE_URL` | `https://api.example.com` |
| `AUTH_TOKEN` | `eyJhbGci...` (mark as secret) |
| `TARGET_HOST` | `app.example.com` |
| `API_KEY` | `sk-...` (mark as secret) |
| `USER_ID` | `12345` |

## Related Pages

- [Replay](./replay.md)
- [Automate](./automate.md)
- [Workflows](./workflows.md)
