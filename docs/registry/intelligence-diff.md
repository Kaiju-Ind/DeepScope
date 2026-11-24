# Intelligence registry sync (November 2026)

DeepScope's technology catalog and the Intelligence Registry (`packages/registry/catalog` in the Intelligence repository) come from the same Wappalyzer-derived data and use the same file layout, `catalog/<category>/<technology>.ts`. Their rule objects have the same shape. The record shapes differ:

| Field | DeepScope `TechnologyDefinition` | Intelligence `TechnologyEntry` |
| --- | --- | --- |
| classification | `categories[]` (fine-grained) | `category` (13 broad ids) plus `tags[]` (the same fine-grained ids) |
| identity | none | `names` (aliases, former names, abbreviations): 30 entries |
| product profile | `component` (kind, parent, vendor, sources, features, integrations): 10 entries | `profile` (forms, vendor, sources, features, relations): 116 entries |
| relation targets | strings | strings or `{ id, version }` (no versioned targets are used yet) |
| icons | authored file name | authored hint, replaced at runtime by a generated icon map |

Detection does not read `names` or `profile`, so they are not ported, and DeepScope's schema is unchanged.

## Diff at sync time (Intelligence `ec1015b9`, DeepScope `e19799e6`)

Regenerate the diff with:

```sh
git -C ../Intelligence archive origin/main packages/registry | tar -x -C /tmp/intel
node tools/registry/intelligence-diff.mjs --intelligence /tmp/intel/packages/registry --out /tmp/diff.md
node tools/registry/intelligence-convert.mjs --intelligence /tmp/intel/packages/registry --compare
```

| | DeepScope before | Intelligence |
| --- | --- | --- |
| source fragments | 8,106 | 8,126 |
| technologies after merging duplicate ids | 8,043 | 8,066 |
| rules | 20,481 | 20,511 |
| ids defined in more than one category folder | 63 | 60 |

- Files: 7,973 identical after conversion, 20 added, 129 changed (51 of these differ only in Intelligence-only `names`/`profile`), and none removed. No technology was removed in Intelligence relative to DeepScope.
- Technologies: 23 added, 0 removed, and 66 changed. Of the changed technologies, 13 have rule changes (22 rules added, 48 removed), 6 have relationship changes, 48 have new descriptions, 24 new websites, 17 new icons and 7 new CPEs.
- 4 id collisions were split: the WordPress Go theme, the Hostinger Tools plugin, the WooCommerce Storefront theme and the OpenSearch description link had shared the ids `go`, `hostinger`, `storefront` and `opensearch` with unrelated products.

## Where DeepScope deliberately differs after the sync

- `umd`: kept "Universal Module Definition". The Intelligence text says "Universal Module Entry", which looks like a slip from a type rename.
- `influx-cms`, `linguise`: did not restore two DOM selectors that are invalid CSS (missing `]` and `'`). DeepScope removed them in `9e3a57d6`.
- The catalog merge also merges `metadata`, `versioning` and `component` across duplicate-id fragments, and fills a missing description or icon from a later fragment. Intelligence merges metadata the same way but does not fill icons.
- The Solid, provider, file-name and duplicate-id fixes below are DeepScope-only for now. They are candidates to send back to Intelligence.

## Detection mistakes found, and fixes

Audit scripts are in `tools/registry/`. Run `wxt prepare` first.

| Pattern | Evidence | Fix |
| --- | --- | --- |
| Framework markers that belong to the library | `solidstart` matched `window._$HY`, which Solid's own SSR emits on every Solid SSR page. | `_$HY` and hydration keys now detect SolidJS. SolidStart uses its own markers. |
| One product under two ids | `name-audit.mjs` found 34 name pairs, including `solid`/`solidjs`, `nuxt`/`nuxt-js`, `ember`/`ember-js`, `inferno`/`infernojs`, `mithril`/`mithril-js` and `riot`/`riot-js`. | The 6 framework pairs are merged. WordPress theme and plugin slug pairs (for example `twenty-twenty`/`twentytwenty`) are listed, not changed. |
| Unanchored file-name patterns | `name-collision-scan.mjs` found 18 rules in 17 technologies, for example React matching `preact.min.js`, three.js matching `twentytwentythree.js`, and onsen matching `consent-manager.js`. | Added a left boundary to 13 rules and tightened Magento and Mautic. |
| Generic "modern tooling marker" heuristics | 2,136 rules in 160 technologies. In `corpus-scan.mjs` over 22 real npm packages, some fired on unrelated libraries: Preact `.__e` on Svelte, Inferno on Vue, Deno `new URL(..., import.meta.url)` on any ESM, Solid `lazy(() => import())` on React code, and Solid Router `DEVCOMP`. | Removed the rules that misfired; the Solid and Solid Router rule sets were rewritten. The rest are unaudited. |
| A provider inferred from a product | `provider-audit.mjs` found 20 weak edges, for example CMSs implying AWS, S3, Azure, Firebase or Cloudflare; `requires` edges that gate Dynamics 365 on Azure, Regula on unpkg and DanDomain on AngularJS; and Gatsby Image CDN paths claiming Gatsby Cloud hosting. | Removed the edges. Gatsby Image CDN implies Gatsby. Tests prove that self-hosted Next.js does not report Vercel. |
| Meta-framework implications that runtime evidence cannot show | Nuxt and SvelteKit implied Node.js, and Vike and RedwoodJS implied TypeScript. | Removed. TanStack Start now implies TanStack Router. |
| Mutual `excludes` between libraries that can coexist | `solidjs` excluded `react`, but Astro pages mix Solid and React islands. | Removed. The other 50 `excludes` edges are listed in the report, not changed. |
