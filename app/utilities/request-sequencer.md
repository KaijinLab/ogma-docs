---
title: Request Sequencer
description: Run ordered request sequences and review step-by-step responses in Ogma.
keywords: Ogma request sequencer, request sequence, multi-step testing
---

# Request Sequencer

Request Sequencer runs a chain of HTTP requests in order, where each step can extract values from the previous response and inject them into the next request.

## Adding Steps

1. Open **Utilities > Request Sequencer**.
2. Click **Add Step**. A request editor opens for that step.
3. Build the request manually or send an existing request here from HTTP History or Replay.
4. Repeat for each step in the chain.

Steps execute in the order listed. Drag a step to reorder it.

## Extracting Values from Responses

After a step runs, you can extract a value from its response and store it as a named variable.

1. Click **Add Extraction** on a step.
2. Choose the source:
   - **Header** - extract from a specific response header (e.g. `Set-Cookie`, `Location`).
   - **Body (regex)** - extract using a regular expression with one capture group.
   - **Body (JSON path)** - extract using a JSONPath expression (e.g. `$.data.token`).
3. Name the variable (e.g. `csrf_token`, `session_id`, `redirect_url`).

The extracted value is stored and available to all subsequent steps.

## Injecting Variables into Requests

In any step's request editor, reference a variable using `{{variable_name}}`. At runtime, Ogma substitutes the value captured from the earlier step.

Example: a CSRF token extracted from step 1 as `csrf_token` can be injected into step 2 as:

```
POST /api/transfer HTTP/1.1
X-CSRF-Token: {{csrf_token}}
```

## Running the Sequence

Click **Run Sequence**. Steps execute in order. Each step waits for the previous one to complete and for any extractions to finish before the next request is sent.

After the run:

- Each step shows its request and response side by side.
- Variables show the value that was captured.
- Any step that failed (network error, extraction failure) is marked with an error state.

## Use Cases

### Multi-step authentication flows

Chain a login request (step 1) > extract the session cookie > make an authenticated request (step 2). Useful for testing access controls on endpoints that require a valid session.

### CSRF token handling

Fetch the page that contains the CSRF token (step 1) > extract the token > submit the form with the token (step 2). Confirms whether the application enforces CSRF protection correctly.

### IDOR through chained API calls

Create a resource (step 1) > extract the resource ID from the response > access the resource with a different user's session (step 2). Tests whether the server enforces ownership checks.

### Redirect chain following

Send a request that returns a redirect (step 1) > extract the `Location` header > follow the redirect (step 2). Useful for testing open redirect chains or post-authentication redirect handling.

## Related Pages

- [Replay](../replay.md)
- [Automate](../automate.md)
- [HTTP History](../http-history.md)
