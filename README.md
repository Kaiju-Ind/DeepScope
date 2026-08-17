# Kaiju Site Scope Web Extension

A Chrome-first Manifest V3 technology detector built with WXT, TypeScript, Solid, and `comctx`.

The extension analyzes active `http` or `https` pages locally, turns collected page facts into normalized observations, runs the shared event pipeline, and caches normalized `SiteAnalysis` output with an optional redacted replay trace. Automatic page-load scanning is enabled by default and can be turned off from Settings. Raw page payloads are used only during local analysis and are not stored as cache records.

## Current event flow

The runtime now follows one event-shaped detector path for the extension:

```text
side-panel request
  -> background tab check
  -> content-script observation batch
  -> background-only observation enrichment
  -> indexed rule matching
  -> evidence entries
  -> candidate technologies
  -> graph refinement
  -> final SiteAnalysis + replay trace
```

The content script still owns the safe DOM scan because it is the context that can read the page. It returns normalized observations instead of exposing the old detector-ready page snapshot to the background. The background appends the facts that require extension privileges, including page-owned JavaScript globals, same-origin response headers, and bounded same-origin script or stylesheet text. Those observations are then matched by the indexed event pipeline.

Dirty observation refreshes do not merge final detection results. The background keeps the current event batch for the active side-panel session, appends late observer facts, deduplicates repeated observations, and reruns matching, evidence aggregation, graph refinement, and emission over the combined batch. If the Manifest V3 service worker loses memory, the refresh path recollects the current document rather than pretending a late-only batch is enough.

## Current extension behavior

1. Automatic scanning is enabled by default. When an active HTTP/HTTPS page finishes loading, the background starts a fresh bounded analysis; activating an already-loaded tab uses snapshot-first recovery and scans only when no matching snapshot exists. The Settings page can disable these automatic starts.
2. The side panel owns the browser window that contains it, resolves that window's active tab, and asks the background to validate that exact `{ windowId, tabId }` target before requesting `mode: "snapshot-first"` analysis. The side-panel observation request uses `observe: "while-panel-open"`, so manual inspection still works when automatic scanning is disabled.
3. The background validates that the tab is inspectable and checks the exact visible-session snapshot first, then uses origin-level fallback metadata only when no exact snapshot is available. On a hit, the side panel renders stored normalized analysis and replay state immediately.
4. On an automatic page-load scan, snapshot miss, or manual refresh, the background runtime-injects the content script, collects an enriched observation batch, runs the event pipeline, stores the analysis and replay trace, and optionally starts observation.
5. While observation is active, the content script watches late-added scripts, stylesheet links, metadata, and resource timing entries within bounded policy limits.
6. The side panel follows live updates through storage revisions for the current visible session. Dirty sessions flush late observation batches and rerun the event pipeline over combined observations.
7. Closing the side panel unsubscribes the UI from live updates, but the bounded observation session can continue until it stops naturally or the user clicks Stop observation.

The side panel is now task-oriented rather than one long diagnostics surface:

```text
Technologies      default result list for the active tab
Technology detail evidence, version, confidence, and explanation
Scans             manual controls, matcher state, observation state, replay history
Diagnostics       extension contexts, interrupted work, durable crash journal, support report
Settings          automatic scanning and local detector-data controls
```

The Diagnostics view is also available as an independent extension options page so support data remains accessible when the detector UI or side-panel state is unhealthy.

## Messaging architecture

The extension uses `comctx` to expose small typed RPC surfaces between the side panel, background service worker, and content script. The background API owns privileged orchestration such as tab validation, runtime injection, cache lookup, fresh analysis, replay storage, and observation-session control. The content API owns page-local observation capture and bounded observation sessions only. Detection logic does not run in the content script.

`comctx` is used instead of raw `browser.runtime.sendMessage` and `browser.tabs.sendMessage` discriminated unions because each extension context can consume an explicit TypeScript interface while the adapters still route over normal Manifest V3 extension messaging. Runtime calls that cross into the content script are wrapped with a timeout so a missing or stale content script returns `CONTENT_SCRIPT_UNAVAILABLE` instead of leaving the side panel waiting indefinitely.

The current permission model supports both automatic and manual analysis:

- `host_permissions` for `http://*/*` and `https://*/*` allow automatic page-load analysis without requiring a toolbar click first.
- `activeTab` remains available for explicit toolbar-driven interaction and compatibility with the manual flow.
- `scripting` is used for runtime content-script injection and MAIN-world JavaScript-global probing.
- `storage` persists normalized analysis, redacted replay traces, matcher lifecycle state, the bounded diagnostic journal, and extension preferences.
- `sidePanel` hosts one persistent window-scoped analysis UI. The mounted panel follows active-tab changes in its own browser window instead of creating a different panel instance for each tab.
- `offscreen` owns the local matcher host so heavier registry matching does not block the panel or depend on service-worker memory.
- `clipboardWrite` is used only after the user presses **Copy report** on Diagnostics. The extension does not read clipboard contents.

## Manual QA checklist

Run the extension in Chrome and verify:

- With **Scan pages automatically** enabled, loading a normal `https://` page starts analysis before the side panel is opened.
- Open **Scans** and confirm detector, observation, evidence, and result state update for the active tab.
- `chrome://extensions` returns `UNSUPPORTED_URL` and the side panel remains responsive.
- Browser/internal or PDF-like pages that do not run the content script do not hang the side panel.
- A page with no content-script response returns `CONTENT_SCRIPT_UNAVAILABLE`.
- Opening the side panel after an automatic scan renders the stored result immediately on **Technologies**; turning automatic scanning off leaves manual analysis and Refresh working.
- Pin the side panel, switch between two normal website tabs in the same window, and confirm the panel follows the newly active tab without reporting a missing active tab or retaining the previous tab's detections.
- Open a second browser window and confirm each mounted side panel follows only the active tab in its own window.
- Refresh bypasses cache, reruns event analysis, and starts a fresh observation session.
- Closing the side panel stops live UI updates, and clicking Stop observation stops the active observation session for the visible tab.
- Late-loaded signals on a supported page can trigger event analysis while the side panel stays open.
- Open a technology result and confirm raw evidence is available on its detail route instead of being repeated across every result row.
- Open **Diagnostics**, copy a report, and confirm it includes build identity, current extension contexts, recent context runs, matcher lifecycle state, and recent warnings/errors.
- Open the extension options page and confirm Diagnostics works without mounting the detector state owner.
- End a background context during non-terminal matcher work, then reopen the extension and confirm the job is reconciled as `context-interrupted` with its previous matcher state retained.
- Dirty refresh does not append final results blindly. Existing and late observations are evaluated together, so `implies`, `requires`, and `excludes` are recalculated as one candidate graph.

## Tooling

This repo uses `mise` to pin project tools and `pnpm` for package scripts and dependency management.

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

If you prefer `mise`, it keeps the repo's Node and pnpm versions aligned before you run the package scripts above.

## Project areas

- `src/entrypoints/` — WXT side panel, independent diagnostics/options page, background service worker, content script, and offscreen matcher entrypoints.
- `src/entrypoints/sidepanel/` — WXT side-panel document and router mount. Shared Kaiju styling lives under `src/styles/`.
- `src/panel/` — window/tab ownership, routed Technologies/Scans/Diagnostics/Settings pages, shared side-panel state, technology evidence views, and the compact panel shell.
- `src/ui/` — complete current Platform Zaidan primitive catalogue, including its nested color-mode support, adapted only to the extension import alias and actively used by the routed UI.
- `src/components/` — reusable cross-route presentation such as the Diagnostics support view shared by the side panel and options page.
- `src/lib/content/` — DOM collection and observation-session state owned by the content script.
- `src/lib/collectors/` — extension collection planning plus background-only observation enrichment.
- `src/lib/contracts/` — serializable analysis and persisted detector contracts shared across runtime surfaces.
- `src/lib/observations/` — normalized observation contracts, snapshot adapters, and bounded batch controls.
- `src/lib/detection/` — detector types, rules, normalize, indexed observation matching, graph helpers, validation, and version helpers.
- `src/lib/evidence/` — event-pipeline evidence contracts, builders, and in-memory repository helpers.
- `src/lib/candidates/` — candidate aggregation and relationship refinement from evidence entries before final detection emission.
- `src/lib/dom-selector/` — DOM selector offscreen contracts shared by the content and offscreen entrypoints.
- `src/lib/emission/` — final `SiteAnalysis` emission from refined candidates.
- `src/lib/pipeline/` — event pipeline runtime, observation-batch runtime, replay trace, and explanation generation.
- `src/lib/messaging/` — typed `comctx` message contracts and adapters for side-panel, background, and content contexts.
- `src/lib/background/` — browser-agnostic background orchestration plus matcher-interruption reconciliation.
- `src/lib/diagnostics/` — LogTape configuration, crash hooks, bounded durable journal, and support-report generation.
- `src/lib/persistence/` — persistence ports and browser-backed implementations that keep orchestration independent from storage APIs.
- `src/lib/privacy/` — diagnostic and evidence redaction rules applied before durable support data is written.
- `src/lib/panel/` — side-panel view-model and durable snapshot projection helpers that do not own browser routing or presentation.
- `src/lib/storage/` — normalized analysis/replay caches, durable matcher lifecycle records, and aggregate status helpers.
- `src/lib/browser/` — tab helpers owned by privileged contexts.
- `src/data/` — category labels and bundled technology registry exports.
- `src/tests/` — Vitest coverage for detector behavior, event pipeline stages, collector planning, content observation, tab-following lifecycle, routed UI architecture, durable diagnostics, storage semantics, and shared fixtures.
- `public/icons/` — placeholder extension icon files.

## Registry baseline

The bundled registry is generated from the TypeScript rule tree under `src/lib/detection/rules/` and re-exported through `src/data/technologies.ts`. The compiled registry artifact exposes matcher indexes, relationship graphs, collection plans, source maps, and diagnostics. The long-term architecture still allows a JSON or YAML source migration, but the current extension runtime already consumes compiled artifacts for event matching and graph refinement.

## Privacy notes

Analysis is local-first. Automatic analysis of active HTTP/HTTPS pages is enabled by default and can be disabled from Settings; manual side-panel analysis remains available. The extension reads page-derived signals such as the current URL and hostname, DOM markers, metadata, resource URLs, cookie names, storage key names, selected header-derived signals, JavaScript global names, and bounded evidence snippets so it can explain technology detections. It does not send visited URLs, HTML, cookies, headers, replay traces, or detection results to a backend in the first release. Cached product data is limited to local detector snapshots, redacted evidence, replay summaries, and matcher lifecycle records. A separate bounded local diagnostic journal retains build/context/lifecycle/error information for support. Diagnostics and detector data can be cleared independently, and no diagnostic report is uploaded automatically.

Unsupported pages such as `chrome://` return a stable error instead of attempting analysis.
