---
title: JWT
description: Inspect and analyze JSON Web Tokens in Ogma.
keywords: Ogma JWT, JSON Web Token, token analysis
---

# JWT

The JWT utility decodes and inspects JSON Web Tokens so you can review the structure, claims, and security properties without a private key.

## Using the Tool

1. Paste a JWT into the input field. The tool accepts the standard three-part dot-separated format.
2. The tool splits and Base64-decodes the header and payload sections automatically.
3. Review the decoded output in the three sections below.

No key material is required for inspection. Signature verification is a separate operation.

## Decoded Sections

### Header

Shows the algorithm (`alg`) and key ID (`kid`) fields. Algorithm warnings appear here:

| Condition | Warning level |
|---|---|
| `alg: none` | Critical - the token has no signature |
| `alg: HS256` | Notice - symmetric; brute-forceable with a weak secret |
| `alg: RS256` or `ES256` | No warning |

### Payload

Shows all claims with their values and inferred types. Standard claims decoded:

| Claim | Meaning |
|---|---|
| `iss` | Issuer |
| `sub` | Subject (usually a user ID) |
| `aud` | Audience |
| `exp` | Expiration time |
| `nbf` | Not before |
| `iat` | Issued at |
| `jti` | JWT ID (unique token identifier) |

Custom claims appear below the standard set.

### Expiry Check

If the token contains an `exp` claim, the tool compares it against the current time and shows one of:

- **Valid** - the token has not expired.
- **Expired** - the token is past its expiration time, with the elapsed duration.
- **No expiry** - the token has no `exp` claim.

### Signature

Shows the raw Base64url-encoded signature. The tool does not attempt verification unless you supply the key; the section is shown for reference and to confirm the signature is present.

## What to Look For

- `alg: none` tokens are accepted by some libraries without verification. Test whether the target application accepts them.
- Long-lived tokens (`exp` many days or years from `iat`) suggest the application does not rotate tokens.
- Sensitive data (PII, internal IDs, role flags) stored in unencrypted payload claims is readable by anyone who holds the token.
- Tokens without a `jti` cannot be individually revoked.

## Related Pages

- [Token Analysis](./token-analysis.md)
- [Decoder](./decoder.md)
- [HTTP History](../http-history.md)
