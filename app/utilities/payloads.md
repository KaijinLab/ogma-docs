---
title: Payloads
description: Organize reusable payload strings and wordlists in Ogma.
keywords: Ogma Payloads, wordlists, test payloads
---

# Payloads

Payloads stores named wordlists you can reference by name in Automate sessions instead of re-entering strings each time.

## Creating a Payload List

1. Open **Utilities > Payloads**.
2. Click **New List**.
3. Enter a name (e.g. `sqli-basic`, `xss-reflected`, `idor-ids`).
4. Add entries one per line in the editor, or import from a file (see below).
5. The list saves automatically.

## Editing Entries

- Click any entry to edit it inline.
- Press **Enter** to add a new entry below the current one.
- Select one or more entries and press **Delete** to remove them.
- Drag entries to reorder them; Automate iterates the list in the order shown.

## Importing from a Text File

1. Click **Import** on any list.
2. Select a plain-text file with one payload per line.
3. Ogma appends the file contents to the current list. Existing entries are not overwritten.

Empty lines and lines starting with `#` are skipped during import.

## Using a Payload List in Automate

1. Open an Automate session and mark the positions you want to fuzz.
2. In the **Payload** settings for a position, change the source from "Simple list" to **Saved list**.
3. Select the list by name from the dropdown.
4. Automate iterates through the list entries at runtime.

Changes to the list in Payloads take effect the next time you start a run - they do not affect a run already in progress.

## Typical List Types

- SQLi probes (`' OR 1=1--`, `"; DROP TABLE users--`, etc.)
- XSS vectors for reflected and stored tests
- IDOR numeric IDs or UUIDs
- Path traversal strings
- Common usernames or passwords for credential stuffing tests
- Custom header values

## Related Pages

- [Automate](../automate.md)
- [Scanner](./scanner.md)
