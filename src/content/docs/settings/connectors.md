---
title: Connectors
description: The Connectors tab, where you link the accounts Timothy can act on.
sidebar:
  order: 2
app_path: /settings/connectors
app_label: Connectors
---

A connector links an outside service, such as a mailbox, a calendar, a code host or a cloud account. Its tools then become available to your agents. The app describes the tab as "External services Timothy can act on, like Google, Outlook, GitHub, or AWS."

Each connector kind has its own page with the full form, the credential to create and the test. Start at [Connectors and channels](/docs/connectors/).

## The list

The tab has two sections: "Your connectors" and "Add a connector". "Add a connector" shows one tile per preset, in this order: [Gmail](/docs/connectors/gmail/), [Google Calendar](/docs/connectors/google-calendar/), [Google Drive](/docs/connectors/google-drive/), [Google Docs](/docs/connectors/google-docs/), [Outlook](/docs/connectors/outlook/), [AWS](/docs/connectors/aws/), [GCP](/docs/connectors/gcp/), [GitHub MCP](/docs/connectors/github-mcp/), [GitHub](/docs/connectors/github/), [Bitbucket](/docs/connectors/bitbucket/), [GitLab](/docs/connectors/gitlab/), [IMAP mailbox](/docs/connectors/imap-mailbox/) and [CalDAV calendar](/docs/connectors/caldav-calendar/).

Each connector card shows a short summary and a "Sensitive" badge when the connector is marked sensitive. It has these controls:

| Control | What it does |
|---|---|
| Switch | Turns the connector on or off. A connector that is off serves no tools. |
| "Test" | Tests the connection and shows the result on the card. |

Click the card's name to open the connector's page.

## Fields on every connector's page

| Field | What it does |
|---|---|
| "Connector name" | Renames the connector. |
| "Treat as sensitive" | Moves turns that use this connector to the "Sensitive tool route" set in [Features](/docs/settings/features/), so its data stays off third-party models. |

The other fields depend on the kind. See the connector's own page.

The "Connection" panel holds "Test connection" and the place to rotate the credential. "Delete" removes the connector. Its tools disappear from the agent on the next reload. Its stored credentials stay in the secret store until you clear them in [Credentials](/docs/settings/credentials/).
