# Vendored packages and runnable artifacts

DeepScope is public and publishes on its own, so it depends on no private package. The generic utilities it uses are
copied from Kaiju-Ind/Utils into `utils/` as `@utils/*` pnpm workspace packages, with the MIT licence, the source commit
and a header on every copied file. [`utils/README.md`](../../../utils/README.md) lists the packages, the source commit
and overlays, the local files and the resync steps. The `use-utils` skill says how to choose and adopt one.

**Rules.**

1. Never add a `@kaiju-ind/*` dependency, registry route or token. A utility that DeepScope needs is vendored.
2. Do not patch a vendored file by hand. Change it upstream and resync with `tools/utils/sync.ts`, or record a patch in
   `utils/sync.json#patches` and `utils/patches/`. `node tools/utils/sync.ts --check` fails when `utils/` differs
   from a fresh sync.
3. DeepScope's own files under `utils/` (the browser stores, the queue conformance suite, native Temporal) carry no
   vendored header and say so in their first comment.
4. npm dependencies are pinned in `package.json` and the lockfile. A cold `pnpm install --frozen-lockfile` must succeed
   with no credentials.

**Runnable artifacts.** The release produces one zip per browser, the Firefox sources zip and `SHA256SUMS`; see
[GitHub Releases and ghcr](06-github.md). Build output (`.output/`) and WXT's generated files (`.wxt/`) are never
committed.

**Evidence.** The sync source commit in `utils/README.md`, a passing `--check`, a frozen install on a fresh runner, and
the Verify workflow run for the commit. **Invalidated by** a resync, a new utility entry point, a dependency update or a
lockfile change.

The planned monorepo keeps this shape: `utils/*` stay `@utils/*`, DeepScope's own packages become `@deepscope/*` under
`packages/`, and the sync script lives at `tools/utils/sync.ts`.
