---
title: Channels and connectors
description: How Timothy reaches your accounts, how you reach Timothy from chat apps, and where mission results go.
sidebar:
  order: 7
---

## What it is

A connector lets Timothy reach into a service for you. It can read your mail and calendar, search your files, or clone a repository for a mission. A channel works the other way. It lets you reach Timothy from a messaging app, with the same agents and memory as the web app. A destination is where a mission sends its result.

## Where it lives

All three are under "Settings":

- "Connectors": the presets include "Gmail", "Google Calendar", "Google Drive", "Google Docs", "Outlook", "IMAP mailbox", "CalDAV calendar", "GitHub", "Bitbucket", "GitLab", "GitHub MCP", "AWS" and "GCP".
- "Channels": "Telegram", "Slack" and "Email". An email channel runs over an IMAP connector.
- "Destinations": "Email", "Webhook", "Channel", "GitHub", "Bitbucket" and "GitLab".

For the setup steps of each service, see [Connectors and channels](/docs/connectors/).

## Connectors

Once a connector is set up, its tools appear in the "Tools allowlist" of each agent. An agent can use a connector only if its allowlist names the tool. One tool covers every account of that kind. For example, one mail search tool searches every mail account you connected.

The "GitHub", "Bitbucket" and "GitLab" connectors also give coding missions the identity they need to clone, push and open pull requests.

## Channels

When you add a channel, the "Agent" field decides who answers new conversations. Pick an agent, "Default agent", or "Dispatch automatically" to let Timothy choose the best agent for each new conversation. Press "Test connection". "Add channel" works only after a test passes.

Strangers cannot use your bot. When someone messages it for the first time, they show up under "Pairings" as "Pending". Only approved senders reach a model. Press "Approve" to let them in, or "Revoke" to shut them out.

## Destinations

A destination delivers a mission's result. "Email" sends through a connected Gmail account. "Webhook" posts the result to a URL. "Channel" sends it through one of your channels. "GitHub", "Bitbucket" and "GitLab" push a branch or open a pull request. You pick destinations when you create a mission or an automation.

## Settings most people touch

- Which connector tools each agent may use.
- The "Agent" on each channel.
- "Approve" and "Revoke" under "Pairings".

## Example

You add a Telegram channel with your bot token and set "Agent" to "Default agent". You message the bot from your phone. Your account appears under "Pairings" as "Pending". You press "Approve". From then on you can chat with Timothy from Telegram, and the chats show up in your history.
