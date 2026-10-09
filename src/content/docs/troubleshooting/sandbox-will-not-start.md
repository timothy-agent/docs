---
title: Sandbox will not start
description: Fixes for missions that cannot start their sandbox, from Docker socket access to a missing image, a full disk and the shared cache volumes.
sidebar:
  order: 5
---

Every mission runs in its own container, called its sandbox. A service called `sandboxd` starts these containers. It needs three things: access to Docker on the host, the sandbox image, and free disk space.

The commands on this page are for a quick start install and run from the install folder, which is `~/timothy` by default. For a source build, run them from the repository folder and add `-f deploy/docker-compose.yml` after `docker compose`.

## "Missions need the sandbox service"

**What you see:** The new mission page shows "Missions need the sandbox service" and "The sandbox service is not reachable, so missions cannot run. Check the stack logs and restart it."

**Why:** `sandboxd` is not running, or it reports a problem. It reports a problem when it cannot talk to Docker or when the sandbox image is missing.

**Fix:** Check that the service is up:

```sh
docker compose ps sandboxd
```

Read its log:

```sh
docker compose logs --tail 100 sandboxd
```

The log names the problem. Then use the matching section below. When it is fixed, start the service again:

```sh
docker compose up -d sandboxd
```

## Docker socket access on Linux

**What you see:** `sandboxd` keeps restarting. Its log says it was denied access to the Docker socket.

**Why:** `sandboxd` talks to Docker through the Docker socket of the host. On Linux, the socket belongs to a group, and `sandboxd` must run with that group's ID. On Docker Desktop, the default value works.

**Fix:** Find the group ID of the socket on the host:

```sh
stat -c '%g' /var/run/docker.sock
```

Set `DOCKER_SOCK_GID` to that number in the `.env` file of your install. For a source build, the file is `deploy/.env`. Then start the stack again:

```sh
docker compose up -d
```

The installer sets this value for you on a new Linux install. Check it if you moved the install or changed how Docker runs.

## The sandbox image is missing

**What you see:** The new mission page shows "Missions need the sandbox service". A mission that was running stops with "Paused: infrastructure error".

**Why:** `sandboxd` cannot find the image that every mission runs in. The installer pulls it, but it can be missing after a cleanup of Docker images, or when a pull failed.

**Fix for a quick start install:** Pull the image yourself. This shows its name:

```sh
docker compose config | grep MISSION_SANDBOX_IMAGE
```

Pull the image that the line names:

```sh
docker pull <image>
```

Running the installer again also pulls the sandbox image. It keeps your data and secrets, but it also upgrades you to the newest release.

**Fix for a source build:** Build the image:

```sh
make sandbox-image
```

Then open each paused mission and click "Resume".

## The disk is full

**What you see:** Everything gets slow, and it looks like the model is slow. The Postgres log shows "No space left on device":

```sh
docker compose logs --tail 100 postgres
```

**Why:** Docker has no free disk space left. On Docker Desktop, this is the disk of Docker's own virtual machine, not the free space you see on your computer.

**Fix:** See what uses the space:

```sh
docker system df
```

Remove old images that no longer have a tag:

```sh
docker image prune
```

Do not delete Docker volumes to free space. They hold your database, mission work and uploaded files.

## The shared toolchain and package caches

Missions share two Docker volumes. One holds the language toolchains that missions install. The other holds package caches. Missions install a toolchain or a package once, and the next mission reuses it.

**What you see:** Package or toolchain installs keep failing in every mission, even in missions for different repositories.

**Why:** Because the caches are shared, one bad entry can reach every mission.

**Fix:** Reset the cache volume. Do this when no mission is running. Stop `sandboxd`, remove the volume, then start `sandboxd` again:

```sh
docker compose stop sandboxd
docker volume rm timothy_sandbox-caches
docker compose up -d sandboxd
```

To reset the toolchains instead, remove `timothy_sandbox-toolchains`. Compose creates an empty volume again when the service starts. The next missions then download what they need again, so they take longer the first time.
