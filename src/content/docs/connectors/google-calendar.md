---
title: Google Calendar
description: Connect a Google Calendar so Timothy can list and create events.
sidebar:
  order: 3
---

The Google Calendar connector links the primary calendar of one Google account. The app describes it as "List and create events".

## What it enables

In chat, the connector adds these tools:

| Tool | What it does |
|---|---|
| `list_calendar_events` | Lists events in a time window. Without a window it shows the next 7 days. |
| `create_calendar_event` | Creates an event on the primary calendar. Depending on the provider, attendees may get an invite right away. |

Missions can use `list_calendar_events`. They never get `create_calendar_event`.

Add the tools to an agent's "Tools allowlist" before you use them. See [Agents](/docs/settings/agents/).

## What you need

Google Calendar uses OAuth. You need an OAuth client from Google Cloud:

1. In the Google Cloud console, create an OAuth client of type Web application.
2. Add Timothy's callback address to its authorized redirect URIs. The add form shows the exact address. It is your Timothy address followed by `/v1/connectors/oauth/callback`.
3. Copy the client ID and the client secret.

You can use the same OAuth client as your Gmail connector.

The connector asks Google for one scope. The form lists it as `calendar`.

## Add the connector

1. Open Settings, "Connectors", and pick the "Google Calendar" tile under "Add a connector".
2. Fill the form:

   | Field | What to enter |
   |---|---|
   | "Name" | A unique name. It identifies this account when more than one connector serves a tool. |
   | "OAuth client ID" | The client ID from Google Cloud. |
   | "OAuth client secret" | Choose "New credential" and paste the client secret, or choose "Use existing" to reuse one you already stored. |

3. Press "Save & connect Google". Timothy saves the connector and sends you to Google to consent.
4. After you consent, Google sends you back to the "Connectors" tab. A banner says the account is connected and asks you to enable it.
5. Turn on the connector's switch on its card.

## Verify

Press "Test" on the connector's card, or "Test connection" on the connector's page. A working connector shows "Connected as" followed by the calendar's address and its scopes.

## Common errors

| Message | What to do |
|---|---|
| "Connection failed:" followed by a reason, on the "Connectors" tab | The consent step failed. Check the redirect URI and the client ID, then add the connector again. |
| "Google authorization expired or was revoked" | Open the connector and press "Reconnect Google account". If your OAuth app is in testing mode, Google expires the grant about once a week. |
| "google returned no refresh token; remove Timothy's access at myaccount.google.com/permissions and reconnect" | Remove Timothy's access in your Google account, then reconnect. |

## Options on the connector's page

- "Treat as sensitive" moves turns that use this connector to the "Sensitive tool route" set in [Features](/docs/settings/features/).
- "Reconnect Google account" runs the consent step again.
- "Delete" removes the connector. Its stored credentials stay in the secret store.
