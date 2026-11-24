---
name: use-okikio
description: Research, select, integrate, review, or debug Okikio-maintained libraries and recurring project patterns without inventing private APIs. Use for @okikio/observables (which the vendored @utils packages use) and @okikio/undent. For the vendored utility packages (@utils/*), use use-utils instead.
---

# Use Okikio libraries and patterns

## Reading boundary

Minimum: read this entrypoint and the linked shared software-quality contract.
Read resources explicitly marked required for the operation; for long guides,
read the applicable sections before making that decision. Use other references
only when they resolve a decision actually in scope. Do not read an entire tree
or recursively select every companion to prove diligence. Recover truncated
required reads. Stop expanding context when the applicable rules and source
behavior are understood; report any material unavailable guidance.

## Shared obligations and companion selection

Read [software quality](../../guides/software-quality.md) before this capability's work.
Comments, docs, naming, imports, readability and correctness are explicit duties
even when no companion is separately selected. Read the applicable detailed
sources linked there before judging those decisions; recover truncated required
reads. The selected capability and real domain/runtime owners share one plan
and verdict. Read this entrypoint and the shared contract first. Read linked detail only
when its decision is in scope; stop when the applicable contract is understood.
Do not recursively load companion skills or historical material for reassurance.



## Select the complete task

Read [applying standards](../../guides/applying-standards.md) before domain work.
Select companions by the contracts being changed, with one discovery pass,
plan, and verdict. For repository work, use the shared quality contract when installed
for naming, schemas, tests, documentation, validation, and completion. Apply
rules by purpose; test-runner imports and trivial private fixtures are not
public runtime APIs. If a companion is absent, use the bundled compact defaults
and inspect local instructions rather than inventing unavailable guidance.

Okikio projects evolve quickly and several have documented target architectures
that are ahead of published packages. Treat every remembered package, export, or
pattern as a hypothesis until current source and tests prove it.

This skill owns exact personal-library knowledge and recurring project patterns.
It does not replace the library, workflow, web, extension, or delivery skill
that owns the implementation domain.

## Scope

This skill covers the Okikio libraries DeepScope can reach: `@okikio/observables`
(a pinned dependency of the vendored `utils/*` packages) and `@okikio/undent`.
The other libraries of that ecosystem have no DeepScope consumer; their
references were not copied.

Generic utilities come from the vendored `@utils/*` packages in `utils/`:
select `use-utils` for context, task, activity, workflow, scheduler, storage,
pool, worker, schema, result, duration, dispose, telemetry and the other
vendored packages. Okikio's personal utility workspace is not a source, and an
`@okikio/*` library never replaces a vendored utility package.

## Package status gate

Classify the exact target before writing usage code:

- **published and verified:** current version/export exists and tests or a clean
  consumer exercise it;
- **local/private and inspectable:** source exists in the supplied/current
  repository but publication is not claimed;
- **experimental:** prerelease/`0.0.x`, prototype, or incomplete surface;
- **documented target:** design/handoff describes behavior not yet implemented;
- **historical:** old code or handoff retained as evidence;
- **remembered only:** no current source evidence.

Use this authority order for an API claim:

1. current export map/public entrypoint;
2. executable tests and real consumers;
3. package manifest/version and built artifacts;
4. current implementation;
5. README/API docs;
6. design handoffs and plans;
7. archived repositories and memory.

Do not claim availability above the strongest evidence.

## Recurring current conventions

When the inspected repository does not define a more specific rule, recent
Okikio work strongly tends toward:

- one-word-first concrete names;
- short operations intended for coherent namespace imports;
- `get` for addressable retrieval and `read` for actual/sequential reading;
- Zod `*Schema` constants and schema-derived project `*Type` data;
- behavior interfaces/classes named after the domain concept;
- direct schema/type imports rather than namespace hiding;
- Standard Schema at validator-neutral integration seams;
- strict ESM with explicit file extensions and the same core source shared
  across every claimed runtime;
- generic mechanisms, domain capabilities, declarative definitions, and
  executable composition separated by ownership; the utility workspace uses
  `packages/*` for generic mechanisms, so directory names are not universal;
- borrowed injected resources unless ownership transfer is explicit;
- `AbortSignal` cancellation distinct from disposal/cleanup;
- `AsyncDisposable`/disposal stacks where they improve ownership;
- LogTape categories in reusable packages while applications own configuration;
- the repository's selected test runner (Vitest in DeepScope) plus actual
  runtime-specific validation for every claimed runtime;
- extensive TSDoc/comments for important internal state, schemas, fields,
  parser tables, regular expressions, resource factories, caches, generations,
  leases, retry rules, and cleanup paths;
- replacement of obsolete internal compatibility unless the requirement says to
  preserve it.

These are conventions, not proof of a specific package export. Verify the
repository before applying them.

## Procedure

1. Resolve exact spelling, repository/workspace, version, export path, runtime,
   license, maturity, and current consumers.
2. Inspect sibling packages and related repositories only far enough to find the
   correct capability owner. Do not install the whole personal ecosystem.
3. Trace the public API from exports through implementation and tests. Label
   unexported helpers and target-design documents honestly.
4. Compare the consuming repository's schema, logging, configuration, resource,
   task/workflow, and packaging owners. Reuse the Okikio pattern only when the
   contracts align.
5. Preserve caller ownership of injected resources unless an explicit option
   transfers it. Trace cancellation, disposal, partial construction, and cleanup
   errors.
6. For parsers/data-oriented code, identify the cost ladder: bytes/text ->
   tokens/events -> retained model/tree -> higher-level findings. Do not
   materialize the expensive representation when a lower layer answers the
   question.
7. If source is unavailable, state the exact inspection needed. Provide an
   integration/discovery plan, not invented imports.

## Failure review

Watch for:

- documented symbol absent from the current public export;
- old handoff used as evidence of implemented behavior;
- generated package API inferred from generator source without inspecting output;
- prototype workflow/adapter presented as durable production implementation;
- observable/event API accidentally treated as cancellation or persistence
  authority;
- library configuring application LogTape globally;
- parser tree/model built when event/range scan was sufficient;
- storage adapter disposing caller-owned database/storage;
- claimed cross-runtime support proven only by TypeScript;
- benchmark comparing different semantics or omitting cleanup/startup cost.

## Verification

For a public Okikio integration, verify at the strongest available level:

1. exact import/export and type inference;
2. source/test contract;
3. representative behavior including failure and cleanup;
4. package/build artifact when publication matters;
5. real claimed runtimes;
6. benchmark or conformance suite when performance/standard compliance matters.

## Reference routing

- [packages.md](references/packages.md): which packages DeepScope reaches,
  evidence classes and the verification workflow.
- [undent.md](references/undent.md): dedentation, interpolation, newline and
  Unicode display-width behavior.
- [observables.md](references/observables.md): published Observable/operators,
  error modes, EventBus, pull/backpressure, teardown, and interop.

Compose with the skill that owns the actual change. This skill supplies verified
personal-library context; it does not override repository-local architecture or
claim unimplemented plans as real APIs.

## Completion gate

Do not call an Okikio-library integration complete until the exact current API
was verified, the consuming repository's ownership/lifecycle model remains
coherent, important failure and runtime paths were tested, and any package or
performance claim was checked against the relevant built artifact or benchmark.

## Resource navigation

The [complete resource index](references/resources.md) lists this capability’s maintained detail and assets. Use it only to
locate a decision-specific resource; it is not a reading checklist.
