# Handbook

How DeepScope work is structured: ownership, placement across extension contexts, files and the two delivery passes.

Skills: `plan-changes`, `refactor-code`, `build-extensions`.

| Part                                                                                                       | What it covers                                                                        |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [Overview](00-overview.md)                                                                                 | What the handbook is for.                                                             |
| [Start with the user's first useful action](01-start-with-the-users-first-useful-action.md)                | The journey, the browsers and the two passes.                                         |
| [Choose ownership and placement separately](02-choose-ownership-and-placement-separately.md)               | Artifact strategy, extension contexts, and today's layout with the planned monorepo.  |
| [Build on the libraries already maintained](03-build-on-the-libraries-already-maintained.md)               | Vendored `@utils/*`, platform features and DeepScope's own primitives.                |
| [Give each maintained file a clear owner](04-give-each-maintained-file-a-clear-owner.md)                   | Files and folders, task families, CI.                                                 |
| [Make the preview path short and complete](05-make-the-preview-path-short-and-complete.md)                 | From checks to a build loaded in real browsers.                                       |
| [Release preserves identity and data](06-production-promotion-preserves-identity-and-data.md)              | Reproducible builds, extension ids, versions, stored data.                            |
| [Measure the two passes without hiding waiting](07-measure-the-two-passes-without-hiding-waiting.md)       | Delivery and product measurements.                                                    |
| [Implement the missing automation in useful increments](08-implement-the-missing-automation-in-useful.md)  | The next automation, in order.                                                        |
| [Maintain the pattern without copying its defects](09-maintain-the-pattern-without-copying-its-defects.md) | Updates, vendored code and prevention.                                                |
