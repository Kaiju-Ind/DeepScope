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

The shared dependency-cache action discovers the native pnpm download store and
keys it by operating system, architecture, actual tool versions and native lock
inputs. It saves only after successful work, only for an admitted trusted event,
and only when the restore identity still matches. A changed lock or toolchain
cannot populate the old key. GitHub's branch and PR cache scopes remain enabled.
The cache contains downloads, not `node_modules`, credentials or test results.
Every run still performs the same frozen installation and WXT postinstall step.

This workflow is read-only: it does not publish the extension. Release work must
not treat a cache hit as evidence that tests or a build ran.

## Required checks and branch settings

The automatic check is **Type checks**. A manually started run is named
**Tests and Chrome build (manual)**. The old combined check name is deliberately
not reused for a type-only result.

The repository rulesets list was empty when this change was prepared. Reading
legacy branch protection returned HTTP 403, so its required-check configuration
could not be inspected or changed. If a rule requires the old combined name,
the repository owner must review that rule before merging. A manually dispatched
workflow is not a substitute for a required PR-triggered check.

This workflow pins the shared cache action to
`9d513530d1e52d70973f70c9b8e8c431641f88c5`. The same revision is declared in
`mise.toml`; update both together. It adds no private Git task packs and leaves
Node 26.11.1, pnpm 12.10.1 and the native package scripts unchanged.

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
