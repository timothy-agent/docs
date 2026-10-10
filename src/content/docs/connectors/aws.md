---
title: AWS
description: Connect your AWS account through the AWS MCP Server.
sidebar:
  order: 7
app_path: /settings/connectors
app_label: Connectors
---

The AWS connector reaches your AWS account through the managed AWS MCP Server. The app describes it as "Your AWS accounts via the AWS MCP Server: resources, docs, API queries".

## What it enables

The connector adds the tools that the AWS MCP Server offers. Timothy signs every request with the access keys you give it.

These tools are for chat only. Missions do not get them.

The AWS MCP Server offers many tools. When a connector has more tools than the "MCP tool index threshold" in [Features](/docs/settings/features/), the agent first sees a short index and loads the tools it needs through `load_tool`. An agent gets `load_tool` once any of this connector's tools is in its "Tools allowlist".

Add the tools to an agent's "Tools allowlist" before you use them. See [Agents](/docs/settings/agents/).

## What you need

An access key pair for an IAM user: an access key ID and a secret access key. The IAM principal must be allowed to use the AWS MCP Server. When it is not, the test suggests "ReadOnlyAccess to start".

## Add the connector

1. Open Settings, "Connectors", and pick the "AWS" tile under "Add a connector".
2. Fill the form:

   | Field | What to enter |
   |---|---|
   | "Name" | A unique name. It identifies this account when more than one connector serves a tool. |
   | "Endpoint" | The regional AWS MCP Server endpoint. The form offers `us-east-1` and `eu-central-1`. |
   | "Region" | The signing region. It must match the endpoint. Picking an endpoint fills it in. |
   | "Access keys" | Choose "New credential" and fill "Access Key ID" and "Secret Access Key", or choose "Use existing" and pick a stored key pair. |

3. Press "Test connection". Timothy saves the connector switched off and tests it.
4. When the test passes, press "Add connector". This switches the connector on.

The key pair is stored as one credential named after the connector. A connector named `aws` stores it as `AWS_KEYS`.

## Verify

A passing test shows "Connection OK, tools are servable." Later, press "Test" on the card or "Test connection" on the connector's page.

## Common errors

| Message | What to do |
|---|---|
| "IAM denies the AWS MCP Server for these keys; grant the principal access (ReadOnlyAccess to start)" | Give the IAM principal access in AWS, then test again. |
| "Connection failed:" followed by a reason | The connector was saved switched off. Fix the problem and press "Test connection" again. |

## Options on the connector's page

- "Endpoint" and "Region" can be changed, then press "Save".
- "Treat as sensitive" moves turns that use this connector to the "Sensitive tool route" set in [Features](/docs/settings/features/).
- "Replace access keys" stores a new key pair under the same name.
- "Delete" removes the connector. Its stored credentials stay in the secret store.
