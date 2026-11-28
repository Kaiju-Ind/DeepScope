# Source layout action list

The [active task record](monorepo-plan.md) owns branch identity, decisions,
experiments, validation and the next action. This document describes the source
cuts and their remaining review. The [source map](../architecture/source-layout.md)
is the current file/owner reference. The complete earlier plan, original size
inventory, Phase A decisions and risks remain in the [historical layout record](history/layout.md).

## Implemented owners

The workspace and six original migration cuts are published on existing PR #7.
Portable packages expose their own subpaths and tests; the extension owns browser
adapters and UI; native tools use package discovery and pnpm selectors.

| Location | Responsibility and consumer direction |
| --- | --- |
| `apps/extension/src/entrypoints/` | WXT composition; acquisition happens in the browser callback, not during Node imports. |
| `apps/extension/src/app/model/` | Pure panel state transitions and projection. |
| `apps/extension/src/app/panel/` | Solid state, effects and controller composition under a synchronous owner. |
| `apps/extension/src/app/browser/` | Browser and persistence adapters used by the panel. |
| `apps/extension/src/lib/background/` | Browser listeners, coordinator, executor selection and runtime composition. |
| `apps/extension/src/lib/background/runtime/` | Injected scan, tab, work, session, observation and publication state owners. |
| `apps/extension/src/lib/content/` | Install/RPC/collection lifetimes and page-observation ownership. |
| `packages/dom/` | Portable selector planning, routing and matching. |
| `packages/registry/` | TypeScript catalog, authoring types, categories, rules and schemas. |
| `packages/detection/` | Portable compiler/artifacts, collection/snapshot/replay/failure data and detection; depends on registry and DOM. |
| `utils/` | The recorded Kaiju Utils source closure and its native tests. |
| `tools/verify/stress/` | Model, schedule, pages, actions, observations, final checks, report and orchestration. |
| `tools/verify/chrome/` | Browser process/profile/HTTP, CDP request lifetime and generated-page reporting. |
| `tools/verify/webdriver/` | Native driver/log lifetime, complete HTTP exchanges, validated browser sessions and command budgets. Firefox/Safari callers retain remote cleanup before native disposal. |
| `tools/release/` | Native version/notes commands, archive collection and preparation regressions. |

The original 14 oversized application/package exceptions and two thick-entrypoint
exceptions were retired. The panel provider remains within its 150-line target.
Those ratchets do not establish that all remaining modules, tests or tools are
small or understood. In particular, the background API test remains 2,043 lines
and still needs an ownership split.

The published baseline's hosted types, 253 test files, Chrome/Firefox/Safari
builds, Firefox lint, workflow lint and Chrome artifact startup pass. The exact
source, counts and limits are in the active task record. Real Safari execution
and complete stress/manual journeys are not covered by those passes.

## Next cuts and acceptance

1. Finish the remaining Safari owners after the shared WebDriver repair.
   Release diagnostic workers and storage-probe keys on every terminal path;
   repair the manual base-URL/control-page flow and protect packaging output
   before deletion. Preserve setup, primary and cleanup failures separately.
   Actual Safari acceptance requires a suitable macOS host.
2. Split background API tests into a shared harness and behavior owners only
   after tracing module mocks, captured state, deferred replies and cleanup.
   Remove obsolete registry `SOURCE_LIMITS` mocks from both test harnesses and
   the unused URL predicate after migrating their complete consumer closure.
3. Review large source owners by behavior rather than line count. Detection,
   snapshot storage, page signals, matcher and UI files need their state,
   cancellation, persistence and error contracts understood before extraction.
   Keep shared identity objects and mutation order intact.
4. Complete the exact historical Utils closure comparison, current docs and
   per-file semantic ledger. Compare divergent work explicitly from its common
   ancestor; do not select a newer archive or branch by timestamp.

For each cut, record source and callers before editing. Use Oxc/TypeScript ASTs
for import, binding and moved-body evidence where useful, then run the actual
behavioral owner and affected consumer gates. AST equality does not prove a
runtime journey. Preserve wire/storage keys, privacy filtering and lifecycle
ordering unless a separately reviewed behavioral repair changes them. Update
all imports, exports, tests, docs and comments before deleting the old path.

Names should carry the local owner without repeating its folder namespace.
Review a dash as a possible missing subfolder; keep natural compound names when
they describe one concept. Add useful comments for private state and cleanup
invariants. Keep functional repairs separate from structural moves and unrelated
formatting. Review and save each coherent batch before progressing to the next.
