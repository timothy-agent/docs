---
title: Kubernetes
description: Run Timothy on EKS, AKS, GKE or any Kubernetes cluster with the Helm chart.
sidebar:
  order: 0
assistant: false
---

Timothy ships a Helm chart that runs the whole stack on Kubernetes. Each mission then runs in its own pod instead of a Docker container, and nothing in the cluster needs a Docker socket.

Use this path when you already run a cluster. For one machine, the [Docker Compose install](/docs/install/) is simpler.

## What you need

- A cluster on Kubernetes 1.29 or newer. Managed services work: Amazon EKS, Azure AKS, Google GKE. A local [kind](https://kind.sigs.k8s.io) cluster works for a test.
- `kubectl` and Helm 3.14 or newer on your machine, both pointed at the cluster.
- A storage class that can mount one volume in many pods at once (ReadWriteMany). Brain and every mission pod share the mission workspace. On a single node a ReadWriteOnce class also works. See [Storage](/docs/kubernetes/storage/).
- A network plugin that enforces NetworkPolicy. The chart isolates the services and the mission pods with policies. Without enforcement the stack still runs, but a mission pod can reach the other services. Calico, Cilium, the EKS VPC CNI with policy enforcement on, Azure CNI with a policy engine, and GKE Dataplane V2 all enforce policies.
- Outbound internet from the cluster. The gateway reaches model providers, missions install packages, and the search service reaches search engines.

The quick start pages list what each cloud needs: [EKS](/docs/kubernetes/eks/), [AKS](/docs/kubernetes/aks/), [GKE](/docs/kubernetes/gke/).

## What you get

The chart installs the same services as the Compose install, one Deployment each, plus a PostgreSQL StatefulSet with pgvector:

| Service | What it does on Kubernetes |
|---|---|
| brain | The public API. One replica. It runs the mission runner and the automation scheduler in process, so a second replica would run everything twice. |
| gateway | Sends each model request to the right provider. It carries the cloud identity for Bedrock if you use one. |
| memoryd | Stores and searches memories. One replica. |
| sandboxd | Starts one pod per mission through the Kubernetes API. It holds no Docker socket. Its service account may only create, read, exec into and delete pods in the sandbox namespace. |
| web | The web interface. |
| searxng, markitdown, ocr, pdfgen, whisper | The same helpers as on Compose. Whisper is off unless you turn it on. |

Every pod runs as a non-root user with a read-only root filesystem, all capabilities dropped and the default seccomp profile. Mission pods run as user 65534, mount only their own mission folder from the shared workspace, get no service account token, and may reach only DNS and the internet on port 443. They cannot reach brain, the database, the Kubernetes API or the cloud metadata address.

## Install

### 1. Get the chart

The chart lives in the Timothy repository under `deploy/helm/timothy`. Clone the repository at the release you want to run:

```sh
git clone --branch v0.1.0-alpha.108 https://github.com/timothy-agent/timothy.git
cd timothy
```

The chart's `appVersion` is the image tag it pulls from `ghcr.io/timothy-agent`. The chart and the images come from the same tag, so keep them together.

### 2. Write your values

Create a file `my-values.yaml`. The smallest useful file names your storage class and turns on the Ingress:

```yaml
storage:
  workspace:
    className: efs-sc   # a ReadWriteMany class, see Storage
ingress:
  enabled: true
  className: nginx
  host: timothy.example.com
  tls:
    - secretName: timothy-tls
      hosts: [timothy.example.com]
brain:
  publicURL: https://timothy.example.com
```

`deploy/helm/timothy/values.yaml` lists every setting with a comment. Do not put secrets in this file.

### 3. Install

```sh
helm install timothy deploy/helm/timothy \
  --namespace timothy --create-namespace \
  -f my-values.yaml --wait
```

On the first install the chart creates a Secret named `timothy-secrets` with a fresh master key, API token, metrics token and database password. It keeps that Secret across upgrades. To manage the Secret yourself, for example through External Secrets or the Secrets Store CSI driver, create it before the install and set `secrets.existingSecret` to its name. It needs the keys `TIMOTHY_MASTER_KEY`, `TIMOTHY_API_TOKEN`, `TIMOTHY_METRICS_TOKEN` and `POSTGRES_PASSWORD`.

Back up the master key. It encrypts every provider key and account credential you add later. If you lose it, the stored credentials cannot be recovered. See [Backup and restore](/docs/install/backup-and-restore/) for what to save.

### 4. Check the pods

```sh
kubectl -n timothy get pods
```

Every pod should show `Running` and `1/1` within a few minutes. The database pod starts first, then the others. If a pod stays in `Pending`, look at its events; the usual cause is a volume that cannot be provisioned:

```sh
kubectl -n timothy describe pod <name>
```

### 5. Sign in

The web interface signs in with the API token. Read it from the Secret:

```sh
kubectl -n timothy get secret timothy-secrets \
  -o jsonpath='{.data.TIMOTHY_API_TOKEN}' | base64 -d; echo
```

Open `https://timothy.example.com/#token=<your API token>` in your browser. Without an Ingress, forward the web port to your machine and open `http://localhost:3300/#token=<your API token>`:

```sh
kubectl -n timothy port-forward svc/timothy-web 3300:8080
```

The link contains your API token. Treat it like a password.

## Next: First run

Timothy cannot answer anything yet. It needs a model provider. The [first run](/docs/first-run/) pages walk you through the welcome wizard, your first chat and your first mission. To use Amazon Bedrock through the cluster's own identity instead of a key, read [Identity and Bedrock](/docs/kubernetes/identity-and-bedrock/).

## When something fails

- **A mission pod never starts.** Read the sandboxd log: `kubectl -n timothy logs deploy/timothy-sandboxd`. It names the problem. A common cause is a sandbox image sandboxd cannot check in the registry; set `sandbox.skipImageCheck: true` for a private registry it cannot probe anonymously.
- **Brain reports the sandbox service as unavailable.** sandboxd checks that it may create pods and exec into them in the sandbox namespace. Compare its service account's Role with the sandbox namespace: `kubectl -n timothy auth can-i create pods/exec --as system:serviceaccount:timothy:timothy-sandboxd`.
- **Missions cannot install packages.** Mission pods may reach the internet only on port 443. A registry mirror on another port or on a private address needs an entry in `sandbox.networkPolicy.egressPorts` and a change to `sandbox.networkPolicy.egressExcept`.
- **brain's health shows `selfdocs` as degraded.** That check needs an embedding route. It clears once you add a provider and an embedding route in [Settings](/docs/settings/routing/).
