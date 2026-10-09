---
title: Sample mission
description: Start a ready-made first mission from the Home checklist and follow it to its result.
sidebar:
  order: 4
---

A mission is a longer task that Timothy works on by itself and then reports back on. The sample mission lets you see one from start to end without writing a goal.

## Start it

On Home, the setup checklist has the item "Run your first mission". When a chat model works and the sandbox service is reachable, that item shows a "Run a sample mission" button. Press it.

Timothy creates a mission with this goal:

> Write a short guide, under 200 words, on how to get the most out of Timothy missions: when to use a mission instead of a chat, how to phrase a good goal, and what to expect in the result.

The goal ends with a run tag based on the current date and time, so each sample mission is unique. The mission is a quick, single-pass one. It needs no connected account and no code repository.

Timothy names the mission before it opens the mission page. On a slow local model, this can take up to half a minute. Wait for the page to open.

To write your own goal instead, press "Open" on the same checklist item. It opens the new mission form.

## Watch it run

The mission page shows:

- The mission name and a status badge at the top.
- A phase bar that shows where the mission is.
- Badges for the models used, the cost and the time spent.
- "Goal": the task you gave it.
- "Timeline": each step Timothy takes, as it happens.

You can leave the page while the mission runs. It keeps going.

## Where the result lands

When the mission finishes, a "Result" panel appears on the mission page. It holds the guide Timothy wrote. "Copy result" copies it. The mission also stays in the list under "Missions" in the sidebar.

When a mission succeeds, the checklist item "Run your first mission" is ticked.

## If it pauses

Missions refuse some small models that cannot do this kind of work well. By default these are `qwen2.5:7b` and the Amazon Nova models. If one of them serves the mission, the mission pauses instead of running. Add a stronger model in "Settings", then "Providers", and change the chat job in "Settings", then "Routing".
