---
name: use-kaiju-utils
description: Select, adopt, verify, or debug the Kaiju Utils packages (`@kaiju-ind/*`, from the Kaiju-Ind/utils repository) before writing a generic utility. Use for context, task, activity, workflow and history, dispatch, scheduler, pool, worker and process, storage (queue, workflow, outbox, state), server, endpoint, gateway, HTTP, query, schema and codecs, result, failure and fault, env, runtime, telemetry, format (CSV, sitemap), streams, hash, duration, dispose, capability (resource, requirement, effect, resilience), authz and input.
---

# Use the Kaiju Utils packages

## Reading boundary

Minimum: read this entrypoint and the linked shared software-quality contract.
Read a reference only when its decision is in scope. Stop when the package, its
version and its exports for the decision are known; report any source you could
not read.

## Shared obligations

Read [software quality](../../guides/software-quality.md) before this
capability's work, and [applying standards](../../guides/applying-standards.md)
before domain work. This skill selects and verifies a Utils package. The skill
that owns the change (`build-apis`, `build-data`, `build-workflows`,
`build-clis`, `build-libraries`) still owns its design and verdict.

## Utility authority

The [Kaiju-Ind/utils](https://github.com/Kaiju-Ind/utils) repository owns the
generic utilities of every Kaiju project. Its `packages/*` workspace publishes
the `@kaiju-ind/<package>` packages to GitHub Packages.

1. Before you write a generic utility, find its owner in the
   [package map](references/packages.md). A local copy of a Utils capability is
   a defect, not a shortcut.
2. Use the published package at an exact version. The Utils source on `main`
   can be ahead of the release; the installed package is the contract.
3. If no package fits, write the smallest local code that the task needs, name
   the gap, and propose it to Kaiju-Ind/utils. Do not grow a local generic
   library.

`@okikio/*` libraries are a separate, personal ecosystem (`@okikio/undent`,
`@okikio/observables`, `@okikio/sparql`, `@okikio/wikitext`, `@okikio/opfs`).
Use `use-okikio` for them. They never replace a Utils package, and Okikio's
personal utility workspace is not a source for Kaiju work.

## Procedure

1. Name the need in plain words, such as "bound active downloads to four" or
   "save workflow progress beside business state".
2. Find the package and subpath in the [package map](references/packages.md),
   then read its README and the guide that the map links.
3. Check the consumer: its manifest pins, lockfile, registry configuration and
   the installed package's `exports` map. Follow
   [adoption](references/adoption.md).
4. Import the narrowest public subpath, for example `@kaiju-ind/format/csv`
   rather than the `@kaiju-ind/utils` umbrella.
5. Keep the package's ownership model: callers keep injected resources, a
   `Context` scopes lifetime and cancellation, and cleanup has one owner.
6. Prove the integration in the consumer: types, the main path, the rejection
   path and cleanup.

## Reference routing

- [packages.md](references/packages.md): the published packages, their
  versions, their main subpaths and the Utils guide for each.
- [adoption.md](references/adoption.md): registry setup, exact versions, export
  checks, replacing a local utility, and reporting a gap.
- [services.md](references/services.md): server, endpoint, gateway, HTTP,
  query and effect contracts.
- [workflows.md](references/workflows.md): context, task, activity, workflow,
  history, dispatch, storage and outbox contracts.

## Failure review

Watch for:

- a local generic utility, or a copy of a Utils module, where a published
  package fits;
- an `@okikio/*` import, or Okikio's personal utility workspace, used for a
  Kaiju-Ind Utils capability;
- an export claimed from Utils `main` that the pinned release does not have;
- an umbrella or `/all` import where a focused subpath is enough;
- a version range where the consumer pins exact versions;
- a library that configures LogTape or OpenTelemetry globally, which only the
  application may do;
- an in-memory dispatch, history or emitter presented as durable.

## Completion gate

Do not call a Utils integration complete until the package and exact version
are verified in the consumer, the import is a public subpath of that version,
the ownership and cleanup model is intact, and the main and failure paths are
tested in the consumer's runtimes.

## Kaiju projects

In a Kaiju project, the playbook says which procedure this work belongs to and what evidence it needs: [Service readiness](../../../docs/kaiju/services/README.md), [Task prompts](../../../docs/kaiju/tasks/README.md).

## Resource navigation

The [complete resource index](references/resources.md) lists this capability's maintained detail. Use it only to
locate a decision-specific resource; it is not a reading checklist.
