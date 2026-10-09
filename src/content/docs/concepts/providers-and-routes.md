---
title: Providers and routes
description: Where Timothy's models come from, which model does which job, and how costs are counted.
sidebar:
  order: 2
---

## What it is

A provider is a connection to a model vendor, such as OpenAI or a local Ollama. A route is a named chain of models that serves one kind of work. Agents and missions ask for a route, never for a provider.

## Where it lives

Providers are under "Settings", then "Providers". The presets are "OpenAI", "OpenAI (Responses)", "Anthropic", "Cursor", "AWS Bedrock", "GLM (Z.ai)", "Grok (xAI)", "Ollama" and "Custom endpoint". "Custom endpoint" takes any OpenAI-compatible URL. When you add a provider, Timothy tests it with a one-token call to the model you chose.

Routes are under "Settings", then "Routing". The "System roles" panel has four roles, and Timothy needs a route bound to each one:

- "Chat (default)": answers chats.
- "Embeddings": turns documents into search vectors for knowledge.
- "Vision": looks at images.
- "Summarize": background jobs such as shortening long chat history.

A new provider fills in any role that is still "Unbound". "Your routes" lists every route. "Add route" makes your own, which you can then pick on an agent.

## Settings most people touch

- The role bindings in "System roles".
- The "Chain" on a route's page: the providers and models it can use. Add one with "Add a provider to this chain".
- "Strategy": "Ordered" tries the chain in the order you drag it into. "Auto", "Cheapest" and "Fastest" sort the chain by score from past calls.

## Chains and failover

A route tries its first entry. If that call fails before any text reaches you, Timothy moves on to the next entry in the chain. Once a reply has started, it stays with that model. A new provider's model is added to the end of existing role chains as a fallback. Timothy never reorders your chain.

## Costs

The "Analytics" page shows spend, tokens and latency for every chat and mission. Each call is priced from the provider's list price. When Timothy has no price for a model, it records the cost as unknown instead of guessing. Those calls are left out of the spend totals. The page says how many there were and may show a rough figure marked with "≈", worked out from catalog prices.

## Local models

The "Ollama" preset runs local models with no key. Timothy expects Ollama to run on the host machine, outside Docker, at port 11434.

## Example

You add an OpenAI key, then Ollama. You open the route bound to "Chat (default)" and check that both are in its chain. If Ollama is missing, add it with "Add a provider to this chain". You drag Ollama to the top. Chats now run on your local model. If Ollama is down, the same chat falls back to OpenAI.
