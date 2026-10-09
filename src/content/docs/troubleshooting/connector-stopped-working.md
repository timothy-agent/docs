---
title: Connector stopped working
description: What to do when a Google, Microsoft or token-based connector fails after it worked before.
sidebar:
  order: 6
---

A connector lets Timothy read and act on an outside account, such as Gmail, Google Calendar, Outlook or GitHub. Each connector holds a sign-in or a token. When that sign-in expires or is revoked, the connector stops working.

To check a connector, open Settings, then Connectors, and open the connector. Under "Connection", click "Test connection". A failed test shows "Failed:" and the reason.

## "Google authorization expired or was revoked"

**What you see:** The connection test, or a tool call in a chat or mission, fails with "Google authorization expired or was revoked". The message often ends with "(Testing-mode OAuth apps expire grants roughly weekly.)"

**Why:** Google no longer accepts the sign-in that Timothy stored. Someone revoked access, or the grant expired. If your Google OAuth app is in testing mode, Google ends the grant about once a week. This is how Google treats apps in testing mode. It is not a fault in Timothy.

**Fix:** Click "Reconnect" next to the failed test, or "Reconnect Google account" under "Connection". Sign in with Google again. Then click "Test connection" to check it.

With an OAuth app in testing mode, expect to do this about once a week.

## "Microsoft authorization expired or was revoked"

**What you see:** The connection test, or a tool call in a chat or mission, fails with "Microsoft authorization expired or was revoked".

**Why:** Microsoft no longer accepts the sign-in that Timothy stored. It expired, or someone revoked access.

**Fix:** Click "Reconnect" next to the failed test, or "Reconnect Microsoft account" under "Connection". Sign in again. Then click "Test connection".

## "Google authorization failed" or "Microsoft authorization failed"

**What you see:** The connection test fails with "Google authorization failed" or "Microsoft authorization failed", followed by a status code.

**Why:** The provider refused to renew the sign-in for another reason. The status code and error name in the message come from Google or Microsoft.

**Fix:** Reconnect the account as above. If reconnecting fails too, check the OAuth app in the Google or Microsoft console.

## A token or password connector fails

**What you see:** The connection test of a GitHub, GitLab, Bitbucket, IMAP, CalDAV or MCP connector fails. For GitHub, the page also says "Paste a new personal access token below to replace it."

**Why:** The token or password expired, was revoked, or lost a permission that Timothy needs.

**Fix:** Create a new token or password with the service. Paste it into the field under "Connection" and click "Save". The field is called "Rotate personal access token" for GitHub, "Rotate access token" for GitLab and Bitbucket, "Rotate password" for IMAP and CalDAV, and "Rotate bearer token" for MCP servers. For AWS, use "Replace access keys". For Google Cloud, use "Replace key". Then click "Test connection".

## The connector still fails

If a new sign-in or token does not help, delete the connector and add it again. Click "Delete" at the top of the connector page and confirm.

The confirm dialog says: "Stored credentials stay in the secret store until cleared there." Deleting the connector does not delete its stored token.
