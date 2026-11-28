# Release archive collection

This private Node package owns `archives.mjs`. It reads the version from
`apps/extension/package.json`, verifies matching built manifests and collects
exactly one archive per requested browser. Public archive names remain
`deepscope-<version>-<browser>.zip`; Firefox also includes the source archive.
The collector writes `SHA256SUMS` for the copied outputs.

Run from the repository root after the native WXT zip tasks:

```sh
node tools/release/archives.mjs check-version v0.1.0
node tools/release/archives.mjs collect --out /tmp/deepscope-release chrome firefox safari
```

The collector replaces its explicit output directory. Choose a disposable
candidate directory for a local check. It does not publish a release or upload
to a browser store. The version example must match the current app manifest.
`pnpm --filter ./tools/release --fail-if-no-match run check` checks JavaScript
syntax. Release acceptance also requires source checks, output inspection,
a clean source rebuild and the relevant real-browser evidence.
