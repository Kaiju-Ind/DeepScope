# Kind-sharded continuous matcher runtime

The visible-tab runtime no longer treats the first popup result as a separate truth model. The first analysis plans from a rule-free runtime registry, collects the evidence surfaces that are already available, and lets the offscreen worker pool match those observations by kind. Follow-up collection does not run as one large enrichment job. Broad HTML, response headers, visible text, and source-content reads are split into evidence passes that publish ordinary detector snapshot revisions as they finish.

The change fixes the mismatch created by the older bootstrap/enrichment split. Bootstrap was fast because it removed rule kinds from the registry before collection and matching. That made the popup responsive, but it also meant the first result could not see many rule surfaces. The continuous runtime now separates two generated products: a rule-free background artifact for planning/finalization and matcher-only kind shards for worker execution.

```text
build-time registry
  ├─► rule-free runtime artifact
  │     ├─► collection passes by evidence surface
  │     │     ├─► initial facts already visible in the page
  │     │     ├─► bounded HTML probes
  │     │     ├─► response headers
  │     │     ├─► visible text
  │     │     └─► same-origin source content
  │     └─► relationship graph and final emission metadata
  └─► generated matcher shards
        ├─► registry.kind.meta.json
        ├─► registry.kind.scriptSrc.json
        ├─► registry.kind.resourceUrl.json
        └─► registry.kind.htmlMatch.json
```

Each worker receives one partition task and loads the shard for that task's observation kind. A `scriptSrc` partition loads the script-source shard, while an `htmlMatch` partition loads the HTML-rule shard because bounded HTML probes still evaluate `html` rules. Header partitions include both `header` and `responseHeader` rules because current extension observations can normalize background response headers as `header` facts.

```text
collection pass
  └─► ObservationBatch
        └─► kind partitions
              ├─► meta ─────────► worker loads registry.kind.meta.json
              ├─► scriptSrc ────► worker loads registry.kind.scriptSrc.json
              ├─► resourceUrl ──► worker loads registry.kind.resourceUrl.json
              └─► htmlMatch ────► worker loads registry.kind.htmlMatch.json

worker matches
  └─► evidence delta
        └─► background coordinator merges accumulated partitions
              └─► candidate graph refinement
                    └─► popup snapshot revision
```

The background remains the lifecycle owner. It decides whether a result still belongs to the visible tab, writes the durable snapshot revision and rejects results from superseded jobs. Offscreen and workers do not read tabs or storage; they only process matcher work.

## Runtime behavior

The initial visible-tab path fetches the rule-free runtime registry artifact. The collection plan still has internal cost tiers, but those tiers now describe collector cost, not detector truth. The first pass gathers cheap and already-visible observations, including URL-like resource surfaces. Later passes ask for one expensive surface at a time.

```text
initial pass complete ───────► snapshot revision 2
HTML pass complete ──────────► snapshot revision 3
header pass complete ────────► snapshot revision 4
text pass complete ──────────► snapshot revision 5
source-content pass complete ─► snapshot revision 6
late observer batch ─────────► snapshot revision 7
```

The popup applies these revisions through the same storage subscription it already uses for late observation updates. There is no separate "deeper evidence pending" state in the visible path. A revision is simply the newest detector snapshot for the current tab and document.

## Compatibility notes

`registry.bootstrap.json` and the complete enrichment asset can remain for compatibility tools and build/test baselines, but the visible-tab runtime should not load them for normal analysis. Background work uses `getRuntimeRegistry()` for planning and final coordination. Matcher workers use `getCompiledObservationKindRegistry(kind)` for matcher-only shards.

The background-to-offscreen message contains only matcher identity, the page observation batch, mode, and small execution options. Matcher indexes stay inside dedicated matcher workers. The rule-free relationship graph stays in the background. Dedicated workers load only the matcher-only observation-kind shards needed by their partitions, and packaged regular expressions remain plain source/flags data until routing admits a rule for evaluation. The offscreen host streams each partition once and returns only a terminal partition count. This avoids registry-scale cross-context clones and a second retained partition-result set.
