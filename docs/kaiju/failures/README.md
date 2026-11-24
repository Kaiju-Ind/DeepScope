# Failure catalogue

Known DeepScope failures, their causes, repairs and prevention. Crawl's deployment entries and its retrospective
coverage map (ItsAPlan, OpenATS) were not copied; see the [overview](00-overview.md).

Skills: `review-code`, `release-software`, `verify-behavior`, `build-extensions`.

| Part                                                                                                     | What it covers                                                                     |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [Overview](00-overview.md)                                                                               | What the catalogue holds and what was left in Crawl.                               |
| [Find the first cause before changing the system](01-find-the-first-cause-before-changing-the-system.md) | Evidence to keep, where the code ran, and which procedure to follow.               |
| [Start from the symptom](02-start-from-the-symptom.md)                                                   | Symptom index with first checks and entries.                                       |
| [Content scripts and catalog](03-content.md)                                                             | DS-01 busy content script, DS-02 prototype keys, DS-03 regex backtracking.         |
| [Builds](04-builds.md)                                                                                   | DS-04 MV2 default, DS-05 Fontless order, DS-06 build time, DS-07 jiti load.        |
| [Background runtime](05-runtime.md)                                                                      | DS-08 executor label, DS-09 private tabs, DS-10 stale badge.                       |
| [Verification and CI](06-verification.md)                                                                | DS-11 Safari settings, DS-12 task cache, DS-13 smoke job; what does not apply.     |
| [Add the next incident without losing its lesson](09-add-the-next-incident-without-losing-its-lesson.md) | How to add an entry.                                                               |
