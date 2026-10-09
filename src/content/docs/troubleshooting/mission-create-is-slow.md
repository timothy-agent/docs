---
title: Mission create is slow
description: Why creating a mission can take up to 30 seconds on a slow local model, what to expect, and how to make it faster.
sidebar:
  order: 4
---

## "Create mission" or "Run a sample mission" waits a long time

**What you see:** You click "Create mission" on the new mission page, or "Run a sample mission" in the setup checklist. The button stays greyed out. Nothing seems to happen for up to 30 seconds. Then the mission page opens.

**Why:** Before Timothy starts a mission, it asks a model for a short name for the mission. It waits up to 30 seconds for that name. A slow local model, or one that is still loading, can use the whole 30 seconds. If no name comes in time, Timothy creates the mission without one and goes on.

This is a known issue. Follow it in [timothy-agent/timothy#1081](https://github.com/timothy-agent/timothy/issues/1081).

**What to expect:** The wait for the name ends after 30 seconds at most. The mission page then opens and the mission runs as normal.

**What not to do:** Do not reload the page, and do not start the same mission again in another tab. Timothy saves the mission before it asks for the name. A second try gives you a second mission.

**Fix:** Give the naming step a faster model. Timothy uses the model for summaries to name missions. If that has no route, it uses the chat model.

1. Add a provider with a fast model, if you do not have one yet.
2. Open Settings, then Routing.
3. Under "System roles", set "Summarize" to a route that uses the fast model.

The welcome wizard shows which model each role uses on its "What Timothy uses" step. The line that starts with "Summaries" is the one that names missions.
