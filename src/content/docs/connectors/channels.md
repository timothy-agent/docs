---
title: Channels
description: Talk to Timothy from Telegram, Slack or email.
sidebar:
  order: 15
---

A channel lets you talk to Timothy from a messaging app. You get the same agents and memory as in the web app. You set channels up in Settings, "Channels".

Timothy polls Telegram, holds a Socket Mode connection to Slack and polls email inboxes over IMAP. Nothing inbound needs exposing, so you do not need a public address.

The "Channels" switch in [Features](/docs/settings/features/) turns all channels on or off.

## Channel kinds

The "Add a channel" section offers three kinds:

| Kind | How it works |
|---|---|
| "Telegram" | A Telegram bot. Timothy long-polls Telegram for its messages. |
| "Slack" | A Slack app over Socket Mode. |
| "Email" | A mailbox, read through an [IMAP mailbox](/docs/connectors/imap-mailbox/) connector. Replies go out over that connector's SMTP server. |

## Add a channel

Pick a tile under "Add a channel". The form has these fields:

| Field | What it does |
|---|---|
| "Name" | A unique name for the channel. |
| "Kind" | "Telegram", "Slack" or "Email". It is fixed once you run a test. |
| "Bot token" | Telegram and Slack. The bot's token. Choose "New credential" to paste it, or "Use existing" to pick a stored one. |
| "App token" | Slack only. The app-level token for Socket Mode. |
| "IMAP connector" | Email only. The mailbox Timothy reads and replies from. Only enabled IMAP connectors with an SMTP host appear. |
| "From allowlist" | Email only. Addresses or `@domain` entries, up to 50. Mail from anyone else is ignored. |
| "Agent" | Who answers new conversations. See [Which agent answers](#which-agent-answers). |

Then press "Test connection". Timothy saves the channel switched off and tests it. When the test passes, press "Add channel". This switches the channel on and opens its page.

The bot token is stored under a name made from the channel name. A channel named `my-telegram` stores it as `MY_TELEGRAM_CHANNEL_BOT_TOKEN`. A Slack app token ends in `_CHANNEL_APP_TOKEN`.

### Telegram

1. Create a bot with @BotFather in Telegram and copy its token.
2. Paste the token into "Bot token".
3. A passing test shows "Connected as" followed by the bot's username.

### Slack

The form gives these steps:

1. Create a Slack app and turn on Socket Mode.
2. Make an app-level token with `connections:write`. This is the "App token".
3. Add the bot scopes `app_mentions:read`, `chat:write`, `im:history`, `channels:history`, `groups:history` and `mpim:history`.
4. Subscribe to the bot events `message.im`, `app_mention`, `message.channels`, `message.groups` and `message.mpim`.
5. Enable Interactivity and the App Home messages tab.
6. Install the app to your workspace. Paste its bot token into "Bot token".

A passing test shows "Connected as" followed by the bot's name.

### Email

1. Add an [IMAP mailbox](/docs/connectors/imap-mailbox/) connector with an SMTP host, and enable it. If none exists, the form shows a link to add one first.
2. Use a mailbox of its own. Mail from the mailbox's own address is ignored.
3. Pick it in "IMAP connector" and fill "From allowlist".
4. A passing test shows "Connected to" followed by the mailbox address.

Senders who are not on the allowlist are dropped unread. Senders on the allowlist still have to pair before they reach a model.

## Pairing

A channel answers only people you approve.

1. Someone sends the bot a first message.
2. The bot answers: "This bot answers only paired users. Ask the operator to approve you in Timothy (Settings > Channels), or send the code shown there."
3. The sender shows up in the "Pairings" panel on the channel's page, with the status "Pending" and a six-digit code. The code expires after 10 minutes.
4. Pair the sender in one of two ways:
   - Press "Approve" next to the sender.
   - Tell the sender the code. When they send it to the bot, they are paired and the bot answers "Paired. Say hello."

The "Pairings" panel shows each sender's "Name", "User id", "Status" and "Code". The status is "Pending", "Approved" or "Revoked".

Press "Revoke" to cut a sender off. Messages from a revoked sender are ignored. You can press "Approve" later to let them back in.

The channel card shows how many senders are pending and how many are approved.

## Which agent answers

The "Agent" field decides who answers new conversations:

| Choice | What it does |
|---|---|
| "Default agent" | The agent marked as default in [Agents](/docs/settings/agents/) answers. |
| "Dispatch automatically" | Timothy picks an agent for each message, the same way the "Auto" choice in the chat composer does. |
| An agent's name | That agent answers. |

## Limits

- A sender can send at most 10 messages a minute. Beyond that the bot answers "Slow down: at most 10 messages a minute."
- A message can be up to 4000 characters long.

## Permission prompts

When a tool needs your permission, the channel shows the choices "Allow once", "Allow session" and "Deny".

## The channel's page

| Item | What it does |
|---|---|
| "Enabled" | Switches the channel on or off. A disabled Telegram channel stops polling, and messages wait at Telegram. A disabled Slack channel closes its connection, and messages sent meanwhile are not answered. A disabled email channel stops polling, and mail that arrives meanwhile is read when you enable it again. |
| "Name" | Renames the channel. |
| "Agent" | Who answers new conversations. |
| "IMAP connector" and "From allowlist" | Email only. The same as on the add form. |
| "Pairings" | Senders and their status. See [Pairing](#pairing). |
| "Test connection" | Checks the bot token with Telegram or Slack, or checks the mailbox through its IMAP connector. |
| "Rotate bot token" | Telegram and Slack. Choose "New token" to paste a new token under the same name, or "Different credential" to point at another stored name. Then press "Save token". |
| "Rotate app token" | Slack only. The same for the app token. Press "Save app token". |
| "Delete" | Stops the bot and removes its pairings. Chat sessions it started stay in your history. |

## Send mission results to a channel

To send mission results through a channel, add a "Channel" destination. See [Destinations](/docs/connectors/destinations/).
