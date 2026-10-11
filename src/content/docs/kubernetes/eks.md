---
title: Amazon EKS
description: Values and cluster add-ons for running Timothy on Amazon EKS.
sidebar:
  order: 1
assistant: false
---

This page lists what an EKS cluster needs before the [install steps](/docs/kubernetes/#install) and gives a values file to start from.

## Cluster add-ons

- **Amazon EFS CSI driver** for the shared mission workspace. EFS gives you a ReadWriteMany storage class. Create a file system in the cluster's VPC, allow NFS (port 2049) from the node security group, and create a storage class, for example `efs-sc`, with dynamic provisioning. The EBS CSI driver covers the database and the attachments volume; the default `gp2` or `gp3` class is enough.
- **NetworkPolicy enforcement.** The Amazon VPC CNI enforces policies when `enableNetworkPolicy` is set to `true` on the add-on. Clusters running Calico or Cilium enforce them already.
- **An ingress controller**, for example the AWS Load Balancer Controller or ingress-nginx, and a TLS certificate.
- **Pod Identity or IAM roles for service accounts (IRSA)**, only if you want Bedrock without a stored key. See [Identity and Bedrock](/docs/kubernetes/identity-and-bedrock/).

## Values

```yaml
storage:
  workspace:
    className: efs-sc
  toolchains:
    enabled: true
    className: efs-sc
  caches:
    enabled: true
    className: efs-sc
ingress:
  enabled: true
  className: alb
  annotations:
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:eu-west-1:123456789012:certificate/...
  host: timothy.example.com
brain:
  publicURL: https://timothy.example.com
gateway:
  serviceAccount:
    annotations:
      eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/timothy-gateway
networkPolicy:
  apiServerCIDRs:
    - 10.100.0.1/32
```

What the settings do:

- `storage.toolchains` and `storage.caches` are optional. They hold the language toolchains and the package caches that missions install, shared by every mission, so a second mission for the same repository starts faster. Without them, each mission installs into its own workspace folder.
- `gateway.serviceAccount.annotations` is only for Bedrock through IRSA. Leave it out otherwise.
- `networkPolicy.apiServerCIDRs` narrows which addresses sandboxd may call on port 443. Set it to the cluster IP of the `kubernetes` Service in the `default` namespace (`kubectl get svc kubernetes`). Leave it empty to allow port 443 anywhere, which also works.

## Database

The chart runs PostgreSQL in the cluster on an EBS volume. To use Amazon RDS for PostgreSQL instead, the instance needs the `vector` extension (RDS supports pgvector on PostgreSQL 15 and newer). Set `postgres.enabled: false` and put the connection string in the Secret under `DATABASE_URL` before you install:

```text
postgres://timothy:<password>@<rds endpoint>:5432/timothy?sslmode=require
```

## Mission pod isolation

EKS runs mission pods under the node's container runtime. gVisor is not an EKS add-on. For a stronger boundary, run missions on their own node group with `sandbox.nodeSelector` and `sandbox.tolerations`, so model-authored code never shares a node with the other services:

```yaml
sandbox:
  nodeSelector:
    workload: sandbox
  tolerations:
    - key: sandbox
      operator: Exists
      effect: NoSchedule
```

The instance metadata address `169.254.169.254` is blocked for mission pods by the chart's network policy. Keep IMDSv2 required on the node group as well, which blocks the hop limit for pods on the node network.
