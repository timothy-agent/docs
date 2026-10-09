---
title: Chat sends nothing over http
description: Why the send button does nothing when you open Timothy over plain http by a LAN address or host name, and how to fix it.
sidebar:
  order: 3
---

## Send does nothing on a LAN address

**What you see:** You open Timothy at an address such as `http://192.168.1.20:3300` or `http://myserver:3300`. The page loads. You type a message and send it, but nothing happens. No reply comes and no error shows. Uploads to Knowledge and mission attachments can fail the same way.

**Why:** Browsers treat a page as secure only when it uses https, or when it uses http on `localhost`. On a page that is not secure, browsers hide some features. Older Timothy builds used one of those hidden features to create an ID for each new message. Without it, the send stopped in the browser before any request left it.

**Fix:** Upgrade Timothy. Newer builds no longer need that browser feature, so send works over plain http on any address. The fix arrived after release 0.1.0-alpha.105. See [Release notes](/docs/release-notes/) for the current release and the [Install](/docs/install/) section for how to upgrade.

If you cannot upgrade yet, use one of these:

- Open Timothy at `http://localhost:3300` on the machine that runs it.
- Put a reverse proxy in front of Timothy that serves it over https.

The https option is a good idea anyway when you reach Timothy from other machines. Over plain http, anyone on the network path can read your API token, because the browser sends it with every request.
