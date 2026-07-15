---
title: Files
description: Upload, manage, and download project files in Ogma.
keywords: Ogma Files, project files, wordlists, payloads, uploaded files
---

# Files

Files is where you upload and manage assets that Ogma tools reference during scanning and discovery.

## Uploading a File

1. Open **Files** from the left navigation.
2. Drag a file onto the upload area, or click **Browse** and select a file.
3. Select a category: **Wordlist**, **Credentials**, or **Payloads**.
4. Click **Upload**.

The 50 MB per-file size limit applies to all uploads.

## Supported Formats

| Category | Accepted extensions |
| --- | --- |
| Wordlist | `.txt`, `.lst`, `.csv` |
| Credentials | `.txt`, `.csv` |
| Payloads | `.txt`, `.lst`, `.csv` |
| Certificates | `.pem`, `.crt`, `.key`, `.p12` |
| Config / other | `.json`, `.yaml`, `.xml`, `.conf` |

## Using Files in Discovery

When configuring a Content Discovery job, the wordlist field shows a dropdown of uploaded Wordlist files instead of requiring you to type a path or UUID. Select the file from the list.

The same pattern applies to Automate payload lists: uploaded Payload files appear in the payload source selector.

## Managing Files

- **Download:** Click the download icon next to any file to save a copy.
- **Delete:** Click the delete icon to remove the file from the project. Deleting a file does not affect jobs that already ran using it.
- **Rename:** Click the file name to edit it.

Files are project-scoped. They are included in project ZIP exports and restored on import.

## Related Pages

- [Discovery](./utilities/discovery.md)
- [Automate](./automate.md)
- [Exports](./exports.md)
