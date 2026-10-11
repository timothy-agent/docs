---
title: Google GKE
description: Values and cluster add-ons for running Timothy on Google Kubernetes Engine.
sidebar:
  order: 3
assistant: false
---

This page lists what a GKE cluster needs before the [install steps](/docs/kubernetes/#install) and gives a values file to start from.

## Cluster add-ons

- **Filestore CSI driver** for the shared mission workspace. Enable it on the cluster (`--addons GcpFilestoreCsiDriver`). The `standard-rwx` class provisions a Basic HDD instance, `premium-rwx` a Basic SSD one. Filestore instances start at 1 TiB; one instance can back every ReadWriteMany volume the chart asks for if you use the `enterprise-multishare-rwx` class or create the volumes by hand. The default `standard-rwo` class covers the database and the attachments volume.
- **NetworkPolicy enforcement.** Create the cluster with Dataplane V2 (`--enable-dataplane-v2`), which enforces policies, or enable the network policy add-on on a Dataplane V1 cluster. Autopilot clusters enforce policies by default.
- **An ingress controller.** The built-in GKE Ingress works with the class name `gce` and a Google-managed certificate; ingress-nginx works too.
- **Workload Identity Federation for GKE**, only if you want to reach Amazon Bedrock without a stored key. See [Identity and Bedrock](/docs/kubernetes/identity-and-bedrock/).

## Values

```yaml
storage:
  workspace:
    className: premium-rwx
    size: 1Ti
ingress:
  enabled: true
  className: gce
  annotations:
    networking.gke.io/managed-certificates: timothy-cert
    kubernetes.io/ingress.global-static-ip-name: timothy-ip
  host: timothy.example.com
brain:
  publicURL: https://timothy.example.com
sandbox:
  runtimeClassName: gvisor
```

What the settings do:

- `storage.workspace.size: 1Ti` matches the smallest Basic Filestore instance. A smaller request fails to provision on those classes.
- `sandbox.runtimeClassName: gvisor` runs mission pods under GKE Sandbox. Create a node pool with `--sandbox type=gvisor` first. Mission pods then run in a user-space kernel, which is the strongest isolation the chart can ask for. Leave the setting out on clusters without such a node pool.

## Database

To use Cloud SQL for PostgreSQL instead of the in-cluster database, enable the `vector` extension, set `postgres.enabled: false`, and put the connection string in the Secret under `DATABASE_URL` before you install. The simplest connection is a private IP in the cluster's VPC:

```text
postgres://timothy:<password>@<private ip>:5432/timothy?sslmode=require
```

The Cloud SQL Auth Proxy as a sidecar is not wired into the chart.

## Mission pod isolation

GKE Sandbox (gVisor) above is the recommended boundary. Without it, put missions on their own node pool with `sandbox.nodeSelector` and `sandbox.tolerations` (see the [EKS page](/docs/kubernetes/eks/#mission-pod-isolation) for the values).

The instance metadata address `169.254.169.254` is blocked for mission pods by the chart's network policy. GKE Workload Identity also blocks pods from reaching the node's metadata by default.
