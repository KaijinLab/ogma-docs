---
title: WebSocket and SSE History
description: Inspect WebSocket connections, messages, and server-sent events in Ogma.
keywords: Ogma WebSocket history, SSE history, stream testing
---

# WebSocket and SSE History

WS/SSE History captures all WebSocket connections and Server-Sent Event streams passing through the proxy, and lets you inspect individual messages, filter by content or direction, and send messages to WS Replay.

## Connections List

The left panel lists every captured connection.

| Column | Description |
|--------|-------------|
| Host | The remote host for this connection. |
| Path | The upgrade or event-stream path. |
| Messages | Total message count (WebSocket) or event count (SSE). |
| Started | Timestamp when the connection was established. |
| Ended | Timestamp when the connection closed, or blank if still open. |
| TLS | Whether the connection used TLS. |

Click a connection to open its message list.

## Filtering Connections

Use the filter bar above the connections list to narrow the view.

- **Host** - substring match against the host column.
- **Path** - substring match against the path column.
- **TLS** - show only TLS or non-TLS connections.
- **In scope** - show only connections where the host matches the current scope.
- **StreamQL** - type a StreamQL expression for structured filtering.

Click the **AI Assist** button next to the StreamQL input to generate a query from plain language.

## Message List

Selecting a connection opens its messages in the center panel.

| Column | Description |
|--------|-------------|
| Seq | Sequence number, starting at 1 for the first message in the connection. |
| Direction | `C->S` for client-to-server, `S->C` for server-to-client. |
| Opcode | WebSocket opcode: `text`, `binary`, `ping`, `pong`, or `close`. SSE entries show the event name. |
| Size | Payload size in bytes. |
| Time | Absolute timestamp of the message. |
| Delta | Time since the previous message in this connection. |

## Filtering Messages

Use the filter bar above the message list.

- **Direction** - show only client-to-server or server-to-client messages.
- **Opcode** - filter to specific opcodes (e.g., show only `ping`/`pong` to debug keepalive behavior, or hide them to reduce noise).
- **Content** - substring match against the payload.
- **StreamQL** - structured query expression.

## Inspecting a Message

Click any message row to open its payload in the inspector panel.

- The **Pretty** tab renders JSON with syntax highlighting and collapsible nodes.
- The **Raw** tab shows the unmodified payload bytes.
- Binary frames display as hex with a UTF-8 interpretation alongside where possible.
- Close frames include the status code and reason phrase parsed from the payload.

## Sending a Message to WS Replay

Right-click any message row and choose **Send to WS Replay** to open the message in WS Replay. The connection's handshake request is used to establish the replay connection.

From WS Replay you can modify the payload and resend it, or inject new messages into a live connection.

## Exporting WS Messages

1. Select the connection in the connections list.
2. Right-click and choose **Export messages**.
3. Choose the export format (newline-delimited JSON or raw text).
4. Save the file.

The export includes sequence number, direction, opcode, timestamp, and payload for each message.

## Related Pages

- [Replay](./replay.md)
- [Search](./search.md)
- [HTTPQL and StreamQL](../reference/httpql.md)
