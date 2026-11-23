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

registry.bootstrap.json
  Compatibility artifact retained for tests and benchmarks that compare the older fast-path model.

registry.metadata.json
  Lightweight technology metadata and rule-kind counts.

registry.relationships.json
  Relationship edges used to inspect graph shape without loading full rules.
```

The encoder stores each regular expression as its source and flags. A matcher worker reconstructs those expressions when it compiles an observation-kind shard.

## Runtime path

When a cache miss or refresh requires fresh analysis, the background calls `getRuntimeRegistry()` to fetch and hydrate `registry.runtime.json`. It uses the collection plan to gather observations and the relationship graph to refine the results. The provider reuses the runtime artifact for subsequent requests in the same background context.

The offscreen host dispatches partitions by observation kind. Each worker calls `getCompiledObservationKindRegistry(kind)` to fetch and compile the matching `registry.kind.<kind>.json` shard. That keeps rule parsing in the worker that needs those rules. The background receives partition progress and merges the results.

## Validation targets

A healthy build should prove these facts:

```txt
.wxt/kaiju-deepscope-registry/registry.manifest.json exists after WXT prepare
.wxt/kaiju-deepscope-registry/registry.kind.<kind>.json exists for every observation kind
.output/<target>/kaiju-deepscope-registry/*.json exists after WXT build
background entrypoint no longer imports #/compiled-registry
packaged registry hydration preserves detector order and regular expressions
observation-kind shards only contain rules that can receive that kind
visible-tab analysis uses the collection plan from registry.runtime.json
```

The benchmark `src/benchmarks/registry-json-hydration.bench.ts` measures parsing, hydration and compilation with a synthetic registry. Measuring extension startup requires a separate run of the packaged extension.
