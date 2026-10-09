---
title: Credentials
description: The Credentials tab, the list of every key and token Timothy has stored.
sidebar:
  order: 6
---

The Credentials tab lists every stored credential by name. The app describes it as "API keys and tokens stored for providers and connectors." Values never show.

For each credential the tab shows which providers, connectors, destinations or automations use it. Timothy refuses to delete a credential while anything still uses it. The secret backend's own login, such as the Vault token, has no delete action.

The usual way to add a credential is the form of the provider, connector or channel that needs it.

How names are chosen, how to reuse a credential and how to rotate one are covered in [Credentials](/docs/connectors/credentials/). Where the values are stored is set in [Secrets](/docs/settings/secrets/).
