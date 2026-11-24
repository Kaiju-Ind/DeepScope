# Give each maintained file a clear owner

Create only files that have a real consumer. Paths marked *planned* follow the monorepo direction in
[ownership and placement](02-choose-ownership-and-placement-separately.md).

| File or directory                                   | Responsibility                                                                 |
| --------------------------------------------------- | ------------------------------------------------------------------------------ |
| `README.md`                                         | Purpose, the core journey, setup and common commands                           |
| `AGENTS.md`                                         | Agent routing, repository facts and owner rules                               |
| `.agents/`                                          | Skills, guides and references                                                  |
| `docs/kaiju/`                                       | This playbook                                                                  |
| `docs/migration/*-plan.md`                          | Working records of large efforts, each with an `## Active task` section       |
| `docs/architecture/`                                | How the system works now                                                      |
| `docs/adr/` (*planned*)                             | Decisions, with alternatives and consequences                                 |
| `docs/release/`, `docs/ci.md`                       | Release procedure, store checklists, CI layout                                |
| `mise.toml`                                         | Pinned Node and pnpm, Mise version floor                                       |
| `.mise/tasks/**`                                    | Thin argument-forwarding tasks: check, test, build, zip, verify, lint, release |
| `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml` | Dependencies, scripts that define compile and test, workspace packages     |
| `wxt.config.ts`                                     | Manifest per browser, aliases, build hooks                                    |
| `vitest.config.ts`                                  | Vitest projects (runtime, utils, ui) with native discovery                    |
| `modules/`                                          | WXT modules: registry build, artifact validation                              |
| `src/` (*planned:* `apps/extension/`, `packages/*`) | Extension source and tests                                                    |
| `utils/`                                            | Vendored `@utils/*` and DeepScope's browser stores                            |
| `scripts/` (*planned:* `tools/`)                    | Registry audits, release archives, utils sync, real-browser drivers           |
| `.github/workflows/`                                | Verify and Release; they call the Mise tasks                                  |
| `renovate.json`                                     | Update rules                                                                  |
| Ignored `.tmp/`                                     | Agent probes and temporary evidence                                           |

Keep names short and grounded in the domain. A dash in a file or folder name usually hides a missing subfolder:
`detection-snapshots.ts` becomes `snapshots/…`. Avoid layers named `manager`, `helpers`, `common` or `runtime` unless
they denote an actual concept. Comments explain ownership, units, defaults, failure and lifecycle.

## Keep one task interface

Use a small set of task families with arguments: `check`, `test`, `build <browser>`, `zip <browser>`,
`verify <browser>`, `lint:*`, `release:*`, `safari-project`. CI calls the same tasks; it must not contain a second
implementation. A shell task selects and `exec`s the real command. Put substantial logic in `scripts/` (planned
`tools/`).

## Connect CI to the same operations

Use [engineering changes and CI](../engineering/README.md) for workflow and test changes. **Do not list test or
benchmark files in `package.json`, Mise tasks or workflows.** Vitest discovers them through the projects in
`vitest.config.ts`. Give each job only the permissions it uses; keep publication in the Release workflow; never let an
untrusted pull request reach store credentials or a cache that a release reads.
