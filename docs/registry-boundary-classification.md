# DeepScope Registry ownership classification

DeepScope currently carries a large local technology Registry. The current tree contains 8,157 files under `src/registry/`, including thousands of authored technology definitions.

Do not move this tree wholesale. Separate canonical semantic authority from the browser product runtime first.

## Classification

| Current area | Classification | Target authority | Migration |
| --- | --- | --- | --- |
| `src/registry/categories.ts` | category identity, labels and semantic classification | Intelligence / Semantics | Move or generate from canonical Intelligence Registry data. DeepScope may retain presentation ordering only if it is browser/UI-specific. |
| `src/registry/technology/catalog/**` technology identity/name/site/category/source metadata | canonical technology knowledge | Intelligence / Semantics / Registry | Move to the canonical Registry source. |
| technology detection rules that state what observation proves a technology | extractor/detection semantics | Intelligence / Semantics / Extractors | Move to canonical semantic authority, preserving rule behavior and provenance. |
| technology relationships/components/source identities | semantic relationship/identity metadata | Intelligence / Semantics | Move to canonical authority where reusable. |
| `src/registry/technologies.ts` | local aggregate over authored catalog | transitional source assembly | Replace with a versioned Intelligence-produced browser projection. |
| `src/lib/registry/compiler.ts` source validation + compilation | mixed | Split | The deterministic semantic-to-browser export should ultimately be owned by Intelligence; browser packaging/runtime-specific transforms may remain DeepScope. |
| `modules/compile-registry.ts` WXT lifecycle, public-asset placement and extension build integration | browser build/runtime integration | DeepScope | Keep. It should consume an explicit versioned Intelligence artifact instead of importing authored canonical source. |
| matcher shards, offscreen worker lifecycle, observation-kind routing and local matcher execution | browser runtime | DeepScope | Keep. |
| browser observation kinds, DOM/header/storage/global collection and permissions | browser product/runtime | DeepScope | Keep. |
| extension-facing technology display/cache/history/diagnostics | browser product/presentation | DeepScope | Keep. |

## Target interface

The end state should be one deterministic, versioned Intelligence artifact containing only what DeepScope needs, for example a package subpath or generated JSON bundle.

The artifact needs explicit:

- semantic/Registry version
- source revision or immutable release coordinate
- schema/artifact version
- technology identity/category metadata required by DeepScope
- browser-compatible detection/extractor rules
- relationship data needed by local graph refinement
- integrity/hash information sufficient to reject stale or mismatched generation

DeepScope must not import Intelligence source directories directly.

## Migration order

1. Define a portable browser projection schema without changing extension behavior.
2. Export the current DeepScope-authored catalog into that schema and prove byte/behavior equivalence against the existing generated extension artifacts.
3. Establish the same canonical definitions in Intelligence/Registry and reproduce the projection there.
4. Add a pinned release coordinate plus hash/version checks in DeepScope.
5. Switch the WXT build to consume the pinned artifact.
6. Run rule correctness/benchmark gates and generated Chrome artifact validation.
7. Only after equivalence is proven, remove the duplicate canonical source from DeepScope.

## Stop conditions

Do not remove `src/registry` authority until:

- the Intelligence artifact reproduces the required technology/rule set;
- matcher/runtime behavior remains equivalent;
- release builds cannot silently use stale generated data;
- DeepScope no longer needs Intelligence source access;
- canonical semantic ownership is unambiguous.
