---
title: Providers
description: The Providers tab, where you connect the model providers Timothy routes work to.
sidebar:
  order: 1
---

A provider is a source of models, such as OpenAI, Anthropic or a local Ollama. The app describes the tab as "Connect and manage the LLM providers Timothy can route work to." Which model answers which job is set in [Routing](/docs/settings/routing/).

## The list

The tab has two sections: "Your providers" and "Add a provider". With no providers yet, the list offers "Open the setup guide".

At the top, a line shows the model catalog: how many models it knows and when it last synced. Press "Refresh" to sync it now. The catalog supplies model names and prices for the model pickers.

Each provider card shows its health, its default model and these controls:

| Control | What it does |
|---|---|
| Switch | Turns the provider on or off. |
| "Test" | Sends a one-token completion to the provider. Not shown for subscription providers. |
| "Manage" | Opens the provider's page. |

The health line reads "healthy" or "credential missing". A subscription provider reads "subscription" followed by "healthy" or "auth failed".

## Presets

| Preset | Description in the app | Key |
|---|---|---|
| "OpenAI" | GPT and o-series models | API key |
| "OpenAI (Responses)" | GPT reasoning models via the Responses API | API key |
| "Anthropic" | Claude models, direct API | API key or subscription token |
| "Cursor" | Cursor CLI for coding missions | API key |
| "AWS Bedrock" | Amazon Nova models via AWS | Access key pair |
| "GLM (Z.ai)" | Zhipu's GLM models | API key |
| "Grok (xAI)" | xAI's Grok models | API key |
| "Ollama" | Local models, no key needed | None |
| "Custom endpoint" | Any OpenAI-compatible URL | Optional |

Most key presets show a hint and a link to the provider's key page next to the key field.

## Add a provider

Pick a preset under "Add a provider". The form shows only the fields that preset needs.

| Field | What it does |
|---|---|
| "Name (unique)" | The provider's name. |
| "Auth" | Anthropic only. "API key" for the metered API, or "Subscription token" for a Claude Pro or Max subscription. |
| "API key" | The provider's key. Choose "New credential" to paste one, or "Use existing" to pick a stored one. The "Custom endpoint" preset shows "API key (optional)". For Cursor it is a plain paste field. |
| "Credential reference" | The name the key is stored under. It follows the provider name until you edit it. |
| "Region" | AWS Bedrock only. The AWS region. |
| "Access Key ID" and "Secret Access Key" | AWS Bedrock only. The IAM user's key pair. |
| "Base URL" | Shown for "Custom endpoint". For the other presets it sits under "Advanced: base URL". Bedrock has none. |
| "Model" | The model to test with. It becomes the provider's default model. |
| "Subscription token" | Anthropic with "Subscription token" auth. See below. |
| "Default model" | Anthropic subscription and Cursor. The model the CLI runs when a route does not name one. |

Press "Test connection". Timothy sends a one-token completion with your settings. A pass reads "OK," followed by the model and the time it took. A failure reads "Failed after" followed by the time and the reason. "Add provider" stays disabled until a test passes. Any edit after a passing test locks it again.

### Anthropic subscription token

Choose "Subscription token" under "Auth" to use a Claude Pro or Max subscription. On any machine with Claude Code installed, run the command below, approve in the browser and paste the token it prints. The token starts with `sk-ant-oat` and lasts about a year.

```sh
claude setup-token
```

Subscription and Cursor providers have no connection test. The form says "CLI providers have no connection test." and "Add provider" works right away. These providers serve coding missions through a CLI harness.

### Ollama

Ollama needs no key. The form fills in `http://host.docker.internal:11434/v1`, which reaches Ollama on the same machine as Timothy. If Ollama runs on another machine, open "Advanced: base URL" and enter that machine's address, for example `http://192.168.1.20:11434/v1`.

If the test fails on a Linux server, the form explains that Docker needs this line on the gateway service for `host.docker.internal` to resolve:

```yaml
extra_hosts: ["host.docker.internal:host-gateway"]
```

## The provider's page

| Field | What it does |
|---|---|
| "Provider name" | Renames the provider. |
| "Credential reference" | The stored name this provider's key comes from. Pick another stored name to switch keys. |
| "Disable reasoning" | OpenAI-compatible providers only. Turns off reasoning ("thinking") for every request to this provider. |
| "Request timeout" | OpenAI-compatible providers only. A duration such as `20m`. Empty uses the default. |
| "AWS region" | AWS Bedrock only. |
| "LiteLLM provider" | Which section of the model catalog this provider's prices come from. Empty works it out from the driver and base URL. Not shown for subscription providers. |
| "Default model" | Used when a route entry for this provider names no model. |

Press "Save" to keep changes or "Cancel" to drop them.

Below the form:

| Item | What it does |
|---|---|
| "API key", "AWS credentials" or "Subscription token" panel | Shows "stored" with the store, or "not set". Paste a new value and press "Save" to rotate the key under the same name. |
| "Test connection" | Runs the one-token test again. Subscription providers show their health from the last harness run instead. |
| "Models" | Every catalog model this provider can serve, with context size and price. Filter by model id. You choose which model runs in [Routing](/docs/settings/routing/). |
| "Delete" | Removes the provider and its models. Timothy refuses while an enabled route still points at it. |
