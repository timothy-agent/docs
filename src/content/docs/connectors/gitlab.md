---
title: GitLab
description: Give Timothy a GitLab identity for mission clones, pushes and merge requests.
sidebar:
  order: 12
---

The GitLab connector gives Timothy a GitLab identity on gitlab.com or on a self-managed instance. The app describes it as "Identity for mission clone/push/PR, read-only pull request tools".

## What it enables

Missions that work on a GitLab project use this connector to clone it, push branches and open merge requests. A [GitLab destination](/docs/connectors/destinations/) pushes through it too.

The connector also adds read-only tools for merge requests. They use the same names as on the other git hosts:

| Tool | What it does |
|---|---|
| `list_pull_requests` | Lists merge requests in a project, most recently updated first. |
| `get_pull_request` | Reads one merge request's title, author, state, branches and description. |
| `get_pull_request_diff` | Reads a merge request's diff. Very large diffs are cut short. |
| `list_pull_request_comments` | Lists the discussion and the inline review comments. |

Both chat and missions can use these tools. None of them can comment, approve or merge.

Add the tools to an agent's "Tools allowlist" before you use them. See [Agents](/docs/settings/agents/).

## What you need

A GitLab personal or project access token. The form asks for the `api` and `write_repository` scopes on the projects Timothy may work with. The form links to GitLab's token page under "How to create one".

## Add the connector

1. Open Settings, "Connectors", and pick the "GitLab" tile under "Add a connector".
2. Fill the form:

   | Field | What to enter |
   |---|---|
   | "Name" | A unique name. It identifies this account when more than one connector serves a tool. |
   | "Instance URL" | Optional. Leave it blank for gitlab.com. Set it for a self-managed instance. |
   | "Namespace" | Optional. The group path new projects are created under. Leave it blank to use the token owner's namespace. |
   | "Access token" | Choose "New credential" and paste the token, or choose "Use existing" and pick a stored token. |

3. Press "Test connection". Timothy saves the connector switched off and checks the token with GitLab.
4. When the test passes, press "Add connector". This switches the connector on.

A connector named `gitlab` stores its token as `GITLAB_TOKEN`.

## Verify

A passing test shows "Connected as" followed by the GitLab username and email.

## Common errors

| Message | What to do |
|---|---|
| A message that contains "gitlab: token invalid or expired" | Create a new token and paste it under "Rotate access token". |
| A message that contains "gitlab: status" | GitLab refused the request. The rest of the message gives GitLab's reason. |
| "Connection failed:" followed by a reason | The connector was saved switched off. Fix the problem and press "Test connection" again. |

## Options on the connector's page

| Field | What it does |
|---|---|
| "Connector name" | Renames the connector. |
| "Treat as sensitive" | Moves turns that use this connector to the "Sensitive tool route" set in [Features](/docs/settings/features/). |
| "Instance URL" | The self-managed instance address. Blank means gitlab.com. |
| "Namespace" | The group path for new projects. |
| "Known hosts" | Shown only when "Instance URL" is set. One `known_hosts` line per row for your instance. gitlab.com's host key is built in. |
| "Sign commits" | Signs every mission commit made through this connector with an SSH key Timothy generates, so GitLab shows them as verified. |
| "Clone and push over SSH" | Clones and pushes over SSH with a second key Timothy generates. Merge requests and project lookups still use the token. |
| "Rotate access token" | Stores a new token under the same name. Paste it and press "Save". |

After you turn on "Sign commits" and press "Save", the page shows a "Signing public key" with a "Copy" button. Add it to GitLab as a new SSH key with usage type "Signing".

After you turn on "Clone and push over SSH" and press "Save", the page shows an "SSH transport public key". Add it to GitLab as a new SSH key with usage type "Authentication". Until you do, pushes fall back to the token.

"Delete" removes the connector. Its stored credentials stay in the secret store.
