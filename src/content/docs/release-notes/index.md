---
title: Release notes
description: Where to find the list of Timothy releases, how versions are numbered, and a summary of the latest releases.
sidebar:
  order: 0
---

The full and current list of releases is on GitHub: [timothy-agent/timothy releases](https://github.com/timothy-agent/timothy/releases). Each release there lists every change and the checksums of its files. If this page and GitHub disagree, GitHub is right.

## Versions

Timothy is in alpha. Each release is numbered `0.1.0-alpha.N`, and `N` goes up by one with each release. Expect breaking changes between releases.

## Upgrade

The [Upgrade](/docs/install/upgrade/) page explains how to upgrade. You cannot go back to an older version once a newer version has changed the database, so take a backup first.

## Latest releases

This list covers the ten releases up to 0.1.0-alpha.106. Dates are in UTC.

### 0.1.0-alpha.106 (2026-10-10)

Creating a mission no longer waits for the mission name. The name arrives in the background, and the create button shows "Preparing mission…" during a longer setup. The Ollama preset now suggests `qwen3:8b`. A mission that pauses because its model is too small now names the model. GitLab connectors and destinations can now be saved. An email destination accepts only a Google connector with Gmail access. Timothy refuses to delete a credential that a channel still uses. Knowledge and the fetch tool can read more web pages, and Knowledge captions more images. The provider key panel no longer shows a "clear" link that always failed. Many app texts now match what the app offers. Timothy is built with Go 1.26.9, which has security fixes.

### 0.1.0-alpha.105 (2026-10-07)

Missions now prepare the repository before they start. They install the toolchain versions the repository pins, and they keep package caches on a shared volume. Inside a mission sandbox, the shell guard is less strict and blocks fewer safe commands. Plan checks now accept plans at the root of a repository and plans for dependencies.

### 0.1.0-alpha.104 (2026-10-07)

The sandbox image now includes mise and a shared toolchain cache volume. It also ships PHP 8.1 to 8.4, and each mission picks one. Missions install the toolchain versions a repository pins before they start. The web app shows a clear message when the sign-in session expires.

### 0.1.0-alpha.103 (2026-09-28)

You can paste markdown directly into the knowledge ingestion form.

### 0.1.0-alpha.102 (2026-09-28)

Plans can include units that only gather evidence. A pull request delivery is refused when its changes do not include a declared artifact. Sandbox containers no longer write core dumps.

### 0.1.0-alpha.101 (2026-09-27)

Mission notifications for finished, paused and waiting missions now come from one events inbox. A follow-up mission takes the settings of its parent mission. You can create a webhook signing secret from the trigger editor.

### 0.1.0-alpha.100 (2026-09-25)

The Slack channel checks its app token when you test the connection. You can answer a mission's question by replying in the Slack thread. The email channel no longer has an autoresponder and can list mail.

### 0.1.0-alpha.99 (2026-09-24)

This release adds chat channels: Telegram with pairing, Slack in socket mode, and email over an IMAP connector. Automations can now start from a signed inbound webhook, a GitHub event or a channel. A channel can also receive an automation's result.

### 0.1.0-alpha.98 (2026-09-23)

Automations replace schedules. An automation has triggers, runs and notes, and it can run from a cron schedule or by hand. The web app has an automations dashboard and editor, and there are built-in templates.

### 0.1.0-alpha.97 (2026-09-23)

The API, the scheduler and workflows now create missions through one shared path. Permission prompts that are still open survive a restart. The scheduler retries when a model route is down.
