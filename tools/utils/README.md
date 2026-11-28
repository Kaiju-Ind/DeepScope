# Vendored Utils generation

This private Node/TypeScript workspace package owns `sync.ts`. It reads the
actual adopted entries, upstream revisions, overlays and dependency pins in
`utils/sync.json`, follows their source closure, preserves licensing and emits
workspace manifests and attribution. It leaves files without its generated
marker untouched.

Run from the repository root:

```sh
node tools/utils/sync.ts --source /path/to/the/exact/Utils/checkout --check
```

The source repository must contain both recorded commits. `--check` writes
nothing. Omit it only for an intended generated refresh, then inspect the
entire generated diff and run all consumers. Do not substitute a newer main
commit when a pinned object is unavailable. The remaining historical
`scripts/utils/sync.ts` attribution must be updated in the template and output
together through a reproducible sync.

`pnpm --filter ./tools/utils --fail-if-no-match run check` checks this tool's
TypeScript. The [public source-build decision](../../docs/adr/01-public-source-builds.md)
explains why this current source closure is retained and what evidence a
published-package migration needs.
