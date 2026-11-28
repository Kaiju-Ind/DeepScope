# Production promotion preserves identity and data

Select the candidate the reviewer actually used. Preserve its immutable application artifact when configuration permits.
Create a new target-specific infrastructure plan against current production state. A preview environment's Pulumi plan
cannot be transplanted into production.

Before applying, confirm exact source/configuration identity, current deployment state, required service access,
migration compatibility, backup/restore evidence and the intended rollout. Existing authorization may cover the
operation; otherwise the user must review the concrete target and plan at the final decision point. Do not add repeated
approval prompts after authorization is established.

For a compatible change, use the supported rolling or limited rollout and evaluate real signals. For an upstream change
that requires maintenance, drain work, stop writers, verify they stopped, apply the schema change, then start compatible
consumers. A migration Job's dependency orders newly created resources; it does not stop an old API already writing.

Code rollback and data recovery are separate procedures. An older image may be incompatible with the new schema. Do not
restart it automatically after a failed migration. Preserve the phase record, inspect which side effects completed, and
choose a forward fix, compatible rollback or tested restore.
[Google's release and rollback guidance](https://cloud.google.com/blog/products/gcp/reliable-releases-and-rollbacks-cre-life-lessons)
supports staged schema compatibility and rollback testing; it does not guarantee arbitrary upstream downgrade safety.

Verify the deployed artifact and configuration, data connectivity, background work, critical public journey and agreed
observation signals. Retain prior identities and recovery evidence. Complete an immediate no-change plan where the
provider contract requires convergence. Separate that result from longer production observation and restore drills.
