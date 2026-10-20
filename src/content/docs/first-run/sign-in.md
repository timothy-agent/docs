---
title: Sign in
description: Create your account on first visit, sign in later, and reset your password if you lose it.
sidebar:
  order: 1
assistant: false
---

Timothy has its own accounts. The first time you open the web interface, you create the administrator account. After that, you sign in with a user name or email and a password.

## Create your account

Open `http://localhost:3300/` in your browser. If Timothy runs on another machine, use that machine's address. If you changed `WEB_PORT`, use that port.

On a fresh install, the page is called "Initial Setup". It says "Create your primary administrator account to secure your Timothy assistant." Fill in the form:

- "Username": the name you sign in with. It starts as `admin`.
- "Email address": used for account recovery and admin notifications.
- "Password": at least 8 characters.
- "Confirm Password": the same password again.

Press "Complete Setup & Sign In". You land on Home. On a fresh install, Home sends you on to the [welcome wizard](/docs/first-run/welcome-wizard/).

An install that you upgrade from an older release also shows "Initial Setup" on the first visit, because it has no account yet.

## Sign in later

When an account exists and you are not signed in, Timothy shows "Sign In". Enter your "Username or Email" and your "Password", then press "Sign In".

Your login lasts 7 days. When it ends, Timothy says "Your login session expired. Sign in again to continue." and you sign in again. To sign out sooner, press "Sign out" at the bottom of the sidebar.

The session cookie is marked secure. Browsers accept it over https and on `http://localhost`. If you open Timothy over plain http on another address and sign in does not stick, use `localhost` or put a reverse proxy with https in front of Timothy.

## If you forget your password

Press "Forgot password?" on the "Sign In" page. The "Reset Password" page shows a command to run on the machine that hosts Timothy. From the install folder, it looks like this:

```sh
docker compose exec brain /app -reset-password <email>
```

Use the email of your account. The command prints a recovery token. The token works for 15 minutes. Paste it into "Recovery Token", enter a "New Password" and "Confirm New Password", then press "Reset Password". Press "Back to Sign In" and sign in with the new password.

## The API token

Scripts and tools can still use the API token. It is the `TIMOTHY_API_TOKEN` value in your `.env` file, and a script sends it as a bearer token. You do not need it to use the web interface.

The "API token" entry at the bottom of the sidebar opens a dialog where you can paste the token into the browser. The API token is not a model provider key. Provider keys go in the welcome wizard or in "Settings", then "Providers".
