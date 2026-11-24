# Kubernetes, KubeBlocks and recoverable data

**Inputs and owner.** Platform supplies cluster identity, namespace and RBAC. Stateful consumers also need the relevant
StorageClass, node placement, installed KubeBlocks/operator/addon definitions and BackupRepo. The instance owns its
Cluster, app role, workload secrets, migration and retained data. The application owns schema compatibility. A stateless
workload does not need database or backup steps; record them as not required with the reason.

**Procedure.**

1. Connect from the actual deployment runner. Confirm the intended cluster and namespace, required API permissions and
   healthy required controllers. For KubeBlocks consumers, also confirm the installed database
   ComponentDefinition/service version and eligible data nodes.
2. For persistent volumes, confirm storage binding behavior, capacity, access mode and data-node placement. Prove that a
   representative consuming workload can mount its volume. Account for `WaitForFirstConsumer`; an IaC wait must not
   prevent the first consumer from being created.
3. When the application needs a database, create or verify it through its owner. Check readiness, the dedicated
   application role and app-runtime connectivity. Administrator credentials should remain in the controlled bootstrap
   operation.
4. When schema changes are required, run the supported migration using the selected application artifact. Establish
   whether existing writers must stop. For maintenance migrations, verify their shutdown before schema changes, then
   restore only compatible consumers.
5. For production or retained preview data, verify a successful backup and restore it into an isolated destination.
   Check ownership, expected records and application reads. Record elapsed restore time and the recoverable backup
   position before claiming recovery readiness. For an explicitly disposable preview with synthetic data, prove
   reset/recreate and cleanup instead; label the data disposable and do not claim recovery readiness. P04 still requires
   the production recovery evidence.

Before selecting a new database major or custom image, prove the application requirement from its actual
client/migration contract and compatibility evidence. Compare that requirement with the installed catalog, storage
layout and restore tooling. An imported patch floor is not sufficient proof. Keep platform security maintenance with its
owner; do not silently upgrade every instance to satisfy one application's tooling choice.

KubeBlocks's documented PostgreSQL PITR procedure requires a full backup and continuous WAL backup covering the
requested time. Operator installation alone does not establish either.
[KubeBlocks PITR](https://kubeblocks.io/docs/release-1_0_2/kubeblocks-for-postgresql/05-backup-restore/06-restore-with-pitr).
Current ItsAPlan config has one database replica and explicitly disables PITR and incremental backups. It must not be
described as HA or as providing automatic point-in-time recovery.
[Database source](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/infra/database.ts).

**Evidence and acceptance.** Retain the applicable cluster/definition identity, PVC binding, migration Job status and
app-role connection result. For retained data, include backup ID and restore verification. For disposable synthetic
data, include the reset/recreate result and cleanup owner. A `Running` Cluster or a backup object is only part of that
evidence.

**Repeat and recovery.** First installation verifies provisioning and the applicable reset or recovery contract. Each
deployment checks current health, capacity, relevant backup freshness and migration compatibility. Database-major,
addon, storage, backup-key, schema or topology changes require the affected checks again. On failure, preserve
Jobs/logs/state and follow P05. Do not delete protected data to make an apply green, adopt a foreign-owned database, or
equate an older image with a database rollback.
