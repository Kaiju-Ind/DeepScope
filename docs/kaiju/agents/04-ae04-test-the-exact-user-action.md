# AE04 Test the exact user action

Write the acceptance case before diagnosing a user-visible failure: **actor, action, target runtime,
source/configuration, recipient or resource, permitted side effect, expected observation and cleanup**. Obtain any
missing permission for that actual test. A working credential does not authorize a diagnostic message to a different
group.

Start from the failed action and trace its real execution path. For a detection, distinguish the
toolbar click, content-script reachability, observation collection, matcher work, the published snapshot, the badge and
the panel's rendering of that snapshot. A passing Vitest suite isolates logic; it cannot replace loading the built
extension in the browser that failed.

The target runtime is a browser, a version and an extension context: Chrome's service worker and offscreen document,
Firefox's event page, Safari's background page, a content script, a matcher worker, or a panel surface (side panel,
sidebar, popup, full page). A result in Chrome does not prove Firefox or Safari. A result in a normal window does not
prove a private window, where nothing may be persisted. Use the drivers in `tools/verify/` (`mise run verify firefox`,
`mise run verify safari`) for the scenarios they cover.

If the required actor, session or recipient is unavailable, mark that acceptance case **blocked** and continue
independent checks. Do not substitute a different action and label the original case passed.
