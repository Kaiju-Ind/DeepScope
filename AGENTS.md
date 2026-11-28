# DeepScope agent instructions

DeepScope is a public, open-source Manifest V3 browser extension for Chrome, Firefox and Safari. It detects the
technologies a web page uses, locally, from a registry of about 8,060 technologies derived from Wappalyzer data, and
shows the evidence behind each result. It is built with WXT, Solid and TypeScript, and released as per-browser archives
on GitHub Releases and ghcr, then submitted to the Chrome Web Store, addons.mozilla.org and the App Store. It has no
hosted service, remote database or deployment.

## How the instructions fit together

Three sources work together. Read the parts that the task needs from each.

| Source                 | What it decides                                                                                    | Start at                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Skills and guides      | How to do the engineering: standards, names, tests, docs, extension contexts, reviews and commits  | [.agents/START.md](.agents/START.md)         |
| Kaiju project playbook | How work is opened, verified, released and recovered, and the failures already learned             | [docs/kaiju/README.md](docs/kaiju/README.md) |
| DeepScope's own records | What exists and the decisions in force, and why                                                   | [docs/architecture/](docs/architecture/README.md), [docs/migration/](docs/migration/cross-browser-runtime-plan.md) |

The skills and guides apply to every change, including scripts, tests and benchmarks. The playbook says which procedure
a task belongs to; the skills say how to carry it out. Where they seem to disagree, DeepScope's records and this file
decide (ADRs in `docs/adr/`), and the conflict is worth a note to the maintainer.

[`tools/lint/guidance.test.ts`](tools/lint/guidance.test.ts) keeps the three sources consistent. It fails on a broken
link, a route to a skill that does not exist, a skill that nothing routes to, a private package in current application sources or project-specific instructions, an
`@okikio/*` name that is not an Okikio library, an `@utils/*` package that is not vendored, a task prompt that would
lose its skills or rules when copied, or a playbook folder and skill that do not link to each other. Each playbook
folder names its skills on a `Skills:` line, and each of those skills links back from a `Kaiju projects` section. It
runs in `mise run test` (Vitest project `guidance`). Shared handbook examples describe
upstream packages; they are checked for routes and links, not treated as installed dependencies.

Always read [.agents/guides/software-quality.md](.agents/guides/software-quality.md) and
[.agents/references/standards.md](.agents/references/standards.md). Then select by the decision that the task changes:

| Decision                                                         | Skill                                                    | Playbook                                                                          |
| ---------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Plan or restructure work, move toward the monorepo layout        | `plan-changes`, `refactor-code`                          | [Handbook](docs/kaiju/handbook/README.md)                                          |
| Extension contexts, manifests, messaging, badge, storage areas   | `build-extensions`                                       | [Platform readiness](docs/kaiju/platforms/README.md)                               |
| Scan jobs, scheduler, queue, recovery after a background unload  | `build-workflows`, `use-kaiju-utils`, `use-utils`                           | [Agent execution](docs/kaiju/agents/README.md)                                     |
| Vendored utilities (`@utils/*`), `tools/utils/sync.ts`           | `use-utils`                                              | [Vendored packages](docs/kaiju/platforms/01-private-tooling-packages-and-runnable-artifacts.md) |
| Panel UI (side panel, sidebar, popup, full page, options)        | `build-web`, `build-web-apps`, `design-interfaces`       |                                                                                   |
| `src/ui` primitives, accessibility                               | `shadcn`, `accessibility`                                |                                                                                   |
| Registry catalog, compiler, artifacts and matcher                | `build-libraries`, `benchmark-code`                      | [Engineering and CI](docs/kaiju/engineering/README.md)                             |
| Mise tasks, WXT config, CI workflows, scripts                    | `build-devtools`                                         | [Engineering and CI](docs/kaiju/engineering/README.md)                             |
| Tests and benchmarks                                             | `test-code`, `benchmark-code`                            | [Engineering and CI](docs/kaiju/engineering/README.md)                             |
| Real-browser verification                                        | `verify-behavior`, `build-extensions`                    | [P03](docs/kaiju/procedures/extensions/03-p03-deliver-a-usable-preview.md)                    |
| Okikio libraries (`@okikio/observables`)                         | `use-okikio`                                             |                                                                                   |
| A new dependency or an upgrade                                   | `explore-ecosystems`                                     | [P07](docs/kaiju/procedures/07-p07-update-upstream-artifacts-and-dependencies.md) |
| Docs, architecture records and plans                             | `write-docs`                                             | [Project record](docs/kaiju/project/README.md)                                     |
| Review, commit, pull request                                     | `review-code`, `commit-changes`, `prepare-pull-requests` | [Failure catalogue](docs/kaiju/failures/README.md)                                 |
| Archives, checksums, GitHub release, store submission            | `release-software`, `build-extensions`                   | [Procedures](docs/kaiju/procedures/README.md)                                      |

## Repository facts

Tools are pinned in `mise.toml` (pnpm 12, Node 26). Commands are thin Mise tasks under `.mise/tasks/`:

| Command                                          | What it does                                                                     |
| ------------------------------------------------ | -------------------------------------------------------------------------------- |
| `mise install`, `mise exec -- pnpm install --frozen-lockfile` | Install tools and dependencies                                       |
| `mise run check`                                 | Check packages, tools, app and utils through their native owners (TypeScript 7 and Node syntax checks)        |
| `mise run test`                                  | Vitest 5, every project (`extension (runtime)`, `extension (ui)`, `dom`, `registry`, `detection`, `utils`, `guidance`); add `--project <name>` |
| `mise run build <chrome\|firefox\|safari>`        | Unpacked Manifest V3 build in `.output/<browser>-mv3`                             |
| `mise run zip <browser>`                         | Store archive (Firefox also emits a sources zip)                                  |
| `mise run verify <firefox\|safari>`               | Real-browser scenarios against an existing build (`tools/verify/README.md`)     |
| `mise run lint:firefox`, `mise run lint:workflows` | `web-ext lint`; actionlint and zizmor                                           |
| `mise run safari-project`                        | macOS: wrap the Safari build in an Xcode project                                  |
| `mise run release:archives`, `release:check-version`, `release:push-oci`, `release:store-upload` | Release steps run by `release.yml` |

Benchmarks run with `pnpm bench` and the `bench:rules*` scripts (Vitest `bench`, `apps/extension/bench/*.bench.ts`).

Layout: a pnpm workspace. `apps/extension/` is the WXT app (`@deepscope/extension`, the release version's source):
`src/entrypoints/` (WXT entrypoints), `src/app/` (panel), `src/lib/` (extension capabilities),
`src/ui/` (component catalogue), `src/utils/`, `src/tests/`, `bench/`, `modules/` (WXT modules), `public/`. Beside it:
`packages/{dom,registry,detection}` (portable `@deepscope/*` sources), `utils/` (vendored `@utils/*`),
`tools/*` (native verify, release, registry, utils sync and lint packages), and `docs/`. Build output stays in
the root `.output/`. In this file, `src/` paths are under `apps/extension/`. Decisions live in `docs/adr/`
([monorepo plan](docs/migration/monorepo-plan.md)). New code should fit that direction; see
[the source layout plan](docs/migration/source-layout-plan.md).

## Repository rules

- Names are short. A dash in a file or folder name usually means a missing subfolder (`detection-snapshots.ts` becomes
  `snapshots/…`); the module namespace carries the context, so identifiers stay short.
- Correctness over speed: a result that is fast but unproven is not done. Prove equivalence with golden or property
  tests before an optimisation lands.
- Native web standards over polyfills. Use what the minimum browsers ship; add a polyfill only for the browser that
  lacks it, by build alias.
- Never infer a provider, host or store from a framework, and never infer a capability from a browser name.
- Read `use-kaiju-utils` for current public package contracts, then `use-utils` for this repository's recorded
  source closure. Preserve the credential-free source build until a complete published-package migration has the
  evidence and decision in [the Utils ADR](docs/adr/01-public-source-builds.md). `@okikio/*` is only for Okikio libraries.
- Page-controlled strings never key a plain object; use `@deepscope/detection/observations/dictionary`.
- Private tabs persist nothing.
- Find tests and files by discovery. Do not list test or file paths in `package.json`, Mise tasks or workflows.
- Repository files describe the system as it is. Plans in `docs/migration/` carry task state; other files contain no
  task IDs, commit SHAs or work-session words. Agent probes and reports go in `.tmp/`, which git ignores.
- Commit one behaviour, contract or capability at a time, with a Conventional Commit subject. Dependent pull requests
  form a stack.

## Anchor-based product development

Use [the product guide](.agents/guides/product/README.md) and
[A01](docs/kaiju/product/01-a01-start-from-the-product-question.md) before substantial implementation.
Start from the user outcome, the next decision, relevant unknowns and the smallest direct experiment.
The [DeepScope profile](docs/kaiju/profiles/deepscope.md) binds the generic method to this extension.
Run an existing native operation as soon as it can answer a material question. For each 60 research minutes,
spend at least 10 active minutes preparing, executing and interpreting relevant experiments; do not wait or pad time.
Keep the actual observation, conditions, source identity, product implication and next question in the owning plan.
Preserve failed and inconclusive evidence. Setup, a unit test and a built-extension journey prove different things.

## Using the playbook

Use [docs/kaiju/](docs/kaiju/start/README.md) for any change that has to reach users. Read the chapters the task needs.
The playbook routes work; current repository instructions, the skills and guides, verified source contracts and the
user's requirements remain authoritative.

Keep one active-task record ([AE01](docs/kaiju/agents/01-ae01-maintain-the-active-task-record.md)) in the plan under
`docs/migration/` that owns the work (its "Active task" section): outcome, questions, options, executed probes, observations, accepted decisions, authorization, sources, known
failures, full concrete plan, next action and a self-contained continuation. After a reset, handoff or interruption, reconcile it with the
latest user message, the branch, local changes and running workflows
([AE07](docs/kaiju/agents/07-ae07-preserve-work-and-resume-from-current.md)). Do not replay historical commands because
a record mentions them.

Before editing, establish the actual branch, base, dirty state and other writers, and preserve concurrent changes.
Report owner-only actions early: licence, catalog redistribution rights, store accounts and credentials, the Apple
Developer membership, the Firefox add-on id, repository settings. Never expose secret values.

For CI, builds, test runners or package imports, read [engineering](docs/kaiju/engineering/README.md) first. Test
native capabilities before adding wrappers, validate on fresh runners, and report elapsed time and total runner usage.

Verify in every browser the change affects. Mark checks passed, failed, blocked, not checked or not required. A green
workflow, a successful build or a passing Chrome check proves only itself. Pushing, tagging, creating releases and store
submissions need explicit authorization. Record failures in the [catalogue](docs/kaiju/failures/README.md) with
evidence, cause confidence, repair and a prevention action, and close remedies across fresh installs and recovery paths
([AE08](docs/kaiju/agents/08-ae08-close-incidents-in-fresh-install.md)).

Use bounded subagents for independent work, with exclusive write scopes and one integration owner. Review the combined
result and verify the necessary types, tests, builds and browser behaviour.
