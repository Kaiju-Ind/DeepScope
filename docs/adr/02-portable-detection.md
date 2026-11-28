# Portable detection packages

## Decision

Keep the technology catalog, DOM selector work and detector computation in
three private source packages. The extension owns browser APIs, scheduling,
RPC, persistence and reactive UI state. Package exports identify the actual
owner; obsolete app paths have no forwarding modules.

| Owner | Public capability | Direct runtime dependencies |
| --- | --- | --- |
| `packages/dom` | Selector planning, routing and matching | `postcss-selector-parser` |
| `packages/registry` | Authoring types, categories, catalog and schema | `zod` |
| `packages/detection` | Collection plans, observations, evidence, matching, compiler, artifacts and pipeline | Registry, DOM and `@dagrejs/graphlib` |
| `apps/extension` | Browser collection, messaging, worker hosts, scheduling, storage and panel | The three packages, declared browser/UI dependencies and the recorded vendored Utils closure |

A browser-facing type does not belong in a portable package merely because a
caller uses it. The extracted `CollectPageSignalsInput`, `SnapshotType`, replay
summary and failure payload contain portable data; browser adapters import them.
The app retains extension-specific failure codes and permissions.

All package-internal imports use relative paths with source extensions.
Cross-package consumers use declared export subpaths. Native pnpm path filters
select package checks, and Vitest discovers each package's tests. Browser
integration tests stay in the extension even when they exercise detector code.
The architecture tests read actual imports, manifests and exported targets.

## What stays stable

Registry catalog names, technology identifiers, rule IDs and artifact file
names are data contracts. They retain their existing spelling, including dashes.
The compiler emits the same registry JSON assets. Storage keys, schema versions,
message names, diagnostic events and private-window rules do not change with
source ownership.

Pure functions keep their operation order. Stateful browser factories retain
one owner for each map, timer, signal and cancellation scope. Constructors do
not perform browser work. The composition roots wire those owners before
synchronous event-listener registration or Solid effects begin.
