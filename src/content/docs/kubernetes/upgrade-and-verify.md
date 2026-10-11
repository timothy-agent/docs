---
title: Upgrade and verify
description: Move a Timothy install on Kubernetes to a newer release, check that it runs, and roll back.
sidebar:
  order: 6
assistant: false
---

Timothy is in alpha. Expect breaking changes between releases. Take a backup before every upgrade.

## Back up the database

The database holds everything, including the encrypted credentials. Dump it from the database pod:

```sh
kubectl -n timothy exec timothy-postgres-0 -- \
  sh -c 'PGPASSWORD="$POSTGRES_PASSWORD" pg_dump -U timothy -d timothy -Fc' > timothy.dump
```

Also keep a copy of the Secret, because the master key in it decrypts the dump's credentials:

```sh
kubectl -n timothy get secret timothy-secrets -o yaml > timothy-secrets.yaml
```

Store both somewhere safe. The Secret file contains every key in clear text, base64 is not encryption.

For an external database, use your provider's backup instead.

## Before you upgrade: schema changes

While Timothy is in alpha, a release can change the database schema in a way the automatic migrations do not apply to an existing database. Such changes are listed in the [pending schema changes](https://github.com/timothy-agent/timothy/blob/main/scripts/pending-alters.md) file in the Timothy repository.

Open that file before you upgrade. If it says "None pending", go on. If it lists SQL, save it to a file such as `alter.sql` and run it against the database before the new version starts:

```sh
kubectl -n timothy exec -i timothy-postgres-0 -- \
  sh -c 'PGPASSWORD="$POSTGRES_PASSWORD" psql -U timothy -d timothy -v ON_ERROR_STOP=1' < alter.sql
```

The password stays inside the pod. It never appears in your terminal.

## Upgrade

Check out the new release of the repository, so the chart and the image tag move together, and upgrade with the same values file:

```sh
git fetch --tags
git checkout v0.1.0-alpha.109
helm upgrade timothy deploy/helm/timothy --namespace timothy -f my-values.yaml --wait
```

Helm keeps the generated Secret and the volumes. Brain and memoryd restart with a short pause, because each runs one replica and the chart stops the old pod before it starts the new one. Missions that were running are paused and resume on their own after the restart.

To pin an image tag that differs from the chart's own, set `image.tag`. Do not do this across releases that change the schema.

## Verify

1. Every pod is `Running` and `1/1`:

   ```sh
   kubectl -n timothy get pods -l app.kubernetes.io/instance=timothy
   ```

2. Every service answers its health check. Brain's answer lists every check it runs:

   ```sh
   kubectl -n timothy exec deploy/timothy-brain -- wget -qO- http://localhost:8080/health
   ```

   `"status":"ok"` is the goal. `selfdocs` reports degraded until an embedding route exists; that is not an upgrade problem.

3. The API answers with the token:

   ```sh
   kubectl -n timothy exec deploy/timothy-brain -- \
     sh -c 'wget -qO- --header "Authorization: Bearer $TIMOTHY_API_TOKEN" http://localhost:8080/v1/missions?limit=1'
   ```

4. Run one small mission from the web interface, for example a light mission that writes a short file. While it runs, the mission's pod appears next to the services:

   ```sh
   kubectl -n timothy get pods -l timothy.owner=timothy
   ```

   The pod is removed when the mission ends. A pod that stays after the mission is finished is removed by brain's sweep within a minute.

5. Open the mission and check that its events run through the phases to `result`.

## Roll back

Helm can roll the release back to the previous revision:

```sh
helm -n timothy history timothy
helm -n timothy rollback timothy <revision> --wait
```

Do this only when the new release made no schema change. Once a newer version has written to the database, going back is not supported; restore the database dump from before the upgrade together with the older release instead.

## Change a value

Any change to the values file goes through the same `helm upgrade` command. Helm restarts only the pods whose settings changed.

To rotate the API token, change the key in the Secret and restart brain and web:

```sh
kubectl -n timothy rollout restart deploy/timothy-brain deploy/timothy-web
```

Never change the master key. Every stored credential is encrypted with it.
