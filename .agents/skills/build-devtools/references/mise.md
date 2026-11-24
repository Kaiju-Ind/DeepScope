# Mise in DeepScope

Mise pins the toolchain and owns the repository tasks. pnpm owns dependencies;
WXT, Vitest and TypeScript own their own checks. A task is a thin, argument-
bearing wrapper; it never lists test files or reimplements a tool.

## Tools

`mise.toml` pins `node` and `pnpm` (and `min_version` of Mise itself). Run a
command with the pinned tools through `mise exec -- <command>`, for example
`mise exec -- pnpm install --frozen-lockfile`. A task that needs an extra tool
declares it in its own header (`#MISE tools={...}`) at an exact version, as
`lint/firefox` does for `web-ext` and `lint/workflows` does for actionlint and
zizmor.

## Tasks

File tasks live in `.mise/tasks/`; a subfolder becomes a `:` prefix
(`.mise/tasks/release/archives` is `mise run release:archives`).

| Task | What it runs |
| --- | --- |
| `check` | `pnpm run compile` (`tsc --noEmit`) |
| `test` | `pnpm run test:run`: every Vitest project, discovered from `vitest.config.ts` |
| `build <browser>` | `wxt build -b <browser> --mv3` into `.output/<browser>-mv3` |
| `zip <browser>` | `wxt zip -b <browser> --mv3` (Firefox also writes a sources zip) |
| `verify <browser>` | real-browser scenarios in `tools/verify/` against an existing build |
| `safari-project` | macOS only: wrap a Safari build in an Xcode project and build it unsigned |
| `lint:firefox`, `lint:workflows` | `web-ext lint`; actionlint and zizmor |
| `release:archives`, `release:check-version`, `release:push-oci`, `release:store-upload` | release steps used by `.github/workflows/release.yml` |

## Rules

- A task's header carries `#MISE description=` and, for arguments, `#USAGE`
  specs; read them with `mise tasks` or `mise run <task> --help` before binding
  a procedure to a command.
- Pass extra arguments through instead of adding a flag per use
  (`mise run test --project 'extension (runtime)'`).
- CI calls the same tasks as a developer. If CI needs a different step, the
  difference is a defect or a documented exception.
- `--mv3` is explicit in build and zip because WXT 0.21 builds Firefox and
  Safari as MV2 unless `wxt.config.ts` sets `manifestVersion: 3`.
- Credentials come from the environment only (`release:store-upload`,
  `release:push-oci`); a task never reads a secret file.
