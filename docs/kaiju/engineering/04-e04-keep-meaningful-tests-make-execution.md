# E04 Keep meaningful tests, make execution efficient

For an unanswered product question, start with an isolated experiment that exercises the actual mechanism and needs as
little setup as possible. A direct invocation can provide useful evidence without becoming a maintained test harness.
Retain its raw observations, relevant failures, configuration and limits. Use a durable regression test when a changed
behavior needs ongoing protection. A passing isolated probe supports its local claim; verify the real consumer and
customer journey before declaring the product change complete. Follow the shared
[experiment guide](../../../.agents/guides/product/experiments.md).

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

Use runner-native file discovery and shard selection instead of passing every current file path manually. Node's
`node --test` discovers matching names, and its `--test-shard` splits test **files**; Deno and Vitest have their own
discovery and selection semantics. Filter by affected package, import graph or stable test pattern, then let the runner
enumerate files within that scope. For benchmark shards, keep measurement samples fresh, group comparable workloads and
document CPU contention, warmup, isolation and sample count. Do not equate greater shard count with lower cost.

Verify a newly added matching test is discovered automatically, a renamed or removed test changes the inventory and
cache key, a shared fixture change selects all dependents, and an unrelated source change does not invalidate a
correctly isolated result. Cross-check selected files with complete-suite discovery in a cold run. If the runner lacks a
trustworthy selection or caching mechanism, execute the broader suite rather than invent brittle manifest arrays.

Use the owning runner: Node `node:test` and appropriate `@std/expect` for compatible assertions; Deno native
tests/benchmarks where supported; Vitest for its unit/SSR/browser and benchmark projects. For Vitest 5, inspect the
installed benchmark API and existing configs before changing imports. Prefer synthetic clocks for deterministic
deadline/retry tests; validate cleanup, cancellation, retries and error paths. Shard only after measuring work balance
and duplicated setup. Keep expensive browser, database and live-provider checks explicit and named; mark unrun checks
**not checked**, never **passed**.
