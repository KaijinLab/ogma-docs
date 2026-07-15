---
title: Compare
description: Compare requests, responses, tokens, and text artifacts in Ogma.
keywords: Ogma Compare, diff requests, compare responses
---

# Compare

Compare shows a side-by-side diff of two text inputs, highlighting additions, removals, and unchanged lines.

## Using the Tool

1. Paste or type content into the **left panel**.
2. Paste or type content into the **right panel**.
3. The diff view updates immediately. Additions are highlighted in one color, removals in another, and unchanged lines are shown in context.

You can also send content directly to Compare from other tools - for example, right-clicking a response in HTTP History offers a "Send to Compare" option.

## Reading the Diff

- Lines present only in the left panel are marked as removals.
- Lines present only in the right panel are marked as additions.
- Lines identical in both panels appear without highlighting.
- Inline character-level differences are shown within changed lines where the line is mostly similar.

## Common Uses

### Response behavior comparison

Send the same request with two different parameter values and compare the responses. A difference in body size, content, or headers can indicate:

- Authorization checks that respond differently based on user role.
- Parameter reflection that appears in one case and not the other.
- Error handling that leaks stack traces or internal paths.

### Token comparison

Decode two JWTs with the Decoder and paste the decoded payloads into Compare to see which claims changed between sessions or after a privilege escalation.

### Request comparison

Paste two versions of a request - for example, one with a CSRF token and one without - to confirm exactly which fields differ before building a proof-of-concept.

### Before/after exploit proof

Capture the response before and after an exploit step to show the state change as evidence in a finding.

## Related Pages

- [Replay](../replay.md)
- [Automate](../automate.md)
- [Decoder](./decoder.md)
