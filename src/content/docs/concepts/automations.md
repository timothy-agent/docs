---
title: Automations
description: Missions that start on a schedule or when something happens.
sidebar:
  order: 6
---

## What it is

An automation starts a mission for you. It has one or more triggers, an agent, and an action. When any enabled trigger fires, the automation starts a run, and the run starts a mission from the mission template the action carries.

If the page says "Automations are switched off", turn them on under "Settings", then "Features".

## Where it lives

Open "Automations" in the sidebar. "Start from a template" offers ready-made automations, such as "Daily repo digest", "PR review comment", "Inbox triage" and "Coverage watch". Nothing is saved until you create it. "All automations" lists yours with the last run, and each row has "Run now".

Open an automation to see three tabs: "Settings", "Run history" and "Notes". "Run history" lists runs newest first, loads older runs as you scroll, and shows each run with its trigger, status, start time, duration and, for runs that did not start, the "Skip reason".

## Triggers

- "Cron": a schedule, written as five fields: minute, hour, day of month, month, weekday. It runs in the timezone set under "Settings", then "Features".
- "Manual": runs only when you press "Run now".
- "Connector event": an event in a GitHub repository you connected, such as a new pull request, a review comment or a finished check.
- "Webhook": an outside service posts to a URL. Timothy checks each delivery against a signing secret you store, and you can add filters on the request body.
- "Channel message": a message on one of your channels that matches a pattern.

## The action

The action today is "Mission". You fill in the same fields as a new mission: "Goal", "Kind", "Light mission", route, budget and destinations. The goal can insert data from the trigger, such as `{{event.pr_url}}`.

## Settings most people touch

- The trigger and its schedule or filter.
- "Goal" on the action.
- "When a run is already active", under "Advanced": "Skip", "Queue" or "Parallel".

## Safety limits

Each run obeys limits so an automation cannot run away with your money:

- "Max runs per hour", from 1 to 60.
- "Max concurrent runs", from 1 to 3, used only with "Parallel".
- "Budget per run" on the mission action.
- After three failed runs in a row, Timothy turns the automation off. The "Limits" panel shows the count as "Failures in a row".
- A mission started by an automation never triggers that same automation again.

## Example

You want a morning summary of a repository. Pick "Daily repo digest" from the templates. Replace the repository name in the goal, choose an email destination and press "Create automation". Every weekday morning a light mission reads the activity and sends you the digest.
