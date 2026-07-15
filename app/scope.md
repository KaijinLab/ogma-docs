---
title: Scope
description: Define target scope presets and scoped filtering in Ogma.
keywords: Ogma Scope, proxy scope, HTTPQL scope presets
---

# Scope

Scope defines which hosts and paths belong to your current target, and controls how that boundary affects what you see across Ogma.

## How Scope Affects Ogma

When a scope preset is active, HTTP History and the other tools filter their view to show only in-scope traffic. Requests outside scope are still captured and stored - they are not blocked or dropped. Deactivate or disable scope filtering at any time to see all traffic again.

Scope affects:

- HTTP History display
- Search results
- Scanner targeting
- Automate request selection
- MCP tool output

## Scope Modes

Each preset uses one of two modes:

| Mode | Description |
| --- | --- |
| Pattern-based | Define scope by hostname and optional path prefix. Add one entry per host. Supports wildcards. |
| HTTPQL expression | Write a full HTTPQL expression that defines the scope boundary. Use this for precise conditions that patterns cannot express, such as scoping by specific ports or excluding certain paths. |

You can have multiple presets and switch between them. Only one preset is active at a time.

## Creating a Scope Preset

1. Open **Scope** from the sidebar.
2. Click **New Preset**.
3. Give the preset a name.
4. Choose **Pattern** or **HTTPQL** mode.
5. Add host entries or write the HTTPQL expression.
6. Click **Save**.

## Activating a Preset

Click **Activate** next to a preset to make it the active scope. The active preset name appears in the scope indicator in the toolbar.

To stop scope filtering without deleting the preset, click **Deactivate**.

## Scoped Filtering in HTTP History

When scope is active, HTTP History shows a filtered view by default. A banner at the top of the table indicates that scope filtering is on. Click **Show all** in the banner to temporarily view traffic outside scope without deactivating the preset.

## Exporting Scope

Export a preset to share it with other tools. The export dialog offers:

| Format | Use |
| --- | --- |
| HTTPQL | Import into Ogma on another instance |
| Burp Suite XML | Import as a Burp target scope |

To export, open the preset and click **Export**.

## Related Pages

- [Filters](./filters.md)
- [HTTPQL and StreamQL](../reference/httpql.md)
- [MCP setup](../mcp-setup.md)
