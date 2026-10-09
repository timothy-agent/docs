---
title: Nothing works after install
description: The setup messages Timothy shows before it can chat, run missions or search your documents, and how to clear each one.
sidebar:
  order: 1
---

A fresh install has no model provider. Until you add one, Timothy cannot answer. The app shows a short message on each page that is not ready yet. This page lists those messages.

The welcome wizard sets up your first provider for you. If you skipped it, open the "Help" menu and choose "Restart welcome".

## "Timothy's API token is missing or invalid."

**What you see:** This message appears when Timothy loads data or tests a provider. Or a dialog called "Settings" opens and asks for an "API token".

**Why:** The browser has no API token for your Timothy, or it has the wrong one. This token is Timothy's own token. It is not the key of a model provider.

**Fix:** Open the sign-in link that the installer printed at the end. It signs the browser in for you.

If you no longer have the link, click "API token" in the sidebar. Paste the value of `TIMOTHY_API_TOKEN` from the `.env` file of your install and click "Save". For a quick start install, that file is in the install folder, which is `~/timothy` by default. For a source build, it is `deploy/.env` in the repository.

## "Timothy has no model for chat yet"

**What you see:** A banner on Home and Chat, or a panel on the new mission page, that says "Timothy has no model for chat yet" and "Add a provider so Timothy can answer."

**Why:** No model can answer chat. Either you have not added a provider yet, or the provider you added does not work.

**Fix:** Click "Add a provider" and add one. You can also run the welcome wizard again from the "Help" menu with "Restart welcome". Your first provider sets up chat for you.

If you already added a provider:

1. Open Settings, then Providers. Open your provider and click "Test connection". If the test fails, see [Provider verify fails](/docs/troubleshooting/provider-verify-fails/).
2. Open Settings, then Routing. Under "System roles", check that "Chat (default)" has a route.

## "Timothy can't reach its model gateway"

**What you see:** "Timothy can't reach its model gateway" with the text "The gateway service is not answering. Check that every service in the stack is running."

**Why:** Every model call goes through a service called the gateway. It is not running, or it is not healthy yet.

**Fix:** Check the state of every service. For a quick start install, run this from the install folder:

```sh
cd ~/timothy
docker compose ps
```

For a source build, run this from the repository folder:

```sh
docker compose -f deploy/docker-compose.yml ps
```

Every service should be up. Services with a health check should also show `healthy`. If the gateway is missing or restarting, read its log:

```sh
docker compose logs --tail 100 gateway
```

Then start the stack again:

```sh
docker compose up -d
```

For a source build, add `-f deploy/docker-compose.yml` after `docker compose` in both commands.

## "Knowledge needs an embedding model"

**What you see:** On the Knowledge page, the upload form shows "Knowledge needs an embedding model" and "Add a provider with an embedding model so documents can be searched."

**Why:** Timothy turns each document into embeddings so it can search it. None of your providers gives it an embedding model.

**Fix:** Click "Add a provider" and add a provider that offers an embedding model. Then open Settings, then Routing. Under "System roles", check that "Embeddings" has a route.

## "Missions need the sandbox service"

**What you see:** On the new mission page, a banner says "Missions need the sandbox service" and "The sandbox service is not reachable, so missions cannot run. Check the stack logs and restart it."

**Why:** Each mission runs in its own container. The service that starts those containers is down, cannot reach Docker, or cannot find the sandbox image.

**Fix:** See [Sandbox will not start](/docs/troubleshooting/sandbox-will-not-start/).

## "Automations are switched off"

**What you see:** The Automations page shows "Automations are switched off" and "Turn them on in Settings to run work on a schedule or trigger."

**Why:** The automations feature switch is off.

**Fix:** Click "Open Features". Turn on "Automations". The change takes effect at once. You do not need to restart anything.
