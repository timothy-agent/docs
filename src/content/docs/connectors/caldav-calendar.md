---
title: CalDAV calendar
description: Connect any calendar that speaks CalDAV, to list and create events.
sidebar:
  order: 14
---

The CalDAV calendar connector works with any calendar server that offers CalDAV. The app describes it as "Any calendar via CalDAV, list and create events."

## What it enables

In chat, the connector adds these tools:

| Tool | What it does |
|---|---|
| `list_calendar_events` | Lists events in a time window. Without a window it shows the next 7 days. |
| `create_calendar_event` | Creates an event on the calendar. |

Missions can use `list_calendar_events`. They never get `create_calendar_event`.

Add the tools to an agent's "Tools allowlist" before you use them. See [Agents](/docs/settings/agents/).

## What you need

- The address of the calendar itself. Timothy does not discover calendars, so you need the full address of one calendar collection.
- The address must start with `https://`. Timothy refuses plain `http://` because the password would travel unencrypted.
- Your username and password for the calendar server.

## Add the connector

1. Open Settings, "Connectors", and pick the "CalDAV calendar" tile under "Add a connector".
2. Fill the form:

   | Field | What to enter |
   |---|---|
   | "Name" | A unique name. It identifies this account when more than one connector serves a tool. |
   | "Calendar URL" | The calendar collection address. |
   | "Username" | Your login for the calendar server. |
   | "Password" | Choose "New credential" and paste the password, or choose "Use existing" and pick a stored one. |

3. Press "Test connection". Timothy saves the connector switched off and asks the server for the calendar.
4. When the test passes, press "Add connector". This switches the connector on.

A connector named `caldav-calendar` stores its password as `CALDAV_CALENDAR_CALDAV_PASSWORD`.

## Verify

A passing test shows "Connected as" followed by the username, then `caldav`.

## Common errors

| Message | What to do |
|---|---|
| "CalDAV credentials invalid or expired, check the username and password" | Check the username and password. Paste a new password under "Rotate password" if needed. |
| A message that says the URL must be https | Use the `https://` address of the calendar. |
| A message that contains "caldav status" | The server answered with an error. Check "Calendar URL". |
| "Connection failed:" followed by a reason | The connector was saved switched off. Fix the problem and press "Test connection" again. |

## Options on the connector's page

- "Treat as sensitive" moves turns that use this connector to the "Sensitive tool route" set in [Features](/docs/settings/features/).
- "Rotate password" stores a new password under the same name. Paste it and press "Save".
- "Delete" removes the connector. Its stored credentials stay in the secret store.

The calendar address and username cannot be changed on the connector's page. To change them, add a new connector.
