---
title: Quick start
description: Install Timothy from the released images with one installer script.
sidebar:
  order: 2
assistant: false
---

The quick start uses the released images. You do not build anything. You need Docker and the tools listed in the [requirements](/docs/install/requirements/).

## Run the installer

Run this command on the machine that will host Timothy:

```sh
curl -fsSL https://raw.githubusercontent.com/timothy-agent/timothy/main/deploy/release/install.sh | sh
```

Do you prefer to read a script before you run it? Every release ships the same installer as a file. Download `install.sh` from the [releases page](https://github.com/timothy-agent/timothy/releases), read it, then run it:

```sh
sh install.sh
```

## What the installer does

The installer works in this order:

1. It finds the newest release.
2. It checks that Docker, Compose 2.23.1 or newer and the other tools are present.
3. It creates the folder `~/timothy` and works there. To use another folder, set `TIMOTHY_HOME` before you run it.
4. It downloads the compose file and an example settings file, and checks them against the release checksums.
5. It creates a `.env` file with fresh secrets. Only your user can read it.
6. It pulls the images, including the mission sandbox image.
7. It starts the core stack and waits for the web interface.
8. It prints the address to open.

To install into another folder, set `TIMOTHY_HOME` for the script:

```sh
curl -fsSL https://raw.githubusercontent.com/timothy-agent/timothy/main/deploy/release/install.sh | TIMOTHY_HOME=/path/to/timothy sh
```

## The settings file

The installer fills in the required values in `~/timothy/.env` for you. You do not need to set them by hand:

- `POSTGRES_PASSWORD`: the database password.
- `TIMOTHY_MASTER_KEY`: the key that encrypts every provider key and account credential you add later. Back it up. If you lose it, the stored credentials cannot be recovered.
- `TIMOTHY_API_TOKEN`: a token for scripts and tools that call the API. The web interface uses an account instead.
- `TIMOTHY_VERSION`: the release that runs. The installer sets it.

The installer does not print the database password or the master key. Do not share the `.env` file or paste its values anywhere.

A few optional values are worth knowing:

- `WEB_PORT` and `BRAIN_PORT` change the ports, 3300 and 8300 by default.
- `TIMOTHY_PUBLIC_URL` is the address your browser uses to reach Timothy. Change it if you open Timothy from another machine and want to connect Google accounts later.
- `COMPOSE_PROFILES` turns on the optional helper services. See below.

## Optional services

The installer starts a light core: the database, the gateway, memory, the sandbox service, the brain and the web interface. It needs roughly 300 to 500 MiB of memory. The heavier helper services are off until you turn on a profile in `.env`. Set `COMPOSE_PROFILES` and the matching address:

| Profile | What it turns on | Also set |
|---|---|---|
| `search` | Web search (searxng) | `SEARXNG_URL=http://searxng:8080` |
| `docs` | File conversion (markitdown), PDF export (pdfgen) and image text (ocr) | `MARKITDOWN_URL=http://markitdown:8000`, `PDFGEN_URL=http://pdfgen:8000`, `OCR_URL=http://ocr:8000` |
| `whisper` | Local speech to text | `WHISPER_URL=http://whisper:8001` |
| `full` | All of the above | All of the addresses above |

Join profiles with commas, for example `COMPOSE_PROFILES=search,docs`. The `docs` profile can use about 6 GiB of memory, and `full` about 6 to 10 GiB.

After you change `.env`, restart the stack from the install folder:

```sh
cd ~/timothy
docker compose up -d
```

## Sign in

At the end, the installer prints the address to open:

```text
 Open in browser:  http://localhost:3300/
 (First run will prompt you to create your operator account at /setup)
```

Open it. Timothy asks you to create the administrator account. See [Sign in](/docs/first-run/sign-in/).

If Timothy runs on another machine, replace `localhost` with that machine's address.

## Check that it runs

From the install folder, list the services:

```sh
cd ~/timothy
docker compose ps
```

Follow the logs:

```sh
docker compose logs -f
```

The web interface is at port 3300. The API is at port 8300.

## Next: First run

Timothy cannot answer anything yet. It needs a model provider. The [first run](/docs/first-run/) pages walk you through the welcome wizard, your first chat and your first mission.
