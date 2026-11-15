# DeepScope CI checks

Pull requests against any branch and pushes to `main` run the existing TypeScript command,
`mise exec -- pnpm run compile`. This is a source check, not a test or build result.

Use **Actions → DeepScope checks → Run workflow**, select the branch, and start
the workflow to run `mise exec -- pnpm run check:release`. That existing command
checks types, runs Vitest, and builds the Chrome extension. Review the run's
source commit before using its result. A new source commit needs a new test run.
A passing automatic type check does not mean the manual tests passed.

The last combined job at source `1e88a2e672fc98acaab1b219b65c39978666e231` took
128 seconds from job start to completion in Actions run `41603619534`.
The two-minute policy therefore moves the combined command to manual execution.
Automatic type checks have a two-minute timeout including preparation. Manual
execution retains its 25-minute budget and all existing checks. Hosted timing
observations still matter: a timeout is a cost bound, not proof that a check passes.

## Dependency caching

Mise caches the selected Node and pnpm toolchain after the job. Same-repository
PRs may save that cache; fork PRs cannot. Application tools remain pinned in this
repository's `mise.toml`.

Public GitHub cache actions restore and save a dedicated pnpm store under the
runner's temporary directory. `PNPM_CONFIG_STORE_DIR` makes the native installer
use that location. The key includes operating system, architecture, actual Node
and pnpm versions, and the tool, lock, package and workspace configuration files.
The workflow rechecks that identity after successful work and saves only a miss
whose inputs still match. Cache failures do not skip the frozen installation,
WXT postinstall step or selected checks.

Dependency cache writes are limited to this repository's main or protected
pushes, same-repository nonfork PR merge refs, and manual branch runs. GitHub's
branch and PR cache scopes remain enabled. The cached store excludes the
checkout, installed `node_modules`, credentials, WXT output and test results.
This public repository uses public actions directly because GitHub does not
allow public consumers to use actions from a private repository. The replacement
uses a new cache namespace, so its first run starts without the old cache.

This workflow is read-only: it does not publish the extension. Release work must
not treat a cache hit as evidence that tests or a build ran.

### Native task-cache experiment

On November 9, 2026, the same source was tested twice in
[Actions run #42711392941](https://github.com/Kaiju-Ind/DeepScope/actions/runs/42711392941).
Mise stored a 546-byte type-check result in the first run. GitHub restored
that record on the second attempt, but Mise still reported `cache miss` and
executed `tsc --noEmit` again. The completed jobs took approximately 57
and 38 seconds, respectively. The latter also restored the pnpm download
store and Mise binaries, so its improvement is not a task-result cache saving.

The experimental result cache was removed. Keep type checks executing on
every PR update until the WXT-generated input closure can produce a stable
native cache key and a measured decrease in total job cost.
## Required checks and branch settings

The automatic check is **Type checks**. A manually started run is named
**Tests and Chrome build (manual)**. The old combined check name is deliberately
not reused for a type-only result.

The repository rulesets list was empty when this change was prepared. Reading
legacy branch protection returned HTTP 403, so its required-check configuration
could not be inspected or changed. If a rule requires the old combined name,
the repository owner must review that rule before merging. A manually dispatched
workflow is not a substitute for a required PR-triggered check.

The restore and save actions use the same immutable `actions/cache` revision,
`55cc8345863c7cc4c66a329aec7e433d2d1c52a9` (v6.1.0). Mise selects Node 26.13.0
and pnpm 12.19.0 from the local tool configuration. The workflow uses the native
package scripts and has no private Git task packs or action dependency.

## Parallel branches and manual requests

Type checks run on every PR layer, including PRs whose base is another branch.
The full manual command does not use affected-file selection, so it needs no
comparison base. Select the exact top branch to check a complete stack; select
and check a lower prefix explicitly before landing only that prefix. These
source checks do not certify that the manual tests or build passed. A new
workflow must exist on the repository's default branch before GitHub offers its
manual dispatch control.

Automatic checks still cancel an outdated run for the same PR or branch.
Manual requests use a concurrency group containing their exact source SHA and
do not cancel an active build. GitHub's `single` queue keeps at most one pending
request for that SHA, replacing excess pending requests. The remaining pending
request still executes after the active run; this is bounded serialization,
not proof that duplicate work has been eliminated. Different source revisions
and parallel branches with different SHAs can proceed independently.

Jobs use Ubicloud's 2-CPU x86 runner, preserving the previous private GitHub
runner's architecture and 8 GB memory shape. Lower minute pricing does not prove
an execution-time improvement; compare complete cold and warm hosted runs.

WXT still builds fresh output on each manual run. Its configuration embeds a
time-based build identity and consumes font-provider inputs, so this workflow
does not cache a successful WXT result or substitute a previous extension
artifact for the current build.
