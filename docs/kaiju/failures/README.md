# Failure catalogue

Known DeepScope failures, their causes, repairs and prevention. The shared handbook's deployment examples and
retrospective coverage remain available below. Use the [overview](00-overview.md) to distinguish those historical
lessons from incidents reproduced in this extension.

Skills: `review-code`, `release-software`, `verify-behavior`, `build-extensions`.

| Part                                                                                                     | What it covers                                                                     |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [Overview](00-overview.md)                                                                               | Local incident evidence and the retained shared examples.                         |
| [Find the first cause before changing the system](01-find-the-first-cause-before-changing-the-system.md) | Evidence to keep, where the code ran, and which procedure to follow.               |
| [Start from the symptom](02-start-from-the-symptom.md)                                                   | Symptom index with first checks and entries.                                       |
| [Content scripts and catalog](03-content.md)                                                             | DS-01 busy content script, DS-02 prototype keys, DS-03 regex backtracking.         |
| [Builds](04-builds.md)                                                                                   | DS-04 MV2 default, DS-05 Fontless order, DS-06 build time, DS-07 jiti load.        |
| [Background runtime](05-runtime.md)                                                                      | DS-08 executor label, DS-09 private tabs, DS-10 stale badge, DS-14, DS-15.         |
| [Verification and CI](06-verification.md)                                                                | DS-11 Safari settings, DS-12 task cache, DS-13 smoke job; what does not apply.     |
| [Add the next incident without losing its lesson](09-add-the-next-incident-without-losing-its-lesson.md) | How to add an entry.                                                               |

## Shared incident lessons

The supplied handbook also retains [deployment symptoms](03-access-preparation-and-test-environments.md),
[data and initialization failures](04-data-private-networking-and-initialization.md),
[provider and delivery failures](05-provider-identity-plans-and-public-delivery.md),
[external runtime failures](06-runtime-consumers-email-storage-and-recovery.md),
[source gaps](07-current-source-gaps-and-acceptance-limits.md),
[derived safeguards](08-safeguards-derived-from-contracts.md), and
[retrospective coverage](retrospectives/README.md). These are historical examples;
DeepScope's DS entries and current reproductions determine a local incident.
