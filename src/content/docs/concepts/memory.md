---
title: Memory
description: What Timothy remembers, how memories change over time and how to review them.
sidebar:
  order: 4
app_path: /memory
app_label: Memory
---

## What it is

Memory holds facts Timothy picked up from your chats and missions. After a chat turn, Timothy looks for facts worth keeping. When a mission ends, it does the same with the mission's outcome. Later, when you send a chat message, Timothy finds the memories that fit and adds them to what the model sees. Missions can search memory too.

A memory is never edited in place. When a fact changes, Timothy stores a new memory that replaces the old one and keeps the old one as history.

## Where it lives

Open "Memory" in the sidebar. It has three views:

- "Queue": new memories that wait for your OK.
- "Browser": search memories, browse them by status, and add one by hand.
- "Graph": the people, projects, services and preferences your memories mention, and how they connect. Click one to see its memories.

## Settings most people touch

- The "Queue" buttons. "Confirm" keeps a memory. "Edit" lets you fix the wording first. "Reject" drops it, and Timothy will not store the same fact again.
- "Remember something" in "Browser". A fact you add here is saved as active straight away and skips the queue.
- The "Memory" switch on an agent, under "Settings", then "Agents". With it off, that agent does not use memory.

## Correcting and forgetting

When Timothy learns a fact that conflicts with an older one, the queue shows both, as "Existing fact" and "Proposed correction". Confirm the correction to replace the old fact.

The "Browser" view has no delete button for active memories. To correct one, tell Timothy the right fact in a chat or add it under "Remember something". The "history" link on a memory shows what it replaced.

Memories also fade. A memory that nobody has confirmed for about three months counts half as much in search as a fresh one. A daily clean-up archives old memories that nothing used.

## Example

In a chat you say you moved from Berlin to Amsterdam. Timothy reads this as a change to an older fact. The queue shows "lives in Berlin" as the "Existing fact" and "lives in Amsterdam" as the "Proposed correction". You press "Confirm". From then on, chats get the new fact, and the old one stays in its history.
