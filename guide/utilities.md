---
title: Utilities
description: Learn Ogma utilities for scanning, OAST, decoder recipes, compare, JWT review, token analysis, payloads, race testing, reverse shells, notes, and discovery.
keywords: Ogma utilities, web security decoder, JWT analyzer, OAST testing, reverse shell listener, token analysis
---

# Utilities

Ogma's Utilities view collects focused tools that support testing and analysis outside the main proxy table.

<div class="screenshot-placeholder">
  <strong>Screenshot placeholder</strong>
  <span>Utilities navigation showing Scanner, OAST, Decoder, JWT, Compare, Sequencer, Payloads, and Reverse Shell.</span>
</div>

## Scanner

Runs passive and active scanner workflows. See [Scanning](./scanning.md).

## OAST

OAST supports out-of-band testing workflows where the application may call back to a controlled HTTP, HTTPS, DNS, or SMTP listener.

Use OAST for:

- SSRF.
- Blind XXE.
- Blind command injection.
- Webhook and integration testing.
- Callback-based proof of exploit.

Configure callback ports and domain settings according to your deployment environment.

## Decoder

Decoder transforms selected input through ordered recipes. Recipes can include operations such as encoding, decoding, hashing, formatting, or extraction.

Use Decoder when manually inspecting:

- Tokens.
- Encoded parameters.
- Nested JSON.
- URL-encoded bodies.
- Base64 or hex content.

## Compare

Compare highlights differences between requests, responses, tokens, or other text artifacts. It is useful after Replay or Automate when response changes are subtle.

## JWT

The JWT utility helps inspect token headers, claims, expiration, algorithm choices, and obvious security issues.

JWT review should include:

- Algorithm.
- Expiration and not-before claims.
- Audience and issuer.
- Role or authorization claims.
- Signature verification assumptions.

## Sequencer and Token Analysis

Sequencer-style tools help inspect randomness, predictability, and distribution in repeated tokens or responses.

Use them for:

- Session identifiers.
- CSRF tokens.
- Password reset tokens.
- Invite codes.
- Numeric or timestamp-derived identifiers.

## Payloads

Payload tools organize reusable strings and wordlists for manual tests, Automate, and workflows.

Keep payload sets organized by target area, test case, or workflow.

## Race / Smuggling

Race and smuggling utilities support specialized HTTP behavior tests.

Start with low request counts, compare timing and response behavior, then save proof traffic for Findings.

## Reverse Shell Listener

The reverse shell listener provides a local workspace tab for shell sessions. Starting a listener opens the workspace panel and focuses the shell tab.

## Notes

Notes are local project documentation. Use them to preserve hypotheses, manual observations, reproduction steps, and reporting context that does not yet belong in a formal finding.

## Discovery

Discovery helps enumerate target paths using captured context and wordlists. Use scope and rate limits to avoid unnecessary traffic.
