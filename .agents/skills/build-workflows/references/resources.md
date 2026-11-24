# Conditional resource lookup

Read the entrypoint and shared quality contract first. Select a resource only
for its affected decision; this inventory is not a mandatory reading order.
Historical entrypoints are retained in version history.

| Resource | When to use it |
| --- | --- |
| [references/atomicity.md](../references/atomicity.md) | Transactions, idempotency, sequences, cross-store gaps and reconciliation. |
| [references/durability.md](../references/durability.md) | Authority for each fact, identities, determinism and which store to choose. |
| [references/failures.md](../references/failures.md) | Known failure signatures and recovery decisions. |
| [references/recovery.md](../references/recovery.md) | Restart and resume after an unload, lease expiry, replay and failpoint tests. |
| [references/utility-workflows.md](../references/utility-workflows.md) | Choosing a Promise, Task, Context or workflow, and DeepScope's IndexedDB and memory stores. |
| [references/workers.md](../references/workers.md) | Queues, claims, leases and fencing, timers, backpressure and poison work. |
