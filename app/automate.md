---
title: Automate
description: Run repeatable request campaigns with Ogma Automate.
keywords: Ogma Automate, fuzzing requests, payload automation
---

# Automate

Automate sends one request template many times with controlled payload variation, letting you enumerate parameters, fuzz inputs, or test access controls at scale.

## Create a Session

1. Open a request in **HTTP History** or **Replay**.
2. Right-click the request and choose **Send to Automate**, or use the toolbar button.
3. The request opens as the session template. All further configuration applies to this template.

## Payload Positions

Payload positions mark where payloads are inserted. Ogma replaces each marker with a payload value per request.

- Highlight text in the request editor and click **Mark** to add a position marker.
- Remove a marker by clicking the marker handle and selecting **Remove**.
- Multiple positions are supported. Their behavior depends on the attack mode.

## Attack Modes

| Mode | Behavior |
|------|----------|
| Sniper | One position at a time. Iterates each payload through each position in turn. Total requests equal payload count times position count. |
| Pitchfork | Multiple positions iterated in parallel. Pairs the first payload from list A with the first from list B, and so on. Stops when the shortest list is exhausted. |
| Cluster Bomb | Every combination across all positions. Request count equals the product of all list lengths. Use with small lists. |

## Payload Sources

| Source | Description |
|--------|-------------|
| Wordlist | Load a newline-delimited file or paste values directly. |
| Numbers | Generate a numeric range with a configurable start, end, and step. |
| Null | Send the position unchanged for each iteration. Useful as a baseline placeholder in Pitchfork. |
| Custom list | Enter values inline without a file. |

## Matchers

Matchers annotate result rows that meet a condition. They do not filter rows; they add a boolean column per matcher.

- Add a matcher by clicking **+ Matcher**.
- Describe the condition in plain language using **AI Assist**, or configure it manually.

| Matcher type | Matches when |
|--------------|--------------|
| Status | Response code equals or differs from a given value. |
| Size | Response body length falls within a specified range. |
| Body content | Response body contains or matches a string or regex. |
| Header | A named response header contains a given value. |

## Stop Conditions

A stop condition halts the run when a matcher fires.

- Enable **Stop on match** and select which matcher triggers the halt.
- The run stops after all in-flight requests for the current iteration complete.

This is useful when you need only the first successful result, such as a valid credential or a bypassed check.

## Extractors

Extractors pull a value from each response and store it as a named column.

- Use extractors to capture CSRF tokens, session IDs, or nonces for chained requests.
- Describe the extraction target using **AI Assist**, or configure it manually with a regex or JSON path.
- Extracted values appear as columns in the results table.
- Chain to a follow-up session: right-click a result row and choose **Send to Automate** with the extracted variable pre-filled.

## Results Table

Each completed request produces one row.

| Column | Description |
|--------|-------------|
| # | Request sequence number. |
| Status | HTTP response code. |
| Size | Response body length in bytes. |
| Time | Round-trip time in milliseconds. |
| Payload | The payload value(s) used for this request. |
| Matcher columns | One boolean column per configured matcher. |
| Extractor columns | One extracted value column per configured extractor. |

Click any row to open the full request and response in the inspector panel.

## Filtering Results

Type a HTTPQL expression in the **Filter** bar above the results table to narrow displayed rows. Example:

```text
resp.code.eq:200 AND resp.len.gt:500
```

Saved filters appear as quick-access presets.

## AI Assist

The **AI Assist** button appears next to matcher and extractor configuration fields. Describe what you want to detect or extract in plain language. Ogma generates the configuration. Review the result before saving.

## Send a Result Elsewhere

Right-click any result row to:

- **Send to Replay** - open the specific request and response in Replay for manual follow-up.
- **Send to new Automate session** - use the result row's request as the template for a new session.
- **Copy as curl** - copy the request as a curl command.

## Related Pages

- [Replay](./replay.md)
- [Environment](./environment.md)
- [Exports](./exports.md)
