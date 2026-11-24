# E02 Select native capabilities before maintaining custom code

Audit the installed, pinned versions and command help. Do not substitute documentation from a different version. Compare
each custom wrapper with the actual native capability, the missing semantics, current consumers, and a behavior-parity
test before removing it.

| Area                  | First inspect                                                                                                                            | Ownership and proof                                                                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mise                  | Stable `prepare`, `check`, `test`, `bench`, `build` task families; task dependencies, inputs, outputs, environment and cache diagnostics | Declare all relevant effects; don't create one-off wrappers or treat cache success as a live readiness check                                            |
| Deno                  | Native tasks, test selection (`--changed`/`--related` when supported), tests and benchmarks                                              | Test the chosen version's selection and concurrency; deterministic unit tests may reuse verified results, performance measurements need fresh execution |
| pnpm                  | Exact workspace graph, lockfile/frozen install, native filtering, dependency order and available pipeline caching                        | Preserve integrity, declared exports and package ownership; a download cache is not a test-result cache                                                 |
| Node                  | Native `node:test`, shards, parallelism, clock control, compile cache                                                                    | Measure process startup, isolation, failure reporting, and runtime compatibility; use `@std/expect` where its published contract is suitable            |
| TypeScript and tsdown | Exact compiler/compiler-cache behavior, declarations, ESM outputs and consumers                                                          | Check strict types and installed artifacts; measure generation separately from reuse                                                                    |
| Vitest/Vite           | Exact installed test API, projects, browser provider, benchmarking API, transform cache and shards                                       | Test browser interactions and benchmarks through supported APIs; verify existing v5 migration rather than assume it is absent                           |
| BuildKit              | Dependency-first layers, build contexts, cache mounts, export/import, multi-platform artifacts                                           | Inspect final image identity, startup, permissions and architecture; layer reuse cannot replace artifact/runtime verification                           |

Published `@kaiju-ind/*` utilities are the default candidate for generic functionality. Verify release versions and
export maps rather than importing another workspace's source path. Keep ordinary relative imports _inside_ a package.
For cross-workspace references, adopt declared package exports and verify the consuming installation before deleting old
code. Follow final Core/Intelligence/Billing/Utils ownership during migrations.

**Keep manifests concise.** Express `test`, `bench`, `check` and `build` as a few stable task families and arguments.
Let Node, Deno, Vitest and pnpm discover their owned files and packages. Use **patterns**, such as `src/**`, `tests/**`
or `**/*.test.ts`, where a task runner needs source inputs. A pattern describes the set and catches new files; a
hand-maintained list names today's members and silently misses tomorrow's. Review quoted glob expansion and exclusions
in the actual runner, rather than assuming all shells expand patterns alike. Source declarations for caching and
test-file discovery are related but not interchangeable.
