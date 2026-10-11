---
title: Hosted MCP servers
description: The hosted MCP servers Timothy offers as tiles, with their endpoints and the day each was checked.
sidebar:
  order: 10
app_path: /settings/connectors
app_label: Connectors
---

Under "Add a connector", Timothy lists tiles for well-known hosted MCP servers. Each tile opens the add form with the endpoint filled in and the right authentication selected, so connecting is a click and a sign-in instead of a hunt for URLs.

Every tile creates a connector of kind `mcp`, the same as [Custom MCP server](/docs/connectors/custom-mcp-server/). The only difference is the prefilled values. Sign-in works as described in [Connect an MCP server with OAuth](/docs/connectors/mcp-oauth/).

## The catalog

| Tile | Endpoint | Authentication | Checked on |
|---|---|---|---|
| Notion | `https://mcp.notion.com/mcp` | OAuth login, automatic client registration | 2026-10-11 |
| Slack | `https://mcp.slack.com/mcp` | OAuth login with a Slack app's client ID and secret | 2026-10-11 |
| Linear | `https://mcp.linear.app/mcp` | OAuth login, automatic client registration. A Linear API key also works as the bearer token. | 2026-10-11 |
| Atlassian | `https://mcp.atlassian.com/v1/mcp/authv2` | OAuth login | 2026-10-11 |
| HubSpot | `https://mcp.hubspot.com/` | OAuth login with an MCP connector's client ID and secret from HubSpot | 2026-10-11 |
| Cloudflare | `https://mcp.cloudflare.com/mcp` | OAuth login. A Cloudflare API token also works as the bearer token. | 2026-10-11 |
| Sentry | `https://mcp.sentry.dev/mcp` | OAuth login | 2026-10-11 |
| Stripe | `https://mcp.stripe.com` | OAuth login. An agent API key also works as the bearer token. | 2026-10-11 |

"Checked on" is the day the endpoint and authentication were last verified against the provider's own setup page. The add form shows the same date next to a link to that page. Providers move endpoints; if a tile stops connecting, check the provider's page and open an issue.

## Add a catalog server

1. Open Settings, "Connectors", and pick the tile.
2. Keep or change the "Name".
3. For a server that needs its own app (Slack, HubSpot), create the app on the provider's side first and paste the "Client ID" and "Client secret" the form asks for. The other servers register Timothy automatically.
4. Press "Save & connect" and approve access on the provider's sign-in page.
5. Back in Timothy, press "Test" on the connector's card, then review the "Tools" panel on the connector page and tick the agents that should get each tool.

To use a bearer token instead of OAuth where the provider allows it, switch "Authentication" to "Bearer token" before saving and paste the key.

## Servers not in the catalog

Any other hosted server works through the [Custom MCP server](/docs/connectors/custom-mcp-server/) tile. Servers that only run as a local program are not supported yet.
