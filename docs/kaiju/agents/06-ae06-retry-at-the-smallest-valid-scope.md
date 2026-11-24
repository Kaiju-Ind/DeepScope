# AE06 Retry at the smallest valid scope

Preserve the first error and inspect actual state before retrying. Classify the failed gate and changed inputs, then use
the repository's real command binding. Do not invent a generic resume command.
[P05](../procedures/05-p05-recover-a-failed-deployment.md) distinguishes repository-specific recovery and retained data.

| What changed or failed                               | Retry decision                                                                                                                                                                                                                               |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Missing permission, expired token or runner route    | Repair the exact capability; repeat that access check and dependent stages. Reuse an admitted artifact if its inputs are unchanged.                                                                                                          |
| Runtime-only configuration                           | Validate the changed contract and produce the required target plan. Reuse the artifact only when effective inputs are unchanged and the repository's source/provenance contract permits it; otherwise follow its new-candidate release path. |
| Application, lockfile, generated SDK or build inputs | Produce a new candidate and immutable identity; repeat affected checks and artifact qualification.                                                                                                                                           |
| Smoke test or transient provider failure             | Diagnose against the existing artifact and observed state. Repeat the failed operation only when its retry semantics and current state permit it.                                                                                            |
| Partial release or store rejection                   | Delete an unpublished draft and any pushed package version, fix the cause and re-run for the same tag; once published, ship a new patch version. A store never accepts a reused version.                                                     |

Do not move a release tag to conceal a new candidate or rebuild successful artifacts solely because a later environment
gate failed. Keep valid evidence attached to its exact inputs. Set a bounded retry condition; repeated failure at an
unchanged gate requires a new diagnosis, not another identical release cycle.

Keep exact-source admission intact. A repository may require a new artifact for its tagged-release path even when an
application file did not change. Reuse through a separately supported native recovery path does not waive that release
contract.
