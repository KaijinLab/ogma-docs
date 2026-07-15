---
title: Decoder
description: Decode, encode, hash, and transform data with Ogma Decoder recipes.
keywords: Ogma Decoder, encode decode, hash, recipe operations
---

# Decoder

Decoder transforms input data through an ordered recipe of operations, chaining each step's output into the next.

## Layout

The panel has two columns:

- **Operations** (left) - the full list of available transforms. Click any operation to add it to the recipe.
- **Recipe** (right) - the current sequence of steps. The output of each step feeds into the input of the step below it.

Paste or type your input at the top of the recipe. The final output appears at the bottom after all steps complete.

## Available Operations

### Encoding and decoding

- Base64 encode / decode
- URL encode / decode (percent-encoding)
- HTML entity encode / decode
- Hex encode / decode

### Hashing

| Hash | Notes |
|---|---|
| MD5 | Not collision-resistant; included for legacy use |
| SHA1 | Deprecated for security use |
| SHA256 | General-purpose |
| SHA512 | General-purpose, longer digest |

Hashes are one-way. The output is the hex digest of the input bytes.

### Other operations

- **JWT decode** - splits a token into header, payload, and signature and Base64-decodes the first two parts.
- **Gzip** - compress or decompress gzip-encoded data.
- **AES-GCM encrypt / decrypt** - symmetric encryption with a key and IV you supply.
- Additional operations appear in the list as they are added to the tool.

## Working with Recipes

- **Add a step** - click an operation in the left column. It appends to the bottom of the recipe.
- **Reorder steps** - drag a step in the recipe column to a new position. The output chain updates immediately.
- **Remove a step** - click the remove control on the step. Downstream outputs recalculate.
- **Copy output** - click the copy button on any step to copy that step's output to the clipboard.

## Typical Uses

- Decode a double-URL-encoded parameter to read the actual value.
- Base64-decode a token, then apply JWT decode to read the claims.
- Hash a string to compare against a stored digest.
- Chain Base64 decode > URL decode to handle nested encoding in serialized cookies.

## Related Pages

- [JWT](./jwt.md)
- [Compare](./compare.md)
- [Payloads](./payloads.md)
