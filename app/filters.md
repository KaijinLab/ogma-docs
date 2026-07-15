---
title: Filters
description: Define and apply saved filters for Ogma proxy traffic.
keywords: Ogma Filters, saved filters, HTTPQL filters
---

# Filters

Filters are saved HTTPQL query presets that you apply to HTTP History and Search to focus on specific traffic.

## Saving a Filter

1. Type an HTTPQL query into the filter bar in HTTP History or Search.
2. Click the **Save filter** icon (bookmark) next to the filter bar.
3. Enter a name for the filter.
4. Click **Save**.

The filter appears in the Filters list and in the filter bar dropdown on any HTTP History or Search view.

## Applying a Saved Filter

Click the filter bar in HTTP History or Search, select a saved filter from the dropdown, and the query loads immediately. The traffic view updates to show only matching entries.

## Managing Filters

Open **Filters** from the left navigation to see all saved filters.

| Action | How |
| --- | --- |
| Rename | Click the filter name and type a new one |
| Edit query | Click the edit icon to open the query editor |
| Delete | Click the delete icon next to the filter |

## Filters vs. Scope

Filters and scope serve different purposes.

| | Filters | Scope |
| --- | --- | --- |
| Purpose | View-only query preset | Controls what traffic Ogma captures and intercepts |
| Effect | Hides non-matching rows in the UI | Stops non-matching traffic from entering the proxy pipeline |
| Stored as | Named HTTPQL queries | Host/path include and exclude rules |
| Applies to | HTTP History, Search | Intercept, Automate, Scanner, Workflows |

A filter does not prevent Ogma from capturing traffic. It only changes what you see in the table.

## Related Pages

- [Search](./search.md)
- [HTTP History](./http-history.md)
- [Scope](./scope.md)
- [HTTPQL reference](../reference/httpql.md)
