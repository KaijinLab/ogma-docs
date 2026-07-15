---
title: Reverse Shell
description: Start and manage reverse shell listener sessions from the Ogma workspace.
keywords: Ogma reverse shell, listener, shell workspace
---

# Reverse Shell

Reverse Shell starts a TCP listener inside the Ogma workspace that accepts incoming connections from exploited targets, giving you an interactive shell session without switching to a terminal.

## Starting a Listener

1. Open **Utilities > Rev Shell**.
2. Set the **port** the listener will bind on.
3. Click **Start Listener**. The status indicator changes to active.
4. Use the generated payload command or construct your own reverse shell command pointing to your Ogma host and the selected port.

The listener accepts standard reverse shell connections - bash, sh, nc, Python, and similar. Ogma does not restrict the shell type.

## Receiving a Connection

When the target connects, a new session tab appears in the sessions list. Each session shows:

- The source IP and port of the incoming connection.
- The time the session was established.
- A terminal tab for interacting with the shell.

Multiple sessions can be open at the same time. Switch between them using the session list.

## Interacting with the Session

Click a session to open its terminal tab. Type commands directly in the terminal. Output from the target appears in real time.

The terminal supports:

- Standard input/output for interactive commands.
- Copy/paste from the clipboard.
- Scrollback through previous output.

The session stays open until either side closes the connection. You can stop the listener without closing active sessions.

## Stopping the Listener

Click **Stop Listener** to stop accepting new connections. Existing sessions are not affected.

To close a session, close its tab or terminate the process on the target.

## Use Cases

- **Confirm RCE** - after identifying a remote code execution finding, use Reverse Shell to obtain a working shell as definitive proof for the report.
- **Post-exploitation enumeration** - run commands on the target to assess the actual impact (file access, internal network reachability, privilege level).
- **Demonstrate impact** - record the shell session as evidence alongside the finding.

## Related Pages

- [Findings](../findings.md)
- [Settings](../settings.md)
