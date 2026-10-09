---
title: Bitbucket
description: Give Timothy a Bitbucket Cloud identity for mission clones, pushes and pull requests.
sidebar:
  order: 11
---

The Bitbucket connector gives Timothy a Bitbucket Cloud identity. The app describes it as "Identity for mission clone/push/PR, read-only pull request tools".

## What it enables

Missions that work on a Bitbucket repository use this connector to clone it, push branches and open pull requests. A [Bitbucket destination](/docs/connectors/destinations/) pushes through it too.

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

A Bitbucket Cloud workspace or repository access token. The form asks you to grant Repositories: Read and Pull requests: Read on the repositories Timothy may work with. The form links to Atlassian's guide under "How to create one".

## Add the connector

1. Open Settings, "Connectors", and pick the "Bitbucket" tile under "Add a connector".
2. Fill the form:

   | Field | What to enter |
   |---|---|
   | "Name" | A unique name. It identifies this account when more than one connector serves a tool. |
   | "Workspace" | Optional. Required for a workspace or repository access token. A personal API token can leave it blank. |
   | "Access token" | Choose "New credential" and paste the token, or choose "Use existing" and pick a stored token. |

3. Press "Test connection". Timothy saves the connector switched off and checks the token with Bitbucket.
4. When the test passes, press "Add connector". This switches the connector on.

A connector named `bitbucket` stores its token as `BITBUCKET_TOKEN`.

## Verify

A passing test shows "Connected as" followed by the user the token belongs to. For a workspace or repository access token it shows the workspace instead.

## Common errors

| Message | What to do |
|---|---|
| "bitbucket: this token is a workspace or repository access token, not a user; set the connector's workspace so it can be verified" | Fill "Workspace" and test again. |
| A message that contains "bitbucket: token invalid or expired" | Create a new token and paste it under "Rotate access token". |
| A message that contains "bitbucket: status" | Bitbucket refused the request. The rest of the message gives Bitbucket's reason. |
| "Connection failed:" followed by a reason | The connector was saved switched off. Fix the problem and press "Test connection" again. |

## Options on the connector's page

| Field | What it does |
|---|---|
| "Connector name" | Renames the connector. |
| "Treat as sensitive" | Moves turns that use this connector to the "Sensitive tool route" set in [Features](/docs/settings/features/). |
| "Workspace" | The workspace the token belongs to. |
| "Sign commits" | Signs every mission commit made through this connector with an SSH key Timothy generates, so Bitbucket shows them as verified. |
| "Clone and push over SSH" | Clones and pushes over SSH with a second key Timothy generates. Pull requests and repository lookups still use the token. |
| "Rotate access token" | Stores a new token under the same name. Paste it and press "Save". |

After you turn on "Sign commits" and press "Save", the page shows a "Signing public key" with a "Copy" button. Add it to Bitbucket as a new SSH key.

After you turn on "Clone and push over SSH" and press "Save", the page shows an "SSH transport public key". Add it to Bitbucket as a new SSH key. Until you do, pushes fall back to the token.

"Delete" removes the connector. Its stored credentials stay in the secret store.
