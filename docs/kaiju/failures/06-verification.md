# Verification and CI

**DS-11 Safari verification needs one-time settings and cannot install through BiDi.** *Symptom:* SafariDriver refused
every session; later, an unsigned build did not appear. *Cause (confirmed):* SafariDriver needs Develop > Allow Remote
Automation (or `safaridriver --enable`, which asks for an admin password); an unsigned app needs Develop > Allow
Unsigned Extensions, which resets each launch, plus the extension enabled and website access granted. BiDi
`webExtension.install` is not implemented (WebKit bug 288348); Safari 26 supports the classic WebDriver install command.
*Repair:* `mise run verify safari` checks the settings and exits with code 2 naming the missing step;
`scripts/verify/safari-package.sh` builds an ad-hoc signed app as a fallback. *Prevention:* list these as owner actions
at intake ([Safari card](../platforms/05-safari.md)). *Open:* Safari has not yet been verified end to end.

**DS-12 A Mise task cache stored a result but never restored it.** *Symptom:* CI reported `cache miss` and re-ran
`tsc --noEmit` although a 546-byte result had been saved. *Cause (likely):* the WXT-generated input closure gave no
stable key. *Repair:* the result cache was removed; only downloads are cached. *Prevention:* E03: prove a fresh-runner
hit and every negative case before keeping a result cache. See [`docs/ci.md`](../../ci.md#native-task-cache-experiment-november-2026).

**DS-13 A smoke job succeeds without running.** *Symptom:* `smoke-chrome` is green on branches where
`validate:chrome-artifact` does not exist. *Cause (by design):* the job prints a notice and succeeds when the script is
missing. *Repair:* treat that state as **not checked** and do not require the check until the script exists.
*Prevention:* report skipped checks as skipped; a green job proves only the steps it ran.

## What does not apply

DeepScope has no servers, databases, private networks, email, object storage or model providers, so Crawl's entries on
KubeBlocks, Bunny, Tailscale, Resend, Backblaze B2, private-package 403s and deployment plans have no counterpart here.
Their method (first cause, exact identity, smallest retry, prevention with an owner) still applies.
