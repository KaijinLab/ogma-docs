---
title: WebSocket Replay
description: Reconnect to WebSocket endpoints, edit frames, and resend captured messages in Ogma.
keywords: Ogma WebSocket Replay, WS Replay, replay WebSocket messages
---

# WebSocket Replay

WebSocket Replay creates reusable sessions for testing WebSocket endpoints. Use it to reconnect with captured handshake details, edit messages, send new frames, and observe server responses.

## Creating a Session

Create a WebSocket Replay session in two ways:

- Right-click a captured WebSocket message in **WebSocket / SSE History** and choose **Send to WS Replay**.
- Open **WS Replay** and create a session manually with a `ws://` or `wss://` URL.

Manual sessions can include custom headers for cookies, authorization tokens, protocol negotiation, or application-specific handshake values.

## Session Setup

| Field | Description |
| --- | --- |
| Name | Human-readable session label. |
| URL | WebSocket endpoint. The URL must start with `ws://` or `wss://`. |
| Headers | Optional handshake headers sent when connecting. |

If you change the URL or headers, Ogma saves the session before opening the next connection.

## Connecting

Select a session and click **Connect**. The connection state shows whether the socket is disconnected, connecting, open, closing, or closed.

Use **Disconnect** before switching targets or changing handshake details. Reconnect after editing the URL or headers to test a new server path or authenticated context.

## Sending Messages

Use the composer to edit a payload and send it over the selected session. Text payloads are sent as WebSocket text frames.

Captured messages sent from history keep their original payload as the starting point, so you can change one field at a time and compare behavior.

## Message Timeline

The timeline records sent and received frames for the selected session.

| Column | Description |
| --- | --- |
| Direction | Whether the frame was sent by the client or received from the server. |
| Opcode | Frame type, such as text, binary, ping, pong, or close. |
| Size | Payload size. |
| Time | When Ogma observed the frame. |

Select a message to inspect its payload. JSON payloads are formatted when possible; raw content remains available for exact review.

## Testing Workflow

1. Capture a normal WebSocket flow in **WebSocket / SSE History**.
2. Send an interesting client message to **WS Replay**.
3. Reconnect and resend the original message to confirm the baseline behavior.
4. Modify one field, token, ID, or command at a time.
5. Record confirmed behavior in **Findings** or keep notes in **Notes**.

## Related Pages

- [WebSocket and SSE History](./ws-sse-history.md)
- [Replay](./replay.md)
- [Findings](./findings.md)
