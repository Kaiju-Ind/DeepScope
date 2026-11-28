# AE05 Deliver bounded milestones with one integration owner

Give each milestone an observable exit tied to the customer problem and next decision. Follow
[A01](../product/01-a01-start-from-the-product-question.md). For delivery, use the existing
[candidate, preview and production receipts](../project/09-candidate-preview-and-production-receipts.md); use preview
and production milestones only when deployment is part of the task.

| Milestone           | Exit evidence                                                                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Intake established  | Customer outcome, questions, options, current sources, smallest useful experiment and known owner actions recorded.                                                                     |
| Useful anchor established | Exact observation, source, conditions, time, limits, decision and next test recorded. A persistent failure or inconclusive result can complete a bounded investigation when its remaining question and next decision are explicit; it does not automatically answer the original product question. |
| Concrete plan ready | Verified owners, paths, APIs, commands, inputs, outputs, environment, failure behavior, cleanup and observable exits support the chosen next action. |
| Candidate verified  | Coherent source/configuration inputs, affected checks and exact published or built artifact identities recorded. Publication remains a separate observed result. |
| Preview usable      | Intended reviewer can complete the agreed journey in the named preview. A plan diff alone cannot satisfy this milestone.                                         |
| Production ready    | Reviewed candidate, actual target state, production configuration, valid plan and applicable data/recovery requirements established.                             |
| Production accepted | Deployed identities and required user outcomes observed; remaining limits and cleanup ownership recorded.                                                        |

Use bounded subagents for independent research, implementation or review. Give each a question, source references,
exclusive write paths, required evidence and a return condition. One coordinator owns shared manifests, locks,
integration and deployment state. Inspect returned changes and recheck affected behavior on the combined revision. A
subagent's passing result on an earlier tree does not certify a later merge.

Lead every progress update with the latest anchor: what was observed, when and under which conditions; what that means
for the customer problem; what remains unknown; and the next experiment or action. Link the receipt. Explain component
evidence in its actual scope and keep implementation activity separate from observed behavior. A completed research or
discovery task may rule out an approach; it does not imply that an implementation or release is complete.

If there is no new anchor, say so. Identify the shortest available test, or the exact prerequisite blocking it, and
continue independent work. Avoid an open-ended impasse built from more scaffolding and untested theories. Maintain the
research-experimentation cadence from A01 and record actual shortfalls without padding time. Keep waiting, optional
scope and rework visible in the original task and delivery clocks.
