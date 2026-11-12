# DeepScope responsibilities

DeepScope identifies technologies on the page a person is viewing and shows the
evidence in the browser extension. This repository owns that browser experience
and the code that collects, evaluates, and stores page observations locally.

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

The current `src/registry/` still contains technology definitions and detection
rules. The planned migration must separate reusable technology knowledge from
browser-specific collection and execution rules. Intelligence is the intended
owner of the reusable definitions; this ownership document does not prove that
the migration or an artifact consumer is implemented.

## Planned connection to Intelligence

- DeepScope should consume a versioned, browser-friendly Intelligence artifact such as a package subpath or generated JSON bundle
- the artifact must contain only the semantic/runtime data the extension needs
- DeepScope must not import Intelligence source directly or bundle unrelated server-side semantic machinery

## Conditions for the migration

- keep browser-specific runtime behavior local to this repository
- make generated Registry projection inputs versioned and reproducible
- CI must reject stale or invalid generated semantic data before release
- cross-repository dependencies use released artifacts only
- the repository release check remains the canonical browser artifact gate
