---
title: Race and Smuggling
description: Test race conditions and HTTP request smuggling behavior with Ogma utilities.
keywords: Ogma race testing, request smuggling, HTTP/2 race
---

# Race and Smuggling

Race / Smuggling provides two specialized tools for timing-sensitive and protocol-level HTTP attacks.

## Race Conditions

The Race tab sends multiple copies of a request simultaneously to the same endpoint and lets you compare responses and timing across the parallel executions.

### When to use it

- **TOCTOU (time-of-check/time-of-use)** - test whether a check and a state-change operation can be split by concurrent requests.
- **Account manipulation** - send concurrent balance changes, coupon redemptions, or limit-bounded operations to test for double-spend or over-redemption.
- **Vote or rate limiting bypass** - confirm whether per-user limits are enforced atomically.

### Running a race test

1. Build or send the target request to the Race tab.
2. Set the **concurrency** value - how many parallel copies to send.
3. Click **Send Race**. All copies are sent as close to simultaneously as possible.
4. Review the response table: status code, body, and elapsed time for each copy.
5. Differences between responses (different status codes, different response bodies, unexpected success on copies 2+) indicate a race window.

### HTTP/2 single-packet racing

When the target supports HTTP/2, enable **HTTP/2 mode**. HTTP/2 multiplexes all parallel requests over one connection, which eliminates network jitter and makes concurrent arrivals at the server more reliable.

## HTTP Request Smuggling

The Smuggling tab tests how a server handles ambiguous `Content-Length` and `Transfer-Encoding` headers to detect frontend/backend desync.

### Background

When a reverse proxy and a backend server disagree on where one request ends and the next begins, a smuggled prefix from request A can be prepended to request B. The impact ranges from cache poisoning to authentication bypass and arbitrary request injection.

### Desync variants

| Variant | Description |
|---|---|
| CL.TE | Front-end uses Content-Length; back-end uses Transfer-Encoding |
| TE.CL | Front-end uses Transfer-Encoding; back-end uses Content-Length |
| TE.TE | Both use Transfer-Encoding but respond differently to an obfuscated header |

### Running a smuggling probe

1. Select the target endpoint in the Smuggling tab.
2. Choose the desync variant to test.
3. Click **Send Probe**. The tool sends the crafted request and measures the response.
4. A timeout or unexpected response on the second request in the sequence indicates a potential desync.
5. Confirm manually before creating a finding - false positives occur when network conditions cause a timeout unrelated to the probe.

## Related Pages

- [Replay](../replay.md)
- [Intercept](../intercept.md)
- [Findings](../findings.md)
