---
title: Features
description: The Features tab, with switches and defaults for the whole instance.
sidebar:
  order: 9
app_path: /settings/features
app_label: Features
---

The Features tab holds switches and defaults for the whole instance. The app describes it as "Feature switches and defaults: changes serve immediately, no restarts."

## Switches

A switch takes effect as soon as you flip it. There is no Save button.

| Switch | What it does |
|---|---|
| "Tool execution" | Off: chat answers as plain completion, with no shell, no web fetch and no tool calls. |
| "Memory extraction" | Off: turns stop feeding the long-term memory queue. Retrieval keeps working. |
| "Compaction" | Off: sessions grow without limit until you turn it back on. Useful when debugging context. |
| "Automations" | Off: automations stop firing missions. |
| "KB image captioning" | On: images in ingested documents get a caption from a vision model. This spends gateway tokens for each image. |
| "KB local OCR" | On: when no vision route is bound, images in ingested documents get their text read locally by tesseract. It is free and spends no gateway tokens. |
| "Channels" | Off: chat channels such as Telegram stop polling for messages within a minute. |
| "PR attribution" | On: pull requests Timothy opens end with a line that credits Timothy Agent and links to its repository. |
| "Notification sound" | Plays a short beep when a permission ask needs your approval. This one is stored in your browser, not on the server. |

## Values

Each value has its own card. Change it and press "Save". "Save" stays disabled until you change something. "Timezone" is the exception: it saves as soon as you pick a zone.

| Setting | What it does |
|---|---|
| "Sensitive tool route" | Turns that use a connector marked sensitive switch to this route. Their memory extraction and compaction follow. "Off (default)" turns it off. Chain it to a local provider for a privacy floor. |
| "Timezone" | Dates and times everywhere follow this zone: delivery timestamps, automation cron times and the date shown to models. "UTC (default)" is used when it is empty. |
| "Default currency" | New mission budgets use this currency unless you pick another when you create the mission. |
| "Default coding harness" | New coding missions hand work to this harness unless you pick another. "Native", "Claude Code", "pi", "Codex CLI", "OpenCode" or "Cursor CLI". |
| "Harness run budget" | The wall-clock limit for one delegated coding run, in minutes. Empty uses the default of 8 hours. A run that stops producing output is killed after 10 idle minutes anyway. |
| "Review token ceiling" | The input tokens a mission may spend on review turns. At the ceiling the mission pauses on budget. Empty uses the default of 1.5 million. 0 turns the ceiling off. |
| "MCP tool index threshold" | An MCP connector with more tools than this shows a one-line index and a `load_tool` entry point instead of every tool. Empty uses the default of 8. 0 shows every tool. |
| "Outbound host allowlist" | Webhook destinations, MCP endpoints and the mission notify webhook refuse private, loopback and link-local addresses. List the hosts that may be reached anyway, as comma-separated host names or IP addresses. Empty allows none. |
| "Default branch pattern" | The branch name for mission work. Placeholders: `{type}`, `{slug}`, `{login}` and `{date}`. Empty uses `{type}/{slug}`. |
| "Default commit style" | "Conventional (default)" writes `type: subject`. "Plain" uses the unit title as it is. |
| "Writing style" | Your own writing rules. Timothy follows them when it drafts or rewrites text for you, in chat and in missions. Empty uses the built-in defaults. Up to 4000 characters. |
| "Writing samples" | A knowledge base collection that holds your own writing. Timothy searches it for voice and register before it drafts. "Off (default)" turns it off. |

In "Default branch pattern", `{type}` is the change type such as fix or feat, `{slug}` comes from the goal, `{login}` is the GitHub login and is empty for missions that do not use GitHub, and `{date}` is the date as YYYYMMDD.
