---
title: GitHub
description: Give Timothy a GitHub identity for mission clones, pushes and pull requests.
sidebar:
  order: 10
app_path: /settings/connectors
app_label: Connectors
---

The GitHub connector gives Timothy a GitHub identity. The app describes it as "Identity for mission clone/push/PR, read-only pull request tools".

This is a different connector from [GitHub MCP](/docs/connectors/github-mcp/). GitHub is what missions use to work on a repository. GitHub MCP gives chat a wide set of GitHub tools.

## What it enables

Missions that work on a GitHub repository use this connector to clone it, push branches and open pull requests. A [GitHub destination](/docs/connectors/destinations/) pushes through it too.

The connector also adds read-only pull request tools:

| Tool | What it does |
|---|---|
| `list_pull_requests` | Lists pull requests in a repository, most recently updated first. |
| `get_pull_request` | Reads one pull request's title, author, state, branches and description. |
| `get_pull_request_diff` | Reads a pull request's diff. Very large diffs are cut short. |
| `list_pull_request_comments` | Lists the discussion and the inline review comments. |

Both chat and missions can use these tools. None of them can comment, approve or merge.

Add the tools to an agent's "Tools allowlist" before you use them. See [Agents](/docs/settings/agents/).

## What you need

A fine-grained personal access token from GitHub. The form asks you to grant Contents (read and write) and Pull requests on the repositories Timothy may work with. The form links to the page where you create one, under "Create one on GitHub".

## Add the connector

1. Open Settings, "Connectors", and pick the "GitHub" tile under "Add a connector".
2. Fill the form:

   | Field | What to enter |
   |---|---|
   | "Name" | A unique name. It identifies this account when more than one connector serves a tool. |
   | "Personal access token" | Choose "New credential" and paste the token, or choose "Use existing" and pick a stored token. |

3. Press "Test connection". Timothy saves the connector switched off and checks the token with GitHub.
4. When the test passes, press "Add connector". This switches the connector on.

A connector named `github` stores its token as `GITHUB_PAT`.

## Verify

A passing test shows "Connected as" followed by the GitHub login, the email if GitHub returns one, and the token's scopes.

## Common errors

| Message | What to do |
|---|---|
| A message that contains "GitHub token invalid or expired" | Create a new token and paste it under "Rotate personal access token". |
| A message that contains "github: status" | GitHub refused the request. The rest of the message gives GitHub's reason. |
| "Connection failed:" followed by a reason | The connector was saved switched off. Fix the problem and press "Test connection" again. |

## Options on the connector's page

| Field | What it does |
|---|---|
| "Connector name" | Renames the connector. |
| "Treat as sensitive" | Moves turns that use this connector to the "Sensitive tool route" set in [Features](/docs/settings/features/). |
| "Sign commits" | Signs every mission commit made through this connector with an SSH key Timothy generates, so GitHub shows them as verified. |
| "Clone and push over SSH" | Clones and pushes over SSH with a second key Timothy generates. Pull requests and repository lookups still use the token. |
| "Rotate personal access token" | Stores a new token under the same name. Paste it and press "Save". |

After you turn on "Sign commits" and press "Save", the page shows a "Signing public key" with a "Copy" button. Add it to GitHub as a new SSH key with key type "Signing Key".

After you turn on "Clone and push over SSH" and press "Save", the page shows an "SSH transport public key". Add it to GitHub as a new SSH key with key type "Authentication Key". Until you do, pushes fall back to the token.

"Delete" removes the connector. Its stored credentials stay in the secret store.
