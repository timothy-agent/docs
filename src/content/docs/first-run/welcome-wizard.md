---
title: Welcome wizard
description: Connect your first model provider, check it, and see which model does which job.
sidebar:
  order: 2
---

A fresh install has no model, so Timothy cannot answer anything yet. The welcome wizard fixes that. Home sends you there on its own while no chat model works. The wizard has seven steps, and a bar at the top shows "Step 1 of 7" and so on.

## Meet Timothy

The first screen explains what Timothy does. Press "Let's start".

## Pick where the model comes from

The screen asks "Where should Timothy's model come from?" and shows these tiles, in this order:

- "Local model (Ollama)"
- "OpenAI"
- "Anthropic"
- "GLM (Z.ai)"
- "Grok (xAI)"
- "AWS Bedrock"
- "Cursor"
- "Custom endpoint"

Pick one. You can add more providers later in "Settings", then "Providers". The Settings page also offers "OpenAI (Responses)", which the wizard does not show.

"Cursor", and "Anthropic" with a subscription token, are made for coding missions. They do not give chat a model. For your first provider, pick one that serves chat.

## Connect the provider

The next screen is called "Connect" followed by the provider name. It shows the provider form:

- "Name (unique)": a name for this provider. The preset fills one in.
- "API key": the key from your provider account. The form links to the page where you create one. "AWS Bedrock" asks for an access key pair and a "Region" instead. "Anthropic" first asks you to pick an "Auth" mode: "API key" or "Subscription token".
- "Credential reference": the name Timothy stores the key under. The form fills it in.
- "Model": the model to test. It becomes this provider's default model. The preset suggests one.
- "Advanced: base URL": open it only if your provider needs a different address.

By default, Timothy encrypts the key with your master key and stores it in its database. The key never appears in logs, in the API or on screen again.

Press "Test connection". Timothy sends a one-token request to the model. When it works, you see "OK", the model name and how long it took. The "Add provider" button stays off until a test passes. Then press "Add provider".

### Using a local model with Ollama

Pick "Local model (Ollama)". It needs no key. Ollama must run on the host, and the model must already be pulled. See [Requirements](/docs/install/requirements/) for the setup.

- If Ollama runs on the same machine as Timothy, keep the default address.
- If it runs on another machine, open "Advanced: base URL" and enter its address, for example `http://192.168.1.20:11434/v1`.
- In "Model", type the exact name of a model you pulled in Ollama. The preset suggests `qwen3:8b`, which can chat and run missions.

A model that is not loaded yet can miss the first test. Press "Test connection" again. If the test fails on a Linux server, the form shows a hint about the `extra_hosts` setting that Docker needs.

## Check the provider

The wizard now checks the new provider once more. The screen says "Checking" and the provider name, then "Checking the connection...".

- When it works, you see "Connected" and the response time. The wizard moves on by itself.
- When it fails, you see the error with "Back" and "Retry". Fix the cause, then press "Retry", or go back and change the form.

## What Timothy uses

When you add a provider, Timothy fills four jobs with models from it:

| Line on screen | What it means |
|---|---|
| "Chat answers with ..." | The model that answers your chats. This is the model you tested. |
| "Summaries use ..." | The model that writes summaries and names. This is also the model you tested. |
| "Memory and knowledge search use ..." | The embedding model behind memory and knowledge search. |
| "Images: ..." | The model that reads images. |

For the last two jobs, Timothy picks the cheapest fitting model this provider offers. A provider without such a model leaves that job empty, and the line says "no model yet". You can fill it later with another provider.

The chat model also runs missions. Missions refuse some small models, such as `qwen2.5:7b` and the Amazon Nova models. If your chat model is one of them, a hint shows under the chat line: "This model can chat but cannot run missions. Pick a stronger model for missions in Settings."

The "Change in Settings" link opens "Settings", then "Routing". There you can change every job later. Press "Continue".

## A few basics

Set your "Timezone" and "Default currency". Timothy shows dates in your timezone and plans mission budgets in your currency. Press "Save and continue", or "Skip this step".

## Say hello

Pick one of three first messages:

- "What can you do for me?"
- "Summarize how I should use missions"
- "Remember that I prefer short answers"

The wizard opens Chat and sends it. Or press "I'll explore on my own" to go to Home. Either way, the wizard is done. Continue with [First chat](/docs/first-run/first-chat/).

## Skipping the wizard

"Skip for now" sits in the top bar on every step, and on the first screen. After you skip, Home no longer sends you to the wizard. The setup checklist on Home still shows "Add a model provider" until a chat model works.

To start the wizard again, open the Help menu and choose "Restart welcome". If a chat model already works, the wizard starts at "What Timothy uses".
