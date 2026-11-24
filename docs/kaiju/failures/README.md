# Failure catalogue

Known deployment failures, their causes, repairs and prevention.

Skills: `review-code`, `release-software`.

| Part                                                                                                     | What it covers                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Overview](00-overview.md)                                                                               | Use this catalogue to identify the failing contract, preserve the evidence, and choose the smallest repair.                                       |
| [Find the first cause before changing the system](01-find-the-first-cause-before-changing-the-system.md) | Use P01: intake for missing owner actions, P02: service checks for prerequisite...                                                                |
| [Start from the symptom](02-start-from-the-symptom.md)                                                   |                                                                                                                                                   |
| [Access, preparation and test environments](03-access-preparation-and-test-environments.md)              | These checks belong near intake.                                                                                                                  |
| [Data, private networking and initialization](04-data-private-networking-and-initialization.md)          | These failures cross application and platform ownership.                                                                                          |
| [Provider identity, plans and public delivery](05-provider-identity-plans-and-public-delivery.md)        | Use the Bunny, DNS and deployment-state contracts.                                                                                                |
| [Runtime consumers, email, storage and recovery](06-runtime-consumers-email-storage-and-recovery.md)     | Use P03 to verify the selected user journey through the actual runtime, P05 for recovery, and P08 to move the defect's detection earlier.         |
| [Current source gaps and acceptance limits](07-current-source-gaps-and-acceptance-limits.md)             | These are current observations at the pinned review revisions, not additional entries in the 46-entry count.                                      |
| [Safeguards derived from contracts](08-safeguards-derived-from-contracts.md)                             | The following are design requirements found while tracing consumers.                                                                              |
| [Add the next incident without losing its lesson](09-add-the-next-incident-without-losing-its-lesson.md) | Under P08, add a stable entry with the exact symptom, first failed operation, cause confidence, source/artifact/target identities, repair, evi... |
| [Retrospective coverage](retrospectives/README.md)                                                       | How each finding from the deployment retrospectives changed the procedures.                                                                       |
