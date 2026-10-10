---
title: Sign in
description: Sign in to the Timothy web interface with your token link, and what to do if you lose it.
sidebar:
  order: 1
assistant: false
---

Timothy has no user name and no password page. The web interface signs in with one API token. That token is the `TIMOTHY_API_TOKEN` value in your `.env` file.

## The token link

The quick start installer prints a sign-in link when it finishes:

```text
http://localhost:3300/#token=<your API token>
```

Open it in your browser. The web interface reads the token from the part after `#token=`, stores it in the browser and removes it from the address bar. Then it loads Home. On a fresh install, Home sends you on to the [welcome wizard](/docs/first-run/welcome-wizard/).

If Timothy runs on another machine, replace `localhost` with that machine's address.

The link holds your token. Treat it like a password and do not share it.

## Where the token is kept

The browser keeps the token in its local storage for this site. You stay signed in until you clear the site data or use another browser. Each new browser or device needs the link once.

Your setup progress, such as the wizard and the checklist, is stored on the server. It follows you to any browser.

## If you lose the link

The token does not change, so you can build the link again from your `.env` file. Run this on the Timothy host. For a quick start install:

```sh
cd ~/timothy
echo "http://localhost:3300/#token=$(sed -n 's/^TIMOTHY_API_TOKEN=//p' .env)"
```

For a source build, from the repository folder:

```sh
echo "http://localhost:3300/#token=$(sed -n 's/^TIMOTHY_API_TOKEN=//p' deploy/.env)"
```

The command prints the link in your own terminal. Open it in your browser. If you changed `WEB_PORT`, use that port instead of 3300.

## If the token is missing or wrong

When the browser has no token, or the token is wrong, the web interface opens a dialog called "Settings" with an "API token" field. A message says "Timothy's API token is missing or invalid". The token link above is the easiest fix.

You can open the same dialog at any time from "API token" at the bottom of the sidebar.

The API token is not a model provider key. Provider keys go in the welcome wizard or in "Settings", then "Providers".
