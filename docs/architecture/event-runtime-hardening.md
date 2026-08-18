# Event runtime hardening validation

The extension runtime now follows the event architecture more directly during visible-tab analysis. The background uses the compiled registry artifact for collection planning, then sends normalized observations through indexed matching, evidence aggregation, graph refinement, final emission, replay trace creation, storage, and popup rendering.

Read the flow from left to right:

```text
compiled registry
  -> collection plan
  -> normalized observations
  -> indexed matcher
  -> evidence candidates
  -> graph refinement
  -> emitted detections
  -> replay history and popup evidence
```

## Compiled registry and initial detection work

The compiled registry owns the active collection plan used by the background collector. The background no longer asks the collector to rebuild selector, HTML, and global probes from the full technology registry for every visible-tab analysis.

The collection plan records which evidence surfaces are needed by the active registry:

```text
cheap page facts
  url, script URLs, stylesheet URLs, metadata, links, storage keys, cookies, DOM selectors

expensive page facts
  HTML regex probes, visible text, script text, stylesheet text

unsupported extension facts
  DNS, certificate issuer, robots.txt, and other future or CLI-oriented evidence
```

That lets the extension skip broad text collection, inline source collection, background header requests, and same-origin source fetches when the compiled registry has no matching rule surface for them. Matcher indexes still route each normalized observation to the relevant rule bucket instead of trying every rule against every fact.

Shared source limits now live in a small standalone module. Hot-path collectors, validation helpers, and focused tests can read safety caps without importing the generated registry tree.

The generated registry now lives as JSON assets under `.wxt/kaiju-deepscope-registry/` and is copied into the extension output as `kaiju-deepscope-registry/*.json`. The module in `modules/compile-registry.ts` refreshes those assets through WXT's build lifecycle. Runtime code fetches the enrichment asset only when fresh analysis needs the full registry, then hydrates regular expressions and compiles matcher buckets, relationship tables, technology metadata, and collection plans once for reuse.

Initial collection now uses the cheap tier only. Deeper HTML, text, headers, script-content, and stylesheet-content evidence runs as deferred enrichment after the first analysis response when an observation session is active. The popup can render the first useful detections while deeper evidence is still being checked.

## Graph refinement

Graph refinement treats exclusion conflicts as connected components. Instead of deciding each excluded pair locally, the resolver searches the component for the strongest consistent candidate set.

The refinement rules are:

```text
implies  -> adds derived support
requires -> gates selection and needs independent direct support
excludes -> prevents conflicting candidates from surviving together
```

The exact solver is used for small conflict components. Large components keep a deterministic greedy fallback so pathological registries do not make the popup hang. Relationship-only candidates removed by a direct exclusion conflict are suppressed for the rest of the refinement run, which prevents the fixed-point loop from re-adding and removing the same inferred candidate forever.

## Replay history storage

Replay traces are separate from `SiteAnalysis`. The latest trace remains available for snapshot-first explanation summaries, and bounded per-origin history stores recent replay runs under a dedicated storage key.

```text
analysis:https://example.com        -> latest normalized SiteAnalysis
replay:https://example.com          -> latest redacted replay trace
replay-history:https://example.com  -> bounded newest-first replay traces
```

The history is TTL-bound and capped per origin. Expired analysis records remove paired replay and replay-history entries, and expired replay histories are pruned before callers receive them.

Incognito visible-tab analysis now skips persistent analysis and replay writes. The popup can still render the current incognito result returned from memory, but the extension does not leave replay-history records in extension storage for that incognito page.

## Popup access to past results

Active-tab analysis responses include bounded replay history for the current origin. The popup renders a Replay History region below the technology groups. Users can open a stored run to inspect the saved explanations and result count.

Technology cards show concrete evidence previews even when replay explanations exist. A detection can show both the short explanation summary and the underlying proof, such as a script URL, HTML snippet, header key/value, DOM selector, version capture, or relationship source.

Observation-session responses also include a stable session target. Popup refresh, stop, and state reads can address the tab and session that produced the visible analysis instead of resolving whatever tab is active at cleanup time.

## Validation status

The static architecture check passes for the targeted changes:

| Architecture target | Current status |
| --- | --- |
| Event-shaped visible-tab pipeline | Implemented through normalized observation batches, indexed matching, evidence, graph refinement, emission, replay, and popup rendering. |
| Compiled registry informs initial collection | Implemented by passing the compiled `collectionPlan` into visible-tab collection. |
| Initial detections avoid unnecessary expensive evidence | Implemented with explicit `initial` and `enrichment` collection tiers. First results avoid HTML/text/source/header enrichment; a deferred enrichment pass persists deeper evidence and marks the session dirty for popup refresh. |
| Matcher indexes reduce rule work | Preserved through the compiled matcher index in the event pipeline. |
| Graph refinement is constraint-shaped | Improved by solving exclusion conflict components, suppressing removed inferred conflicts, and preserving fixed-point repair. |
| Replay storage supports past results | Implemented as bounded per-origin replay history. |
| Users can access replay history | Implemented in the popup Replay History section for the active origin. |
| Popup evidence includes concrete details | Implemented by rendering evidence previews alongside explanation summaries. |
| Session lifecycle targets the correct analysis | Implemented through `ObservationSessionTarget` on analysis responses and targeted refresh/stop/state APIs. |
| Privacy posture avoids incognito persistence | Implemented by bypassing persistent analysis and replay writes for incognito visible-tab analysis. |
| Permission surface follows visible-tab flow | Improved by removing the broad `tabs` permission from the manifest. |

The literal greenfield architecture still contains work outside this browser-extension hardening pass. The CLI interface and full YAML/JSON registry-source migration remain out of scope. The registry authoring source remains TypeScript by design; the build-time artifact is the runtime optimization layer, not a source-format migration.

## Commands run in this workspace

Dependency installation created `node_modules` and WXT generated files in this archive workspace. `aube run postinstall` previously completed and generated the compiled registry artifact used at that point in the migration, then TypeScript compilation completed successfully. Newer registry work writes JSON assets under `.wxt/kaiju-deepscope-registry/` instead. The focused validation commands below also completed:

```text
aube run postinstall
aube run compile -- --pretty false
aube run build
aubr vitest --run src/tests/collectors/planning.test.ts --reporter=dot
aubr vitest --run src/tests/content/content-api.test.ts src/tests/messaging/background-api.test.ts src/tests/app/model.test.ts src/tests/storage/cache.test.ts --reporter=dot
aubr vitest --run src/tests/registry src/tests/detection/observation-matcher-index.test.ts src/tests/detection/observation-matcher.test.ts src/tests/candidates src/tests/graph --reporter=dot
aubr vitest --run src/tests/collectors/capabilities.test.ts src/tests/collectors/collect-page-signals.test.ts src/tests/collectors/observed-page-signals.test.ts src/tests/messaging/analysis.test.ts src/tests/registry/provider.test.ts src/tests/detection/engine.test.ts --reporter=dot --silent
aubr vitest --run src/tests/emission/site-analysis.test.ts src/tests/evidence/builders.test.ts src/tests/evidence/repository.test.ts src/tests/lifecycle/observation.test.ts src/tests/messaging/messages.test.ts src/tests/observations/batch-controller.test.ts src/tests/observations/page-signals.test.ts src/tests/pipeline/event-pipeline.test.ts src/tests/pipeline/replay.test.ts --reporter=dot --silent
```

Focused single-file suites also passed for contracts, side-panel model, replay, emission, registry compiler/source schema, lifecycle, observations, evidence, messaging contracts, collector capabilities, page-signal collection, and observed page signals.

The generated registry artifact was also imported through an esbuild smoke check, which reported 7,989 technologies, 20,501 rules, 1,887 initial DOM selectors, no initial HTML probes, and 880 enrichment HTML probes. `src/entrypoints/background.ts`, `src/app/provider.tsx`, `src/lib/collectors/extension-page-collector.ts`, and `src/lib/registry/precompiled-module.ts` were bundled through esbuild as syntax/import checks.

The full test suite was also attempted with `aubr vitest --run --reporter=dot --silent`, but it did not complete before the execution timeout in this archive workspace. The focused suites above cover the changed registry provider, collection planning, content API, background messaging, popup view model, storage, matcher, candidate, graph, direct detection, emission, evidence, lifecycle, observation, and replay behavior.

`aube run bench -- --run` started successfully and completed the observation-matcher benchmark scenarios before the execution timeout stopped the broader benchmark run. The benchmark command should be rerun in the normal branch workspace before making new performance claims beyond the measured matcher-index win.
