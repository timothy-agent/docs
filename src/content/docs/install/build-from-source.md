---
title: Build from source
description: Build every Timothy image from the repository and run the stack with make.
sidebar:
  order: 3
---

Build from source if you want to change Timothy's code. Everything builds inside Docker, so you do not install Go or Node on your machine. You need Docker, `git` and `make`.

## 1. Get the code

```sh
git clone https://github.com/timothy-agent/timothy.git
cd timothy
```

## 2. Create the settings file

Copy the example file:

```sh
cp deploy/env.example deploy/.env
```

Create the two secrets in your terminal. Each command prints a fresh random value:

```sh
openssl rand -base64 32
openssl rand -hex 32
```

Open `deploy/.env` in an editor and set these three values:

- `POSTGRES_PASSWORD`: the database password. Compose refuses to start without it.
- `TIMOTHY_MASTER_KEY`: use the output of `openssl rand -base64 32`. It encrypts every provider key and account credential you add later. Compose refuses to start without it. Back it up. If you lose it, the stored credentials cannot be recovered.
- `TIMOTHY_API_TOKEN`: use the output of `openssl rand -hex 32`. The web interface signs in with it. If it is blank, every request fails.

Keep `deploy/.env` private. Never commit it.

## 3. Build the mission sandbox image

Missions run in sandbox containers. The sandboxd service does not start without the sandbox image. `make up` builds it for you, but you can build it first:

```sh
make sandbox-image
```

This builds the base image and one image each for Go, Node, Python, Java and PHP.

## 4. Linux only: set the Docker socket group

On Linux, sandboxd needs the group ID of the Docker socket. Print it:

```sh
stat -c '%g' /var/run/docker.sock
```

Put that number in `deploy/.env` as `DOCKER_SOCK_GID`. On Docker Desktop, keep the default of `0`.

## 5. Start the stack

```sh
make up
```

The first run builds every image, so it takes a while. When it is done, the web interface is at `http://localhost:3300` and the API is at `http://localhost:8300`.

## 6. Sign in

There is no login page. The first time the web interface has no token, it opens a dialog called "Settings" with an "API token" field. Enter the `TIMOTHY_API_TOKEN` value from `deploy/.env` and press "Save". The browser keeps the token.

You can also sign in with a token link, the same way the quick start does. See [Sign in](/docs/first-run/sign-in/).

## Operate the stack

```sh
make up      # start, builds images as needed
make down    # stop
make logs    # follow the logs of all services
```

To rebuild and restart one service after a code change, name it:

```sh
make brain
```

The same works for `gateway`, `memoryd`, `web`, `markitdown`, `whisper`, `pdfgen` and `sandboxd`.

## Next: First run

Timothy needs a model provider before it can answer. Continue with [First run](/docs/first-run/).
