# Exact acceptance action

| Field                          | Value to establish before the test                                                                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| User action and result         | The toolbar click, page load, navigation or panel action, and the visible result                     |
| Browser, version and context   | For example Firefox 160 event page with a sidebar, or Safari 26 background page with a popup         |
| Build                          | Commit and build (`.output/<browser>-mv3`, a Verify artifact or a release archive)                   |
| Page                           | A fixture from `tools/verify/fixtures.mjs` or a named real site                                    |
| Window kind                    | Normal or private; private must persist nothing                                                       |
| Evidence stages                | Content-script reachability, observations, matcher work, snapshot, badge, panel render                |
| Partial failure and retry      | What to inspect before repeating (diagnostics journal, stored snapshots)                              |

A store submission or a release is a different action with its own record; see the
[release receipt](09-candidate-preview-and-production-receipts.md).
