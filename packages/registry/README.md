# Technology registry

`@deepscope/registry` owns declarative technology definitions, categories,
authoring types and schema validation. It contains no browser adapter, matcher
executor or storage. The extension build consumes the catalog; a runtime
browser context consumes the compiler's packaged artifacts instead.

Import `technologies` from the root only when the complete catalog is needed.
Use `/types`, `/categories`, `/rules`, `/schema`, `/schema/version` or
`/schema/diagnostics` for narrower contracts. The explicit `/catalog/...`
exports exist for current named integration fixtures. Adding another consumer
requires a reviewed export; it must not bypass the package with a relative
path into its source.

Catalog paths, technology IDs, rule IDs and category IDs are established data
names. Their dashes remain intentional. A source-layout refactor does not
rename them or change serialized values.

The schema imports `zod/mini`, enables its existing jitless configuration and
English messages, and validates source data before compilation. Its package
metadata declares that schema module as having side effects; other exports
must not accidentally force schema initialization. Schema results retain their
current plain diagnostics shape. See the [wire-contract decision](../../docs/adr/01-public-source-builds.md)
before considering a Result or Failure occurrence migration.

Run `pnpm --filter ./packages/registry --fail-if-no-match run check` for the
native owner check. Vitest discovers `schema/source-schema.test.ts` through
this package's config. Compiler, artifact-equivalence and browser integration
checks also consume this catalog. None of these source checks alone prove a
store-ready extension.
