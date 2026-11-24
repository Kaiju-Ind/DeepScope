# Okikio package map, evidence and integration protocol

## Evidence classes

| Class | Meaning | Allowed claim |
| --- | --- | --- |
| published and verified | registry version and export map inspected, a consumer exercises it | exact API at that version |
| local and inspectable | source exists in the repository but publication is not claimed | behavior of that source |
| experimental | prerelease, `0.0.x` or incomplete surface | behavior observed, nothing stable |
| documented target | a design or handoff describes behavior not yet implemented | intent only |
| remembered or unresolved | name supplied from memory, source not established | search or ask; never invent APIs |

Do not convert a manifest name into proof that a package was published. Do not
convert a registry package into proof that the consumer uses it.

## Packages DeepScope reaches

These rows are dated observations and require registry and export
verification. The Kaiju Utils packages are not Okikio packages: DeepScope
vendors the ones it uses as `@utils/*` and `use-utils` owns them.

| Identity | How DeepScope reaches it | Scope | Reference |
| --- | --- | --- | --- |
| `@okikio/observables` | npm `1.4.0`, pinned exactly by the vendored `utils/*` packages (context, pool, scheduler, storage, task, telemetry, worker, workflow, capability) | Observable/operators, EventBus, stream interop | `observables.md` |
| `@okikio/undent` | not a dependency today | Dedentation, interpolation, Unicode width for text blocks in tools | `undent.md` |

Other Okikio libraries (`@okikio/sparql`, `@okikio/wikitext`, `@okikio/opfs`,
RDF packages, MediaD) have no DeepScope consumer; their references were not
copied and can be restored from the Kaiju guidance pack if one is adopted.

A remembered `obserables` (missing the `v`) is a misspelling of
`@okikio/observables` until proven otherwise; do not install it.

## Selection and verification workflow

1. Resolve the exact spelling, version, registry (npm for DeepScope), export
   path, license and maturity.
2. Inspect the installed package under `node_modules` and the lockfile, not
   memory or upstream `main`.
3. Trace the public API from exports through declarations and tests.
4. Confirm the consumer's ownership model: who subscribes, who tears down, who
   owns cancellation.
5. Prove the integration in the consumer: types, the main path, the error path
   and teardown.

Adding an Okikio library as a direct DeepScope dependency is a dependency
decision: use `explore-ecosystems` and pin an exact version.

## Deliberate exclusions

- Do not invent package names, exports, subpaths, or maturity from memory.
- Do not import internal files past an export map without an explicit ownership decision.
- Do not force Okikio packages where the consumer has selected another owner or the package adds no value.
- Do not equate Observables with durability or cancellation authority.
