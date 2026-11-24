# P05 Recover a failed deployment

**Trigger:** preparation, apply, migration, startup, convergence or user acceptance fails. **Outcome:** a known safe
state and a justified next action.

| Step | Action                                                   | Expected result                                                                 | If it fails                                                                |
| ---- | -------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 1    | Stop additional mutations and preserve bounded evidence. | First error, phase, source, plan, state and affected resource IDs are retained. | Preserve the best available state; report missing evidence explicitly.     |
| 2    | Read actual provider, workload and database state.       | Completed, pending and unknown side effects are distinguished.                  | Treat access/read errors as unknown state, never as an empty installation. |
| 3    | Identify the earliest causal failure.                    | A class and cause confidence are recorded using the failure catalogue.          | Retain hypotheses separately; do not repair unrelated symptoms first.      |
| 4    | Determine whether writers or jobs remain active.         | Work is safely drained or its ongoing effect is understood.                     | Keep recovery isolated until concurrency is controlled.                    |
| 5    | Choose the supported project recovery path.              | Retry, forward repair, compatible code rollback or restore has valid evidence.  | Escalate a concrete missing decision; continue safe diagnosis.             |
| 6    | Execute only the authorized recovery action.             | Resource and data state converge without replacing unrelated work.              | Preserve the new phase and reassess before another attempt.                |
| 7    | Repeat affected service and user checks.                 | The repaired contract works and the claimed outcome is restored.                | Keep failure status until the relevant outcome passes.                     |
| 8    | Record one owned prevention action.                      | The incident has a checkable improvement, owner and completion condition.       | Keep the action open; a warning paragraph alone is not closure.            |

Recovery depends on the repository. **OpenATS** supports original bound plan/continuation evidence on specific retry
paths. **ItsAPlan** does not have a generic `deploy resume` command. Its procedure inspects journal/state/schema,
repairs the issue, and creates a new reviewed plan when required. Follow the actual command and state contract.
[OpenATS deployment](https://github.com/Kaiju-Ind/OpenATS/blob/3b30f7e34a16dca68fe1ac354438ea93ef6fad26/docs/deployment.md);
[ItsAPlan deployment](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/docs/deployment.md).

Never remove a saved-plan check to force success. Never assume a timeout means no provider action occurred. Never
downgrade a database automatically because an older application image starts. Preserve generated credentials and stable
resource identities across initial-install retries.

Use the existing artifact to investigate runtime failures. Avoid rebuilding an unchanged candidate to inspect a command,
architecture, port or package path. Keep raw credentials and personal payloads out of public logs and support bundles.

Choose the retry scope from the evidence:

| Failure class                                       | Smallest valid next operation                                                                                                                                                        |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Environment or access failure with unchanged source | Repair the required identity/service and rerun the failed check; preserve valid earlier evidence.                                                                                    |
| Published image behavior                            | Diagnose that digest and platform through the supported existing-image path.                                                                                                         |
| Infrastructure/configuration change                 | Reuse the admitted artifact only when effective inputs are unchanged and the repository's source/provenance contract permits reuse. Otherwise follow its new-candidate release path. |
| Application behavior change                         | Rebuild and verify affected artifacts plus required gates, then create the new immutable release identity.                                                                           |
| Missing original evidence or ambiguous side effects | Inspect actual state and use the documented new-release/recovery path; do not silently fabricate continuation evidence.                                                              |

When state is absent, initialized-empty, metadata-only, partially external or pending/unknown, record that distinction
explicitly. Access/read failures remain unknown. An asynchronous private Service can still be reconciling while the
database is healthy; use a bounded wait with phase-specific diagnostics before changing resources.
[AE06](../agents/05-ae05-deliver-bounded-milestones-with-one.md) governs focused diagnosis, and
[AE07](../agents/06-ae06-retry-at-the-smallest-valid-scope.md) governs resumption after interruption.

Never weaken exact-source admission to avoid a build. An authorized historical native recovery path is not a general
exception to a repository's tagged-release contract.

| Observed installation state                          | Safe decision to bind to the repository                                                                                             |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Verified absent state                                | Establish the intended target and first-install inputs, then use the supported initialization path.                                 |
| Initialized but empty                                | Inspect native history/resource counts; preserve the supplied inputs rather than restoring a nonexistent deployment.                |
| Expected metadata only                               | Preserve generated credentials and known provider/stack metadata; use only the repository's narrowly admitted retry shape.          |
| External resources or migration already present      | Inventory owned resources, schema and writers; preserve data and choose the supported recovery plan or original bound continuation. |
| Pending operations, unreadable or unclassified state | Keep state unknown; inspect and resolve it before another writer, initialization or deletion.                                       |

A phase journal records an attempted operation. It is not an atomic snapshot of provider or database state.
