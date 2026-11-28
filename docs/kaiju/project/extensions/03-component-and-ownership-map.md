# Component and ownership map

Record each extension context the work touches, even when contexts share code.
The current source map is also described in [source ownership](../../../architecture/source-layout.md).

| Context or component | Current full source path | Owner and rules |
| --- | --- | --- |
| Background | `apps/extension/src/entrypoints/background.ts`, `apps/extension/src/lib/background/` | Synchronous listeners; narrow runtime capabilities; no browser calls during construction |
| Offscreen document | `apps/extension/src/entrypoints/offscreen/` | Chrome matcher host; other browser adapters retain their own execution context |
| Matcher workers | `apps/extension/src/lib/matcher/` | Browser worker transport and lifetime stay in the app; portable matching is under `packages/detection/` |
| Content | `apps/extension/src/lib/content/` | Owns document handles, observers, timers and bounded evidence; uses `packages/dom/` for algorithms |
| Panel surfaces | `apps/extension/src/app/`, `apps/extension/src/ui/` | State operations in `app/panel/`, concrete browser/persistence access in `app/browser/`, pure projections in `app/model/` |
| Registry definitions | `packages/registry/` | Catalog, categories, types and schema; stable identifiers |
| Detection and compiler | `packages/detection/` | Pure computation and artifact contracts; no app or browser imports |
| WXT registry adapter | `apps/extension/modules/compile-registry.ts`, `apps/extension/src/lib/registry/` | Deterministic build and browser artifact access |
| Vendored utilities | `utils/` | Resync the exact recorded closure; see `utils/README.md` |
| Tools | `tools/lint/`, `tools/utils/`, `tools/registry/`, `tools/release/`, `tools/verify/` | Each is a declared private package; native Mise tasks call the operation owners |

The [migration plan](../../../migration/monorepo-plan.md) retains completed,
blocked and remaining acceptance separately. A source owner is not proof that
its real-browser flow has passed.
