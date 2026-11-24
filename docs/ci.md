# DeepScope CI

Two workflows live in `.github/workflows/`:

| Workflow | Trigger | Purpose |
| --- | --- | --- |
| `verify.yml` (**Verify**) | every pull request, pushes to `main`, manual | type checks, the full Vitest suite, Chrome/Firefox/Safari builds, Firefox add-on lint, workflow lint |
| `release.yml` (**Release**) | `v*` tags, manual dry run | release archives, `SHA256SUMS`, provenance, GitHub Release, ghcr.io; see [release/README.md](release/README.md) |

Both call the same Mise tasks a developer runs locally, so a CI failure can be
reproduced with the command shown in the failing step.

## Local commands

Tools are pinned in the root `mise.toml` (Node, pnpm). Task files under
`.mise/tasks/` are thin wrappers that pass arguments to the package scripts or
native tools; the root `package.json` scripts stay the owner of what "compile"
and "test" mean, delegating to `apps/extension` (`@deepscope/extension`) where
the app owns the command.

| Command | Runs |
| --- | --- |
| `mise run check` | `pnpm run compile` (`tsc --noEmit` for `apps/extension`, `utils`, `tools` and the root config files) |
| `mise run test [vitest args]` | `pnpm run test:run` — Vitest discovers every test through the projects in the root `vitest.config.ts` (`apps/extension` contributes `extension (runtime)` and `extension (ui)`) |
| `mise run build <chrome\|firefox\|safari>` | `wxt build -b <browser> --mv3` in `apps/extension`, into the root `.output/<browser>-mv3` |
| `mise run zip <chrome\|firefox\|safari>` | `wxt zip -b <browser> --mv3`; Firefox also writes a sources zip |
| `mise run lint:firefox [dir]` | Mozilla `web-ext lint` on an unpacked Firefox build |
| `mise run lint:workflows` | `actionlint` and `zizmor --offline` on `.github/` |
| `mise run release:archives [browsers]` | zips each browser, then writes release-named archives and `SHA256SUMS` to `.output/release` |
| `mise run release:check-version <tag>` | fails unless the tag equals the `apps/extension/package.json` version |
| `mise run safari-project` | macOS only: wraps the Safari build in an Xcode project and builds it unsigned |

`--mv3` is passed explicitly because WXT 0.21 builds Firefox and Safari as MV2
unless `wxt.config.ts` sets `manifestVersion: 3`. It is harmless once it does.

No task lists individual test, source or benchmark files. A new test under
`apps/extension/src/tests/` is picked up by Vitest without editing any task or workflow.

## Verify workflow

```
prepare ──┬── check (Type checks)
          ├── test (Tests)
          └── build [chrome, firefox, safari] ──┬── lint-firefox
                                                ├── smoke-chrome
                                                └── safari-xcode (opt-in, macOS)
workflows (Workflow lint, independent)
```

- **prepare** runs `pnpm install --frozen-lockfile` once and, on trusted refs
  only, saves the download caches. Every other job restores them read-only and
  installs again (an install from a warm store takes seconds).
- **build** uploads each browser's zips as the `extension-<browser>` artifact
  (7-day retention) for review. Release archives are never taken from these;
  the release workflow rebuilds from the tag.
- **lint-firefox** unpacks the Firefox build and runs `web-ext lint`. It fails
  on lint *errors* (for example a missing `browser_specific_settings.gecko.id`),
  which is what addons.mozilla.org rejects. Until the Firefox manifest work
  (milestone 3 of the cross-browser plan) adds the add-on id, this job fails.
- **smoke-chrome** runs `pnpm run validate:chrome-artifact` against the CI
  Chrome build **only if that script exists in `package.json`**. The script is
  not on this branch yet; until it is, the job prints a notice and succeeds
  without claiming a smoke test ran. Treat that state as *not checked*.
- **safari-xcode** costs macOS minutes (10x Linux), so it runs only when a PR
  carries the `ci:safari` label or a manual run sets the `safari-xcode` input.
- **workflows** lints the workflow files. `.github/zizmor.yml` disables only the
  `self-repository` audit: zizmor prefers `uses: $/...`, which actionlint
  1.7.12 still rejects.

Every job has a timeout, every action is pinned to a full commit SHA with its
version in a comment, and every checkout uses `persist-credentials: false`. The
workflow token is `contents: read` throughout.

### Runners

Jobs use GitHub-hosted `ubuntu-24.04`, which is free for public repositories,
matches the Firefox reviewers' Ubuntu 24.04 build environment, and is a
GitHub-hosted runner for attestation purposes. The previous workflow used
Ubicloud's `ubicloud-standard-2`; to return to it, change `runs-on` in
`verify.yml` (release jobs should stay GitHub-hosted so provenance does not
name a third-party runner).

### Concurrency

Automatic runs cancel an outdated run for the same PR or branch. Manual runs
are grouped by commit SHA and never cancel a build that already started.

## Dependency caching

Cache layers and their owners:

| Layer | Owner | Written by | Read by |
| --- | --- | --- | --- |
| Node/pnpm binaries | `jdx/mise-action` | `prepare` on trusted refs | all verify jobs |
| pnpm download store (`$RUNNER_TEMP/pnpm-store`) | `actions/cache` save/restore | `prepare` on trusted refs | all verify jobs |
| `node_modules`, WXT output, test results | not cached | — | — |
| release archives | release workflow artifact | release `build` job | later release jobs |

The pnpm key is `deepscope-pnpm-v2-<os>-<arch>-<node>-<pnpm>-<hash of mise.toml,
mise.lock, pnpm-lock.yaml, pnpm-workspace.yaml and every workspace package.json>`. `prepare`
recomputes it after a successful install and saves only a miss whose inputs did
not change. A cache failure never skips the frozen install.

**Trusted writers** (`TRUSTED_CACHE_WRITER` in `verify.yml`): pushes to `main`
or a protected branch, same-repository non-fork PR merge refs, and manual runs
on branches. Fork PRs read caches but never write them. GitHub scopes PR caches
to the PR's merge ref, so a PR cannot write a cache that `main` or a tag reads.
The release workflow goes further and restores **no** cache at all: it installs
cold from the lockfile so nothing a PR run produced can reach a published
archive.

A cache hit is not evidence that a test or build ran; each job executes its
command every time. WXT output is not cached because `wxt.config.ts` embeds a
build timestamp and fetches fonts during the build.

### Native task-cache experiment (November 2026)

Mise stored a 546-byte type-check result in one run and restored it in the
next, but still reported `cache miss` and re-ran `tsc --noEmit` (Actions run
42711392941 on the former private repository). The result cache was removed.
Keep type checks executing on every PR update until the WXT-generated input
closure gives a stable key and a measured saving.

## Required checks and branch settings

The checks a branch rule should require are **Type checks**, **Tests**,
**Build (chrome)**, **Build (firefox)**, **Build (safari)** and **Workflow
lint**. Add **Firefox add-on lint** once the Firefox manifest has its add-on
id. Do not require **Chrome artifact smoke** until `validate:chrome-artifact`
exists, because until then its success means "not run". The previous single
check names (`Type checks` / `Tests and Chrome build (manual)`) are replaced;
an owner must update any ruleset that names the old ones.

## Dependency updates

`renovate.json` is self-contained (the repository is public and cannot extend a
private preset):

- `config:best-practices`, which pins GitHub Actions and Docker digests;
- one grouped PR for minor, patch, pin and digest updates, scheduled early
  Monday (UTC), plus monthly lock-file maintenance;
- `minimumReleaseAge: 3 days` for ordinary updates;
- vulnerability fixes (GitHub and OSV advisories) open immediately, outside the
  schedule and without the release-age wait, labelled `security`;
- the Solid 2 major is held back until its UI dependencies support it;
- custom managers update the tool versions pinned inside `.mise/tasks/*`
  (`#MISE tools={...}`) and the Mise version passed to `jdx/mise-action`.

## Timing

Not yet measured on GitHub-hosted runners for this layout. Locally (Apple
silicon, warm pnpm store): `mise run release:archives chrome firefox` took 17 s
wall clock; `web-ext lint` 7 s. Record the first hosted run's wall clock and
the sum of job durations here, with the run id, before tuning the job split.
