---
title: Custom MCP server
description: Connect any streamable-HTTP MCP server so its tools are available in chat.
sidebar:
  order: 10
app_path: /settings/connectors
app_label: Connectors
---

The Custom MCP server connector links Timothy to any MCP server that speaks streamable HTTP. The app describes it as "Any streamable-HTTP MCP endpoint".

Use it for a provider that offers a hosted MCP endpoint but has no tile of its own.

## What it enables

The connector adds the tools the server offers. Timothy lists them when it connects, so the set can change when the server changes.

These tools are for chat only. Missions do not get them.

A tool keeps its own name when no other tool has that name. When a name would clash with a built-in tool or another server's tool, it gets the connector name as a prefix.

When the server has more tools than the "MCP tool index threshold" in [Features](/docs/settings/features/), the agent first sees a short index and loads the tools it needs through `load_tool`.

Add the tools to an agent's "Tools allowlist" before you use them. See [Agents](/docs/settings/agents/).

## What you need

The server's streamable-HTTP endpoint address. Servers that need a login use a bearer token; servers that need an OAuth consent flow are not supported yet.

Servers that only run as a local program (started with `npx` or `python`) are not supported. Timothy connects over HTTP only.

## Add the connector

1. Open Settings, "Connectors", and pick the "Custom MCP server" tile under "Add a connector".
2. Fill the form:

   | Field | What to enter |
   |---|---|
   | "Name" | A unique name. It becomes the prefix for tool names that clash. |
   | "Endpoint" | The server's streamable-HTTP address, for example `https://mcp.example.com/mcp`. |
   | "Bearer token (optional)" | Leave empty for a server without auth. Otherwise choose "New credential" and paste the token, or choose "Use existing" and pick a stored token. |

3. Press "Test connection". Timothy saves the connector and asks the server for its tool list.
4. Press "Add connector". The connector is enabled.

## Verify

Press "Test" on the connector's card. A working connector shows "Connection OK" and the number of tools the server offers.

## Common errors

| Message | What to do |
|---|---|
| "Connection failed:" with a 401 | The server needs a token, or the token is wrong. Edit the connector and set the bearer token. |
| "Connection failed:" with a network error | Timothy could not reach the endpoint. Check the address and that the server allows connections from Timothy's network. |
