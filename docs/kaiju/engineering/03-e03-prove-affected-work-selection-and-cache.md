# E03 Prove affected-work selection and cache correctness separately

**Affected-work selection** answers which tasks must run. **Cache admission** answers whether a selected task's verified
result can be reused. Never let a cache key decide that changed source has no affected consumers.

For each result-owning task, document its source and transitive inputs, manifest/lock versions, command and flags,
toolchain and shared tooling pins, environment variable _names and relevant safe values or digests_, operating
system/architecture, declared outputs, and downstream consumers. Do not persist credential values or CI-accessible
secret contents. Specify one authoritative result-cache owner per task. Separate package downloads, compiler
intermediates, deterministic task results and immutable release artifacts.

## Cache the right unit and make every layer visible

Maintain a **cache ledger** for each selected task, without creating another runtime cache owner. Include task identity,
discovered test/source set, owning package, input patterns and dependency closure, tool versions, output contract, cache
owner, local/remote scope, key explanation, trust/read-write mode, bytes transferred, restore/save duration, hit/miss
reason, and validation receipt. Distinguish these layers: toolchain downloads, the pnpm store, compiler/transform
intermediates, deterministic task results, and immutable build/release artifacts. One layer's hit does not imply a hit in another. A task-cache hit must be attributable to exact
inputs, not simply reported as a shortened job.

**Choose task granularity from behavior and dependency ownership.** One broad result keyed on a large source/test file
causes changes to invalidate the whole result. Where the file combines unrelated capabilities and the runner can execute
independent files, split it along natural responsibilities and fixtures, following the applicable file-structure and
test skills. Then evaluate whether the runner and cache owner can actually select/reuse those independent units.
Splitting a test file **does not itself create per-file test-result caching**. If the owner only caches a package-wide
`test` task, either define supported narrower task units through native discovery or accept the package-wide
invalidation. Never introduce one hand-maintained task name per test file.

Keep a missing, new, renamed or deleted test in the cache key and selected inventory. A change to test-runner
configuration, shared fixtures, runtime permissions, imports, transitive source, generated definitions or global setup
must invalidate all consumers. Unknown import edges or incomplete test discovery force conservative execution.
Cache-sensitive restructuring must not hide integration contracts or increase duplication enough to erase savings. The
oracle is the complete discovered suite, not a static list embedded in a test.

## DeepScope's declarations

```ts
// vitest.config.ts: projects select tests by glob, never by file list.
projects: [
	{ test: { name: 'runtime', include: ['src/tests/**/*.test.{ts,tsx}'], exclude: [UI_TESTS] } },
	{ test: { name: 'utils', include: ['utils/**/*.test.ts'] } },
	{ plugins: [solid()], test: { name: 'ui', include: [UI_TESTS] } },
],
```

```bash
# .mise/tasks/test: forward arguments; Vitest discovers the files.
exec pnpm run test:run "$@"
```

DeepScope caches only dependency downloads (Mise tools and the pnpm store) and caches no task results: a Mise result
cache stored a type-check result but never restored it, and was removed. Do not cache browser journeys, store uploads,
release builds or benchmark measurements.

Run invalidation tests for changes to each input class, deleted/moved files, altered permissions, tool versions, task
definitions, generated outputs and environment values. Prove cache-miss execution, hit restoration on a **fresh
runner**, failed/cancelled/skipped task behavior, corrupt or absent cache recovery, output verification and protected
branch/trust isolation. A cache hit never skips credential checks, migrations, live provider probes, security controls
or required release attestations. Benchmarks may cache setup, but not reuse old timing samples as new measurements.

Test restore/save order as an experiment: compare retrieving verified task outputs before an expensive install with
ordinary dependency-first setup, while maintaining lock and source integrity checks. A fast result without a validated
dependency/identity contract is not an optimization. Protect release consumers from untrusted PR writes.

**Record restore/save dependencies in order.** Benchmark cold/miss and warm/hit paths across distinct runner machines.
Reuse authenticated tool downloads and verified lockfile stores before compiler work when useful; compare against
restoring an authenticated, content-addressed task artifact first to avoid unnecessary installs. Restore task outputs
only when their producer and complete dependency identity match. Separate read-only untrusted PR cache consumers from
trusted writers; do not allow PR-writable caches to become protected release inputs. The Release workflow restores no cache at
all: it installs cold from the lockfile.
