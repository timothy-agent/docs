---
title: Requirements
description: What your machine needs before you install Timothy.
sidebar:
  order: 1
---

## Docker

Timothy needs Docker with the Compose v2 plugin. Docker Desktop on macOS or Windows works. So does Docker Engine on a 64-bit Linux host.

The quick start installer needs Compose 2.23.1 or newer. Check your version:

```sh
docker compose version
```

The released images are built for 64-bit Intel and AMD machines (amd64) and for 64-bit ARM machines (arm64).

## Other tools

The quick start installer also checks for these tools:

- `openssl`, to create the secrets.
- `curl` or `wget`, to download the release files.
- `sha256sum` or `shasum`, to check the downloads.

A build from source also needs `git` and `make`.

## Ports

Timothy opens two ports on your machine:

| Port | What |
|---|---|
| 3300 | Web interface |
| 8300 | API |

Both ports serve plain HTTP. Use them on a network you trust. If you open Timothy to the internet, put a reverse proxy with TLS in front of it. The API token travels with every request, and plain HTTP lets anyone on the path read it.

## Memory, CPU and disk

Timothy has no published minimum. These limits come from the compose file and help you plan:

- The searxng search service is capped at 512 MB of memory.
- The markitdown, pdfgen and ocr services are each capped at 2 GB of memory and 2 CPUs.
- Each running mission gets its own container, capped at 2 GB of memory and 2 CPUs.
- The optional whisper service is capped at 6 GB of memory. Its model holds about 3 GB even when idle.

These are upper limits, not what the services use all the time. Plan more memory if you run several missions at once.

Disk use grows with the images, the database, uploaded files and mission workspaces. A full Docker disk makes Timothy look slow, so keep an eye on it:

```sh
docker system df
```

## The Docker socket

Missions run in their own containers. To start them, the sandboxd service mounts the Docker socket. This gives that service root-level access to the host. It runs on its own network, read-only and with all capabilities dropped. Even so, only run Timothy on a machine you control.

## Local models with Ollama (optional)

You do not need a local model. You can use a hosted provider such as OpenAI or Anthropic instead.

If you want local models, install [Ollama](https://ollama.com) on the host itself, not in a container. A container would get the CPU only, so large models would be slow. Containers reach Ollama on the host at this address:

```text
http://host.docker.internal:11434/v1
```

Pull at least one model in Ollama before you add it to Timothy.

On Docker Desktop this address works as it is. On a Linux server, Docker does not know this name by default. Add an `extra_hosts` line to the gateway service in the compose file:

```yaml
  gateway:
    extra_hosts: ["host.docker.internal:host-gateway"]
```

Then restart the stack. The quick start installer replaces the compose file on every upgrade, so add the line again after you upgrade.
