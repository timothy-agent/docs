---
title: Agents
description: The Agents tab, where you define who serves a chat session or a mission.
sidebar:
  order: 3
app_path: /settings/agents
app_label: Agents
---

An agent is a named assistant with its own instructions, model chain, tools, skills and knowledge. The app describes the tab as "Prompt overlays, skills, and tools bundled per agent." The default agent serves new sessions unless you pick another one in the chat composer.

## The list

Press "New agent" at the top to create one. Each agent card shows its description, its route and whether memory is on. The default agent has a "default" badge.

| Control | What it does |
|---|---|
| Switch | Turns the agent on or off. |
| "Make default" | Makes this agent the default. Only shown on enabled agents that are not the default. |
| "Manage" | Opens the agent's page. |
| Delete icon | Deletes the agent. Not shown on the default agent, which cannot be deleted. |

## Fields

The "New agent" page and each agent's page share the same fields.

| Field | What it does |
|---|---|
| "Name" | The agent's name. Unique, not case-sensitive. |
| "Description" | Shown in the agent picker. |
| "Prompt overlay" | Added to the end of the system prompt. Instructions, persona, house rules. Markdown works. |
| "Route" | The model chain this agent uses. "default" uses the default route. See [Routing](/docs/settings/routing/). |
| "Memory" | Whether long-term memory takes part in this agent's sessions. |
| "Harness" | The coding harness this agent's missions hand work to. "Inherit from settings" uses the "Default coding harness" in [Features](/docs/settings/features/). The other choices are "Native", "Claude Code", "pi", "Codex CLI", "OpenCode" and "Cursor CLI". |
| "Skills allowlist" | The skill packs this agent may load. Empty means none. |
| "Tools allowlist" | The tools this agent may call, picked from the live tool list. Empty means none. Connector tools appear here once their connector is enabled. |
| "Knowledge allowlist" | Knowledge collections that rank higher when this agent searches. The search still covers the whole knowledge base. |

On the "New agent" page, press "Create agent". On an agent's page, press "Save" to keep changes or "Cancel" to drop them.

## Delete an agent

"Delete" on the agent's page, or the delete icon on its card, removes the agent. Sessions that used it keep their history. New turns in those sessions fall back to the default agent.

## Connector tools and missions

A tool from a connector is only offered to an agent that lists it in "Tools allowlist". This applies to chat and to missions. In missions, only the connector tools that read are offered. See [Connectors and channels](/docs/connectors/).

When an MCP connector hides its tools behind an index, the agent also gets `load_tool` as soon as one of that connector's tools is in its allowlist.
