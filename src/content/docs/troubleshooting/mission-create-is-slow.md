---
title: Mission create is slow
description: Why the create button can show "Preparing mission…", why a new mission can have no name at first, and how to make naming faster.
sidebar:
  order: 4
---

## The button shows "Preparing mission…"

**What you see:** You click "Create mission" on the new mission page, or "Run a sample mission" in the setup checklist. After 2 seconds the button changes to "Preparing mission…" and stays greyed out. Then the mission page opens.

**Why:** Timothy sets up the mission before it opens the page. Most missions are ready in a moment. A coding mission takes longer, because Timothy copies the repository and makes a branch for it. It also waits up to 5 seconds for a short mission name, so it can name the branch after it. If no name comes in time, the branch is named after the goal.

**What not to do:** Do not reload the page, and do not start the same mission again in another tab. A second try gives you a second mission.

## A new mission has no name at first

**What you see:** The mission page opens, but the mission has no short name yet. The name shows up a little later.

**Why:** Timothy asks a model for the name after it creates the mission. The mission does not wait for it. When the name arrives, the missions list and the mission page show it without a reload. A slow local model, or one that is still loading, can take up to 30 seconds.

**Fix:** Give the naming step a faster model. Timothy uses the model for summaries to name missions. If that has no route, it uses the chat model.

1. Add a provider with a fast model, if you do not have one yet.
2. Open Settings, then Routing.
3. Under "System roles", set "Summarize" to a route that uses the fast model.

The welcome wizard shows which model each role uses on its "What Timothy uses" step. The line that starts with "Summaries" is the one that names missions.
