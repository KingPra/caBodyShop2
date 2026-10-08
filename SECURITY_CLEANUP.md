# Credential cleanup

Website source is unchanged. Local FTP tooling must use a private local configuration and a secure hosting-dashboard credential flow; automatic upload is not configured by the example.

This branch removes credential values from current files only. Existing Git history, forks, clones, cached views, and earlier deployments may still contain them. No credentials were tested or revoked, no history was rewritten, and no deployment was performed. The owner must revoke or replace exposed credentials through the provider's authenticated dashboard separately.

Do not merge or deploy this draft until its impact is reviewed. Do not commit replacement secrets, including in generated bundles or source maps.
