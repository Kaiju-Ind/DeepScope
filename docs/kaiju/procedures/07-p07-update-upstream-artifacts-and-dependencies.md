# P07 Update upstream artifacts and dependencies

**Trigger:** a Renovate pull request, an upstream release, a security fix, a Utils change or catalog data from upstream.
**Outcome:** a verified candidate with its impact on each browser known.

1. Identify the owner of what changes: an npm dependency, the vendored `@utils/*` packages, the detection catalog, a
   tool pinned in `.mise/tasks/*`, or a GitHub Action.
2. Read the upstream changes for the versions in between, not only the release title.
3. Keep coupled packages together (WXT with `@wxt-dev/*`; Solid with Kobalte, Corvu, `vite-plugin-solid` and
   `@wxt-dev/module-solid`; Vitest with its plugins).
4. Run `mise run check`, `mise run test` and all three browser builds; lint Firefox.
5. Deliver a usable preview through P03 when the change can alter runtime behavior.
6. Release only through P04.

**Renovate.** `renovate.json` groups non-major updates weekly, waits three days after release, opens security fixes
immediately and holds the Solid 2 major until Kobalte, Corvu and the Solid plugins support it. A Renovate pull request
proposes versions; it does not prove compatibility.

**Vendored utilities.** Change `utils/sync.json` (base commit, overlays, entries), run
`node tools/utils/sync.ts --source <path to Kaiju-Ind/Utils checkout>`, then `pnpm install`, `pnpm compile` and
`pnpm vitest run --project utils`. Drop an overlay once its upstream pull request merges. See
[`utils/README.md`](../../../utils/README.md#resync).

**Detection catalog.** The catalog appears to derive from Wappalyzer data. Before taking more upstream data, confirm
which upstream and licence it comes from (the MIT-era Wappalyzer data and the GPL-3.0 fork have different terms); see
the [plan's provenance section](../../migration/cross-browser-runtime-plan.md#catalog-provenance-blocks-public-promotion).

Publication is separate from integration: an update is not released until P04 runs.
