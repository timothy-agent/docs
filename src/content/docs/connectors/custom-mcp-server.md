---
title: Custom MCP server
description: Connect any streamable-HTTP MCP server, check its tools before saving, and hand them to agents.
sidebar:
  order: 10
app_path: /settings/connectors
app_label: Connectors
---

The Custom MCP server connector links Timothy to any MCP server that speaks streamable HTTP. The app describes it as "Any streamable-HTTP MCP endpoint".

Use it for a provider that offers a hosted MCP endpoint but has no tile of its own.

## What it enables

The connector adds the tools the server offers. Timothy lists them before you save, so you see what you get. The set can change when the server changes.

These tools are for chat only. Missions do not get them.

A tool keeps its own name when no other tool has that name. When a name would clash with a built-in tool or another server's tool, it gets the connector name as a prefix. The add page shows the name each tool will get.

When the server has more tools than the "MCP tool index threshold" in [Features](/docs/settings/features/), the agent first sees a short index and loads the tools it needs through `load_tool`. The add page says when a server is above that threshold.

## What you need

The server's streamable-HTTP endpoint address, or the JSON config the provider publishes. Servers that need a login use a bearer token or an OAuth sign-in; see [Connect an MCP server with OAuth](/docs/connectors/mcp-oauth/) for the second.

Servers that only run as a local program (started with `npx` or `python`) are not supported. Timothy connects over HTTP only.

## Add the connector

1. Open Settings, "Connectors", and pick the "Custom MCP server" tile under "Add a connector".
2. In "URL or JSON config", paste the server's address or the provider's JSON config. Timothy reads the common `mcpServers` shape and also accepts the inner object or a single entry, with the address in `url`, `serverUrl` or `endpoint`. If the config lists several servers, pick one under "Server". Entries that start a local program (they have a `command`) are listed as "Needs a local runtime, not supported yet". A bearer token in an `Authorization` header is moved into the token field and saved as a secret. A header with a placeholder such as `${API_KEY}` must be replaced before you continue.
3. Check the "Name". It comes from the config key and you can change it.
4. Press "Check server". Nothing is saved yet.
   - If the server asks for a token, a "Bearer token" field appears. Paste it and check again. The token is used only for the check until you add the connector.
   - If the server needs an OAuth login, "Client ID" and "Client secret" fields appear. Leave them empty unless the server needs them, then press "Connect with OAuth" and approve access on the server's sign-in page. Tools are listed only after you connect, so set the agents' allowlists under [Agents](/docs/settings/agents/) afterwards. See [Connect an MCP server with OAuth](/docs/connectors/mcp-oauth/).
   - If the server cannot be reached, the page shows the network reason. A server on a private network must be on the outbound host allowlist in Settings.
5. Review the tools. Each row shows the name, the description, and whether the server says the tool is read-only. The server makes that claim and Timothy does not check it. A row that will be renamed shows the new name, for example "as notion_search".
6. Uncheck any tool you do not want. "Try it" opens a form for one tool, checks your arguments and shows the request Timothy would send. It does not run the tool; real calls happen in chat and ask for permission.
7. Under "Agents", pick the agents that should get the checked tools, then press "Add connector". Timothy saves the token as a secret, adds and enables the connector, and adds the checked tools to each chosen agent's "Tools allowlist". You can change the allowlists later under [Agents](/docs/settings/agents/).

## Verify

Press "Test" on the connector's card. A working connector shows "Connection OK" and the number of tools the server offers.

## Review the tools later

Open the connector from the Connectors list. The "Tools" panel lists the tools from the last check with the server's read-only claim and a checkbox per agent. Tick or untick an agent to add the tool to, or remove it from, that agent's "Tools allowlist". Only that agent changes.

Press "Re-probe" to check the server again with the stored token or OAuth session. Tools the server added since the last check are marked "new" and are not allowed anywhere yet. Tools the server removed are marked "removed" until the next check. If an OAuth session has expired, the panel asks you to reconnect.

A connector added before this panel existed, or connected with OAuth, shows "Not checked yet" until the first re-probe.

## Common errors

| Message | What to do |
|---|---|
| The check says the server needs a token | Paste the server's bearer token and check again. |
| The check says the server needs an OAuth login | Press "Connect with OAuth". The endpoint must use https. |
| The check shows a network reason | Check the address, and add the host to the outbound host allowlist if it is on a private network. |
| "Connection failed:" with a 401 on the card later | The token was revoked. Edit the connector and set a new bearer token. |
