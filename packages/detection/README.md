# Portable detection

`@deepscope/detection` turns normalized observations into matched evidence,
candidate technologies, relationship-refined results and redacted replay data.
It also compiles the registry and defines the runtime and matcher artifact
formats. Browser collection, RPC, scheduling, worker hosts and persistence stay
in `apps/extension`.

The package deliberately has no root barrel. Import the declared subpath for
the operation: `/collection/plan`, `/observations`, `/evidence`, `/candidates`,
`/matcher`, `/engine`, `/pipeline`, `/compiler` or an artifact/type subpath.
Internal imports use relative `.ts` paths. The package depends directly on
`@deepscope/dom`, `@deepscope/registry` and `@dagrejs/graphlib`; it does not
acquire unused browser or utility dependencies.

## Contracts retained by the move

`AnalysisFailure` is serializable data with `code`, `message` and optional
`stack`. The extension narrows its code set and uses it inside its existing
Result envelope. Replacing it with an Error-based Failure occurrence would
change RPC and retained output and is a separate migration.

The mutable null-prototype observation dictionary accepts page-controlled keys.
The currently adopted Utils record constructors have different immutability,
validation and duplicate policies. The local dictionary remains while those
contracts differ. No blind alias replacement is implied by package extraction.

Collection input, snapshot kind and replay summary are portable data. Concrete
`Document` access belongs to the caller of the DOM package. Detection does not
start observers, timers, browser work or persistence at import time. WXT's
automatic Solid imports exclude this package so a field named `batch` cannot
introduce an undeclared renderer import.

Technology identifiers, schema versions, rule IDs and artifact filenames stay
unchanged. Compilation still separates the rule-free runtime artifact from
observation-kind matcher shards. Source movement is checked against generated
JSON bytes, not only TypeScript compatibility.

## Native checks and consumers

Run `pnpm --filter ./packages/detection --fail-if-no-match run check` or
`pnpm --filter ./packages/detection --fail-if-no-match run test`. Vitest
recursively discovers the co-located pure tests. Shared pure fixtures live in
`testing/`; browser-specific fixtures remain in the extension.

The extension's matcher, background, registry-output, RPC, privacy and panel
suites remain integration consumers. The root compile and test commands cover
both owners. Follow [source ownership](../../docs/architecture/source-layout.md)
for the browser composition and [verification](../../docs/architecture/verification-workflow.md)
for generated output and actual browser gates.
