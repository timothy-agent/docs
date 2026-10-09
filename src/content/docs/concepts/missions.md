---
title: Missions
description: Longer tasks Timothy plans, does and checks by itself.
sidebar:
  order: 3
---

## What it is

A mission is a longer task Timothy works on by itself and reports back. Each mission runs in its own sandbox. A mission is either "Coding", which branches from a repository, or "General", which works in a scratch folder.

## Where it lives

Open "Missions" in the sidebar and press "New mission". Timothy guesses the kind from your goal and shows it as a badge. Click the badge to switch.

A full mission moves through five phases: "Discover", "Plan", "Build", "Prove" and "Result". Discover looks around. Plan splits the goal into steps, each with a way to check it. Build does the work. Prove reviews it. Result delivers it.

A "Light mission" is a general mission done in a single pass. It skips discover, plan and prove. The final message is the result.

## Settings most people touch

- "Goal": what done looks like. Type # to reference another mission, a chat or a document.
- "Attach file": add PDFs, Markdown or text files, images or audio. Timothy reads each file once, when the mission is created. A mission takes up to eight files.
- "Auto-approve the plan": turn it off to read and approve the plan before work starts.

## Checks and review

Timothy checks the work itself. It confirms that every file the plan promised exists and is not empty. Then it runs each step's check command. A step counts as passed only on that evidence, never because the model says it is done. Then, in prove, a reviewer model reads the change against each step's criteria. A real problem sends the mission back to build.

## Watching and answering

The mission page shows the phase, the plan and a "Timeline". The "Missions" page shows a notice when a mission finishes, fails, pauses or waits for you.

A mission may stop to ask you something:

- "Timothy has a question": pick an answer, or type one and press "Send". If you wait too long, it uses the proposed default.
- "Plan ready for review": press "Approve", "Request replan" or "Rediscover".
- "Timothy wants to use this tool": press "Allow once", "Allow for session" or "Deny".

Use "Intervene" to send a note that steers a running mission.

## Results

When a mission ends, the "Result" panel shows the outcome. The "Files" panel holds what it made, with a zip download, "Promote to KB" and, when PDF export is set up, one merged PDF of all Markdown files. Missions can also deliver to [destinations](/docs/concepts/channels-and-connectors/).

A finished mission never reopens. Press "Fork" to start a follow-up. The new mission gets a summary of the old one.

## Example

You write the goal "Summarize these three reports into one page" and attach the PDFs. Timothy shows the "General · scratch workspace" badge. You tick "Light mission" and press "Create mission". A few minutes later the summary appears under "Result".
