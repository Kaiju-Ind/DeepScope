# Component and ownership map

Record each extension context the work touches, even when contexts share code. `src/`, `modules/` and `bench/` paths
below are under `apps/extension/`.

| Context or component         | Source today                                       | Planned home                         | Owner and rules                                             |
| ---------------------------- | -------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------- |
| Background                   | `src/entrypoints/background.ts`, `src/lib/background/` | `apps/extension/`                | Listeners register synchronously; no browser API at import  |
| Offscreen document (Chrome)  | `src/entrypoints/offscreen/`                       | `apps/extension/`                    | Hosts the matcher pool only where the background cannot    |
| Matcher workers              | `src/lib/matcher/`                                 | `packages/detection`                 | No browser API; per-partition deadline                      |
| Content script               | `src/entrypoints/content.ts`, `src/lib/content/`   | `apps/extension/`, `packages/dom`    | Prototype-safe keys; stays responsive on huge pages         |
| Panel surfaces               | `src/app/`, `src/ui/`                              | `apps/extension/`                    | Renders snapshots; persistence only through `app/browser/`  |
| Registry                     | `src/registry/`, `src/lib/registry/`, `modules/`   | `packages/registry`                  | Deterministic build; provenance recorded                    |
| Vendored utilities           | `utils/`                                           | `utils/`                             | Resync only; see `utils/README.md`                          |
| Tools                        | `tools/`                                           | `tools/`                             | Thin Mise tasks call them                                   |

Check the paths against the tree before relying on them; the [source layout plan](../../migration/source-layout-plan.md)
is moving modules.
