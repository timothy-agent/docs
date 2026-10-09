---
title: Agents
description: What an agent is, what it can use and how the default agent works.
sidebar:
  order: 1
---

## What it is

An agent is a named assistant. It has its own instructions, a route that picks its model, and lists of the tools and skills it may use. Every chat is answered by one agent. Missions and automations also run as an agent.

## Where it lives

Open "Settings", then "Agents". Each agent is a card with an on and off switch, a "Manage" button and a "Make default" button. Use "New agent" to add one.

In a chat, you pick the agent that answers from the chat box. If you pick nothing, the default agent answers.

## Settings most people touch

- "Prompt overlay": your instructions for this agent. Timothy adds this text to its own system prompt. Use it for a persona, house rules or the tone you want.
- "Route": the model chain this agent uses. "default" means the chat route. See [Providers and routes](/docs/concepts/providers-and-routes/).
- "Tools allowlist": the tools this agent may call. Tools are opt-in. An empty list means the agent gets none of them. A few helpers stay on for every agent, such as searching your knowledge.

The form has more fields. "Skills allowlist" picks skill packs. A skill pack is a set of instructions for one kind of task, and the agent loads it only when it needs it. An empty skills list also means none. "Knowledge allowlist" names collections whose documents rank higher when this agent searches. The "Memory" switch decides whether the agent reads and adds to long-term memory. "Harness" picks the coding tool that runs this agent's coding missions. "Inherit from settings" uses the instance default.

## The default agent

A fresh install has one agent called "general". It is the default agent. It answers new chats unless you pick another agent. Its tools cover web search, mail, calendar, time and currency helpers, and starting missions. It also allows every skill pack that ships with Timothy.

You can make any enabled agent the default. The default agent cannot be deleted. If you delete another agent, its old chats keep their history, and new messages in them go to the default agent.

## Example

You want an agent for writing. Create an agent named "Writer". In "Prompt overlay", write that it should answer in short, plain sentences and never use jargon. Leave "Route" on "default". In "Tools allowlist", add only the web search and page fetch tools. Now pick "Writer" in a chat when you draft a post. It can look things up, but it cannot send mail or start missions.
