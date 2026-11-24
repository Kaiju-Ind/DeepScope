# AE05 Deliver bounded milestones with one integration owner

Give each milestone an observable exit. Use the existing
[build and release receipts](../project/09-candidate-preview-and-production-receipts.md).

| Milestone           | Exit evidence                                                                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Intake established  | Required journey, current sources, actual command bindings and known owner actions recorded.                                                                     |
| Candidate verified  | Coherent source/configuration inputs, affected checks and exact published or built artifact identities recorded. Publication remains a separate observed result. |
| Preview usable      | The reviewer loads the per-browser build and completes the agreed journey in each target browser. Tests alone cannot satisfy this milestone.                     |
| Release ready       | Version, tag, changelog, archives, `SHA256SUMS` and store prerequisites established for the reviewed commit.                                                     |
| Release accepted    | Published release verified (checksums, attestations, `gh release verify`); store submissions recorded with their review state and limits.                       |

Use bounded subagents for independent research, implementation or review. Give each a question, source references,
exclusive write paths, required evidence and a return condition. One coordinator owns shared manifests, locks,
integration and release state. Inspect returned changes and recheck affected behavior on the combined revision. A
subagent's passing result on an earlier tree does not certify a later merge.

Report the latest meaningful result, current uncertainty and next action. “Still building” without new evidence is not a
milestone. Keep waiting, optional scope and rework visible in the original request-to-preview and preview-to-release clocks.
