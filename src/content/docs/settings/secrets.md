---
title: Secrets
description: The Secrets tab, where you choose where Timothy stores keys and tokens.
sidebar:
  order: 5
---

The Secrets tab picks the backend that holds every key, token and password you enter. The app describes it as "Where credentials live: Timothy storage, Vault, or AWS Secrets Manager."

Exactly one backend is the default. Every key entered anywhere in the app is written there by Timothy. With Vault or AWS Secrets Manager as the default, Timothy needs write access there, and it writes every key under a `timothy/` prefix.

The default backend's card is always at the top. It carries a "default" badge. The other cards have a "Make default" button.

To see which keys are stored, use [Credentials](/docs/settings/credentials/).

## Timothy storage

The built-in backend. Keys are encrypted with the master key and kept in Timothy's own database. There is nothing to configure.

## HashiCorp Vault

A KV v2 mount. Timothy needs write access to it.

| Field | What it does |
|---|---|
| "Address" | The Vault server address, such as `https://vault.internal:8200`. |
| "Mount" | The KV v2 mount, such as `secret`. |
| "Auth method" | "Token" or "AppRole". |
| "Token" | With "Token" auth. Paste a Vault token to store or rotate it. It is never shown back. |
| "Role ID" | With "AppRole" auth. The role id. |
| "Secret ID" | With "AppRole" auth. Paste to store or rotate. It is never shown back. |

## AWS Secrets Manager

Timothy needs `CreateSecret` and `PutSecretValue` permission to store keys here.

| Field | What it does |
|---|---|
| "Region" | The AWS region, or "Chain default" to use the region from the AWS credential chain. |
| "Auth method" | "Credential chain", "Named profile" or "Access keys". |
| "Profile" | With "Named profile". A profile name from the AWS config. |
| "Access key ID" | With "Access keys". |
| "Secret access key" | With "Access keys". Paste to store or rotate. It is never shown back. |

## Actions on the Vault and AWS cards

| Action | What it does |
|---|---|
| "Save" | Saves the settings and stores any pasted token, secret ID or key. |
| "Test" | Checks that Timothy can reach and log in to the backend. It reads no stored secret. |
| "Remove" | Removes the backend's settings. If it was the default, Timothy storage becomes the default again. |
| "Make default" | Makes this backend the default. Only possible once the backend is configured. |

A card shows "configured" or "not configured". When a token, secret ID or key is stored, the field shows "stored · encrypted".

The Vault token, the AppRole secret ID and the AWS secret access key are always kept in Timothy storage, whichever backend is the default. A backend's own login cannot live inside that backend.
