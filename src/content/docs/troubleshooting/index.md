---
title: Troubleshooting
description: Fixes for common problems when you run Timothy.
sidebar:
  order: 0
---

This section helps you fix common problems. Each page covers one group of symptoms. Find the page that matches what you see. Each entry starts with the message or behaviour in the app, then explains why it happens and how to fix it.

Search works too. Type the exact words of the message you see into the search box at the top of the page.

## Where to look first

Three places answer most questions.

**The setup checklist on Home.** It shows which setup steps are done. If "Add a model provider" is not done, Timothy has no model to answer with. If you closed the checklist, open the "Help" menu and choose "Setup checklist" to bring it back.

**The service logs.** Each part of Timothy runs in its own container and writes its own log. For a quick start install, run this from the install folder:

```sh
cd ~/timothy
docker compose logs -f brain
```

For a source build, run this from the repository folder:

```sh
docker compose -f deploy/docker-compose.yml logs -f brain
```

Replace `brain` with the service you want to read. [Where to look](/docs/troubleshooting/where-to-look/) lists every service and what it does.

**The Analytics page.** It shows spend, tokens, latency and the error rate for model calls. A high error rate points at a provider problem.

## Pages in this section

- [Nothing works after install](/docs/troubleshooting/nothing-works-after-install/): the setup messages you see before Timothy can answer.
- [Provider verify fails](/docs/troubleshooting/provider-verify-fails/): the connection test for a model provider fails, including a local Ollama.
- [Chat sends nothing over http](/docs/troubleshooting/chat-sends-nothing-over-http/): you open Timothy by a LAN address and the send button does nothing.
- [Mission create is slow](/docs/troubleshooting/mission-create-is-slow/): creating a mission takes up to 30 seconds.
- [Sandbox will not start](/docs/troubleshooting/sandbox-will-not-start/): missions cannot run their sandbox.
- [Connector stopped working](/docs/troubleshooting/connector-stopped-working/): a Google, Microsoft or token-based connector fails after it worked before.
- [Where to look](/docs/troubleshooting/where-to-look/): logs per service, the cost ledger, the mission timeline and how to report a bug.
