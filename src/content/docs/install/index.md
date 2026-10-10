---
title: Install
description: How to install Timothy on your own machine or server with Docker Compose.
sidebar:
  order: 0
assistant: false
---

Timothy runs as a set of containers under Docker Compose. You install it on one machine, and you open it in your browser.

## What you get

After the install, these services run on your machine:

| Service | What it does |
|---|---|
| brain | The public API. It runs chats, agents and missions. |
| gateway | Sends each model request to the right provider and records what it cost. |
| memoryd | Stores and searches what Timothy remembers. |
| sandboxd | Starts a separate container for each mission's work. |
| web | The web interface you use in the browser. |
| searxng | Web search for Timothy's search tool. |
| markitdown | Turns files such as PDFs into text Timothy can read. |
| ocr | Reads text from images. |
| pdfgen | Turns a mission result into a PDF. |
| whisper | Local speech to text for the microphone button. It is off unless you turn it on. |

A PostgreSQL database holds all data. It has no port on your machine. Only two ports are open to you: 3300 for the web interface and 8300 for the API.

## Two ways to install

- [Quick start](/docs/install/quick-start/) uses the released images. You need Docker and nothing else. This is the right choice for most people.
- [Build from source](/docs/install/build-from-source/) builds every image from the Timothy repository. Choose it if you want to change the code.

Before you start, read the [requirements](/docs/install/requirements/).

After the install, these pages help you keep Timothy running:

- [Upgrade](/docs/install/upgrade/)
- [Backup and restore](/docs/install/backup-and-restore/)
