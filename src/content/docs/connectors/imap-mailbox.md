---
title: IMAP mailbox
description: Connect any email account over IMAP, with optional sending over SMTP.
sidebar:
  order: 13
app_path: /settings/connectors
app_label: Connectors
---

The IMAP mailbox connector works with any email account that offers IMAP. The app describes it as "Any email account via IMAP, optional SMTP sending."

## What it enables

In chat, the connector adds these tools:

| Tool | What it does |
|---|---|
| `search_mail` | Searches the inbox and returns matching messages. |
| `read_mail` | Reads one message, with a list of its attachments. |
| `read_mail_attachment` | Reads one attachment as text. |
| `send_mail` | Sends a plain text email. Only present when you fill "SMTP host". |

Timothy opens the inbox read-only.

Missions can use `search_mail`, `read_mail` and `read_mail_attachment`. They never get `send_mail`.

An IMAP connector with an SMTP host can also carry an [email channel](/docs/connectors/channels/).

Add the tools to an agent's "Tools allowlist" before you use them. See [Agents](/docs/settings/agents/).

## What you need

The IMAP server address, your username and your password. To send mail you also need the SMTP server address.

Connections are always encrypted:

- IMAP uses TLS on port 993, the default. Port 143 uses STARTTLS.
- SMTP uses TLS on port 465. Any other port, including the default 587, uses STARTTLS. Timothy refuses an SMTP server that does not offer STARTTLS.

## Add the connector

1. Open Settings, "Connectors", and pick the "IMAP mailbox" tile under "Add a connector".
2. Fill the form:

   | Field | What to enter |
   |---|---|
   | "Name" | A unique name. It identifies this account when more than one connector serves a tool. |
   | "IMAP host" | The IMAP server, such as `imap.example.com`. |
   | "Port" | Optional. Leave it blank for 993. |
   | "Username" | Your login, often your email address. |
   | "SMTP host" | Optional. Leave it blank to disable sending. |
   | "SMTP port" | Optional. Leave it blank for 587. |
   | "Password" | Choose "New credential" and paste the password, or choose "Use existing" and pick a stored one. |

3. Press "Test connection". Timothy saves the connector switched off, logs in to the IMAP server and logs out again.
4. When the test passes, press "Add connector". This switches the connector on.

A connector named `imap-mailbox` stores its password as `IMAP_MAILBOX_IMAP_PASSWORD`.

## Verify

A passing test shows "Connected as" followed by the username, then `imap`, or `imap+smtp` when an SMTP host is set. The test checks IMAP only. It does not send mail.

## Common errors

| Message | What to do |
|---|---|
| "Invalid port" | A port must be a number between 1 and 65535. |
| A message that contains "imap dial" | Timothy could not reach the server. Check "IMAP host" and "Port". |
| A message that contains "imap login" | The server refused the username or password. |
| A message that contains "does not offer STARTTLS; refusing to authenticate over plaintext" | Shown when sending. Use port 465, or an SMTP server that offers STARTTLS. |
| "Connection failed:" followed by a reason | The connector was saved switched off. Fix the problem and press "Test connection" again. |

## Options on the connector's page

- "Treat as sensitive" moves turns that use this connector to the "Sensitive tool route" set in [Features](/docs/settings/features/).
- "Rotate password" stores a new password under the same name. Paste it and press "Save".
- "Delete" removes the connector. Its stored credentials stay in the secret store.

The host, port and username cannot be changed on the connector's page. To change them, add a new connector.
