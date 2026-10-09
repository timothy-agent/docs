---
title: Backup and restore
description: Back up the Timothy database and master key, and restore them on a fresh host.
sidebar:
  order: 5
---

## What a complete backup is

A complete backup has two parts:

1. A dump of the whole database.
2. The `TIMOTHY_MASTER_KEY` value from your `.env` file.

The database holds your provider keys and account credentials only in encrypted form. The master key decrypts them. If you lose the key, or restore with a different one, every stored credential is lost. You then have to enter every provider key and reconnect every account.

Back up the key once, and keep it apart from the dumps. Never create a new master key for an existing install. A new key cannot read the credentials sealed with the old one.

## Back up a source build

The database has no port on your machine, so the backup runs through the container. The repository has a script for it. From the repository folder:

```sh
scripts/backup-db.sh
```

It writes a compressed dump to `backups/timothy-<UTC timestamp>.sql.gz`. To write somewhere else, such as a disk outside the host, give a folder:

```sh
scripts/backup-db.sh /mnt/nas/timothy
```

Two settings change how it works:

| Variable | Default | Meaning |
|---|---|---|
| `BACKUP_DIR` | the `backups` folder in the repository | Where dumps go. A folder you pass on the command line wins. |
| `BACKUP_KEEP` | `14` | How many dumps to keep. Older ones are deleted. |

The script asks no questions, prints no secrets and fails loudly on any error. You can run it from cron, for example every night at 03:15:

```sh
15 3 * * * /path/to/timothy/scripts/backup-db.sh >> /var/log/timothy-backup.log 2>&1
```

Each run dumps the whole database. Never limit a dump to some tables. A dump without the secrets table restores an install with every credential missing. The script refuses to write a dump that has no secrets table.

## Back up a quick start install

The quick start install does not include the backup script. Run the same dump command the script uses, from the install folder:

```sh
cd ~/timothy
docker compose exec -T postgres \
  sh -c 'PGPASSWORD="$POSTGRES_PASSWORD" pg_dump -U timothy -d timothy --no-owner --no-privileges' \
  | gzip -c > timothy-$(date -u +%Y%m%dT%H%M%SZ).sql.gz
```

Check that the dump contains the secrets table. The count must be 1 or more:

```sh
gzip -dc timothy-<timestamp>.sql.gz | grep -c 'CREATE TABLE public.secrets'
```

## Restore onto a fresh host

These steps use a source build. For a quick start install, run the `docker compose` commands from the install folder and leave out `-f deploy/docker-compose.yml`.

1. Put the repository and `deploy/.env` in place. The `.env` file must have the same `TIMOTHY_MASTER_KEY` as the install the dump came from. `POSTGRES_PASSWORD` can be new.

2. Start only the database, so nothing writes to it during the restore:

   ```sh
   docker compose -f deploy/docker-compose.yml up -d postgres
   ```

3. Load the dump. `ON_ERROR_STOP=1` makes a partial restore fail instead of leaving a half-filled database:

   ```sh
   gunzip -c backups/timothy-<timestamp>.sql.gz \
     | docker compose -f deploy/docker-compose.yml exec -T postgres \
         sh -c 'PGPASSWORD="$POSTGRES_PASSWORD" psql -U timothy -d timothy -v ON_ERROR_STOP=1'
   ```

   The dump creates the schema itself, so restore into an empty database. If this database already ran Timothy once, drop it and create it again first:

   ```sh
   docker compose -f deploy/docker-compose.yml exec -T postgres \
     sh -c 'PGPASSWORD="$POSTGRES_PASSWORD" psql -U timothy -d postgres -c "DROP DATABASE timothy" -c "CREATE DATABASE timothy"'
   ```

4. Check that the data is there, including the secrets table:

   ```sh
   docker compose -f deploy/docker-compose.yml exec -T postgres \
     sh -c 'PGPASSWORD="$POSTGRES_PASSWORD" psql -U timothy -d timothy -c "select count(*) from secrets" -c "select count(*) from session_events"'
   ```

5. Start the rest of the stack:

   ```sh
   make up
   ```

   On a quick start install, run `docker compose up -d` instead.

6. Check that the credentials decrypt. This proves the master key matches. In the web interface, open "Settings", then "Providers", and press "Test" on a provider.

A passing test means the key is right. If the test fails with a decrypt error, or the gateway or brain logs show one, the master key in `.env` is not the one that sealed these rows. Put the correct key back. Do not enter the credentials again, or every older secret stays unreadable.
