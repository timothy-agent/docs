---
title: Upgrade
description: Move a running Timothy install to a newer release.
sidebar:
  order: 4
---

Timothy is in alpha. Expect breaking changes between releases. Take a [backup](/docs/install/backup-and-restore/) before every upgrade.

## Before you upgrade: schema changes

While Timothy is in alpha, a release can change the database schema in a way that the automatic migrations do not apply to an existing database. Such changes are listed in the [pending schema changes](https://github.com/timothy-agent/timothy/blob/main/scripts/pending-alters.md) file in the Timothy repository.

Open that file before you upgrade. If it says "None pending", go on. If it lists SQL, save it to a file such as `alter.sql` and run it against your database before the new version starts.

For a quick start install, run it from the install folder:

```sh
cd ~/timothy
docker compose exec -T postgres \
  sh -c 'PGPASSWORD="$POSTGRES_PASSWORD" psql -U timothy -d timothy -v ON_ERROR_STOP=1' < alter.sql
```

For a source build, run it from the repository folder:

```sh
docker compose -f deploy/docker-compose.yml exec -T postgres \
  sh -c 'PGPASSWORD="$POSTGRES_PASSWORD" psql -U timothy -d timothy -v ON_ERROR_STOP=1' < alter.sql
```

The password stays inside the container. It never appears in your terminal.

## Upgrade a quick start install

Run the installer again:

```sh
curl -fsSL https://raw.githubusercontent.com/timothy-agent/timothy/main/deploy/release/install.sh | sh
```

If you downloaded `install.sh` from the releases page, download the new one, read it, and run it in your install folder:

```sh
cd ~/timothy
sh install.sh
```

The installer finds your install in `~/timothy`, in `TIMOTHY_HOME`, or in the folder you run it from. Then it:

1. Keeps all your secrets in `.env`.
2. Sets `TIMOTHY_VERSION` to the newest release.
3. Replaces the compose file with the new one.
4. Pulls the new images, including the mission sandbox image.
5. Restarts the stack.

Your data lives in Docker volumes and your secrets in `.env`. The installer does not touch either. Database migrations run when the new version starts.

If you changed the compose file by hand, make the change again after the upgrade.

## Upgrade a source build

From the repository folder:

```sh
git pull
make up
```

Migrations run when each service starts. There is no separate migrate step.

## Downgrading

Downgrading is not supported once a newer version has run its migrations. To go back, restore a backup taken before the upgrade.
