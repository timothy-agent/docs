---
title: Connect an MCP server with OAuth
description: Sign in to a hosted MCP server with OAuth instead of a static token.
sidebar:
  order: 11
app_path: /settings/connectors
app_label: Connectors
---

Hosted MCP servers such as Notion, Linear, Atlassian and Sentry sign you in with OAuth. Timothy follows the MCP authorization standard: you press "Save & connect", approve access on the server's own sign-in page, and Timothy keeps the connection alive by refreshing its access in the background.

## What you need

- Timothy reachable at its public address, with `TIMOTHY_PUBLIC_URL` set to that address.
- The MCP server's `https` endpoint address.
- Optional: a client ID and client secret. Only servers without automatic client registration need them. Register your Timothy address followed by `/v1/connectors/oauth/callback` as the redirect URI in that server's developer console.

## Add the connector

1. Open Settings, "Connectors", and pick an MCP tile.
2. Enter a "Name" and the "Endpoint".
3. Under "Authentication", choose "OAuth login".
4. Leave "Client ID" and "Client secret" empty unless the server needs them.
5. Press "Save & connect". You go to the server's sign-in page.
6. Approve access. You return to "Connectors" with a message that the account is connected.
7. Turn on the connector's switch on its card.

## Verify

Open the connector and press "Test connection". It shows "Connected as" followed by the authorization server and the scopes, and the server's tools become available in chat.

## Reconnect

When the server revokes access, the card's test fails with a message asking you to reconnect. Open the connector and press "Reconnect MCP server".

If you change `TIMOTHY_PUBLIC_URL`, delete the connector and add it again, because the server remembers the old redirect address.

## Common errors

| Message | What to do |
|---|---|
| "server answered without authorization; use bearer token mode" | This server does not use OAuth. Choose "Bearer token" instead. |
| "authorization server has no dynamic client registration; paste a client id and secret" | Register an app with the provider and paste its client ID and secret. |
| A message ending in "must be an https URL" or "is not on the endpoint host" | The server's sign-in details point to an unsafe or unrelated address. Timothy refuses to continue. |
| "authorization server does not support PKCE S256" | The server does not support secure sign-in. |
| "authorization expired or was revoked; reconnect to re-authorize" | Press "Reconnect MCP server" on the connector page. |
| "TIMOTHY_PUBLIC_URL is not set" | Set Timothy's public address and restart. |
| "blocked address" | The server resolves to a private address. Add its host to the outbound host allowlist only if you trust it. |
