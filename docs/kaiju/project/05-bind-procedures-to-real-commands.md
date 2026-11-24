# Bind procedures to real commands

Before running an operation, check `mise tasks`, the task file under `.mise/tasks/` and the `package.json` script it
calls. Use the existing families with arguments; do not create one task per checkbox.

| Operation                         | Command                                                        | Owning file                              | Side effect                               |
| --------------------------------- | -------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------- |
| Prepare tools and dependencies    | `mise install`; `mise exec -- pnpm install --frozen-lockfile`  | `mise.toml`, `pnpm-lock.yaml`            | Downloads; runs `wxt prepare`             |
| Type checks                       | `mise run check`                                               | `.mise/tasks/check`, `package.json`      | None                                      |
| Tests                             | `mise run test [vitest args]`                                  | `.mise/tasks/test`, `vitest.config.ts`   | None                                      |
| Build one browser                 | `mise run build <chrome\|firefox\|safari>`                     | `.mise/tasks/build`, `wxt.config.ts`     | Writes `.output/<browser>-mv3`            |
| Zip one browser                   | `mise run zip <browser>`                                       | `.mise/tasks/zip`                        | Replaces that browser's zips in `.output` |
| Firefox lint                      | `mise run lint:firefox [dir]`                                  | `.mise/tasks/lint/firefox`               | None                                      |
| Workflow lint                     | `mise run lint:workflows`                                      | `.mise/tasks/lint/workflows`             | None                                      |
| Real-browser scenarios            | `mise run verify <firefox\|safari> [-- options]`               | `.mise/tasks/verify`, `scripts/verify/`  | Starts a browser; writes a result file    |
| Safari Xcode project              | `mise run safari-project`                                      | `.mise/tasks/safari-project`             | Replaces `.output/safari-xcode` (macOS)   |
| Release archives                  | `mise run release:archives [browsers]`                         | `.mise/tasks/release/archives`           | Replaces `.output/release`                |
| Tag equals version                | `mise run release:check-version <tag>`                         | `.mise/tasks/release/check-version`      | None                                      |
| Push the OCI artifact             | `mise run release:push-oci --version <v> <dir>`                | `.mise/tasks/release/push-oci`           | Publishes to ghcr                         |
| Store upload                      | `mise run release:store-upload <chrome\|firefox> <dir> <v>`    | `.mise/tasks/release/store-upload`       | Uploads to a store                        |
| Benchmarks                        | `pnpm bench`, `pnpm bench:rules`, `pnpm bench:rules:gate`      | `package.json`                           | None                                      |
| Utils resync                      | `node scripts/utils/sync.ts --source <dir>` (`--check` to verify) | `scripts/utils/sync.ts`, `utils/sync.json` | Rewrites vendored files                |

Keep read-only checks separate from actions that publish. The last two release rows and store upload normally run only
inside the Release workflow.
