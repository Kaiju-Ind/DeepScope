# Cross-browser runtime and public release plan

This plan integrates the `perf/optimize-memory-usage` scheduler work, adds
Firefox and Safari as supported browsers, and prepares DeepScope for public
source releases. It is the working record for that effort. Architecture
documents under `docs/architecture/` remain the description of what exists;
this file tracks what is being changed and why.

## Active task

- **Intent and completion:** Chrome, Firefox and Safari builds that detect
  technologies on a real page, keep the Chromium side panel, use less memory
  than `main` on repeated scans, and publish per-browser release archives with
  checksums and provenance from GitHub Actions.
- **Base:** branch `integrate/cross-browser-runtime`, started from PR #5
  (`origin/codex/ci-cache-and-stack-checks`, which contains PR #4) with
  `main` (b3f4467a) merged in. PR #5's privacy fixes are preserved.
- **Authority:** owner decisions recorded below; engineering guidance from
  the skills in [`.agents/`](../../.agents/START.md) (`review-code`,
  `plan-changes`, `build-extensions`, `build-web`, `build-workflows`,
  `build-devtools`, `release-software`) and the
  [Kaiju project playbook](../kaiju/README.md) (agent execution, engineering
  and CI), routed by [`AGENTS.md`](../../AGENTS.md). Lessons from this plan
  are kept in the [failure catalogue](../kaiju/failures/README.md).
- **Authorization:** implement on this branch and commit locally. Pushing,
  opening pull requests, creating releases, and store submissions have not
  been authorized.
- **Continuation:** read this file, run `git log --oneline main..HEAD`, run
  `mise run check` equivalents (`pnpm compile`, `pnpm exec vitest run`), then
  continue with the first milestone not marked done.

## Owner decisions (2026-11-23)

- Support the latest standards of each browser; WXT is a tool, not the
  standard. Upgrade dependencies where that helps.
- The Chromium side panel stays. Other browsers use the best native surface,
  then a popup, then a full page.
- Chrome keeps the offscreen worker host. Other browsers use whatever
  background model can own the workers.
- Memory is the main constraint. Inactive tabs keep working; activating a tab
  raises its priority instead of cancelling other work. Scheduling behaviour
  may become user settings.
- Page-controlled keys colliding with prototype members are a security issue.
- The registry build pipeline is too complicated for a public audience and
  should be simplified.
- Utilities DeepScope needs are copied into `src/utils/` so the project does
  not depend on private packages.
- Releases follow uBlock Origin: one archive per browser on GitHub Releases,
  also available from GitHub Packages, with checksums.

## Platform facts that shape the design

Checked on 2026-11-23 against MDN browser-compat-data, Chrome, Mozilla and
Apple documentation. Items marked *unverified* need a real-browser check.

| Capability | Chrome | Firefox | Safari |
| --- | --- | --- | --- |
| Background | service worker | event page (`background.scripts`); no service worker | service worker or non-persistent page |
| `Worker` from background | no (service worker) | yes | yes from a page, no from a service worker |
| Offscreen documents | yes | no | no |
| Side surface | `sidePanel` | `sidebar_action` | none shipped; WECG agreed on a future `browser.sidebar` |
| `action.openPopup()` | 127 | 109 | 16 |
| `storage.session` | 102 | 115 (no `setAccessLevel`) | 16.4 |
| `executeScript` `world: 'MAIN'` | 95 | 128 | 15.4 (enum object only from 27.2; use the string) |
| `MessageSender.documentId` | 106 | 153 | 18.4 |
| Badge cleared on cross-document navigation | yes | yes | yes |
| Badge cleared on `pushState` | no | no | no |
| Badge colours | yes | yes | background colour has no effect; no text colour |
| A busy `Worker` keeps the background alive | n/a | *unverified* | *unverified* |

Consequences: Safari must declare a background **page** so it can create
workers. Firefox and Safari can unload the background mid-scan, so a scan
must survive losing its workers (re-collect from the live page rather than
resume a lost batch, as the perf branch already does). Firefox needs
`browser_specific_settings.gecko.id`, `data_collection_permissions`, and
`strict_min_version` 140 (the first release that understands `data_collection_permissions`, which AMO requires; Android 142). Safari needs `strict_min_version` 18.4 if
`documentId` is relied on; otherwise identify documents by tab, frame and a
navigation counter.

## Design

### Matcher execution

```text
background scheduler (src/lib/scheduler)
  owns priority, fairness, admission (count + estimated bytes), cancellation
  talks to one MatcherPartitionExecutor
        |
        +-- Chrome service worker: offscreen client
        |     runtime messages -> offscreen document -> local executor
        |
        +-- Firefox event page / Safari background page: local executor
              (same object the offscreen document runs)

local executor (src/lib/matcher/workers)
  worker pool: N DedicatedWorker slots, kind affinity, per-slot deadline,
  terminate-and-replace on cancel or deadline, persistent error listener,
  disposal when the last analysis lifecycle releases
```

The executor is chosen by capability, not browser name: if the background
global has `Worker`, it runs the pool directly; otherwise it uses the
offscreen document. The worker entry moves out of `entrypoints/offscreen/`.

### Panel surfaces

One Solid application renders every surface. The surface decides how the
target tab is chosen:

| Surface | Browsers | Target tab |
| --- | --- | --- |
| Side panel | Chrome, Edge | active tab of its window |
| Sidebar | Firefox | active tab of its window |
| Popup | Safari (default), any browser on request | active tab when opened |
| Full page | all | tab id passed in the URL, changeable in the page |

Opening a full page makes that page the active tab, so the full page never
follows activation; it keeps the tab it was opened for. Firefox
`sidebarAction.open()` must be called synchronously inside the click handler.

### Scan jobs and tab changes

A scan is a job identified by tab, document identity and generation.

| Event | Effect on the job |
| --- | --- |
| Tab activated | priority raised; other jobs continue |
| Tab hidden | priority lowered; work continues |
| Cross-document navigation | job cancelled; a new scan starts if automatic scanning is on |
| Same-document navigation (`pushState`) | badge recomputed; live observation refreshes the result |
| Page mutations | incremental observation refresh, scheduled as background work |
| Tab closed | job cancelled and transient evidence released (setting may keep finished results) |
| Background unloaded | job marked interrupted; still-open documents are re-collected |

Candidate user settings: background-tab scanning (continue or wait until
active), worker count (1 or 2), memory budget (low, balanced, high), and what
happens when a tab closes mid-scan.

### Toolbar badge

Today the badge is written only after a complete pipeline run and cleared on
every `loading` or URL change, so it goes stale or blank when results arrive
another way. The badge will instead follow published detection snapshots:
one owner writes the count for the snapshot revision it receives, ignores
revisions older than the last one written for that tab and document, clears
on cross-document navigation, recomputes on same-document navigation, and
restores badges for open tabs after the background restarts.

### Page-controlled keys (done)

All runtime string-keyed maps use `src/utils/dictionary.ts`. See
`src/tests/security/page-controlled-keys.test.ts`.

## Milestones

| # | Milestone | Status |
| --- | --- | --- |
| 0 | Merge `main` into the PR #5 stack; split Vitest into runtime and UI projects | done |
| 1 | Prototype-safe page keys and regression guard | done |
| 2 | Port the perf scheduler, worker pool and build-routed shards; fix review findings | done |
| 3 | Local executor, per-browser background and manifests (Firefox, Safari) | done; real-browser check in milestone 9 |
| 4 | Panel surfaces: side panel, sidebar, popup, full page | done, including toolbar wiring per browser |
| 5 | Scan-job lifecycle, badge owner, scheduling settings | badge done; scheduling settings next |
| 6 | Vendor utilities from okikio/utils (MIT) with attribution | planned |
| 7 | Simplify the registry build pipeline; deterministic output | `generatedAt` removed with a rebuild test; remaining steps planned |
| 8 | CI and release workflows; archives, `SHA256SUMS`, attestations, ghcr | merged locally; not yet run on GitHub. Archives for every browser rebuild identically: fonts come from pinned npm packages via a hand-written `fonts.css` (Fontless, which ordered `@font-face` rules by CDN download completion, is removed) |
| 9 | Real-browser verification and memory measurements | planned |

### Milestone 2 review findings to fix while porting

- Build-routed key buckets must be prototype-free (now enforced by the guard).
- Startup reconciliation must resume both schedulers even when it fails.
- A stale `host-idle` message must not close a busy offscreen host.
- The worker pool needs its own partition deadline and an error listener on
  idle replacement workers.
- `setPriority` failure must not leak an admission reservation.
- Live observation refresh must go through the analysis scheduler and catch
  its errors.
- Scheduler tests must wait for events instead of counting microtasks; add a
  real IndexedDB test (fake-indexeddb).
- The build-route equivalence test must cover every observation kind through
  a JSON round trip, including prototype-named keys.
- Keep the rule-performance budget gate or record why it was removed.
- Benchmarks stay on Vitest 5 `bench` with native file discovery.
- Drop `docs/implementation/deepscope-ui-diagnostics-changes.txt`.

Milestone 2 notes:

- PR #5's autostart controller was kept as is (it already coalesces one active
  and one pending scan per tab). The perf branch's controller, and with it the
  shadowing `generation` parameter, was not brought over.
- The perf branch's `src/benchmarks/registry-json-hydration.bench.ts` deletion
  was not taken; the APIs it measures still exist.
- Panel requests may set `follow: 'pinned'` to target an inactive tab (for the
  full-page surface). The default still requires the active tab.
- `validate:chrome-artifact` is a separate optional script; it needs a local
  Chromium and is not part of `build:chrome` or `check:release`.

### Milestone 7 registry design

Today the build validates and compiles 8,102 catalog files, emits 30
products, and ships 25. Five products (bootstrap, enrichment, metadata,
relationships, manifest) have no reader. Each product embeds `generatedAt`,
so the Chrome and Firefox packages of one commit differ. A validation
failure returns an empty registry and the build continues, while the
shards are still built from unvalidated data. The build reports 186
diagnostics, some with `error` severity, without failing. `wxt dev` never
regenerates after a catalog edit.

Target: catalog -> validate -> compile -> emit `registry.runtime.json` and
one `registry.kind.<kind>.json` per observation kind, nothing else.

```text
src/registry/catalog/<category>/<id>.ts   one technology per file
src/registry/index.ts                     exports `technologies`
src/lib/registry/format.ts                schema version, paths, kinds, RegExp codec
src/lib/registry/runtime-artifact.ts      runtime payload shape
src/lib/registry/matcher-artifact.ts      shard payload shape and hydration
src/lib/registry/load-runtime.ts          background loader
src/lib/registry/load-matcher.ts          worker loader
src/lib/registry/build/{validate,compile,emit}.ts   Node-only, relative imports
modules/registry.ts                       thin WXT module (build:publicAssets)
src/tests/support/registry.ts             in-memory provider for tests and benchmarks
```

Steps, each green: fail the build on error diagnostics and build shards from
validated data; drop `generatedAt` and add a byte-identical rebuild test;
delete dead modules (`precompiled-*`, bootstrap helpers, no-op normaliser);
stop emitting cache-only products and remove `build-provider.ts`; emit
through `build:publicAssets` and fix dev regeneration; split
`packaged-artifacts.ts` and move the compiler into `build/`; report or remove
about 59 duplicate-id definitions; replace the two registry architecture
documents with one `docs/architecture/registry.md` and a CONTRIBUTING
section on adding a technology.

### Utilities from Kaiju Utils (owner decision, 2026-11-23; measured)

DeepScope predates most of Kaiju Utils. Copy exactly what it uses from the
public MIT mirror okikio/utils (Kaiju-Ind/Utils `47d2c0f`), with the MIT
notice and source commit kept beside the copies. Temporal is native in
Chrome 144+ and Firefox 139+; Safari ships it from 27.3. Only
`duration/temporal.ts` imports the polyfill, so a one-file patch selects
native Temporal and gives Safari `temporal-polyfill/implementation`. MV3
service workers cannot use dynamic `import()`, so Chrome either raises its
minimum to 144 or ships the polyfill statically (+22.8 KB gzipped).

Measured with Rolldown, minified, gzipped, native Temporal:

| Package | Verdict | Cost | Replaces |
| --- | --- | --- | --- |
| result, dispose | adopt | 1.6 KB | `utils/result.ts`, ad hoc teardown |
| scheduler/capacity | adopt | 1.5 KB | `scheduler/budget.ts`, reserve/release in `scheduler/matcher.ts` |
| context (+ duration) | adopt with Temporal patch | 3.7 KB | per-tab AbortController scopes in the runtime, `rpc.ts:withTimeout` |
| pool + worker/thread | adopt with adapter | 10.5 KB host, 8.8 KB worker | `matcher/workers/pool.ts`, slot logic in `executor.ts`, the worker message loop |
| scheduler/queue | adopt with a browser store (owner decision) | 9 KB | `scheduler/database.ts` claims, fencing and recovery; needs a browser store and tab/window filtering |
| workflow, activity | adopt with a browser store (owner decision) | 28-50 KB | the analysis and matcher job lifecycles in `scheduler/analysis.ts` and `scheduler/matcher.ts` |
| task, concurrency | reject | 4-12 KB | not needed; context covers cancellation |
| query | reject | 14.3 KB | validates search vocabularies; does not fetch or filter |
| storage | reject for now | - | Postgres or synchronous localStorage only |

A browser store (IndexedDB first, behind a narrow port so an OPFS backend can replace it) is being designed for queue and workflow; storage gaps are not a reason to reject a utility. None of these load in the content script. `fence`, `generation` and
`dictionary` stay (no Utils equivalent; `generation` partly retires once
scopes are contexts). New npm dependencies: `@okikio/observables`,
`@std/async` (via `npm:@jsr/std__async`), `@standard-schema/spec`,
`temporal-polyfill` for Safari only (Chrome's minimum is now 144).

Vendored (2026-11-24) as `@utils/*` workspace packages under `utils/`, with
PR #29's queue, dispatch and record fixes; see `utils/README.md` for the
package list, resync script and migration order. Since source cleanup phase
A, `src/` uses `result`, `context` (RPC timeouts), `dispose` (matcher worker
slots) and `scheduler/capacity` (matcher admission); see the table there.

### Browser store for workflow and queue (design, 2026-11-23)

Utils contracts are stable on `47d2c0f` (open PRs only change Postgres
internals). Recommended design:

- **IndexedDB first.** It is the only durable store every background context
  can reach (Chrome's service worker has no `localStorage` and no OPFS sync
  handles). IndexedDB serialises readwrite transactions across the extension
  origin, so the service worker and the offscreen document claim atomically.
- **OPFS later, behind the same port.** OPFS wins on bulk reads of large
  datasets; DeepScope's scheduler holds tens to hundreds of small rows. In
  Chrome it would need a worker hop plus WebAssembly and `'wasm-unsafe-eval'`.
  The Linear claim did not check out: Linear's sync engine persists to
  IndexedDB; the verified OPFS case is Notion (SQLite WASM on the OPFS
  SyncAccessHandle pool behind a SharedWorker, 20% faster navigation).
- **Queue:** an IndexedDB adapter of `scheduler/queue` (`items` store keyed
  `[namespace, id]`, lane-based indexes replacing Postgres partial indexes,
  one readwrite transaction per claim, fencing by claim token, owner and
  expiry). A scratch prototype passed 8 contract tests under fake-indexeddb,
  including 20 concurrent claimers with no double lease.
- **Workflow:** the in-process `workflow.scheduler` with an IndexedDB
  `History` in the same database as the queue, so a history write can check
  the queue claim in one transaction. The Postgres `ExecutionStore` (27
  methods, about 3,000 lines) is not ported; if full `serve()` durability is
  needed later, run the unchanged Postgres stores on PGlite in a worker.
- **Private tabs** use `queue.memory()` and `history.memory()` only.
- **Built in DeepScope first (owner decision, 2026-11-24):** the stores live
  in `utils/storage/` with the conformance suite in
  `utils/scheduler/queue/testing.ts`, written so they can be proposed upstream
  unchanged. Original plan: add the adapters to Kaiju Utils as
  `storage/queue/indexeddb.ts` and `storage/workflow/history/indexeddb.ts`,
  with a shared queue conformance suite and small contract extensions
  (labels, `cancelWhere`, `reprioritize`, `abandon`, `next`; History
  `forget`/`prune`), then vendor them. A DeepScope-only store would fork the
  contract.

DeepScope mapping: `scheduler/database.ts` is replaced by the IndexedDB queue
(admit, claim, recover, tab removal and window reprioritisation map to add,
claim, abandon, cancelWhere and reprioritize with labels); `analysis.ts`
becomes a workflow; matcher batches stay transient, only control records use
the queue; `fairness.ts` and `budget.ts` stay as DeepScope policy.

### Registry scope (owner decision, 2026-11-23)

The registry (catalog, compiler, artifact formats) stays as it is. Only the
build step that emits the registry JSON is in scope: it now loads the catalog
with one Rolldown pass (cold build 17.9 s to 8.9 s, byte-identical output).
The registry redesign steps above are withdrawn except where they speed up or
tidy that build step.

### Matcher performance study (2026-11-24)

Measured on a realistic 1,076-observation page with the real shards, every
variant checked for identical matches and evidence:

- About two thirds of steady-state matcher time is
  `findLiteralPrefilteredRules` calling `value.includes(literal)` once per
  literal rule over every large observation (html, inline scripts).
- Object shapes are not the bottleneck: rules have 48 hidden classes across
  shards, but a normalized fixed-field record was slightly slower. The JSON
  layout is close to optimal for load cost (parse plus hydrate about 20 ms per
  worker).

Plan, each step behind a golden-output test (full matches and evidence in
order over a page corpus and the curated fixtures):

| Step | Change | Measured effect |
| --- | --- | --- |
| 0 | Golden-output and property tests (regex match implies literal present; scanner equals `includes`) | safety net |
| 1 | One multi-literal scan per observation (4-character hash, `startsWith` on hits) replaces per-rule `includes` | literal kinds 275 ms to 73 ms |
| 2 | Literal extraction rejects only a top-level `\|`, not any `\|` | 559 more rules get a literal; 73 ms to 50 ms |
| 3 | Lowercase literal gates for keyed and fallback value rules (cookies, meta, headers) | first match 51 ms to 10 ms; regexes compiled 3,807 to 852; regex heap 6.8 MB to 2.3 MB |
| 4 | Routes as sequence numbers; drop routes belonging to the other kind | shards 23% smaller |

End to end with steps 1-3: steady state 320-370 ms to 66-73 ms per page,
cold first page 410-525 ms to 135-160 ms. Cleanup found on the way:
`precompiled-module.ts` is dead, `html` and `htmlMatch` shards are
byte-identical, two helpers are duplicated across matcher files, and four
unpackaged build products (about 12 MB) are generated on every build.

Steps 0-3 are merged (2026-11-24). A golden test (`src/tests/matcher/golden.test.ts`,
recorded with the original matcher on the synced catalog) covers about 28,800
observations and 8,200 matches with full evidence; every step reproduced it.
Steady-state matching of the test page went from about 274 ms to 47 ms, cold
from about 322 ms to 83 ms, and regexes compiled on the first page from 3,760
to 781. Shard schema is now 4 (route gates); shards grew 1.2%. Firefox showed
identical technology lists on fixtures and real sites. Step 4 is deferred.

**Follow-up (security and stability):** some catalog regexes backtrack
catastrophically (for example shadcn-ui `(?:[^"'\s]{0,200}\s*)*`); one hung a
test for minutes. Literal prefilters now shield most of them, and the worker
pool's per-partition deadline terminates a stuck worker, but a page could
still trigger one. Add a catalog lint for nested unbounded quantifiers (the
compiler already reports 186 `unsafe_pattern` warnings) and rewrite the
offending patterns.

### Catalog provenance (blocks public promotion)

The catalog appears to be derived from Wappalyzer data: 7,624 definitions
carry Wappalyzer icon filenames, 716 carry `cpe`, rule ids are index-numbered,
and descriptions match upstream text. The repository has no attribution or
license. Before promoting the repository, confirm which upstream the data
came from (the original MIT-era Wappalyzer data and the GPL-3.0
`enthec/webappanalyzer` fork have different terms), then add a compatible
license and NOTICE, or rewrite the copied text.

## Real-browser verification (2026-11-23)

Driver: `scripts/verify/firefox.mjs` (WebDriver, no dependencies; see
`scripts/verify/README.md`). Firefox 160 headless passed: tabs open before
install, active and background loads, SPA navigation, navigation and tab close
mid-scan, background unload after 30 s idle and wake, add-on upgrade with
open tabs, back/forward cache, full page, and real sites (example.com,
wordpress.org, react.dev, github.com). Matcher workers ran in the background
page. Extension process memory: about 180-233 MiB active, 100-115 MiB while
the background was unloaded.

**"Can't find the content script" in Firefox:** on very large pages the
content script was alive but busy. Its DOM scan on Wikipedia made about 430
`Element.matches` calls per element (9.4 million, 17.9 s); the background gave
up after 10 s. Stopgap merged: a busy-but-alive script is waited for up to
60 s, and pages Firefox refuses to script now report `PERMISSION_DENIED`. The
real fix is merged: selectors are routed by the conditions of their right-most compound (`src/lib/dom/route.ts`). On the same Wikipedia page in Firefox 160 the scan went from 9,438,348 `matches()` calls and 18.9 s to 4,730 calls and 0.41 s, and observation collection from 19.0 s to 0.59 s, with the matched selector set proven equal to DOM ground truth (`src/tests/dom/match.test.ts`).

Open: the later evidence passes still time out at 10 s each on huge pages;
with site access revoked Firefox hides `tab.url` and the user sees the wrong
error; a re-injected script leaves the old listener registered; snapshots
record `offscreen-worker-pool` when background workers ran.

**Routing correctness audit (independent, 2026-11-24).** Line-by-line
soundness review, a property test (if `matches()` is true, routing must admit
the selector), 30,000 jsdom and 10,000 Firefox fuzz cases, the full registry
plus mutated variants in Firefox (22,257 matching pairs), and 36 live sites:
0 lost matches on real pages or registry selectors; old build vs new build gave
identical technology lists. Two holes in hand-written inputs were fixed:
escapes postcss misparses (tab or newline after a hex escape, escaped line
breaks) now fall back to checking every element, and duplicate or mixed-case
attribute names set by script are read from every attribute node. Follow-up:
a registry lint that rejects selectors postcss cannot parse but browsers
accept (none in the registry today), and the pre-existing exact-case id/class
check on the mutation path in quirks mode.

**Safari was not verified.** SafariDriver needs Develop > Allow Remote
Automation (or `safaridriver --enable`, which asks for an admin password),
and the unsigned app built by `scripts/verify/safari-package.sh` needs
Develop > Allow Unsigned Extensions (resets each launch) plus enabling the
extension and granting site access. WebDriver cannot install extensions in
Safari yet (WebKit bug 288348).

## Dependency status

WXT 0.21.5, `@wxt-dev/module-solid` 1.1.4 and `@wxt-dev/browser` 0.3.7 are the
latest releases. Solid 2.0 (2026-11-17) is held back: Kobalte, Corvu,
`@wxt-dev/module-solid` and `vite-plugin-solid` 2.x still require Solid 1.x,
and the trial upgrade produced 1,979 type errors. All non-major updates pass.

## Owner actions

- Choose a license for DeepScope. The copied utilities are MIT.
- Confirm redistribution rights for the detection catalog data and the
  American Kestrel font before the repository is promoted publicly.
- Decide between GitHub-hosted runners (free for public repositories) and the
  current Ubicloud runner.
- Enable immutable releases; make the ghcr package public after first push.
- Store credentials when store publishing is wanted: Chrome Web Store, AMO
  (`WEB_EXT_API_KEY`/`SECRET`), App Store Connect API key and an Apple
  Developer Program membership for Safari.
- Choose the Firefox add-on id.
