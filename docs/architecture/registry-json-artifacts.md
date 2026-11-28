# Registry JSON artifacts

The background registers its listeners before it loads registry data. A fresh analysis loads the collection plan and relationship graph. The offscreen workers load detector rules as they match observations.

During prepare and build, `modules/compile-registry.ts` compiles the authored TypeScript registry into `.wxt/kaiju-deepscope-registry/`. WXT stages `registry.runtime.json` and the observation-kind shards in `.wxt/kaiju-deepscope-public/kaiju-deepscope-registry/` and copies that subset to `.output/<target>/kaiju-deepscope-registry/` for the extension.

## Generated files

The build cache contains all of these products. The extension ships the background runtime file and the matcher shards.

```txt
registry.runtime.json
  Rule-free technology metadata, pattern tables, relationship edges and a precomputed collection plan.

registry.enrichment.json
  Complete TypeScript-authored registry with regular expressions encoded as JSON records.

registry.manifest.json
  Per-observation-kind shard index with each shard path, rule count, technology count, and scheduler priority.

registry.kind.<kind>.json
  Matcher shard for one observation kind, such as scriptSrc, resourceUrl, meta, dom, htmlMatch, or header.
  Contains the narrowed technology/rule records plus a build-generated route index
  (fallback, exact-key and literal buckets) whose entries are numeric references
  into those records, and the shard's pattern count and encoded byte size.

registry.bootstrap.json
  Compatibility artifact retained for tests and benchmarks that compare the older fast-path model.

registry.metadata.json
  Lightweight technology metadata and rule-kind counts.

registry.relationships.json
  Relationship edges used to inspect graph shape without loading full rules.
```

The encoder stores each regular expression as its source and flags. A matcher worker compiles an expression lazily, only after routing admits the rule that owns it.

## Runtime path

When a cache miss or refresh requires fresh analysis, the background calls `getRuntimeRegistry()` to fetch and hydrate `registry.runtime.json`. It uses the collection plan to gather observations and the relationship graph to refine the results. The provider reuses the runtime artifact for subsequent requests in the same background context.

The background matcher scheduler splits observations into kind partitions and sends one selected partition at a time to the offscreen host. Each worker calls `getCompiledObservationKindRegistry(kind)` to fetch `registry.kind.<kind>.json` and reconnect its packaged route references to the shard's records (`hydrateMatcherIndex`). The worker does not walk every rule to rebuild route tables; the build-time index is the executable routing decision. The background accumulates partition results and emits snapshot revisions.

Each worker keeps loaded shards in a least-recently-used cache weighted by the shard's encoded byte size (6 MiB by default), so a large shard such as `scriptSrc` can evict several small ones.

Route buckets are keyed by page-observable names (meta, header and cookie names). Hydration rebuilds them as prototype-free records through `src/utils/dictionary.ts`, because `JSON.parse` returns ordinary objects whose inherited members (`constructor`, `__proto__`) must never answer a lookup. `src/tests/security/page-controlled-keys.test.ts` covers a JSON round trip with those keys.

## Validation targets

A healthy build should prove these facts:

```txt
.wxt/kaiju-deepscope-registry/registry.manifest.json exists after WXT prepare
.wxt/kaiju-deepscope-registry/registry.kind.<kind>.json exists for every observation kind
.output/<target>/kaiju-deepscope-registry/*.json exists after WXT build
background entrypoint no longer imports #/compiled-registry
packaged registry hydration preserves detector order and regular expressions
observation-kind shards only contain rules that can receive that kind
build-routed shards match exactly like a runtime-built index for every kind
visible-tab analysis uses the collection plan from registry.runtime.json
```

`src/tests/registry/build-route-equivalence.test.ts` checks the routing claim for every packaged observation kind against the real registry: each shard is rendered, parsed and hydrated as the worker receives it, then matched against generated pass observations and prototype-named keys, and compared with an index built at runtime from the same records.

The benchmark `apps/extension/bench/registry-json-hydration.bench.ts` measures parsing, hydration and compilation with a synthetic registry. `apps/extension/bench/matcher-shard-hydration.bench.ts` compares build-routed shard hydration with rebuilding routes in the worker; it measures route setup only, not fetch or regular-expression compilation. Neither is a measurement of extension memory or startup, which needs a separate run of the packaged extension.
