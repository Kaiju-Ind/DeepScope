# Registry JSON artifacts

Kaiju DeepScope keeps the technology registry authored as TypeScript for now, but the extension runtime should not import the full generated registry during background startup. The registry is large enough that a static import makes every service-worker wake pay for rule payload parsing before the background has even learned whether the popup can render a cached snapshot.

The WXT module at `modules/compile-registry.ts` turns the TypeScript registry into packaged JSON assets during prepare and build:

```txt
TypeScript registry source
  -> WXT module
  -> .wxt/kaiju-deepscope-registry/*.json
  -> .wxt/kaiju-deepscope-public/kaiju-deepscope-registry/*.json
  -> .output/<target>/kaiju-deepscope-registry/*.json
```

The cache copy under `.wxt/kaiju-deepscope-registry` gives maintainers a predictable place to inspect generated artifacts. The public-asset copy is registered with WXT so the same JSON files are copied into the extension output. Runtime code resolves the output path with `browser.runtime.getURL(...)`, while matcher workers resolve the same packaged paths from their extension origin.

## Generated files

The WXT build cache contains several products because tests and benchmarks still need to compare compile-time representations. The packaged extension is intentionally narrower.

```text
build cache
  registry.bootstrap.json
  registry.enrichment.json
  registry.runtime.json
  registry.manifest.json
  registry.metadata.json
  registry.relationships.json
  registry.kind.<kind>.json

packaged Chrome runtime
  registry.runtime.json
  registry.kind.<kind>.json
```

`registry.runtime.json` is rule-free. It contains technology profiles, relationship edges, collection planning, pattern-table summaries, and diagnostics counts needed by the background coordinator.

Each `registry.kind.<kind>.json` contains only matcher technology/rule data for one observation kind plus a build-generated numeric matcher route index. Workers hydrate those references against shared shard objects instead of walking every rule to rebuild route tables at runtime.

Regular expressions are serialized as source/flags records. Worker evaluation compiles them lazily only after matcher routing admits the rule.

## Runtime path

```text
background starts
  -> register listeners without executable matcher rules
  -> load registry.runtime.json when analysis planning needs it
  -> collect observations from the rule-free collection plan
  -> background scheduler splits observations into kind partitions
  -> offscreen host executes selected partitions only
  -> worker fetches registry.kind.<kind>.json on demand
  -> background accumulates partition results and emits snapshots
```

The complete enrichment/bootstrap products are build/test inputs, not browser-runtime compatibility APIs. Production code should not regain a `getCompiledRegistry()` path merely because those generated cache files exist.

## Validation targets

A healthy build should prove:

```text
.wxt/kaiju-deepscope-registry contains validation/build-cache products
.output/<target>/kaiju-deepscope-registry contains only runtime + kind shards
background dependency graph does not reach build Registry products
matcher worker is the only runtime that loads matcher kind shards
packaged route hydration is behaviorally equivalent to the reference index builder
kind shards contain only rules routable from that observation kind
headless background/offscreen/worker graphs do not reach Solid/UI modules
```

The benchmark `src/benchmarks/matcher-shard-hydration.bench.ts` compares build-routed shard hydration with the superseded runtime route-reconstruction path. It measures only route/shard setup. Browser fetch and native RegExp costs remain separate measurements.
