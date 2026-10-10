---
title: Destinations
description: The Destinations tab, where you set up the places mission results go.
sidebar:
  order: 7
app_path: /settings/destinations
app_label: Destinations
---

A destination is a place where mission results go. The tab says: "Where mission results go. Attach one or more to a mission and the outcome digest is delivered there when it finishes."

The tab has two sections: "Your destinations" and "Add a destination". "Add a destination" offers "Email", "Webhook", "Channel", "GitHub", "Bitbucket" and "GitLab".

Each destination card shows a short summary and has these controls:

| Control | What it does |
|---|---|
| Switch | Turns the destination on or off. Disabled destinations are skipped by mission delivery without an error. |
| "Test send" | Sends a test delivery, or checks the channel for a channel destination. Not shown for git destinations. |
| "Delete" | Removes the destination. Timothy refuses while a mission in progress still delivers to it. |

Click the card's name to open the destination's page.

The fields of each kind, the test step and what a mission does with a destination are covered in [Destinations](/docs/connectors/destinations/).
