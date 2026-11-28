# Implement the missing automation in useful increments

The reviewed repositories supply substantial building blocks. They do not yet supply one reusable controller for the
complete two-pass lifecycle. Bind the procedures to those existing operations first, then close the gaps in this order:

| Increment                     | Maintained behavior                                                                                                                                                                         | Acceptance evidence                                                                                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Early readiness report     | Read the project contract, inspect existing inputs, check the complete package/artifact cohort, and report owner-only actions before expensive work. Keep runtime-dependent checks visible. | A clean checkout produces a precise report with no secret values; a missing package grant or SMTP input appears at intake.                              |
| 2. Usable preview             | Select the candidate, allocate isolated data/origin, deploy through the real task, finish runtime service checks, and publish a preview receipt. Add explicit cleanup and expiry.           | Another person completes the stated journey at the recorded URL; the same procedure handles one missing prerequisite and cleanup failure.               |
| 3. Candidate promotion        | Reuse the selected artifact, create a production-specific plan, coordinate writers/migrations, verify the journey and record acceptance.                                                    | Artifact/configuration identity is traceable from preview through production; a rehearsed partial failure follows the correct repository recovery path. |
| 4. Stable shared capabilities | Extract repeated, proven behavior into the existing shared tooling or an appropriate published package. Keep application-specific settings and migrations local.                            | At least two real consumers exercise the contract; version updates and removal of duplicated consumers are verified together.                           |

These increments are a proposed implementation sequence, not completed automation. A new shared package is not required
to adopt the documents. If implementation requires publication or a controlled native CI job, report that dependency
through P01 before building its consumer.
