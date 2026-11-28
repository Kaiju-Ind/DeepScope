# Source ownership

A scan begins with a browser event or a panel action. The extension validates
the document, collects page facts, runs portable detection, then publishes a
snapshot for the panel. The source layout follows those responsibilities.
Moving an owner does not change a storage key, registry identifier or RPC name.

## Workspace owners

| Full path | Responsibility | Direct runtime dependencies |
| --- | --- | --- |
| `apps/extension/` | WXT entrypoints, browser adapters, scheduling, storage and Solid UI | Three local packages, browser/UI dependencies and the recorded `@utils/*` source closure |
| `packages/dom/` | Compile selector plans, route candidates and match a caller-owned document | `postcss-selector-parser` |
| `packages/registry/` | Technology definitions, categories, authoring types and schema | `zod` |
| `packages/detection/` | Collection plans, observations, evidence, candidates, matching, compiler and artifact data | `@deepscope/dom`, `@deepscope/registry`, `@dagrejs/graphlib` |
| `utils/` | Exact vendored Kaiju Utils closure and its provenance | The manifests and revisions recorded in `utils/sync.json` |
| `tools/lint/` | Repository guidance checks and their tests | Node built-ins; TypeScript and Vitest for checks |
| `tools/utils/` | Generate the recorded vendored closure from exact upstream revisions | Node built-ins and Git; TypeScript for checks |
| `tools/registry/` | Catalog audits and Intelligence import/diff tools | `rolldown` and Node built-ins |
| `tools/release/` | Verify versions and collect built archives and checksums | Node built-ins |
| `tools/verify/` | Inspect built output and drive installed browsers; `chrome/cdp.mjs` owns debugger requests and disposal | Node built-ins; TypeScript and Vitest for checks; browser and driver executables are external prerequisites |
| `patches/` | Frozen dependency repairs with their rationale and regression coverage | pnpm applies the recorded patch hashes during installation |

Each tools directory is a private workspace package with its own `check`
script. It is not a container for unowned scripts. JavaScript-only tools run
Node syntax checks; this does not claim TypeScript checking for JavaScript.
Packages export TypeScript source and are not published. Consumers use explicit
package subpaths. The catalog's existing names, including dashes, remain data
identifiers. They are not candidates for a cosmetic folder rename.

## Browser composition and lifetime

| Full path | State or effect it owns |
| --- | --- |
| `apps/extension/src/entrypoints/background.ts` | Calls background startup; registers no delayed startup wrapper |
| `apps/extension/src/lib/background/coordinator.ts` | Selects executor, persistence and RPC adapters; composes schedulers and the runtime |
| `apps/extension/src/lib/background/listeners.ts` | Synchronous listener registration and navigation/close/replacement dispatch |
| `apps/extension/src/lib/background/content.ts` | Browser content RPC adapter |
| `apps/extension/src/lib/background/action.ts` | Toolbar behavior, including Firefox's synchronous sidebar gesture |
| `apps/extension/src/lib/background/runtime/index.ts` | Wires runtime owners before any event or API call; applies tab cleanup in its established order |
| `apps/extension/src/lib/background/runtime/work.ts` | Document cancellation scopes |
| `apps/extension/src/lib/background/runtime/tabs.ts` | Tab validation and current-document checks through injected capabilities |
| `apps/extension/src/lib/background/runtime/content.ts` | Content readiness and collection calls |
| `apps/extension/src/lib/background/runtime/analysis.ts` | Fresh and snapshot-first analysis ownership |
| `apps/extension/src/lib/background/runtime/evidence.ts` | Follow-up evidence collection |
| `apps/extension/src/lib/background/runtime/refresh/baseline.ts` | Active observation batches and enrichment state |
| `apps/extension/src/lib/background/runtime/refresh/schedule.ts` | Refresh timers and deferred refresh requests |
| `apps/extension/src/lib/background/runtime/refresh/analysis.ts` | Combined-batch analysis and recovery recollection |
| `apps/extension/src/lib/background/runtime/jobs/index.ts` | Queue admission and pending persistence ownership |
| `apps/extension/src/lib/background/runtime/jobs/execute.ts` | Matcher execution and cancellation requests |
| `apps/extension/src/lib/background/runtime/jobs/record.ts` | Matcher records and result publication |
| `apps/extension/src/lib/background/runtime/progress.ts` | Visible-session ownership and revision/progress state |
| `apps/extension/src/lib/background/runtime/publish.ts` | Ordered snapshot/replay writes and badge publication |
| `apps/extension/src/lib/background/runtime/sessions.ts` | Session lookup, refresh and exact-target stop |
| `apps/extension/src/lib/background/runtime/api.ts` | Typed API and runtime notification routing |

These factories receive narrow capabilities. They do not import browser APIs,
RPC implementations or concrete persistence. The composition root uses delayed
callbacks for peer operations; constructors must not invoke them. Tab cleanup
aborts document work before releasing content, refresh and matcher state. A
storage write already submitted to an adapter cannot be canceled by that
cleanup. The existing ownership fences still decide whether a later result
may publish.

`MatcherRunReason` in `runtime/types.ts` describes the real initial,
enrichment, incremental and recovery call sites. It replaces an untyped detail
bag while retaining the diagnostic field names and save-mode decisions.

## Content, persistence and diagnostics

| Full path | Responsibility |
| --- | --- |
| `apps/extension/src/entrypoints/content.ts` | WXT declaration and installation call |
| `apps/extension/src/lib/content/install.ts` | Per-document installation identity, browser lifetime and cleanup |
| `apps/extension/src/lib/content/api.ts` | RPC operations and serialized lifecycle writes |
| `apps/extension/src/lib/content/collect.ts` | Initial normalized observation collection |
| `apps/extension/src/lib/content/signals/` | HTML, element, resource and page-key collection |
| `apps/extension/src/lib/content/observe/state.ts` | One observer state shared by the session's operations |
| `apps/extension/src/lib/content/observe/runtime.ts` | Start, snapshot, flush and stop orchestration |
| `apps/extension/src/lib/content/observe/mutations.ts` | Mutation roots, queued scans and their cancellation checks |
| `apps/extension/src/lib/content/observe/evidence.ts` | Bounded retained evidence for one active observation |
| `apps/extension/src/lib/collectors/background/` | Privileged globals and bounded same-origin fetches |
| `apps/extension/src/lib/storage/snapshots/` | Snapshot schema, cloning, rank, reads, ordered writes, session index and lifecycle operations |
| `apps/extension/src/lib/diagnostics/journal/` | One shared journal state, sanitization, rate policy, write queue, retention and reads |
| `apps/extension/src/lib/scheduler/matcher/` | Admission and dispatch in `index.ts`, selection in `select.ts`, records in `record.ts`, and startup pause/resume in `reconciliation.ts` |

DOM plans belong to `packages/dom/`. Content owns the actual `Document`,
MutationObserver, PerformanceObserver and timers. A stopped session releases
session evidence. The injected RPC runtime can remain until navigation without
keeping an active observer. Private-tab filtering stays at each existing log
and storage producer. The package move does not expand what is persisted.

## Panel state and browser access

`apps/extension/src/app/panel/provider.tsx` constructs signals and effects
synchronously inside Solid's mounted owner. It keeps shared state across route
changes. It does not recreate detection work when a page component changes.

| Full path | Responsibility |
| --- | --- |
| `apps/extension/src/app/panel/state.ts` | Signals, memos and workflow identity |
| `apps/extension/src/app/panel/targeting.ts` | Window/tab lookup, replacement races, mount and disposal |
| `apps/extension/src/app/panel/analysis.ts` | Queued panel analysis and stale-response checks |
| `apps/extension/src/app/panel/revisions.ts` | Apply accepted responses and replay revisions |
| `apps/extension/src/app/panel/snapshots.ts` | Snapshot subscriptions and stored projection |
| `apps/extension/src/app/panel/observation.ts` | Exact-target observation refresh/stop/release |
| `apps/extension/src/app/panel/settings.ts` | Automatic-scan preference and clear-data operation |
| `apps/extension/src/app/panel/routes.ts` | Per-live-tab transient route/search/scroll state |
| `apps/extension/src/app/panel/context.ts` | Narrow projections used by routed pages |
| `apps/extension/src/app/browser/` | Browser tabs, RPC, persistence, surface opening and manifest version access |
| `apps/extension/src/app/model/` | Pure response, workflow, revision, matcher, replay and evidence transformations |
| `apps/extension/src/app/artifact.ts` | Explicit artifact probe installation from panel mount |

A tab switch or panel close sends a best-effort stop for the exact owned
observation target. Stale responses cannot replace a new target. Disposal does
not promise that a remote stop succeeded. The content session ID and expected
URL protect a newer session from a delayed stop.

The neutral Kaiju Design Input contract is integrated in
`apps/extension/src/ui/input.tsx`: `surface="default"` keeps DeepScope's
existing styles; `surface="bare"` lets `InputGroupInput` own decoration and
focus. Native attributes, value, events and refs are forwarded. Solid 1.9.18
and the current Kobalte cohort remain unchanged. This is a source-owned
integration, not a claim that a published registry endpoint was installed.

## Checks and remaining runtime evidence

`pnpm compile` uses native pnpm path selectors for all package and tool checks,
then checks the extension, vendored Utils and root configuration. Vitest uses
project discovery for package tests. The extension keeps browser integration
tests. Oxc checks dependency direction, exported targets and application/package
module size; those oversize exception lists are empty after the source splits.
They do not measure every tools file. The stress harness's remaining split is
tracked in the [active migration record](../migration/monorepo-plan.md).

Type checking and unit tests cannot prove the generated extension lifecycle.
Build and inspect Chrome, Firefox and Safari output, rebuild the Firefox source
archive in a clean directory, then run the affected browser scenarios in the
[verification workflow](verification-workflow.md). A denied browser launch or
an unavailable macOS host leaves that runtime check open.
