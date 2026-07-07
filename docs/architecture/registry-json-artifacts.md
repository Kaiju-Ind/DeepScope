# Registry JSON artifacts

Kaiju Site Scope keeps the technology registry authored as TypeScript for now, but the extension runtime should not import the full generated registry during background startup. The registry is large enough that a static import makes every service-worker wake pay for rule payload parsing before the background has even learned whether the popup can render a cached snapshot.

The WXT module at `modules/compile-registry.ts` turns the TypeScript registry into packaged JSON assets during prepare and build:

```txt
TypeScript registry source
  -> WXT module
  -> .wxt/kaiju-site-scope-registry/*.json
  -> .wxt/kaiju-site-scope-public/kaiju-site-scope-registry/*.json
  -> .output/<target>/kaiju-site-scope-registry/*.json
```

The cache copy under `.wxt/kaiju-site-scope-registry` gives maintainers a predictable place to inspect generated artifacts. The public-asset copy is registered with WXT so the same JSON files are copied into the extension output. Runtime code resolves the output path with `browser.runtime.getURL(...)`, while matcher workers resolve the same packaged paths from their extension origin.

## Generated files

```txt
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

Regular expressions cannot survive normal JSON serialization. The artifact encoder writes them as explicit records containing source and flags, then the runtime hydrator rebuilds `RegExp` values before compiling the in-memory matcher, graph, and collection plan.

## Runtime path

The background loads the complete registry when fresh analysis needs planning, relationship refinement, or final emission. That keeps collection needs and final graph behavior equivalent to the full detector instead of letting a small bootstrap artifact define what evidence can be collected.

```txt
background starts
  -> register listeners
  -> answer cache-only paths where possible
  -> fetch registry.enrichment.json when fresh analysis needs rules
  -> compile full collection plan, matcher graph, and final coordinator state
  -> collect initial observations from the complete plan
  -> queue observation-kind matcher tasks for the offscreen worker pool
  -> workers fetch registry.kind.<kind>.json as each kind is matched
  -> background merges partition progress into snapshot revisions
```

The startup invariant is still the important part: listener registration must not depend on the full registry payload. Fresh analysis can pay the JSON parse and compiler cost, but that work happens after a user-invoked analysis request and can be measured separately from service-worker cold start.

The old bootstrap artifact is no longer the normal visible-tab truth surface. It exists so compatibility tests, benchmarks, and migration comparisons can still prove why the older staged model under-detected compared with the complete registry.

## Validation targets

A healthy build should prove these facts:

```txt
.wxt/kaiju-site-scope-registry/registry.manifest.json exists after WXT prepare
.wxt/kaiju-site-scope-registry/registry.kind.<kind>.json exists for every observation kind
.output/<target>/kaiju-site-scope-registry/*.json exists after WXT build
background entrypoint no longer imports #/compiled-registry
packaged registry hydration preserves detector order and regular expressions
observation-kind shards only contain rules that can receive that kind
visible-tab analysis plans from the complete registry, not registry.bootstrap.json
```

The benchmark `src/benchmarks/registry-json-hydration.bench.ts` compares packaged JSON parse and hydration against the previous in-memory registry compilation baseline. It does not claim the JSON path is faster. It measures the cost accepted in order to keep the background startup bundle smaller.
