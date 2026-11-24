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
reason, and validation receipt. Distinguish these layers: toolchain downloads, pnpm/Deno dependency stores,
compiler/transform intermediates, deterministic task results, BuildKit cache mounts and image layers, and immutable
build/release artifacts. One layer's hit does not imply a hit in another. A task-cache hit must be attributable to exact
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

## Example task declarations, not universal defaults

```jsonc
// An example Deno project: the test runner discovers its own tests.
{
	"tasks": {
		"test": "deno test",
		"bench": "deno bench"
	}
}
```

```toml
# An example Node repository with test discovery and one native Mise result-cache owner.
# Validate the actual project command, supported source globs and dependency closure.
[tasks.test]
run = "node --test"
sources = ["src/**", "test/**", "tests/**", "package.json", "pnpm-lock.yaml"]
outputs = []
cache = { enabled = true, env = ["NODE_ENV"] }
```

The Mise cache above is experimental and needs the appropriate `experimental` setting and a proved deterministic test
task. An independently owned `deno task` can instead declare `files` input globs, `output` globs and `env` variable
names for Deno's native task caching. Do **not** stack Deno's and Mise's result caches on the same test without
measuring and assigning one authority. Neither example is permission to cache browser journeys, external services,
deployments, live time, or performance benchmark measurements.

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
trusted writers; do not allow PR-writable caches to become protected release inputs. For Docker, minimize the context,
order stable manifests and dependency acquisition ahead of frequently changing source, use BuildKit mounts for download
caches, and test remote layer imports/exports for each target architecture. A BuildKit layer hit is not evidence that
another runner reused its writable mount cache.
