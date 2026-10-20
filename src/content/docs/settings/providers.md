---
title: Providers
description: The Providers tab, where you connect the model providers Timothy routes work to.
sidebar:
  order: 1
app_path: /settings/providers
app_label: Providers
---

A provider is a source of models, such as OpenAI, Anthropic or a local Ollama. The app describes the tab as "Connect and manage the LLM providers Timothy can route work to." Which model answers which job is set in [Routing](/docs/settings/routing/).

## The list

The tab has two sections: "Your providers" and "Add a provider". With no providers yet, the list offers "Open the setup guide".

At the top, a line shows the model catalog: how many models it knows and when it last synced. Press "Refresh" to sync it now. The catalog supplies model names and prices for the model pickers.

Each provider card shows its health, its default model and these controls:

| Control | What it does |
|---|---|
| Switch | Turns the provider on or off. |
| "Test" | Sends a one-token completion to the provider. Not shown for Cursor. |
| "Manage" | Opens the provider's page. |

The health line reads "healthy" or "credential missing". A subscription provider reads "subscription" followed by "healthy", "ready" or "login required". A Cursor provider reads "subscription" followed by "healthy" or "auth failed".

## Presets

| Preset | Description in the app | Key |
|---|---|---|
| "OpenRouter" | Free models to start, one login | Login, or API key |
| "OpenAI" | GPT and o-series models | API key |
| "OpenAI Subscription" | ChatGPT Plus or Pro, via local proxy | Browser login |
| "Anthropic" | Claude models, direct API | API key |
| "Claude Subscription" | Claude Pro/Team via local proxy | Browser login |
| "Cursor" | Cursor CLI for coding missions | API key |
| "AWS Bedrock" | Amazon Nova models via AWS | Access key pair, or the cloud identity of the gateway |
| "GLM (Z.ai)" | Zhipu's GLM models | API key |
| "Grok (xAI)" | xAI's Grok models | API key |
| "DeepSeek" | DeepSeek's own API | API key |
| "Nebius" | Open models on Nebius Token Factory | API key |
| "Ollama" | Local models, no key needed | None |
| "TypeSafe Jev" | Hosted decision model for fast routing | API key |
| "Custom endpoint" | Any OpenAI-compatible URL | Optional |

Most key presets show a hint and a link to the provider's key page next to the key field.

## Add a provider

Pick a preset under "Add a provider". The form shows only the fields that preset needs.

| Field | What it does |
|---|---|
| "Name (unique)" | The provider's name. |
| "API key" | The provider's key. Choose "New credential" to paste one, or "Use existing" to pick a stored one. The "Custom endpoint" preset shows "API key (optional)". For Cursor it is a plain paste field. |
| "Credential reference" | The name the key is stored under. It follows the provider name until you edit it. |
| "Authentication" | AWS Bedrock only. "Access keys" stores an IAM key pair. "Cloud identity" uses the AWS role attached to the gateway (EKS Pod Identity, IRSA, GKE or AKS Workload Identity, or an instance role) and stores no key. See [Identity and Bedrock](/docs/kubernetes/identity-and-bedrock/). |
| "Region" | AWS Bedrock only. The AWS region. |
| "Access Key ID" and "Secret Access Key" | AWS Bedrock with "Access keys". The IAM user's key pair. |
| "Base URL" | Shown for "Custom endpoint". For the other presets it sits under "Advanced: base URL". Bedrock has none. |
| "Model" | The model to test with. It becomes the provider's default model. After a passing test, the picker offers the models the provider lists. "TypeSafe Jev" is tested with a decision probe instead of a one-token completion. |
| "Default model" | Cursor. The model the CLI runs when a route does not name one. |

Press "Test connection". Timothy sends a one-token completion with your settings. A pass reads "OK," followed by the model and the time it took. A failure reads "Failed after" followed by the time and the reason. "Add provider" stays disabled until a test passes. Any edit after a passing test locks it again.

### OpenRouter

The OpenRouter preset skips the key field. Press "Connect OpenRouter" and the browser opens OpenRouter. Log in or sign up there and approve Timothy. OpenRouter creates an API key for Timothy and sends the browser back. Timothy stores the key itself, so you never paste anything. You land on the providers list with "is connected and ready to chat."

The connect flow needs `TIMOTHY_PUBLIC_URL` set, because OpenRouter redirects back to Timothy's public address. Without it, pressing "Connect OpenRouter" shows an error naming the setting.

The panel also states the limits: free models cost nothing up to 50 requests a day, or 1000 a day after you buy 10 credits once. Paid models on the same account use your OpenRouter credits. Your OpenRouter privacy settings decide whether free models may train on your prompts.

Already have a key? Press "I have a key, paste it instead" and the preset turns into the plain form above, with the key hint and a link to openrouter.ai/keys.

### OpenAI Subscription and Claude Subscription

These presets use a ChatGPT Plus or Pro plan, or a Claude Pro or Team plan, instead of an API key. Timothy sends the requests through CLIProxyAPI, a helper service inside Timothy's Docker network on port 8317. Calls cost $0.00 on the ledger, because you pay a flat fee.

Press "Sign in with OpenAI" or "Sign in with Claude". A browser tab opens on the vendor's login page. Approve the access there. Timothy waits, then adds the provider by itself and says it is ready to use.

If the browser says "Unable to connect" to localhost after you log in, Timothy runs on another machine. Under "Running on a remote server or headless host?", paste the full address from the browser's address bar and press "Submit". Press "Cancel" to stop. "Configure endpoint manually" turns the preset into the plain form.

On the provider's page, the "Subscription authentication" panel has "Re-authenticate with OpenAI" or "Re-authenticate with Claude" for when the login expires. These providers have no key panel.

### Cursor

Cursor serves coding missions through a CLI harness. It has no connection test. The form says "CLI providers have no connection test." and "Add provider" works right away.

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
| "Authentication" | AWS Bedrock only. "Access keys" or "Cloud identity". Switching to "Cloud identity" drops the credential reference and hides the key panel below. |
| "Credential reference" | The stored name this provider's key comes from. Pick another stored name to switch keys. Hidden for a Bedrock provider on "Cloud identity" and for the subscription presets. |
| "AWS region" | AWS Bedrock only. |
| "Default model" | Used when a route entry for this provider names no model. |

OpenAI-compatible providers, and any provider with a stored base URL, also have a fold called "Advanced". It opens by itself when one of its fields holds a value other than the default.

| Field in "Advanced" | What it does |
|---|---|
| "Disable reasoning" | OpenAI-compatible providers only. Turns off reasoning ("thinking") for every request to this provider. |
| "Request timeout" | OpenAI-compatible providers only. A duration such as `20m`. Empty uses the default. |
| "LiteLLM provider" | Which section of the model catalog this provider's prices come from. Empty works it out from the driver and base URL. Shown for "Custom endpoint", or when a value is set. Not shown for Anthropic, AWS Bedrock or the subscription presets. |
| "Base URL" | Read only. It was set when you added the provider. To use another address, add the provider again. |

Press "Save" to keep changes or "Cancel" to drop them.

Below the form:

| Item | What it does |
|---|---|
| "API key", "AWS credentials", "Subscription token" or "Subscription authentication" panel | Shows "stored" with the store, or "not set". Paste a new value and press "Save" to rotate the key under the same name. "Subscription token" appears for a provider that runs the Claude Code CLI. "Subscription authentication" appears for the two subscription presets and has the re-authenticate button. |
| "Test connection" | Runs the one-token test again. Cursor shows its health from the last harness run instead. |
| "Models" | The models this provider can serve. See below. Not shown for Cursor. |
| "Delete" | In the page header. Removes the provider and its models. Timothy refuses while an enabled route still points at it. |

### Models and prices

The panel is titled "Models your key can use" followed by a count when the provider lists its models itself. The list shows the provider's live model ids, with prices from the model catalog where known. A provider that cannot list its models gets "Models from catalog" instead. Filter the table with "filter by model id...". You choose which model runs in [Routing](/docs/settings/routing/).

Each row shows the model id, its context size and its price per million tokens. A badge names the price source, for example "operator", or "unknown" when no price is known. Timothy records an unknown price as unknown and never guesses.

To set a price, press "Edit" on a row. Fill in "Input $ / MTok" and "Output $ / MTok", then press "Save price". "Clear price" removes your price. "Add price" does the same for a model id that is not in the list, and it asks for the "Model id".

"Mark listed models free" sets a price of $0 for every listed model that has no price of yours. Use it for a provider you pay a flat fee for. The app asks "Mark listed models free?" first. Clear a model's price to undo it.
