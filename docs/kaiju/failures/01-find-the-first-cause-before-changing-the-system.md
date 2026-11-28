# Find the first cause before changing the system

1. Record the exact commit, browser and version, extension context, build, workflow run and first failed step. Read the
   first error (the diagnostics journal, the browser's extension console, the failing job's log) before interpreting
   later messages about timeouts or missing results.
2. Preserve the evidence: the real-browser result file, the diagnostics report from the options page, stored snapshots
   and the build's manifest. Do not delete a draft release, move a tag or weaken a check to make a retry pass.
3. Reuse the exact build for diagnosis. A rebuild with a different commit or a different WXT default is a different
   candidate.
4. Check where the code actually ran. Chrome's service worker, Firefox's event page and Safari's background page differ;
   a content script in a busy page is not the same as a missing one; a private window is not a normal one.
5. Follow the repository's recovery contract for releases ([P05](../procedures/extensions/05-p05-recover-a-failed-deployment.md)).
6. Convert the cause into an earlier check: a test, a source guard, a task flag or a capability check. Record it in the
   entry with its owner. A warning paragraph alone does not close a preventable defect.

Use [P01: intake](../procedures/extensions/01-p01-open-the-project-and-report-prerequisites.md) for missing owner actions,
[P02: platform checks](../procedures/extensions/02-p02-verify-required-service-contracts.md) for browser and store prerequisites,
[P03: usable preview](../procedures/extensions/03-p03-deliver-a-usable-preview.md) for the journey,
[P05: recovery](../procedures/extensions/05-p05-recover-a-failed-deployment.md) for a failed release, and
[P07: updates](../procedures/extensions/07-p07-update-upstream-artifacts-and-dependencies.md) and
[P08: procedure maintenance](../procedures/extensions/08-p08-validate-and-maintain-a-procedure.md) to improve the procedure.
Platform checks belong in the [platform cards](../platforms/README.md).
