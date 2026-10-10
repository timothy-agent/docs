---
title: GitHub MCP
description: Connect GitHub's MCP server so Timothy can work with issues, pull requests and code in chat.
sidebar:
  order: 9
app_path: /settings/connectors
app_label: Connectors
---

The GitHub MCP connector links Timothy to GitHub's own MCP server. The app describes it as "Issues, PRs, code, via MCP".

This is a different connector from [GitHub](/docs/connectors/github/). GitHub MCP gives chat a wide set of GitHub tools. GitHub gives missions an identity to clone, push and open pull requests.

## What it enables

The connector adds the tools that GitHub's MCP server offers. Timothy lists them when it connects, so the set can change when GitHub changes its server.

These tools are for chat only. Missions do not get them.

A tool keeps its own name when no other tool has that name. When a name would clash with a built-in tool or another server's tool, it gets the connector name as a prefix.

When the server has more tools than the "MCP tool index threshold" in [Features](/docs/settings/features/), the agent first sees a short index and loads the tools it needs through `load_tool`. An agent gets `load_tool` once any of this connector's tools is in its "Tools allowlist".

Add the tools to an agent's "Tools allowlist" before you use them. See [Agents](/docs/settings/agents/).

## What you need

A GitHub personal access token. The form says fine-grained tokens work and points to github.com/settings/tokens. The form does not name the permissions the token needs.

## Add the connector

1. Open Settings, "Connectors", and pick the "GitHub MCP" tile under "Add a connector".
2. Fill the form:

   | Field | What to enter |
   |---|---|
   | "Name" | A unique name. It identifies this account when more than one connector serves a tool. |
   | "Endpoint" | GitHub's MCP server address. The form fills in `https://api.githubcopilot.com/mcp/`. |
   | "Bearer token" | Choose "New credential" and paste the token, or choose "Use existing" and pick a stored token. |

3. Press "Test connection". Timothy saves the connector switched off, connects to the server and lists its tools.
4. When the test passes, press "Add connector". This switches the connector on.

A connector named `github-mcp` stores its token as `GITHUB_MCP_TOKEN`.

## Verify

A passing test shows "Connection OK, tools are servable." On the connector's page, a passing test also says how many tools are deferred behind `load_tool`, if any.

## Common errors

| Message | What to do |
|---|---|
| "Connection failed:" followed by a reason | The connector was saved switched off. Check the endpoint and the token, then press "Test connection" again. |

MCP endpoints on private, loopback or link-local addresses are refused unless the host is in the "Outbound host allowlist" in [Features](/docs/settings/features/).

## Options on the connector's page

- "Treat as sensitive" moves turns that use this connector to the "Sensitive tool route" set in [Features](/docs/settings/features/).
- "Rotate bearer token" stores a new token under the same name. Paste it and press "Save".
- "Delete" removes the connector. Its tools disappear from the agent on the next reload. Its stored credentials stay in the secret store.
