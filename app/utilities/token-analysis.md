---
title: Token Analysis
description: Analyze token samples for structure and predictability in Ogma.
keywords: Ogma token analysis, token entropy, sequencer
---

# Token Analysis

Token Analysis takes a set of token samples and checks them for patterns, low entropy, and predictable structure that would make them guessable.

## Submitting a Sample

1. Open **Utilities > Token Analysis**.
2. Paste multiple tokens into the input area, one per line. The more samples you provide, the more reliable the analysis - aim for at least 50 tokens for meaningful entropy results.
3. Click **Analyze**.

Collect samples by repeating the operation that generates the token (log in repeatedly, request new CSRF tokens, generate API keys from the UI) and capturing the values from responses.

## Analysis Output

### Entropy score

The entropy score estimates the number of bits of randomness in the token set. Higher is better. Practical thresholds:

| Score | Assessment |
|---|---|
| < 32 bits | Low - likely guessable with targeted attacks |
| 32-64 bits | Marginal - depends on attack surface |
| > 64 bits | Generally acceptable for session tokens |
| > 128 bits | Strong - suitable for long-lived API keys |

### Pattern detection

The analyzer checks for:

- **Sequential patterns** - tokens that differ by a fixed increment (e.g. each token is the previous one plus 1).
- **Repeating substrings** - fixed prefixes or suffixes that reduce effective entropy.
- **Timestamp encoding** - tokens that contain Unix timestamps, date strings, or epoch milliseconds. Even obfuscated timestamps narrow the search space significantly.
- **Character set restriction** - tokens that use only digits or a limited alphabet, reducing the keyspace.

### Character distribution

A frequency chart shows how evenly characters or bytes are distributed across the sample. A flat distribution suggests good randomness. Spikes or gaps indicate structure.

## Interpreting Results

If any pattern is detected, the output explains what was found and why it matters. For example:

- A sequential pattern means an attacker who holds one valid token can enumerate adjacent tokens.
- A timestamp prefix means the token search space collapses to a narrow time window.
- Low character diversity means the effective key space is much smaller than the token length suggests.

## Use Cases

- **Session tokens** - confirm the application is not issuing predictable session IDs.
- **CSRF tokens** - verify CSRF protection cannot be bypassed by guessing the token.
- **API keys** - check whether generated keys have sufficient entropy before accepting them as secure.
- **Password reset tokens** - a predictable reset token allows account takeover without interaction from the victim.
- **Invite codes and numeric IDs** - test whether short codes or auto-increment IDs are exposed in a security-relevant context.

## Related Pages

- [JWT](./jwt.md)
- [Request Sequencer](./request-sequencer.md)
- [Compare](./compare.md)
