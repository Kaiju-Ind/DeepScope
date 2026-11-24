# AE05 Deliver bounded milestones with one integration owner

Give each milestone an observable exit. Use the existing
[candidate, preview and production receipts](../project/09-candidate-preview-and-production-receipts.md).

| Milestone           | Exit evidence                                                                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Intake established  | Required journey, current sources, actual command bindings and known owner actions recorded.                                                                     |
| Candidate verified  | Coherent source/configuration inputs, affected checks and exact published or built artifact identities recorded. Publication remains a separate observed result. |
| Preview usable      | Intended reviewer can complete the agreed journey in the named preview. A plan diff alone cannot satisfy this milestone.                                         |
| Production ready    | Reviewed candidate, actual target state, production configuration, valid plan and applicable data/recovery requirements established.                             |
| Production accepted | Deployed identities and required user outcomes observed; remaining limits and cleanup ownership recorded.                                                        |

Use bounded subagents for independent research, implementation or review. Give each a question, source references,
exclusive write paths, required evidence and a return condition. One coordinator owns shared manifests, locks,
integration and deployment state. Inspect returned changes and recheck affected behavior on the combined revision. A
subagent's passing result on an earlier tree does not certify a later merge.

Report the latest meaningful result, current uncertainty and next action. “Still building” without new evidence is not a
milestone. Keep waiting, optional scope and rework visible in the original request-to-preview and preview-to-production
clocks.
