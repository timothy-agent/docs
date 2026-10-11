---
title: Connectors and channels
description: How to connect Timothy to your accounts and messaging apps.
sidebar:
  order: 0
---

Timothy talks to the outside world in three ways. Each one has its own tab under Settings.

## Connectors, channels and destinations

A **connector** lets Timothy reach into a service you use. Examples are your mailbox, your calendar, a GitHub account or a cloud project. Timothy calls the service. The service never calls Timothy. You set connectors up in the "Connectors" tab.

A **channel** lets you reach Timothy from a messaging app. You send a message to a Telegram bot, a Slack app or a mailbox, and Timothy answers there. You set channels up in the "Channels" tab.

A **destination** is a place where results go. When a mission finishes, Timothy can send the result to an email address, a webhook, a channel or a code host. You set destinations up in the "Destinations" tab.

Some destinations depend on the other two. An email destination sends through a Gmail connector. A channel destination sends through a channel. A GitHub, Bitbucket or GitLab destination pushes through the matching connector.

## How tools reach the agent

Each connector adds tools. A tool shows up once per capability, for example `search_mail`. If more than one connector serves the same capability, the tool gets an `account` argument that picks the connector.

An agent only uses the tools you list in its "Tools allowlist". After you add a connector, open the agent in Settings, "Agents", and add the new tools there. Tool calls still go through the normal permission prompts.

Missions see fewer connector tools than chat. A mission only gets read tools, such as reading mail or listing calendar events, and only if the agent lists them. Missions get an MCP connector's tools only after you tick "Missions may read" on the connector page, see [Custom MCP server](/docs/connectors/custom-mcp-server/#let-missions-read-a-tool). See each connector page for the details.

## How credentials work

Every key, token or password goes into Timothy's secret store. You paste the value once, in the form that needs it. Timothy stores it under a name, for example `GITHUB_PAT`. From then on, providers, connectors, channels and destinations point at that name. They never hold the value itself.

Some facts follow from this:

- Timothy never shows a stored value again. The app lists credentials by name only.
- Several items can share one credential. Pick "Use existing" in a form to reuse a stored name.
- To change a value, store a new one under the same name. Everything that uses that name gets the new value.
- By default the values are encrypted with Timothy's master key and kept in its own database. You can send them to HashiCorp Vault or AWS Secrets Manager instead. See [Secrets](/docs/settings/secrets/).

[Credentials](/docs/connectors/credentials/) has the full details.

## Pages in this section

- [Credentials](/docs/connectors/credentials/)
- [Gmail](/docs/connectors/gmail/)
- [Google Calendar](/docs/connectors/google-calendar/)
- [Google Drive](/docs/connectors/google-drive/)
- [Google Docs](/docs/connectors/google-docs/)
- [Google Search Console](/docs/connectors/google-search-console/)
- [Outlook](/docs/connectors/outlook/)
- [AWS](/docs/connectors/aws/)
- [GCP](/docs/connectors/gcp/)
- [GitHub MCP](/docs/connectors/github-mcp/)
- [Hosted MCP servers](/docs/connectors/mcp-catalog/)
- [Custom MCP server](/docs/connectors/custom-mcp-server/)
- [Connect an MCP server with OAuth](/docs/connectors/mcp-oauth/)
- [GitHub](/docs/connectors/github/)
- [Bitbucket](/docs/connectors/bitbucket/)
- [GitLab](/docs/connectors/gitlab/)
- [IMAP mailbox](/docs/connectors/imap-mailbox/)
- [CalDAV calendar](/docs/connectors/caldav-calendar/)
- [Channels](/docs/connectors/channels/)
- [Destinations](/docs/connectors/destinations/)
