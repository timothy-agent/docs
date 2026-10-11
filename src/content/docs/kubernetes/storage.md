---
title: Storage
description: The volumes the Timothy chart creates, why the workspace must be ReadWriteMany, and how to run mission pods in a separate namespace.
sidebar:
  order: 4
assistant: false
---

## The volumes

| Volume | Setting | Mode | Holds | Needed |
|---|---|---|---|---|
| Database | `postgres.storage` | ReadWriteOnce | All data: sessions, memories, settings, encrypted credentials | Yes, unless you use an external database |
| Workspace | `storage.workspace` | ReadWriteMany | Every mission's checkout and work files | Yes |
| Attachments | `storage.attachments` | ReadWriteOnce | Files you upload in chat and missions | Yes |
| Executor state | `storage.executorState` | ReadWriteMany | Sign-in state of command line coding agents a mission can delegate to | Optional, off by default |
| Toolchains | `storage.toolchains` | ReadWriteMany | Language toolchains missions install, shared by all missions | Optional, off by default |
| Caches | `storage.caches` | ReadWriteMany | Package caches, shared by all missions | Optional, off by default |

Each entry takes `className`, `size` and `existingClaim`. An existing claim must already be in the release namespace; the chart then creates nothing for that volume.

## Why the workspace is ReadWriteMany

Brain writes a mission's checkout into the workspace, and the mission's own pod reads and writes the same folder while the mission runs. On Compose both run on one machine and share a Docker volume. On Kubernetes brain and the mission pod can land on different nodes, so the volume has to be mountable from many nodes at once. That is what a ReadWriteMany class provides: Amazon EFS, Azure Files, Google Filestore, or any NFS or CephFS driver.

Each mission pod mounts only its own folder from that volume, `missions/<kind>/<mission id>`, as a sub-path. It never sees the other missions' files. The folder boundary is a mount boundary, not encryption: a cluster administrator with access to the volume sees everything.

On a single-node cluster, for example kind or a one-node test cluster, a ReadWriteOnce class works, because every pod is on the same node:

```yaml
storage:
  workspace:
    accessModes: [ReadWriteOnce]
```

The optional toolchain and cache volumes are shared by every mission on purpose, so an install done once is reused. That sharing has a cost: a mission running a hostile repository can plant a cache entry that a later mission reads. npm and Go check cached packages against the lock file, so a planted entry fails the install; pip, composer, Maven and Gradle check less. Leave the volumes off if that matters more to you than speed.

## Mission pods in a separate namespace

By default mission pods run in the release namespace, next to the other services. Network policies keep them apart. For a harder line, run them in a namespace of their own:

```yaml
sandbox:
  namespace: timothy-sandbox
storage:
  workspace:
    sandboxExistingClaim: timothy-workspace-sandbox
```

The chart then creates that namespace with the `restricted` Pod Security level enforced, a ResourceQuota (`sandbox.quota`), a LimitRange and its own default-deny policy. sandboxd's Role is bound in that namespace only.

The catch is the workspace. A PersistentVolumeClaim belongs to one namespace, and a pod cannot mount a claim from another one. So you create the workspace volume yourself and bind it twice, once in each namespace:

1. Create the file system (an EFS file system, an Azure Files share, a Filestore instance).
2. Create two PersistentVolumes that point at that same file system, with `persistentVolumeReclaimPolicy: Retain`.
3. Create a claim in the release namespace bound to the first volume, and a claim in the sandbox namespace bound to the second.
4. Set `storage.workspace.existingClaim` to the first claim and `storage.workspace.sandboxExistingClaim` to the second.

The optional toolchain, cache and executor state volumes are mounted by mission pods only. When a sandbox namespace is set, the chart creates those claims there, and their `existingClaim` names a claim in that namespace.

## Sizing

- Workspace: a coding mission checks out a repository and installs its dependencies. Plan 1 to 5 GiB per repository you expect missions to work on at the same time. The chart asks for 20 GiB.
- Caches and toolchains: 20 GiB each is enough for a few languages. Node and Rust toolchains are the largest.
- Database: sessions and memories are small. 10 GiB lasts a long time for one person.
- Attachments: as large as the files you upload. 5 GiB by default.
