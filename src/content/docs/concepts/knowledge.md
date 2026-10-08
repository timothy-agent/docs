---
title: Knowledge
description: Documents you give Timothy so it can search and quote them in chats and missions.
sidebar:
  order: 5
---

## What it is

Knowledge is the set of documents you give Timothy. Timothy can search them and quote them in chats and missions. Documents live in collections. A collection is a named folder of documents, such as "runbooks" or "product-docs".

Knowledge needs a route bound to the "Embeddings" role. Without one, Timothy cannot index documents. See [Providers and routes](/docs/concepts/providers-and-routes/).

## Where it lives

Open "Knowledge" in the sidebar. "New collection" creates a collection with a "Name" and a "Description". Open a collection to add documents in three ways:

- Drag files in, or browse. Accepted types are PDF, Markdown, plain text, Word (.docx) and HTML.
- Paste a URL and press "Add URL". It can be a web page or a PDF. Paste several URLs at once to add them all.
- Write or paste Markdown, give it a "Markdown title" and press "Add markdown".

"Add to Knowledgebase" on the main page takes a file or a URL and files it into the best matching collection. If nothing fits, it creates a new one.

## How chats and missions use it

Every agent can search the whole knowledge base. Collections do not limit what an agent sees. They only change which results come first.

- In the chat box, type # to pin a collection to that chat.
- On an agent, add collections to "Knowledge allowlist" under "Settings", then "Agents". Their documents rank higher every time that agent searches.

Missions search the same knowledge base while they work. A mission can also add its own output to a collection. Pick one in "Promote to knowledge base on done" when you create the mission, or press "Promote to KB" on a finished mission's files.

## Settings most people touch

- The collections you create and what you put in them.
- "Knowledge allowlist" on each agent.
- "Promote to knowledge base on done" on a new mission.

## Example

You keep runbooks for your servers. Create a collection named "runbooks" and drag in the PDFs. Add "runbooks" to the "Knowledge allowlist" of your ops agent. Now ask that agent how to restart the database. It searches your knowledge, finds the runbook and quotes the steps.
