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
- **Authority:** owner decisions recorded below; engineering guidance from the
  finance `.agents` skills (`review-code`, `plan-changes`, `build-web`,
  `build-workflows`, `build-devtools`, `release-software`) and the Kaiju
  project playbook (`agent-execution.md`, `engineering-ci.md`).
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
`strict_min_version` 128 or later. Safari needs `strict_min_version` 18.4 if
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
| 2 | Port the perf scheduler, worker pool and build-routed shards; fix review findings | done (branch `port/perf-scheduler`) |
| 3 | Local executor, per-browser background and manifests (Firefox, Safari) | planned |
| 4 | Panel surfaces: side panel, sidebar, popup, full page | planned |
| 5 | Scan-job lifecycle, badge owner, scheduling settings | planned |
| 6 | Vendor utilities from okikio/utils (MIT) with attribution | planned |
| 7 | Simplify the registry build pipeline; deterministic output | planned |
| 8 | CI and release workflows; archives, `SHA256SUMS`, attestations, ghcr | planned |
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
