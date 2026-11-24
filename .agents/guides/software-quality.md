# Software quality is part of the selected capability

A code review includes its comments and docs. A benchmark must still be correct.
A background-runtime change needs meaningful names and import-safe ownership.
These duties apply directly; selecting a separate documentation or testing skill
is not what makes them apply. In DeepScope, correctness comes before speed, and
native web standards come before polyfills.

## Recheck after discovery

The request gives you a starting skill, not the complete list. Once you have
traced the entrypoint, imports and a real caller, compare the decisions you
actually face with [START's owner table](../START.md). Before the first edit,
check that you have read the guidance for those decisions. Repeat the check
before taking on a newly discovered owner or verification layer, or changing
modes (for example, from review to an authorized fix). Review findings do not
authorize fixes.

Read the missing owner's installed `SKILL.md` under `.agents/skills/` and use
its resource index or conditional links to find the specific reference. If
nothing material changed, continue with the guidance already loaded. Keep one
plan and verdict; a technology name or incidental import alone is not a reason
to load another skill.

For example, a review of the technology detail page may start with
`review-code`. Finding a long evidence value clipped by a shared component adds
`build-web` for the layout and the Break UI reference under `design-interfaces`
for what must stay readable. Before an authorized edit, check the shared
component in `src/ui/` and its other callers. A matcher-only change does not add
UI guidance merely because the side panel shows its results; recheck only if the
work now affects a rendered decision.

## Check for reuse before designing

Search for the operation, aliases and real callers. For shared software
capabilities, trace **`utils/` (`@utils/*`) → `src/utils/` → `src/lib/` →
`src/entrypoints/`**. Check every layer for that capability even if you find a
match early. It may already have an owner, a message route, or a worker bound
to it. (The planned layout moves `src/lib/` pieces into `packages/*` as
`@deepscope/*` and the WXT app into `apps/extension/`; trace the same layers
there.)

For rendered changes, start with the route's actual imports and nearby callers.
Check the application's feature compositions and shared primitives before
creating either.
Use the selected web skill's resource index to find its component, registry and
verification guidance. Follow the data back through the relevant owners below
when changing the value or its contract.

1. **Utilities:** Start at [`utils/README.md`](../../utils/README.md) and the
   vendored `@utils/*` packages (selected through `use-utils`), then
   `src/utils/`. Check the owning export map, implementation and tests for
   generic mechanics such as results, disposal, context and cancellation,
   capacity, queues, worker pools and durable workflows.
2. **Libraries:** Find the concrete capability in `src/lib/` (collection,
   detection, matcher, scheduler, storage, messaging) already using those
   mechanics. Extend the owner when the needed behavior is specific to
   DeepScope.
3. **Messages:** Check the existing `comctx` APIs between the panel, the
   background and the content script. Reuse a typed method before adding
   another message, wrapper or transport.
4. **Execution hosts:** Check the background scheduler, the matcher executor
   (offscreen document on Chrome, the background page's own workers elsewhere)
   and the worker pool. Reuse an admitted job, scheduler lane or worker before
   adding another executor or queue.

Trace the chosen path to a caller and its failure or cleanup behavior. Reuse
the smallest contract that fits; an ordinary read does not need a workflow.
If none fits, name the missing behavior and put the new code in the layer that
owns it. In the plan or review, state what is reused, or why the existing
owner cannot supply it. Do not add a second checklist or copy this rule into
each skill.

For example, to show a scan's progress, start at the panel page that shows it
and the component that renders it. Follow its imports to the panel state, the
background API it calls and the snapshot revisions the background publishes,
then confirm that the scheduler supplies the state. The panel does not need its
own message or executor.

## Apply the complete contract

| Obligation | Required behavior and detailed source |
| --- | --- |
| Scope and authority | Identify the requested mode, reader, task and factual sources before acting. Review, diagnose and plan do not authorize fixes. Preserve dirty work; external writes need authorization. [Base](../references/base.md) and [standards](../references/standards.md) retain the full constraints. |
| Correctness | Trace real exports, callers, errors, ownership, ordering, cancellation and cleanup. Runtime schemas own validated shapes; do not duplicate schema-owned types. [General design](../references/general.md) and [TypeScript](../references/typescript.md) supply detail when those decisions apply. Preserve another language's own contract. |
| Comments | Inspect affected public documentation and important private invariants, units, defaults, fields and fixture construction. Explain the reason, not trivial syntax. Read [comments](../references/comments.md) for comment/API decisions. |
| Documentation | Compare affected examples, commands, reports and design claims with source. Distinguish implemented, proposed and measured behavior. Read [documentation](../references/docs.md); select write-docs for substantial authoring, not to excuse docs in ordinary code work. |
| Naming and imports | Names must work at the call site and in the owning namespace. Resolve real exports and host dependencies, keep imports inert, separate types from values. Direct runner/assertion imports are legitimate. Read the relevant [naming sections](naming-and-folder-structure-guide.md) before judging those decisions. |
| Structure and formatting | Preserve cohesive logic and meaningful ordering; extraction is not automatically readability. Apply the local formatter to changed scope. Read the relevant [formatting sections](code-formatting-guide.md); do not reformat unrelated files. |
| Tests and performance | Use independent oracles and meaningful behavior assertions; green types/tests do not prove a user flow. Read [testing](../references/testing.md) for test decisions and [benchmarking](../references/benchmarks.md) for performance claims. Faster unequal behavior is rejected before timing. |
| Readability and handoff | Read [readability and ownership](readability-and-ownership.md) for substantial work. Explain outcome, user steps, owners, state/failure/recovery, and usable verification. Inspect the actual artifact as a first reader, repair essential gaps, and report a concrete support mechanism or finding with limits. Checks do not prove human comprehension. |

Read this contract once per task, then applicable detail before making its
judgments. Before naming or formatting decisions, read the relevant sections of
[engineering standards](engineering-standards.md), then the decision-specific
naming/formatting guide. This is a section-based prerequisite, not a whole-book
reading requirement. Budget the entire tool response, including merged/parallel outputs.
Read required files in bounded chunks, recover omitted text after truncation,
and select headings in long guides rather than dumping trees. A filename or
truncated output is not evidence that its rules were read.

## Compose the decisions, not every skill

Choose the requested capability: plan-changes for a plan, refactor-code for a
cutover, test-code for test design or reproduction, review-code for findings,
benchmark-code for measurement, verify-behavior for execution evidence,
write-docs for substantial documentation, commit-changes for Git grouping,
prepare-pull-requests for reviewer prose, release-software for release work.
Ordinary implementation stays with its actual domain owner. Keep one discovery,
one integrated plan and one completion verdict; do not recursively load all
skills or apply a role brief's fixed output template over user/host requirements.

| Decision in scope | Load the installed companion before making it |
| --- | --- |
| Extension contexts, manifests, browser differences, store packaging | build-extensions |
| Durable jobs, IndexedDB stores, replay, idempotency and recovery | build-workflows |
| Reusable APIs/exports/ownership | build-libraries |
| Mise, CI, generators, scripts and harness mechanics | build-devtools |
| Exact current utility APIs | use-utils; inspect the vendored `@utils/*` exports in `utils/` rather than importing an upstream name blindly |
| Material dependency choice | explore-ecosystems |
| Renderer/browser/focus/motion execution | build-web; build-web-apps for panel state and routes |
| Visual hierarchy and motion purpose | design-interfaces; accessibility for detailed access audits; shadcn for its exact installed primitives |

Add only owners whose decisions are affected, not every technology mentioned.
If a companion is unavailable, inspect its real contract and state the material
limit; do not claim it ran. Detail resources and upstream technical examples
cannot reselect the retired deliver-software umbrella, expand scope, force
installs/prompts or override this entrypoint's mode. Their applicable technical rules remain useful; historical entrypoints live in Git. Current repository facts and explicit user requirements
control historical examples, package names, task commands and version claims.

For substantial changes, carry implementation, obsolete-path removal, internal
validation, actual capability verification and plan reconciliation separately.
Run focused evidence then affected full gates. Inspect the exact built artifact
for artifact claims. Before running stateful work, identify target, credentials,
consequences and cleanup; never borrow ambient production state. Report unrun
or blocked checks honestly, without inventing a guarantee or another toolchain.
