---
title: First chat
description: Send your first message, pick who answers, and attach files.
sidebar:
  order: 3
assistant: false
---

If you picked a first message at the end of the welcome wizard, Chat is already open and Timothy is answering it. You can also start a chat from Home or from "Chat" in the sidebar.

## Send a message

Type in the message box. It says "Message Timothy…" in Chat and "Ask anything…" on Home. Press Enter or the "Send" button. Press Shift+Enter for a new line.

The answer streams in as Timothy writes it. To stop it, press "Stop".

Every chat is kept in the chat list, and you can search it by title or by what you said.

A long chat opens at its latest messages. Scroll to the top, or press "Load earlier messages", to read older ones.

## When no model is set up

If no chat model works, a notice sits above the message box and you cannot send:

- "Timothy has no model for chat yet" means no provider serves chat. Press "Add a provider" and add one in Settings.
- "Timothy can't reach its model gateway" means the gateway service does not answer. Check that every service in the stack is running.

## Pick who answers

The button at the bottom left of the message box opens the "Agent and route" menu.

- Under "Agent", "Auto" picks the best-fit agent for each message. You can also pick one agent. The default agent is marked "Default".
- Under "Route", "Auto" uses the agent's own route, or the server default. You can also pick one route. Each route shows the models it tries, in order.

Your choice applies to the next message. Agents and routes are set up in Settings.

## Attach files

Press "Attach image" next to the menu to add files. You can attach up to 8 files to a message: images, PDFs, text and Markdown files, video and audio. Timothy reads them before it answers.

In the message box, type `#` to pull in a knowledge collection, or to refer to a mission, a chat or a document.
