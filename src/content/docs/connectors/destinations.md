---
title: Destinations
description: Where mission results go, and the destination kinds Timothy offers.
sidebar:
  order: 16
app_path: /settings/destinations
app_label: Destinations
---

A destination is a place where mission results go. You set destinations up once in Settings, "Destinations". Then you pick them when you create a mission or an automation.

## What a mission does with a destination

When a mission finishes, Timothy delivers its result to every destination attached to it. Recipients get the mission's output and a short completion line. They do not get the mission's plan or review notes.

- Git destinations deliver first. They push the branch and, if set, open the pull request.
- Then the email, webhook and channel destinations deliver. Their message includes the link to a pull request that was just opened.
- A failed email, webhook or channel delivery is retried twice. It is not retried when the request may already have reached the receiver, so you do not get the same message twice.
- A disabled destination is skipped without an error.

The model never chooses an address, URL or chat. It can only reach destinations you set up here.

In chat, the `deliver` tool sends a plain text message to an email, webhook or channel destination by name. It does not attach files.

## Destination kinds

The "Add a destination" section offers these kinds:

| Kind | What it does |
|---|---|
| "Email" | Sends via a connected Gmail account. |
| "Webhook" | POSTs the result as JSON or plain text. |
| "Channel" | Sends through a Telegram, Slack or email channel. |
| "GitHub" | Pushes a branch or opens a pull request through a GitHub connector. |
| "Bitbucket" | Pushes a branch or opens a pull request through a Bitbucket connector. |
| "GitLab" | Pushes a branch or opens a merge request through a GitLab connector. |

Every kind has a "Name" field. The name must be unique.

### Email

| Field | What it does |
|---|---|
| "Google connector" | The Gmail account that sends the mail. Only enabled Google connectors with Gmail access appear. Make one from the [Gmail](/docs/connectors/gmail/) preset. |

Timothy refuses an email destination that names any other connector. A Google Calendar, Google Drive or Google Docs connector gets "config.connector_id names a google connector without Gmail access, which cannot send mail". An Outlook, IMAP or other connector gets a message that starts with "config.connector_id names a connector of kind".
| "To" | The recipient address. |

### Webhook

| Field | What it does |
|---|---|
| "URL" | The address Timothy POSTs to. |
| "Format" | "JSON" or "Plain text". |

Timothy sends no authentication header. A URL on a private, loopback or link-local address is refused unless its host is in the "Outbound host allowlist" in [Features](/docs/settings/features/).

### Channel

| Field | What it does |
|---|---|
| "Channel" | The channel to send through. If you have none, add one under [Channels](/docs/connectors/channels/) first. |
| "Chat ID" | Telegram and Slack. For Telegram, the chat id of a group or your own chat. For Slack, the channel id, such as `C0123`. |
| "Thread ID" | Optional. For Telegram, a forum topic id. For Slack, a thread ts to reply under. |
| "To" | Email channels only. The recipient. |

A channel destination has no credential of its own. It uses the channel's.

### GitHub, Bitbucket and GitLab

| Field | What it does |
|---|---|
| "GitHub connector", "Bitbucket connector" or "GitLab connector" | The connector to push through. Only enabled connectors of that kind appear. See [GitHub](/docs/connectors/github/), [Bitbucket](/docs/connectors/bitbucket/) or [GitLab](/docs/connectors/gitlab/). |
| "Mode" | "Push branch when done" or "Push and open a PR when done". |
| "Branch pattern" | Optional. Leave it blank to use the "Default branch pattern" in [Features](/docs/settings/features/). |
| "Commit style" | "Default (from settings)", "Conventional" or "Plain". |
| "Create repository if missing" | Creates the repository through the connector when the mission has no target repository. |

## Test and add

For email, webhook and channel destinations:

1. Fill the form and press "Test send". Timothy saves the destination switched off and tests it.
   - Email and webhook destinations send a real test delivery. A pass shows "Test delivery sent, ready to add."
   - A channel destination sends nothing. It checks that the channel is reachable. A pass shows "Channel reachable, ready to add."
2. Press "Add destination". This switches the destination on.

If the test fails, the message ends with "The destination was saved disabled, fix and retry."

Git destinations have no test. "Add destination" saves them switched on right away.

## The destination's page

| Item | What it does |
|---|---|
| "Enabled" | Switches the destination on or off. Disabled destinations are skipped by mission delivery without an error. |
| The kind's fields | The same fields as on the add form. Press "Save" to keep changes. |
| "Test send" | Sends a test again. Not shown for git destinations. |
| "Delete" | Removes the destination. Timothy refuses while a mission in progress still delivers to it. |

The card in the list also has the switch, "Test send" and "Delete".
