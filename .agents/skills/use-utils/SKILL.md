---
name: use-utils
description: Select, adopt, verify, resync or debug the vendored utility packages (`@utils/*` in `utils/`, copied from Kaiju-Ind/Utils) before writing a generic utility. Use for context, task, activity, workflow and history, dispatch, scheduler capacity and queue, pool, worker threads and protocol, IndexedDB and memory stores, result, failure and fault, duration and Temporal, dispose, schema, collection, telemetry and capability, and for `tools/utils/sync.ts`.
---

# Use the vendored utility packages

## Reading boundary

Minimum: read this entrypoint and the linked shared software-quality contract.
Read a reference only when its decision is in scope. Stop when the package, its
vendored exports and the context that loads it are known; report any source you
could not read.

## Shared obligations

Read [software quality](../../guides/software-quality.md) before this
capability's work, and [applying standards](../../guides/applying-standards.md)
before domain work. This skill selects and verifies a utility package. The skill
that owns the change (`build-workflows`, `build-extensions`, `build-libraries`)
still owns its design and verdict.

## Utility authority

DeepScope's generic utilities come from the `@utils/*` workspace packages in
[`utils/`](../../../utils/README.md). They are copied from Kaiju-Ind/Utils
(MIT) at a recorded commit, renamed from the upstream `@kaiju-ind/*` scope, and
resynced with `tools/utils/sync.ts`, so the public repository builds and
publishes without access to private packages.

1. Before you write a generic utility, find its owner in the
   [package map](references/packages.md). A second local copy of a vendored
   capability is a defect, not a shortcut.
2. Never add a `@kaiju-ind/*` dependency, registry scope or token. The
   vendored copy is the contract; Utils `main` can differ from it.
3. If no vendored package fits, check whether upstream has one that was not
   copied, and vendor it through `utils/sync.json` rather than by hand.
   Otherwise write the smallest local code that the task needs and name the gap.

`@okikio/*` libraries are a separate ecosystem (DeepScope uses
`@okikio/observables` through the vendored packages). Use `use-okikio` for
them. They never replace a vendored package, and Okikio's personal utility
workspace is not a source.

## Procedure

1. Name the need in plain words, such as "bound matcher workers to two" or
   "save scan progress so a restarted background can resume it".
2. Find the package and subpath in the [package map](references/packages.md),
   then read its README in `utils/<package>/`.
3. Check which extension context imports it: the content script imports no
   vendored package; a service worker cannot `import()` dynamically; matcher
   workers load only what the worker entry needs. Follow
   [adoption](references/adoption.md).
4. Import the narrowest public subpath, for example `@utils/scheduler/capacity`
   rather than `@utils/scheduler`.
5. Keep the package's ownership model: callers keep injected resources, a
   `Context` scopes lifetime and cancellation, and cleanup has one owner.
6. Prove the integration in DeepScope: types (`mise run check`), the main path,
   the rejection path and cleanup, and, for stores, private-tab memory-only use.

## Reference routing

- [packages.md](references/packages.md): the vendored packages, their status
  (adopted, transitive, DeepScope's own), subpaths and READMEs.
- [adoption.md](references/adoption.md): using a vendored package, vendoring
  more, the resync script, replacing DeepScope code, and reporting a gap.
- [workflows.md](references/workflows.md): context, task, activity, workflow,
  history, dispatch and the IndexedDB stores.

## Failure review

Watch for:

- a local generic utility, or a hand copy of a Utils module, where a vendored
  package fits;
- a `@kaiju-ind/*` import, dependency or registry entry anywhere in DeepScope;
- a hand edit to a vendored file (one with the "Vendored from" header) instead
  of a patch in `utils/patches/`;
- an export used from Utils `main` that the vendored copy does not have;
- a whole-package import where a focused subpath is enough;
- a vendored package pulled into the content script or a service-worker bundle
  that cannot load it;
- a library that configures LogTape or OpenTelemetry globally, which only the
  extension entrypoint may do;
- an in-memory queue or history presented as durable, or a durable store used
  for private-tab work.

## Completion gate

Do not call a utility integration complete until the import is a public subpath
of the vendored package, `node tools/utils/sync.ts --check` passes when
vendored files changed, the ownership and cleanup model is intact, and the main
and failure paths are tested under the Vitest project that owns the code.

## Kaiju projects

In a Kaiju project, the playbook says which procedure this work belongs to and what evidence it needs: [Platform readiness](../../../docs/kaiju/platforms/README.md), [Task prompts](../../../docs/kaiju/tasks/README.md).

## Resource navigation

The [complete resource index](references/resources.md) lists this capability's maintained detail. Use it only to
locate a decision-specific resource; it is not a reading checklist.
