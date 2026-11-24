# Okikio package map, evidence, release, and integration protocol

Use this reference to decide whether and how to use an Okikio-owned package or private workspace utility. Names from memory are discovery leads. Only inspected manifests, public registry metadata, export maps, source, tests, and consuming imports establish identity and capability.

## Contents

- Evidence classes
- Current package map
- Selection and verification workflow
- Public package integration
- Private workspace integration
- Release and generated-package contracts
- Cross-package ecosystem analysis
- Unknown or missing packages
- Test matrix
- Executable verification
- Deliberate exclusions
- Sources and freshness

## Evidence classes

Label every claim:

| Class | Meaning | Allowed claim |
|---|---|---|
| verified public | official registry/repo/export evidence inspected | exact version/export/capability at verified date |
| observed uploaded source | code exists in retained archive | capability/status of that snapshot only |
| private workspace | local package/export map in an app repo | usable only in that workspace/revision unless published separately |
| experimental/unreleased | version/status or docs show prototype | do not recommend as stable production dependency |
| remembered/unresolved | name supplied from memory, source not established | search/ask; never invent APIs |

Do not convert an observed `deno.json` name into proof that a package was published. Do not convert a registry package into proof that the consumer uses it.

## Current package map

These rows are dated observations and require registry and export verification. The Kaiju Utils packages
(`@kaiju-ind/*`) are not Okikio packages; `use-kaiju-utils` owns them.

| Identity | Evidence/status | Scope | Reference |
| --- | --- | --- | --- |
| `@okikio/undent` | historical supplied `0.3.3` | Dedentation, interpolation, Unicode width | `undent.md` |
| `@okikio/observables` | registry evidence dated 2026-07-17 at `1.4.0` | Observable/operators and adapters | `observables.md` |
| `@okikio/sparql` | registry evidence dated 2026-07-17 at `0.0.2` | Query/term/execution helpers | `sparql.md` |
| `@okikio/wikitext` | historical supplied `0.0.0` | Token/event/tree/session experiments | `wikitext.md` |

Core utilities and older application snapshots are historical context unless
the request targets them. Their layout, exports, and defects do not define the
current utility API. Local names and versions do not establish publication.

A remembered `obserables` (missing the `v`) is a misspelling of `@okikio/observables` until proven otherwise; do not install it. “Backend utils,” “service modules,” or “custom ClickHouse Drizzle library” describe code/architecture and do not establish a public package name.

## Selection and verification workflow

For each dependency request:

1. Normalize the remembered name but preserve possible spellings.
2. Search the consumer's manifests, lockfiles, import maps, source imports, vendored code, and workspace config.
3. Search official JSR/npm/GitHub owner sources when public identity matters.
4. Record exact selected version/source and whether it is public/private/experimental.
5. Inspect the export map and relevant source at that version.
6. Inspect sibling packages, subpaths, adapters, tests, benchmarks, examples, release tooling, and consumers—the ecosystem hypothesis.
7. Build a capability matrix including unsupported/unknown behavior.
8. Choose the smallest package/subpath that matches the use case.
9. Run an import/type/runtime integration fixture.
10. Record sources/freshness and unresolved questions.

Never answer “what API does this have?” from name familiarity. If official source cannot be inspected, define the required interface generically and state that integration is blocked.

## Public package integration

### `@okikio/undent`

Observed uploaded `deno.json`:

```json
{
  "name": "@okikio/undent",
  "version": "0.3.3",
  "exports": { ".": "./mod.ts", "./unicode": "./unicode.ts" }
}
```

The package owns two explicit entrypoints. Inspect their exported functions and use `references/undent.md`; do not invent additional subpaths. The release verifies Deno lint/doc/test/bench, generated npm build, dry-run publish, and Unicode data synchronization. Consumer tests must cover whitespace/newline/tab/Unicode width semantics relevant to output.

### `@okikio/observables`

Use `references/observables.md` for the verified 1.4.0 capability map. Inspect actual JSR exports and avoid importing internal source paths. Establish subscription, teardown, error/completion, scheduling, reentrancy, async iteration, and interop semantics. Do not treat it as RxJS or Solid signals by resemblance.

### `@okikio/sparql`

Use `references/sparql.md`. At verified public version 0.0.2, treat it as early and pin deliberately. Separate term construction, query building, transport, parsing, and domain mapping. Verify escaping/datatypes/prefixes/engine compatibility and never use raw fragments with untrusted input.

### `@okikio/wikitext`

Uploaded manifest version is `0.0.0`; do not represent it as a stable public release. Observed export is only root `./mod.ts`, while published include candidates list AST, events, text source, tokenizer, parsers, parse/tree/stringify/filter/session source. Inclusion does not create subpath exports. Import only from the declared root unless the manifest changes.

## Private workspace integration

Private `@utils/*` packages use workspace/import-map resolution. Preserve their package API:

- do not publish accidentally because a manifest has a name/version;
- use declared export subpaths only;
- align Deno/npm dependency versions across workspace;
- keep import-time code environment/network/global-side-effect free;
- run each package's tasks with the repository's permissions/tool wrapper;
- verify service-level composition, not only package unit tests;
- decide whether extraction to a public package is actually beneficial.

Inspect the current focused manifest and public module. For a generic utility, use the Kaiju Utils packages through `use-kaiju-utils`. Package folder names do not prescribe the consuming repository's layout.

Before importing an internal file to access a missing symbol, decide whether it should become an explicit supported export or remain internal. Do not bypass the export map casually.

## Release and generated-package contracts

The uploaded Undent project demonstrates a thorough cross-runtime release pattern:

- one Deno source package;
- explicit JSR include/exclude;
- clean generated npm output;
- root and `./unicode` entrypoints;
- generated Node checks;
- Deno-only tests excluded from npm artifact where necessary;
- `sideEffects: false`/Node engine/package metadata in generated artifact (inspect generator);
- version validation/propagation;
- deterministic license/README/changelog copying;
- release verification/dry run.

For any dual JSR/npm package verify separately:

```text
source Deno import/type/test
  -> clean generation
  -> generated package exports/types/runtime
  -> package contents/metadata
  -> packed install into clean Node consumer
  -> ESM/CJS policy and Node floor
  -> version/license/readme/changelog parity
```

Generated files should be reproducible and checked for drift. Never format unrelated handwritten Markdown as a side effect of generation.

Unicode/generated-data update also needs:

- pinned immutable upstream version behind mutable discovery URL;
- download checksum/content validation;
- check versus write modes;
- AST/targeted update instead of broad formatting;
- explicit Deno permissions;
- no rewrite when content is unchanged;
- tests covering the new table/data behavior.

## Cross-package ecosystem analysis

Assume every package may have an ecosystem, then verify relationships:

- owner monorepo/workspace siblings;
- root/subpath entrypoints;
- framework/runtime adapters;
- testing/benchmark/build packages;
- examples and real consumers;
- shared schemas/types/protocols;
- version compatibility and peer dependencies;
- generated artifacts and release channels.

Do not force every discovered sibling. Example integration hypotheses:

- `@okikio/undent` can improve multiline stable CLI/docs output, but should not transform machine JSON or arbitrary user content;
- `@okikio/sparql` can back graph query construction, but the API query contract and engine remain separate owners;
- Observables can model event streams, but do not replace durable event storage, SSE replay, or Solid's own reactivity without evidence;
- Wikitext parsing can feed pipelines, but its `0.0.0` status and performance/memory experiments require deliberate adoption;
- private query/execution utilities can compose, but public package extraction would need stable contracts, exports, fixtures, docs, and release work.

## Unknown or missing packages

When source/API is unavailable:

```text
Requested capability: ClickHouse Drizzle-like adapter
Identity: unresolved/private code architecture
Verified exports: none
Do not assume: package name, transactions, migrations, RETURNING, Drizzle compatibility
Required interface: schema -> dialect -> driver/session -> result mapping -> migration artifacts
Next evidence: owner repo/imports/manifest/source/conformance fixtures
```

This is more useful than fabricating a code example. A generic interface example must be labeled conceptual and must not use invented import paths.

## Test matrix

For every selected package:

- identity/source/version resolution and lockfile pin;
- declared root and subpath exports;
- typecheck and runtime import in each supported Deno/Node/browser host;
- documented primary use case;
- edge/error/cancellation/resource-lifetime behavior;
- framework/engine integration at installed versions;
- unsupported import/subpath/API rejection;
- clean consumer without monorepo path leakage;
- duplicate dependency/class identity where relevant;
- generated package tarball/JSR dry run and contents;
- version/license/readme/changelog provenance;
- regression benchmark only where it protects an actual workflow;
- source freshness and security/advisory review.

For private utilities, also run whole-service boot, requests, migrations, worker loops, and shutdown.

## Executable verification

Inspect exact exports:

```bash
deno info jsr:@okikio/undent@0.3.3
deno info jsr:@okikio/observables@1.4.0
deno info jsr:@okikio/sparql@0.0.2
```

Network/registry access may be unavailable; use the consumer lockfile/cache/source and record the limitation. In uploaded source, run repository tasks such as `deno task release:verify` only with required dependencies/permissions, inspect the generated npm package, pack/install it in a clean consumer, and compare exports. For current utility packages, discover the owning workspace tasks and exercise the actual consumer through its public entrypoints. The current workspace uses its pinned TypeScript `type` task for diagnostics; Deno runtime tests are a separate gate.

## Deliberate exclusions

- Do not invent package names, exports, subpaths, or maturity from memory.
- Do not claim a private workspace package is public.
- Do not claim Wikitext `0.0.0` is a stable release.
- Do not import internal files past an export map without an explicit ownership decision.
- Do not force Okikio packages where the consumer has selected another owner or the package adds no value.
- Do not equate Observables with durability, SPARQL builders with engine safety, or Drizzle-shaped APIs with Drizzle parity.
- Do not publish generated packages without clean-consumer verification.
- Do not format unrelated Markdown during generation/release.

## Sources and freshness

Grounded in uploaded `@okikio/undent` 0.3.3 source/build/release tooling, uploaded `@okikio/wikitext` 0.0.0 source/experiments, retained public-registry verification for `@okikio/observables` 1.4.0 and `@okikio/sparql` 0.0.2, reviewed 2026-07-17. Public registry state can change; reverify before release or upgrade. Private/workspace identities remain local unless independently published.
