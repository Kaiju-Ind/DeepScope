# Kaiju Site Scope Web Extension

A Chrome-first Manifest V3 technology detector built with WXT, TypeScript, Solid, and `comctx`.

The extension analyzes the active `http` or `https` tab locally, turns collected page facts into normalized observations, runs the shared event pipeline, and caches normalized `SiteAnalysis` output with an optional redacted replay trace. Raw page payloads are used only during local analysis and are not stored as cache records.

## Current event flow

The runtime now follows one event-shaped detector path for the extension:

```text
popup request
  -> background active-tab check
  -> content-script observation batch
  -> background-only observation enrichment
  -> indexed rule matching
  -> evidence entries
  -> candidate technologies
  -> graph refinement
  -> final SiteAnalysis + replay trace
```

The content script still owns the safe DOM scan because it is the context that can read the page. It returns normalized observations instead of exposing the old detector-ready page snapshot to the background. The background appends the facts that require extension privileges, including page-owned JavaScript globals, same-origin response headers, and bounded same-origin script or stylesheet text. Those observations are then matched by the indexed event pipeline.

Dirty observation refreshes do not merge final detection results. The background keeps the current event batch for the active popup session, appends late observer facts, deduplicates repeated observations, and reruns matching, evidence aggregation, graph refinement, and emission over the combined batch. If the Manifest V3 service worker loses memory, the refresh path recollects the current document rather than pretending a late-only batch is enough.

## Current extension behavior

1. The popup asks the background service worker to analyze the active tab with `mode: "cache-first"` and `observe: "while-popup-open"`.
2. The background validates that the tab is inspectable and checks the per-origin cache.
3. On a cache hit, the popup renders cached normalized analysis and any cached replay trace without injecting the content script.
4. On a cache miss, or after manual refresh, the background runtime-injects the content script, collects an enriched observation batch, runs the event pipeline, stores the analysis and replay trace, and optionally starts observation.
5. While observation is active, the content script watches late-added scripts, stylesheet links, metadata, and resource timing entries within bounded policy limits.
6. The popup polls observation state while open. Dirty sessions flush late observation batches and rerun the event pipeline over combined observations.
7. Closing the popup or clicking Stop observation tears down the active observation session.

The popup includes the completed pipeline mode in its metrics area so browser QA can confirm that extension output came from the event path.

## Messaging architecture

The extension uses `comctx` to expose small typed RPC surfaces between the popup, background service worker, and content script. The background API owns privileged orchestration such as active-tab validation, runtime injection, cache lookup, fresh analysis, replay storage, and observation-session control. The content API owns page-local observation capture and bounded observation sessions only. Detection logic does not run in the content script.

`comctx` is used instead of raw `browser.runtime.sendMessage` and `browser.tabs.sendMessage` discriminated unions because each extension context can consume an explicit TypeScript interface while the adapters still route over normal Manifest V3 extension messaging. Runtime calls that cross into the content script are wrapped with a timeout so a missing or stale content script returns `CONTENT_SCRIPT_UNAVAILABLE` instead of leaving the popup waiting indefinitely.

The current permission model is intentionally narrow:

- `activeTab` gates tab access behind explicit user action.
- `scripting` is used for runtime content-script injection and MAIN-world JavaScript-global probing.
- `storage` persists normalized analysis and redacted replay traces.
- No broad `host_permissions` are requested.

## Manual QA checklist

Run the extension in Chrome and verify:

- A normal `https://` page returns either detected technologies or a stable empty result.
- The popup metrics show `Pipeline: event` after fresh analysis and cache-backed replay responses.
- `chrome://extensions` returns `UNSUPPORTED_URL` and the popup remains responsive.
- Browser/internal or PDF-like pages that do not run the content script do not hang the popup.
- A page with no content-script response returns `CONTENT_SCRIPT_UNAVAILABLE`.
- Opening the popup on a cached origin renders cached analysis without starting live observation.
- Refresh bypasses cache, reruns event analysis, and starts a fresh observation session.
- Closing the popup stops live observation for the active tab.
- Late-loaded signals on a supported page can trigger event analysis while the popup stays open.
- Dirty refresh does not append final results blindly. Existing and late observations are evaluated together, so `implies`, `requires`, and `excludes` are recalculated as one candidate graph.

## Tooling

This scaffold uses `mise` to pin project tools and `aube` as the package manager/script runner.

Common commands:

```bash
mise install
mise run dev
mise run build
mise run zip
mise run test
mise run bench
mise run bench:rules
mise run bench:rules:gate
```

`bench:rules` profiles curated pass/fail samples plus generated miss cases across the registry. `bench:rules:gate` also enables generated structural pass cases, high-risk hydration miss scans, and failing budget checks through the rule-profile environment flags. Use `KAIJU_SITE_SCOPE_RULE_BENCH_PASS_BUDGET_MS`, `KAIJU_SITE_SCOPE_RULE_BENCH_MISS_BUDGET_MS`, and `KAIJU_SITE_SCOPE_RULE_BENCH_REPORT_LIMIT` when a local machine needs different diagnostic thresholds.

You can also run package scripts directly with pnpm:

```bash
pnpm dev
pnpm build
pnpm zip
pnpm test
pnpm bench
pnpm bench:rules
pnpm bench:rules:gate
```

Aube will install dependencies before running scripts when the manifest or lockfile has changed.

## Project areas

- `src/entrypoints/` — WXT popup, background service worker, and content script entrypoints.
- `src/entrypoints/popup/` — Solid popup shell for triggering analysis and displaying results.
- `src/components/` — reusable popup result, empty, and error presentation components.
- `src/lib/content/` — DOM collection and observation-session state owned by the content script.
- `src/lib/collectors/` — extension collection planning plus background-only observation enrichment.
- `src/lib/observations/` — normalized observation contracts, snapshot adapters, and bounded batch controls.
- `src/lib/detection/` — detector types, rules, normalizers, indexed observation matching, graph helpers, validation, and version helpers.
- `src/lib/evidence/` — event-pipeline evidence contracts, builders, and in-memory repository helpers.
- `src/lib/candidates/` — candidate aggregation and relationship refinement from evidence entries before final detection emission.
- `src/lib/emission/` — final `SiteAnalysis` emission from refined candidates.
- `src/lib/pipeline/` — event pipeline runtime, observation-batch runtime, replay trace, and explanation generation.
- `src/lib/messaging/` — typed `comctx` message contracts and adapters for popup, background, and content contexts.
- `src/lib/storage/` — per-origin normalized analysis cache, replay trace cache, and aggregate status helpers.
- `src/lib/browser/` — active-tab helpers owned by privileged contexts.
- `src/data/` — category labels and bundled technology registry exports.
- `src/tests/` — Vitest coverage for detector behavior, event pipeline stages, collector planning, content observation, popup view models, storage cache semantics, and shared test fixtures.
- `public/icons/` — placeholder extension icon files.

## Registry baseline

The bundled registry is generated from the TypeScript rule tree under `src/lib/detection/rules/` and re-exported through `src/data/technologies.ts`. The compiled registry artifact exposes matcher indexes, relationship graphs, collection plans, source maps, and diagnostics. The long-term architecture still allows a JSON or YAML source migration, but the current extension runtime already consumes compiled artifacts for event matching and graph refinement.

## Privacy notes

Analysis is local-first and user-initiated for the active tab. The extension reads page-derived signals such as the current URL and hostname, DOM markers, metadata, resource URLs, cookie names, storage key names, selected header-derived signals, JavaScript global names, and bounded evidence snippets so it can explain technology detections. It does not send visited URLs, HTML, cookies, headers, replay traces, or detection results to a backend in the first release. Cached data is limited to local detector snapshots, redacted evidence, and replay summaries that can be cleared from the popup.

Unsupported pages such as `chrome://` return a stable error instead of attempting analysis.
