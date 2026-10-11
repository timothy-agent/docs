---
title: Local MCP server
description: Run an MCP server that only ships as a local program, such as Google Analytics, in its own sandbox container.
sidebar:
  order: 11
app_path: /settings/connectors
app_label: Connectors
---

Some providers do not host an MCP server. They publish a program you start yourself, usually with `npx`, `uvx`, `pipx` or `python`, and their config has a `command` instead of a URL. Timothy runs such a server for you in its own sandbox container and talks to it like any other MCP server.

The server never runs inside Timothy. It gets its own container from the mission sandbox image, with the same limits as a mission sandbox: no access to your files, capped memory and CPU, and no internet unless you allow it.

## What it enables

The same as a [Custom MCP server](/docs/connectors/custom-mcp-server/): the server's tools in chat, named after the provider, with the same "Tools" panel, re-probe and "Missions may read" review.

## What you need

- The provider's config with a `command`, or the command and its arguments.
- Any keys the server reads from environment variables.
- Docker as the sandbox backend. On Kubernetes, saving a local server fails with "local MCP servers need the Docker sandbox backend".

The sandbox image has Node.js, Python 3 with pip, and mise. A server that starts with `npx` or `pip install` works. `pipx` and `uvx` are not in the image, so a config that uses them needs a small change; see the example below.

## Add the connector

1. Open Settings, "Connectors", and pick the "Custom MCP server" tile.
2. In "URL or JSON config", paste the provider's config. An entry with a `command` shows "Command:" with the command line. If you only have the command, press "Advanced: local server" and fill in "Command", "Arguments" (one per line) and "Environment variables" (names only).
3. Fill in a value for each environment variable. A value the config already carried is filled in for you; a placeholder such as `${API_KEY}` starts empty. Every value is saved as a secret when you add the connector. The connector keeps only the secret names.
4. Turn on "Internet access" if the server calls an online API or downloads its package when it starts. It is off by default.
5. Set the "Name" and, if you like, the "Provider". The provider prefixes the tool names, so a short one such as `analytics` reads better than the server's own name.
6. Press "Check server". Timothy starts the server in a throwaway container, lists its tools and removes the container. Nothing is saved yet.
7. Review the tools, pick the agents, and press "Add connector", as for a [Custom MCP server](/docs/connectors/custom-mcp-server/#add-the-connector).

## Verify

Open the connector. The "Connection" panel shows the command, whether internet access is on, and a "Local server" line with its state. Press "Test connection": a working server shows "Connection OK, tools are servable." and "running".

## When the server stops

If the server crashes, its container restarts it. After three crashes in a row the "Local server" line shows "stopped" and the reason, such as "exited with code 1". Timothy then leaves it stopped for ten minutes so the reason stays visible, and starts it again after that. "Test connection" starts it at once, and so does changing the connector.

Disabling or deleting the connector removes its container.

## Example: Google Analytics

Google publishes [analytics-mcp](https://github.com/googleanalytics/google-analytics-mcp), a local server for the Google Analytics Admin and Data APIs. Its own config runs `pipx run analytics-mcp` and points `GOOGLE_APPLICATION_CREDENTIALS` at a credentials file on your computer. A local server in Timothy has no files of yours, so this config installs the package with pip and writes the credentials from a secret into a file inside the container:

```json
{
  "mcpServers": {
    "analytics": {
      "command": "sh",
      "args": [
        "-c",
        "pip install --user --quiet --disable-pip-version-check analytics-mcp >&2 && printf %s \"$GOOGLE_CREDENTIALS_JSON\" > /tmp/adc.json && GOOGLE_APPLICATION_CREDENTIALS=/tmp/adc.json exec analytics-mcp"
      ],
      "env": {
        "GOOGLE_CREDENTIALS_JSON": "${GOOGLE_CREDENTIALS_JSON}",
        "GOOGLE_PROJECT_ID": "your-project-id"
      }
    }
  }
}
```

1. In your Google Cloud project, enable the Google Analytics Admin API and the Google Analytics Data API.
2. Create credentials with the `https://www.googleapis.com/auth/analytics.readonly` scope, as the analytics-mcp README describes. With `gcloud auth application-default login`, the command prints "Credentials saved to file:" and a path.
3. Paste the config above. Replace `your-project-id` with your project ID.
4. For "GOOGLE_CREDENTIALS_JSON", paste the whole content of that credentials file. It is stored as a secret.
5. Turn on "Internet access": pip downloads the package each time the server starts, and the server calls Google's APIs.
6. Set "Provider" to `analytics` and press "Check server". The first start takes about 15 seconds while pip installs the package. The check lists tools such as `get_account_summaries`, `run_report` and `run_realtime_report`.

`>&2` sends pip's output to the log instead of to Timothy, which reads the server's replies from its standard output.

## Common errors

| Message | What to do |
|---|---|
| "local MCP servers need the Docker sandbox backend" | This instance runs sandboxes on Kubernetes. Use a hosted MCP server instead. |
| "Could not start the local server." with "exited with code" in the reason | The command failed or is not in the sandbox image. Use `npx`, `python3` or `pip`, as in the example above. |
| "Could not start the local server." with a network error in the reason | The server needs the internet. Turn on "Internet access". |
| The check times out | The server took too long to start. Check the command by hand, and turn on "Internet access" if it downloads anything. |
| "Local server: stopped" on the connector page | Read the reason next to it, fix the command or the secret, then press "Test connection". |
