# P04 Promote the reviewed candidate

**Trigger:** a preview candidate is selected for production. **Outcome:** that candidate reaches production with
compatible data and verified user behavior.

**Entry:** preview receipt, immutable artifact identity, intended production scope, existing deployment identity,
migration classification and required operational evidence. Verify authorization already supplied in the session. If a
final approval is required, prepare the exact candidate and plan first.

| Step | Action                                                             | Expected result                                                                                                                                                                                                  | If it fails                                                                                |
| ---- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1    | Verify the selected candidate and current production source/state. | Source, locks, artifact, configuration and target identities are unambiguous.                                                                                                                                    | Reject stale or mismatched evidence.                                                       |
| 2    | Check production-specific service access and entitlement.          | Runtime and CI principals can perform the required operations.                                                                                                                                                   | Resolve access before beginning maintenance.                                               |
| 3    | Classify schema and data changes.                                  | Online-compatible, maintenance-required or no-schema-change behavior is documented from the upstream contract.                                                                                                   | Treat unknown migration compatibility as unresolved.                                       |
| 4    | Verify backup and recovery evidence for the intended change.       | Retained data has a suitable backup and tested recovery procedure; recovery targets are explicit. A stateless workload records data backup as not required and retains its artifact/configuration recovery path. | Do not equate a configured schedule with a successful restore.                             |
| 5    | Create and review the production-specific saved plan.              | Exact production state/configuration and candidate artifacts are bound to the plan.                                                                                                                              | Inspect unexpected replacements, data loss or provider identity drift.                     |
| 6    | Acquire the deployment ownership mechanism.                        | Competing updates to this stack/data set cannot race within the supported workflow.                                                                                                                              | Resolve the existing operation; do not assume CI serialization also locks local operators. |
| 7    | Apply the approved rollout or maintenance procedure.               | Writers, migrations and compatible consumers follow the required order.                                                                                                                                          | Preserve the phase record and enter P05.                                                   |
| 8    | Verify deployed identity, convergence and the critical journey.    | Runtime artifact/configuration match; background work and public behavior pass.                                                                                                                                  | Keep the operation failed or incomplete and diagnose the first cause.                      |
| 9    | Observe the project-defined release signals.                       | Error, latency and queue conditions meet the stated acceptance window.                                                                                                                                           | Roll back compatible code or execute the reviewed recovery path.                           |
| 10   | Save the production receipt and handoff.                           | Prior/new identities, evidence, limitations, owner and recovery path are recoverable.                                                                                                                            | Do not call the release accepted with missing evidence.                                    |

Keep irreversible work out of speculative preview operations. Migration Jobs use the exact admitted application artifact
where that is the upstream contract. Limit their lifetime and retry behavior. One deployment owner controls migrations;
every application replica must not race to migrate independently.

Before tagging, trace each new credential through secure source, presence/pair audit, encryption classification, runtime
injection, redaction, feature enablement and actual consumer. Check all changed consumers and launch audits together.
Publishing a feature with its flag disabled and verifying that a user can use the feature are different milestones.

ItsAPlan's maintenance path drains runners while the API can still receive their reports. It then stops the background
worker, stops old Bunny API instances, rechecks provenance, applies the plan, and restores declared consumers. This is a
project-specific sequence, not a universal order for every app. See
[its implementation](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/tools/deployment/deployment.ts).

For a canary or gradual rollout, define comparison signals and enough representative work to evaluate them. A small
replica count alone does not prove a safe canary. See
[Google SRE's canary guidance](https://sre.google/workbook/canarying-releases/). Use the platform's supported mechanism;
do not add a new rollout system without a demonstrated need.

**Exit evidence:** production receipt, critical-journey result, observation record and recovery references. A completed
workflow and an accepted release remain separate states until their promised checks align.
