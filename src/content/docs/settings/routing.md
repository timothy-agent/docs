---
title: Routing
description: The Routing tab, where routes decide which provider and model handle each kind of job.
sidebar:
  order: 4
---

A route is a named chain of providers and models. When a job uses a route, Timothy tries the chain's entries in order until one answers. The app describes the tab as "Task routes decide which provider chain handles a given job."

## System roles

The "System roles" panel binds one route to each job Timothy needs. The app says: "Timothy needs one route bound to each of these 4 roles to work. A newly connected provider fills in whichever are still unbound."

| Role | What it is for |
|---|---|
| "Chat (default)" | The default route for chat. |
| "Embeddings" | Turning text into vectors for memory and knowledge search. |
| "Vision" | Requests that carry images. |
| "Summarize" | Summaries. |

Each role has a menu of your routes. A role with no route shows "Unbound".

## Your routes

To add a route, fill these fields and press "Add route":

| Field | What it does |
|---|---|
| "New route name" | The route's name. |
| "Capability" | What the route serves: `chat`, `embeddings` or `vision`. Every provider in the chain must support it. |

Each route card shows its role, if it has one, and its strategy. It also shows which provider and model is serving now, and the chain in order. The serving line reads "serving" with the provider and model, "disabled", or "no usable provider".

| Control | What it does |
|---|---|
| Switch | Turns the route on or off. |
| Delete icon | Deletes the route. It is disabled while the route holds a system role. Move the role to another route first. |

Click the card's name to open the route's page.

## The route's page

| Field | What it does |
|---|---|
| "Strategy" | How Timothy orders the chain. See below. |
| "Enabled" | Turns the route on or off. |
| "Chain" | The providers and models in this route. |
| "Add a provider to this chain" | Pick a provider, pick or type a model, then press "Add". The model starts as the provider's default model. |

Press "Save" to keep changes or "Cancel" to drop them.

### Strategies

| Strategy | Order of the chain |
|---|---|
| "Ordered" | The order you set. Drag the cards, or use the move buttons on each card. |
| "Auto" | Sorted by score. Price counts most, with some weight on speed. |
| "Cheapest" | Sorted by score, with price counting almost entirely. |
| "Fastest" | Sorted by score, with low latency counting most. |

Scores come from recent usage and declared prices. A provider that fails often sinks under every strategy. An entry with no data yet is neither favored nor held back. With a scored strategy the page shows "auto-sorted by score" and you cannot drag the cards.

Each card in the chain shows the model, its latency, its price per million tokens and its uptime. The entry that serves now has a "serving" badge. A skipped entry shows why it was skipped.

### Failover

Timothy tries the chain in order. It skips providers that are disabled, unhealthy or lack the route's capability. It tries each entry at most once. If an entry fails, the next one gets the request.
