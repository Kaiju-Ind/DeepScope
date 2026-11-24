# Build on the libraries already maintained

Search the vendored utilities, the platform and DeepScope's own modules before writing lifecycle, scheduling, worker,
storage or result mechanics. Inspect the actual exports, source and tests. A remembered package name is not an API
contract.

| Need                                        | Owner                                                    | What stays DeepScope's                                       |
| ------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| Success and failure values                  | `@utils/result`                                          | DeepScope's error codes and messages                         |
| Disposal and cleanup order                  | `@utils/dispose`                                         | Which module owns each resource                              |
| Deadlines and cancellation                  | `@utils/context` (with `@utils/duration`)                | Per-tab and per-document scopes and their budgets            |
| Capacity and admission                      | `@utils/scheduler/capacity`                              | Limits in `scheduler/budget.ts`, fairness policy             |
| Worker pool and worker protocol             | `@utils/pool`, `@utils/worker`                           | Kind affinity, shard loading, partition deadlines            |
| Durable queue and workflow history          | `@utils/scheduler/queue`, `@utils/workflow`, `@utils/storage` (IndexedDB) | Namespaces, labels, private tabs on memory stores only |
| Observables                                 | `@okikio/observables`                                    | Event names and payloads                                     |
| Prototype-free string-keyed maps            | `src/utils/dictionary.ts`                                | Every page-controlled key goes through it                    |
| Ordered writes, generations                 | `src/utils/fence.ts`, `src/utils/generation.ts`          | No Utils equivalent yet                                      |
| IndexedDB access                            | `idb`                                                    | Schemas and migrations                                       |
| Extension messaging                         | `comctx` over browser runtime messaging                  | The typed background and content APIs                       |

The migration order for adopting the vendored packages is in [`utils/README.md`](../../../utils/README.md#migrating-deepscope-code).

Use the web platform first: native Temporal where the browser has it, `structuredClone`, `AbortSignal`, `URL`,
`BroadcastChannel`, IndexedDB. Add a polyfill only for a supported browser that lacks the feature, in that browser's
build only. Avoid replacing a small, proven platform call with a framework just for uniformity.
