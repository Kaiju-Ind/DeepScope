# Release archive collection

This private Node package owns release preparation. `archives.mjs` reads the version from
`apps/extension/package.json`, verifies matching built manifests and collects
exactly one archive per requested browser. Public archive names remain
`deepscope-<version>-<browser>.zip`; Firefox also includes the source archive.
`collection.mjs` owns the destination and writes `SHA256SUMS` for the copied outputs.

Run from the repository root after the native WXT zip tasks:

```sh
node tools/release/archives.mjs check-version v0.1.0
node tools/release/archives.mjs collect --out /tmp/deepscope-release chrome firefox safari
```

Choose a candidate directory below `.output`, such as the native task's default
`.output/release`, or outside the checkout. The checkout, `.output` itself and
each unpacked browser build are protected. The collector resolves existing parent
aliases before checking ownership and refuses a symlink destination.

A destination may be absent, empty, or an intact previous collection containing
only the regular archive files listed in its matching `SHA256SUMS`. Extra files,
subdirectories, links or changed bytes cause a failure without replacement. Choose
a new candidate directory when the old one contains files you need to retain.

All copies and checksums are prepared in a temporary sibling directory first.
The old collection then moves aside while the new one takes its place. If that
move fails, the collector restores the previous collection. If restoration also
fails, the error names the directory containing `previous/` and `next/`; inspect
and retain both before recovering the desired candidate. A command interrupted
between the two renames can also leave that staging directory. One command must
own a destination at a time; this is not a crash-atomic filesystem transaction.

The `notes` command selects the complete literal changelog version, including
prerelease or build suffixes. Missing or empty sections exit with status 3 so the
workflow can request generated notes. Other failures exit nonzero with their cause.

These commands do not publish a release or upload to a browser store. The version
example must match the current app manifest. The separate Firefox store task owns
its temporary extraction until unzip or submission finishes, then removes it on
success or failure while retaining the command's exit status.

`pnpm --filter ./tools/release --fail-if-no-match run check` checks strict types,
JavaScript sources and syntax. `mise run test --project release` exercises the
actual CLI and Bash task with disposable files and inert store adapters. Release
acceptance also requires source checks, output inspection, a clean source rebuild
and the relevant real-browser evidence.
