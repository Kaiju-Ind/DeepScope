# E04 Keep meaningful tests, make execution efficient

Prefer capability and user-behavior tests over brittle snapshots of source spelling. A regular expression or AST check
is legitimate when its _real contract_ is syntax, security policy, public exports or dependency ownership. Classify the
purpose first. Move **only disposable investigation scripts, temporary AST probes, scratch outputs and redundant
implementation-detail assertions** into a project-owned hidden Git-ignored verification workspace. Keep durable
regression, security, schema, compatibility and release tests committed. Prove that the maintained test inventory does
not shrink accidentally.

## Design tests for discovery, isolation and selective execution

Use the repository's file-structure guidance to put a coherent capability's tests near its owner or in the designated
test tree. Split overly broad files when their cases exercise independent components, use different fixtures, or have
separate runtime/resource requirements. Keep related integration journeys together when splitting would obscure behavior
or add repeated setup. Ensure no test relies on another file's execution order, shared mutable process state, implicit
local time or leaked resources. Re-run all relevant tests with real cleanup, failures and concurrency, not just cached
results.

Use runner-native file discovery and shard selection instead of passing every current file path manually. Vitest
discovers files from each project's globs, and `--shard` splits test **files**; `mise run test --project 'extension (runtime)'` selects
a project. Filter by affected package, import graph or stable test pattern, then let the runner
enumerate files within that scope. For benchmark shards, keep measurement samples fresh, group comparable workloads and
document CPU contention, warmup, isolation and sample count. Do not equate greater shard count with lower cost.

Verify a newly added matching test is discovered automatically, a renamed or removed test changes the inventory and
cache key, a shared fixture change selects all dependents, and an unrelated source change does not invalidate a
correctly isolated result. Cross-check selected files with complete-suite discovery in a cold run. If the runner lacks a
trustworthy selection or caching mechanism, execute the broader suite rather than invent brittle manifest arrays.

Use the owning runner: Vitest 5 for DeepScope's tests and benchmarks, with `@fast-check/vitest` for properties and
`fake-indexeddb` for IndexedDB; vendored Utils tests keep `node:test` and `@std/expect` through the shim. Inspect the
installed benchmark API and existing configs before changing imports. Prefer synthetic clocks for deterministic
deadline/retry tests; validate cleanup, cancellation, retries and error paths. Shard only after measuring work balance
and duplicated setup. Keep real-browser checks (`mise run verify`) explicit and named; mark unrun checks
**not checked**, never **passed**.
