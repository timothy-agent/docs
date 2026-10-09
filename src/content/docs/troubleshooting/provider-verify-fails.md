---
title: Provider verify fails
description: What each connection test failure means when you add a model provider, and how to fix it, including a local Ollama.
sidebar:
  order: 2
---

Before Timothy saves a provider, it sends the model one tiny request. This is the connection test. You run it with "Test connection" on the provider form. The welcome wizard runs it for you after "Add provider" and shows "Checking the connection...".

When the test works, the result starts with "OK" and names the model and the time it took. When it fails, the result starts with "Failed after" and the time in milliseconds, then the reason. For a provider you already added, open it from Settings, then Providers, and run the test there. Click "Details" under a failed result to see the provider's own answer.

The welcome wizard's check step shows the provider's raw answer instead. It starts with `http` and a status code. A 401 or 403 there is the same as "Provider rejected the API key" below, and a 404 is the same as "Model or endpoint not found".

Connection tests are recorded, but they do not count in the charts on the Analytics page.

## "Provider rejected the API key"

**What you see:** The failed test shows "Provider rejected the API key", often followed by the provider's own words.

**Why:** The provider answered, but it refused the key. The key is wrong, was deleted, or belongs to an account that cannot use this model.

**Fix:** Create a new key in the provider's console and paste it again. Check that you picked the right provider tile: a key for one provider does not work on another.

## "Model or endpoint not found"

**What you see:** The failed test shows "Model or endpoint not found".

**Why:** The provider answered, but it does not know the address or the model. There are two common causes:

- The base URL is wrong. For example, a path part such as `/v1` is missing.
- The model name is wrong, or a local model is not downloaded yet.

**Fix:** Open "Advanced: base URL" on the form and compare the address with your provider's documentation. Check the spelling of the model name. For Ollama, see [Ollama](#ollama) below.

## "Rate limited"

**What you see:** The failed test shows "Rate limited".

**Why:** The provider refused the request because your account sent too many requests, or it hit a limit of your plan.

**Fix:** Wait a minute and click "Test connection" again. If it keeps failing, check the limits of your account with the provider.

## "Bad request"

**What you see:** The failed test shows "Bad request", followed by the provider's own words.

**Why:** The provider did not accept the request. The provider's text after the label usually names the problem.

**Fix:** Read the provider's text. Check the model name first.

## "Provider error"

**What you see:** The failed test shows "Provider error".

**Why:** The provider had a problem on its side.

**Fix:** Try again later. Check the provider's status page if it has one.

## The test fails after about 20 seconds

**What you see:** "Failed after" with a time close to 20000 ms.

**Why:** The connection test waits about 20 seconds by default. A slow model, a model that is still loading, or a host that does not answer can take longer.

**Fix:** Click "Test connection" again. A local model often loads during the first test and answers the second one.

If the provider is always slow, set a longer timeout. Open Settings, then Providers, and open the provider. Fill in "Request timeout" with a value such as `5m`. The connection test then waits that long too. This field is shown for OpenAI-compatible providers, which includes Ollama.

## The test cannot reach the host

**What you see:** The failed test shows a network error instead of an answer from the provider. For example, the connection was refused, or the host name cannot be found.

**Why:** The request never reached a provider. Timothy calls providers from inside its containers. Inside a container, `localhost` means that container, not your machine.

**Fix:** Check the base URL. For a service that runs on your own machine, use `host.docker.internal` instead of `localhost`. For a service on another machine, use its LAN address or host name, and check that your Timothy machine can reach it.

## "The provider did not answer."

**What you see:** The welcome wizard's check step shows "The provider did not answer.", with "Retry" and "Back".

**Why:** The test ended without an answer and without an error text.

**Fix:** Click "Retry". If it fails again, click "Back" and check the key, base URL and model.

## "Timothy's API token is missing or invalid."

This is not a provider problem. The browser is not signed in to Timothy. See [Nothing works after install](/docs/troubleshooting/nothing-works-after-install/).

## Ollama

Timothy does not run Ollama for you. You run Ollama on the host machine, outside Docker, so it can use your GPU. Timothy's containers reach it at this address:

```text
http://host.docker.internal:11434/v1
```

The Ollama tile, "Local model (Ollama)", fills in this address for you. It needs no API key. If Ollama runs on another machine, enter that machine's address instead, for example `http://192.168.1.20:11434/v1`.

**The model must be downloaded first.** Ollama only serves models you have pulled. If the test says "Model or endpoint not found", pull the model on the host, then test again:

```sh
ollama pull <model>
ollama list
```

Type the model name in the form exactly as `ollama list` shows it.

**The first test can time out.** Ollama loads a model into memory on its first request. On a slow machine that takes longer than the test waits. Click "Test connection" a second time. See [The test fails after about 20 seconds](#the-test-fails-after-about-20-seconds) to raise the timeout.

**Docker on Linux does not know `host.docker.internal`.** Docker Desktop on macOS and Windows provides this host name. Docker Engine on Linux does not, so the test fails with a host that cannot be found. The provider form then shows a hint that starts with "On a Linux server, Docker needs". Add these lines to the `gateway` service in your compose file:

```yaml
    extra_hosts:
      - "host.docker.internal:host-gateway"
```

For a quick start install, the compose file is `docker-compose.yml` in the install folder. For a source build, it is `deploy/docker-compose.yml` in the repository.

Then restart the stack. For a quick start install, run this from the install folder:

```sh
docker compose up -d
```

For a source build, run this from the repository folder:

```sh
docker compose -f deploy/docker-compose.yml up -d
```

The installer replaces the compose file on every upgrade. After an upgrade, add these lines again.
