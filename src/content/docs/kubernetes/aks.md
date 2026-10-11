---
title: Azure AKS
description: Values and cluster add-ons for running Timothy on Azure Kubernetes Service.
sidebar:
  order: 2
assistant: false
---

This page lists what an AKS cluster needs before the [install steps](/docs/kubernetes/#install) and gives a values file to start from.

## Cluster add-ons

- **Azure Files** for the shared mission workspace. AKS ships the `azurefile-csi` and `azurefile-csi-premium` storage classes, both ReadWriteMany. Premium (SSD) is noticeably faster for git checkouts and package installs. The `managed-csi` class covers the database and the attachments volume.
- **NetworkPolicy enforcement.** Create the cluster with `--network-policy azure`, `--network-policy calico` or `--network-policy cilium`. A cluster created without a policy engine ignores the chart's policies.
- **An ingress controller.** The application routing add-on (`--enable-app-routing`) gives you an ingress-nginx with the class name `webapprouting.kubernetes.azure.com`.
- **Workload Identity**, only if you want to reach Amazon Bedrock without a stored key. See [Identity and Bedrock](/docs/kubernetes/identity-and-bedrock/).

## Values

```yaml
storage:
  workspace:
    className: azurefile-csi-premium
  toolchains:
    enabled: true
    className: azurefile-csi-premium
  caches:
    enabled: true
    className: azurefile-csi-premium
ingress:
  enabled: true
  className: webapprouting.kubernetes.azure.com
  host: timothy.example.com
  tls:
    - secretName: timothy-tls
      hosts: [timothy.example.com]
brain:
  publicURL: https://timothy.example.com
```

Azure Files mounts with a fixed owner. The chart's pods and mission pods run as user 65534, and the default mount options of the AKS storage classes (`uid=0,gid=0,mfsymlinks,file_mode=0777,dir_mode=0777`) let that user write. If you create your own storage class, keep `file_mode=0777` and `dir_mode=0777`, or set `uid=65534,gid=65534`.

## Database

To use Azure Database for PostgreSQL Flexible Server instead of the in-cluster database, allow the `vector` extension on the server, set `postgres.enabled: false`, and put the connection string in the Secret under `DATABASE_URL` before you install:

```text
postgres://timothy:<password>@<server>.postgres.database.azure.com:5432/timothy?sslmode=require
```

## Mission pod isolation

AKS runs mission pods under the node's container runtime. For a stronger boundary, put missions on their own node pool with `sandbox.nodeSelector` and `sandbox.tolerations` (see the [EKS page](/docs/kubernetes/eks/#mission-pod-isolation) for the values). AKS also offers Pod Sandboxing with Kata Containers on supported node pools; set `sandbox.runtimeClassName: kata-mshv-vm-isolation` to run mission pods there.

The instance metadata address `169.254.169.254` is blocked for mission pods by the chart's network policy.
