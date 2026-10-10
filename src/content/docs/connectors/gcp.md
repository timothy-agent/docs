---
title: GCP
description: Connect a Google Cloud project to read Cloud Storage and run BigQuery queries.
sidebar:
  order: 8
app_path: /settings/connectors
app_label: Connectors
---

The GCP connector reaches one Google Cloud project with a service account key. The app describes it as "A GCP project via a service-account key: Cloud Storage objects, BigQuery queries".

## What it enables

The connector adds these tools:

| Tool | What it does |
|---|---|
| `list_gcs_objects` | Lists objects in a Cloud Storage bucket. It returns names, not content. |
| `read_gcs_object` | Reads one object's content as text. |
| `run_bigquery_query` | Runs a BigQuery query and returns rows. Only a single statement that starts with SELECT or WITH is allowed. Anything that writes is refused before it is sent. |

All three tools only read, so both chat and missions can use them.

Add the tools to an agent's "Tools allowlist" before you use them. See [Agents](/docs/settings/agents/).

## What you need

A service account key in JSON format, from the Google Cloud console. The service account needs IAM roles for the data it reads. When a call is denied, Timothy suggests these roles to start: `roles/storage.objectViewer`, `roles/bigquery.jobUser` and `roles/bigquery.dataViewer`.

## Add the connector

1. Open Settings, "Connectors", and pick the "GCP" tile under "Add a connector".
2. Fill the form:

   | Field | What to enter |
   |---|---|
   | "Name" | A unique name. It identifies this account when more than one connector serves a tool. |
   | "Project ID" | Optional. Leave it blank to use the project named in the key. |
   | "Location" | Optional. BigQuery's job location, such as `EU`. Leave it blank to let BigQuery choose. |
   | "Service account key" | Choose "New credential" and paste the whole key file, or choose "Use existing" and pick a stored key. |

3. Press "Test connection". Timothy saves the connector switched off and tests it.
4. When the test passes, press "Add connector". This switches the connector on.

The key is stored as one credential named after the connector. A connector named `gcp` stores it as `GCP_KEY`.

## Verify

A passing test shows "Connection OK, tools are servable." The test proves the key is valid. It does not check IAM roles. A missing role shows up when a tool runs.

## Common errors

| Message | What to do |
|---|---|
| A message that contains "parse service account key" | The pasted text is not a valid service account key. Paste the whole JSON file again. |
| A message that contains "gcp rejected the service-account key" | Check that the key is current and that the service account is not disabled. |
| A message that contains "the service account lacks the IAM role for this call" | Grant the role in Google Cloud, on the project or on the resource. |
| A message that says there is no project | The key names no project. Fill "Project ID". |

## Options on the connector's page

- "Project ID" and "Location" can be changed, then press "Save".
- "Treat as sensitive" moves turns that use this connector to the "Sensitive tool route" set in [Features](/docs/settings/features/).
- "Replace key" stores a new key under the same name.
- "Delete" removes the connector. Its stored credentials stay in the secret store.
