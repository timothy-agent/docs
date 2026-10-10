---
title: Google Search Console
description: Connect Google Search Console so Timothy can read search queries, clicks and positions for your sites.
sidebar:
  order: 6
app_path: /settings/connectors
app_label: Connectors
---

The Google Search Console connector gives Timothy read-only access to the Search Console data of one Google account. The app describes it as "Read search queries, clicks and positions (read-only)".

## What it enables

In chat, the connector adds these tools:

| Tool | What it does |
|---|---|
| `list_search_console_sites` | Lists the sites the account can read, with its permission level on each. |
| `search_console_query` | Returns clicks, impressions, CTR and average position for one site, grouped by query, page, country, device, date or search appearance. |

Missions can use both tools.

Add the tools to an agent's "Tools allowlist" before you use them. See [Agents](/docs/settings/agents/).

### How the query tool works

- A site is either a domain property, such as `sc-domain:example.com`, or a URL-prefix property, such as `https://example.com/`. `list_search_console_sites` shows each site in the form the query tool needs. A bare host such as `example.com` is refused.
- Dates use Pacific time, the calendar Search Console uses. By default the range is the 28 days that end 3 days ago. Search Console needs about two days to finalize its data.
- The result starts with a line that states the site, the date range and the data state. Then it shows a table. The table has one column for each dimension you ask for, then clicks, impressions, CTR and position.
- Rows are sorted by clicks, highest first. One call returns up to 100 rows by default and at most 1,000. Ask for the next rows with a start row.
- Filters narrow the rows, for example to queries that do not contain your brand name. All filters must match.
- Position is an average weighted by impressions.
- Query rows leave out anonymized queries. So the total for a page is higher than the sum of its query rows.

To compare two periods, ask for two ranges of the same length.

## What you need

Google Search Console uses OAuth. You need an OAuth client from Google Cloud:

1. In the Google Cloud console, create an OAuth client of type Web application.
2. Add Timothy's callback address to its authorized redirect URIs. The add form shows the exact address. It is your Timothy address followed by `/v1/connectors/oauth/callback`.
3. Enable the Google Search Console API for the project.
4. Copy the client ID and the client secret.

You can use the same OAuth client as your other Google connectors.

The connector asks Google for one scope. The form lists it as `webmasters.readonly`.

The Google account must have access to the sites in Search Console. A user who is only listed as unverified on a site cannot read its data, so that site does not show up.

## Add the connector

1. Open Settings, "Connectors", and pick the "Google Search Console" tile under "Add a connector".
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

Press "Test" on the connector's card, or "Test connection" on the connector's page. A working connector shows "Connection OK". Search Console does not report the account's email address, so the test shows no address.

## Common errors

| Message | What to do |
|---|---|
| "Connection failed:" followed by a reason, on the "Connectors" tab | The consent step failed. Check the redirect URI and the client ID, then add the connector again. |
| "Google authorization expired or was revoked" | Open the connector and press "Reconnect Google account". If your OAuth app is in testing mode, Google expires the grant about once a week. |
| "google returned no refresh token; remove Timothy's access at myaccount.google.com/permissions and reconnect" | Remove Timothy's access in your Google account, then reconnect. |
| "the connected Google account has no access to Search Console site" | Google refused access. Google's reason follows in brackets. Most often the account cannot read that site: check the site name with `list_search_console_sites`, or give the account access in Search Console. If the reason says the API is disabled, enable the Google Search Console API in the OAuth client's project. |
| "search console quota was hit" | Google limits how many queries an account can run. Wait a few minutes, then try again. |
| "search console rejected the request" | Google refused the query. The rest of the message is Google's reason, for example a bad filter. |

## Options on the connector's page

- "Treat as sensitive" moves turns that use this connector to the "Sensitive tool route" set in [Features](/docs/settings/features/).
- "Reconnect Google account" runs the consent step again.
- "Delete" removes the connector. Its stored credentials stay in the secret store.
