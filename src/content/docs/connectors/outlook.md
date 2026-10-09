---
title: Outlook
description: Connect an Outlook or Microsoft 365 account for mail and calendar.
sidebar:
  order: 6
---

The Outlook connector links one Microsoft account. The app describes it as "Read, search, and send mail; list calendar events".

## What it enables

In chat, the connector adds these tools:

| Tool | What it does |
|---|---|
| `search_mail` | Searches the mailbox and returns matching messages. |
| `read_mail` | Reads one message, with a list of its attachments. |
| `read_mail_attachment` | Reads one attachment as text. |
| `send_mail` | Sends a plain text email. |
| `list_calendar_events` | Lists events in a time window. Without a window it shows the next 7 days. |

Missions can use `search_mail`, `read_mail`, `read_mail_attachment` and `list_calendar_events`. They never get `send_mail`. This connector cannot create calendar events.

Add the tools to an agent's "Tools allowlist" before you use them. See [Agents](/docs/settings/agents/).

## What you need

Outlook uses OAuth. You need an Azure AD app registration:

1. Register an application. For supported account types, choose "Accounts in any organizational directory and personal Microsoft accounts".
2. Add a redirect URI on the Web platform. The add form shows the exact address. It is your Timothy address followed by `/v1/connectors/oauth/callback`.
3. Create a client secret and copy its value. Copy the application (client) ID too.

The connector asks Microsoft for these permissions, as the form lists them: `Mail.Read`, `Mail.Send`, `Calendars.Read`, `offline_access` and `User.Read`.

## Add the connector

1. Open Settings, "Connectors", and pick the "Outlook" tile under "Add a connector".
2. Fill the form:

   | Field | What to enter |
   |---|---|
   | "Name" | A unique name. It identifies this account when more than one connector serves a tool. |
   | "OAuth client ID" | The application (client) ID. |
   | "OAuth client secret" | Choose "New credential" and paste the client secret value, or choose "Use existing" to reuse one you already stored. |

3. Press "Save & connect Microsoft". Timothy saves the connector and sends you to Microsoft to consent.
4. After you consent, Microsoft sends you back to the "Connectors" tab. A banner says the account is connected and asks you to enable it.
5. Turn on the connector's switch on its card.

## Verify

Press "Test" on the connector's card, or "Test connection" on the connector's page. A working connector shows "Connected as" followed by the account and its scopes.

## Common errors

| Message | What to do |
|---|---|
| "Connection failed:" followed by a reason, on the "Connectors" tab | The consent step failed. Check the redirect URI, the account type and the client ID, then add the connector again. |
| "Microsoft authorization expired or was revoked" | Open the connector and press "Reconnect Microsoft account". |
| "microsoft returned no refresh token; remove Timothy's access at account.live.com/consent/Manage or myapps.microsoft.com and reconnect" | Remove Timothy's access in your Microsoft account, then reconnect. |

## Options on the connector's page

- "Treat as sensitive" moves turns that use this connector to the "Sensitive tool route" set in [Features](/docs/settings/features/).
- "Reconnect Microsoft account" runs the consent step again.
- "Delete" removes the connector. Its stored credentials stay in the secret store.
