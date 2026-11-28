# Procedures

The eight procedures P01 to P08, from opening a project to maintaining a procedure.

Skills: `release-software`, `build-devtools`, `build-data`.

| Part                                                                                                   | What it covers                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Overview](00-overview.md)                                                                             | These procedures specify actions, evidence and recovery.                                                                                                                                      |
| [P01 Open the project and report prerequisites](01-p01-open-the-project-and-report-prerequisites.md)   | Identify whether the task is a new installation or a change to an existing instance.                                                                                                          |
| [P02 Verify required service contracts](02-p02-verify-required-service-contracts.md)                   | A readiness record contains service/contract version, environment, runtime, principal reference, source/client version, checked operation, observation time, evidence and invalidation rules. |
| [P03 Deliver a usable preview](03-p03-deliver-a-usable-preview.md)                                     | Build one candidate artifact per effective build configuration.                                                                                                                               |
| [P04 Promote the reviewed candidate](04-p04-promote-the-reviewed-candidate.md)                         | Keep irreversible work out of speculative preview operations.                                                                                                                                 |
| [P05 Recover a failed deployment](05-p05-recover-a-failed-deployment.md)                               | Recovery depends on the repository.                                                                                                                                                           |
| [P06 Retire a preview](06-p06-retire-a-preview.md)                                                     | If identity or ownership is ambiguous, stop deletion and inspect the original receipt.                                                                                                        |
| [P07 Update upstream artifacts and dependencies](07-p07-update-upstream-artifacts-and-dependencies.md) | Renovate's version proposal is not proof of source integration.                                                                                                                               |
| [P08 Validate and maintain a procedure](08-p08-validate-and-maintain-a-procedure.md)                   | An independent document review can expose omissions.                                                                                                                                          |
| [Writing procedures](writing/README.md)                                                                | How to write a procedure that produces a verified result, with its primary sources.                                                                                                           |

DeepScope binds P01–P08 to its [extension procedures](extensions/README.md).
Use those concrete browser, archive, release and recovery commands for this repository.
