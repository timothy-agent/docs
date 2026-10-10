---
title: Credentials
description: How Timothy stores keys, tokens and passwords, and how to reuse, rotate and delete them.
sidebar:
  order: 1
app_path: /settings/credentials
app_label: Credentials
---

A credential is one secret value stored under a name. API keys, access tokens, passwords, OAuth client secrets, AWS key pairs and service account keys are all credentials.

## Where you add a credential

You add a credential in the form of the thing that needs it. For example, the GitHub connector form has a "Personal access token" field and a provider form has an "API key" field. When you save, Timothy writes the value into the secret store and keeps only the name on the connector or provider.

Most credential fields offer two choices:

| Choice | What it does |
|---|---|
| "New credential" | You paste a new value. Timothy stores it under a name it derives from the item's name. |
| "Use existing" | You pick a name that is already stored. Nothing new is written. |

Under the field, the form says where the value will go. With the built-in store it reads "Encrypted with the master key and kept in Timothy's database." With Vault or AWS Secrets Manager as the default store, it names the path under the `timothy/` prefix.

## How names are chosen

Connector forms name the credential after the connector. A GitHub connector named `github` stores its token as `GITHUB_PAT`. A Gmail connector named `gmail` stores its OAuth client secret as `GMAIL_GOOGLE_CLIENT_SECRET`. Provider forms have a "Credential reference" field that you can edit before you save.

A provider form refuses a new value under a name that something else already uses. It asks you to pick another reference name, so one key never overwrites another by accident.

Names can contain letters, digits and the characters `_ . / -`. A name can never be a secret value.

## The Credentials tab

Settings, "Credentials" lists every stored credential by name, with the providers, connectors, destinations, automations or channels that use it. It never shows the value.

Some credentials are managed by Timothy itself: the OAuth tokens of a Google or Outlook connector, and the signing key of a git connector. A "Use existing" menu lists them but does not let you pick them.

## You cannot read a value back

No screen and no API returns a stored value. If you lose the original, create a new one at the service and store it in Timothy.

## Rotate a credential

To rotate, store a new value under the same name. Everything that uses that name picks up the new value. Each form has its own place for this:

| Item | Where to rotate |
|---|---|
| Provider | The key panel on the provider's page. Paste the new key and press "Save". |
| GitHub connector | "Rotate personal access token" on the connector's page, then "Save". |
| Bitbucket or GitLab connector | "Rotate access token", then "Save". |
| IMAP or CalDAV connector | "Rotate password", then "Save". |
| GitHub MCP connector | "Rotate bearer token", then "Save". |
| AWS connector | Fill "Access Key ID" and "Secret Access Key", then press "Replace access keys". |
| GCP connector | Paste the new key, then press "Replace key". |
| Gmail, Google Calendar, Google Drive, Google Docs or Outlook | Press "Reconnect Google account" or "Reconnect Microsoft account" and consent again. |
| Telegram or Slack channel | The "Rotate bot token" panel, then "Save token". Slack also has "Rotate app token". |

A provider or channel can also switch to a different stored name. On a provider page, pick another name in "Credential reference". On a channel page, choose "Different credential" in the rotate panel.

## Delete a credential

Timothy refuses to delete a credential while a provider, connector, destination, automation or channel still uses it. The error names the items that use it. For a channel, it reads "is referenced by channel(s)" followed by the channel names. A disabled channel counts too. Change or delete those items first.

Deleting a connector does not delete its credential. The confirm dialog says so: stored credentials stay in the secret store until you clear them there.

The secret backend's own login, such as the Vault token, cannot be deleted from this list.

## Where the store lives

The default store is built in. Values are encrypted with the master key you set when you installed Timothy, and kept in Timothy's database. If that key is lost, the stored values cannot be recovered. To use HashiCorp Vault or AWS Secrets Manager instead, see [Secrets](/docs/settings/secrets/).
