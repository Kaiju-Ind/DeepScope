# DeepScope CI checks

Pull requests and pushes to `main` run the existing TypeScript command,
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
qualification retains its 25-minute budget and all existing checks. Hosted timing
observations still matter: a timeout is a cost bound, not proof that a check passes.

## Dependency caching

Mise caches the selected Node and pnpm toolchain. Pull requests restore that cache
without saving it. Main pushes and manually started runs can populate their
GitHub-scoped cache.

The pnpm download-store key includes operating system, architecture, `mise.toml`,
`pnpm-lock.yaml`, and `.npmrc`. A changed lock or toolchain gets a different key.
GitHub's trigger-specific cache access rules remain enabled. The workflow does
not grant pull requests cache-write access, cache `node_modules`, or cache
credentials. A cache miss still runs the same frozen installation and the WXT
postinstall step.

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

This workflow uses pinned upstream Actions and local `mise.toml`; it does not
depend on a shared-tooling PR being merged.

Mise saves installed tools after the job finishes, including tools prepared by
later steps. Same-repository PRs may save the native tool cache; forks cannot.
The pnpm store caches downloads only. Frozen installation, type checks and
manual release tests still run with the current source and lockfile. This
repository currently uses native Mise directly rather than the shared catalog.
