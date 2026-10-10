---
title: Google Docs
description: Connect Google Docs so Timothy can read, create and add to documents.
sidebar:
  order: 5
app_path: /settings/connectors
app_label: Connectors
---

The Google Docs connector lets Timothy work with Google Docs in one Google account. The app describes it as "Read, create, and append to docs".

## What it enables

In chat, the connector adds these tools:

| Tool | What it does |
|---|---|
| `read_doc` | Reads a document by its id. The id is in the document's address. |
| `create_doc` | Creates a new document with a title and some text. |
| `append_doc` | Adds text to the end of an existing document. The change is visible at once. |

These tools are for chat only. Missions do not get them.

This connector cannot search Drive. To find documents by name, add a [Google Drive](/docs/connectors/google-drive/) connector too.

Add the tools to an agent's "Tools allowlist" before you use them. See [Agents](/docs/settings/agents/).

## What you need

Google Docs uses OAuth. You need an OAuth client from Google Cloud:

1. In the Google Cloud console, create an OAuth client of type Web application.
2. Add Timothy's callback address to its authorized redirect URIs. The add form shows the exact address. It is your Timothy address followed by `/v1/connectors/oauth/callback`.
3. Copy the client ID and the client secret.

You can use the same OAuth client as your other Google connectors.

The connector asks Google for two scopes. The form lists them as `documents` and `drive.file`.

## Add the connector

1. Open Settings, "Connectors", and pick the "Google Docs" tile under "Add a connector".
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

Press "Test" on the connector's card, or "Test connection" on the connector's page. A working connector shows "Connected as" followed by the account's email address and its scopes.

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
