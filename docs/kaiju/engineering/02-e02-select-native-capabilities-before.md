# E02 Select native capabilities before maintaining custom code

Audit the installed, pinned versions and command help. Do not substitute documentation from a different version. Compare
each custom wrapper with the actual native capability, the missing semantics, current consumers, and a behavior-parity
test before removing it.

| Area             | First inspect                                                                                         | Ownership and proof                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Mise             | The task families under `.mise/tasks/` (`check`, `test`, `build`, `zip`, `verify`, `lint:*`, `release:*`), tool pins, `#MISE tools=` | Thin tasks that `exec` the real command; a task cache is not a readiness check (a Mise result-cache trial was removed, see `docs/ci.md`) |
| pnpm             | Workspace graph (`utils/*`), frozen lockfile install, `wxt prepare` postinstall                        | Preserve integrity and package boundaries; a download cache is not a test-result cache                           |
| Node             | Version 26 (native Temporal), compile cache, `node:test` in vendored tests                             | Vendored `node:test` files run under Vitest through `utils/vitest.node-test.ts`                                  |
| TypeScript       | `tsc --noEmit` through `pnpm compile`; type-only test files                                            | Strict types over `src/`, `utils/`, `modules/` and scripts; type tests are compile-time only                     |
| Vitest/Vite      | Installed Vitest 5 API, the `runtime`, `utils` and `ui` projects, `bench`, the Solid plugin's `browser` condition | Keep Node resolution for runtime tests; only UI tests get the Solid transform; benchmarks stay on Vitest `bench` |
| WXT and Rolldown | Per-browser manifest, `--mv3`, build hooks, registry build module                                       | Inspect the emitted manifest and files; WXT defaults are not DeepScope's contract                                |

The vendored `@utils/*` workspace packages are the default candidate for generic functionality. Import their declared
exports, never another package's source path. Keep ordinary relative imports _inside_ a package. In the planned monorepo
the same rule holds for `@deepscope/*` packages under `packages/`.

**Keep manifests concise.** Express `test`, `bench`, `check` and `build` as a few stable task families and arguments.
Let Vitest and pnpm discover their owned files and packages. Use **patterns**, such as `src/**`, `tests/**`
or `**/*.test.ts`, where a task runner needs source inputs. A pattern describes the set and catches new files; a
hand-maintained list names today's members and silently misses tomorrow's. Review quoted glob expansion and exclusions
in the actual runner, rather than assuming all shells expand patterns alike. Source declarations for caching and
test-file discovery are related but not interchangeable.
