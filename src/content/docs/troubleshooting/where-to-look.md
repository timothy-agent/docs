---
title: Where to look
description: Service logs, the Analytics page, the mission timeline and how to report a bug.
sidebar:
  order: 7
---

When something goes wrong and no other page matches, these places tell you more.

## Is every service up?

For a quick start install, run this from the install folder, which is `~/timothy` by default:

```sh
cd ~/timothy
docker compose ps
```

For a source build, run this from the repository folder:

```sh
docker compose -f deploy/docker-compose.yml ps
```

Every service should be up. Services with a health check should also show `healthy`.

The API answers a health check without a token:

```sh
curl http://localhost:8300/health
```

## Service logs

Each service writes its own log. Read one service like this, from the install folder:

```sh
docker compose logs -f gateway
```

Follow all services at once:

```sh
docker compose logs -f
```

For a source build, add `-f deploy/docker-compose.yml` after `docker compose`, or run `make logs` from the repository folder to follow all services.

To see only recent lines, add `--since`:

```sh
docker compose logs --since 1h brain
```

Pick the service by what it does:

| Service | What it does | Read its log when |
|---|---|---|
| `brain` | The public API. It runs chats, agents and missions. | A chat or mission fails, or the web page cannot load data. |
| `gateway` | Sends each model request to the right provider and records its cost. | A model call or a provider test fails. |
| `memoryd` | Stores and searches what Timothy remembers. | Memory search fails. |
| `sandboxd` | Holds the Docker socket and starts one sandbox container per mission. | Missions cannot start. |
| `web` | The web interface. | The page does not load at all. |
| `searxng` | Web search for Timothy's search tool. | Web search returns nothing. |
| `markitdown` | Turns files such as PDFs into text. | A file upload fails to convert. |
| `ocr` | Reads text from images. | Text in images is not found. |
| `pdfgen` | Turns markdown into PDF, for a chat answer, a mission export or any document Timothy writes. | A PDF export fails. |
| `whisper` | Local speech to text for the microphone button. It is off unless you turn it on. | Voice input fails. |
| `postgres` | The database. | Every service fails, or the disk may be full. |

Each container keeps about 30 MB of log. When a container is replaced, for example by an upgrade, its earlier log is gone.

For more detail in the logs of the Timothy services, set `LOG_LEVEL=debug` in the `.env` file of your install. For a source build, that file is `deploy/.env`. Then start the stack again with `docker compose up -d`, or `make up` for a source build. Set it back to `info` when you are done.

## The Analytics page

The Analytics page shows spend, tokens and latency from the cost ledger. Timothy records every model call in this ledger.

- "Spend by provider" and "Spend by model" show where the money goes.
- "Requests & error rate" shows how many calls failed. A jump in the error rate points at a provider problem.
- "Latency per provider" shows which provider is slow.
- "Daily budget" and "Monthly budget" show how much of each budget is spent.

Pick the time range at the top: "Today", "7 days", "30 days" or "90 days". A cost marked "Estimated from catalog prices for calls with no configured price." is an estimate, not a price you set.

## The mission timeline

Open a mission. The "Timeline" section lists every step the mission took, in order. A paused mission shows the reason in a banner that starts with "Paused:". The timeline shows what happened just before.

## Report a bug

If you cannot fix the problem, open an issue at [github.com/timothy-agent/timothy/issues](https://github.com/timothy-agent/timothy/issues).

Include:

- The Timothy version. This command shows the image tags, which carry the version:

  ```sh
  docker compose images
  ```

- What you did, step by step.
- What you saw. Copy the exact message from the app.
- The log lines from the service that failed, from just before the problem.

Never include your API token, a provider key, a connector token, the sign-in link from the installer or anything from your `.env` file. Read log lines before you post them and remove anything that looks like a key.
