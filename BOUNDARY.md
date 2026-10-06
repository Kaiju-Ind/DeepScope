# Boundary

DeepScope is the browser intelligence product boundary.

## Owns

- Chrome/browser-extension runtime and WXT integration
- content scripts, background/service-worker and offscreen execution
- side-panel/options UX, browser messaging and permissions
- browser observation, live observation sessions and extension-local caching
- browser orchestration, local matcher execution and diagnostics
- browser-specific projections needed to execute detection locally

## Does not own

- canonical technology knowledge
- canonical Fact, Entity, Extractor or Signal semantics
- provider acquisition
- customer application state
- shared cluster substrate
- public marketing websites

The current declarative registry under `src/registry/` contains semantic material that must be classified during migration. Canonical knowledge belongs in Intelligence; browser-runtime implementation and browser-specific projection remain here.

## External boundaries

- DeepScope should consume a versioned, browser-friendly Intelligence artifact such as a package subpath or generated JSON bundle
- the artifact must contain only the semantic/runtime data the extension needs
- DeepScope must not import Intelligence source directly or bundle unrelated server-side semantic machinery

## Mechanical rules

- keep browser-specific runtime behavior local to this repository
- make generated Registry projection inputs versioned and reproducible
- CI must reject stale or invalid generated semantic data before release
- cross-repository dependencies use released artifacts only
- the repository release check remains the canonical browser artifact gate
