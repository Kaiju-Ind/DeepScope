# Select the capability and the decisions it affects

Identify the requested mode, reader, task, sources and scope before acting.
Read the selected skill's software-quality guide once per task. Comments, docs,
naming, imports, formatting, readability and correctness apply inside every
capability; they do not depend on loading an umbrella or a separate docs skill.

Treat this first selection as provisional. After tracing the owning code, and
before the first edit or a new kind of work, [recheck the decisions and load
any missing guidance](guides/software-quality.md#recheck-after-discovery).
Before proposing code, [find the reusable owner](guides/software-quality.md#check-for-reuse-before-designing),
including the vendored `@utils/*` packages and the `src/ui` components when the
change renders UI.

DeepScope keeps the Kaiju project playbook in `docs/kaiju/`. The playbook names
the procedure for a task, its gates and the skills that carry it out; the skills
below say how to do the engineering inside that procedure. The root `AGENTS.md`
routes both, and DeepScope's own records (`docs/architecture/`, the plans in
`docs/migration/`, and ADRs once `docs/adr/` exists) decide where they disagree.

| Requested work | Capability |
| --- | --- |
| Plan before implementation | `plan-changes` |
| Refactor, migrate or remove legacy paths | `refactor-code` |
| Test design, regression or reproduction | `test-code` |
| Review code or report findings | `review-code` |
| Measure or assess performance | `benchmark-code` |
| Validate and exercise the real extension in real browsers | `verify-behavior` |
| Write docs, comments or explanatory diagrams | `write-docs` |
| Group/stage authorized changes and write commits | `commit-changes` |
| Draft a reviewer-facing PR explanation | `prepare-pull-requests` |
| Release candidate, archives, changelog or store submission | `release-software` |

Ordinary implementation stays with the actual domain owner below. Diagnosis,
review, planning and drafts do not authorize fixes or external publication.
Choose companions by changed decisions, not every technology mentioned.

| Decision | Domain/runtime companion |
| --- | --- |
| Extension contexts, manifests, messaging, badges, storage areas, per-browser builds | `build-extensions` |
| Durable scan jobs, queues, replay, recovery after a background unload | `build-workflows` |
| Reusable module API, exports, workspace packages and resource ownership | `build-libraries` |
| Mise, CI, WXT build hooks, scripts, registry build and packaging mechanics | `build-devtools` |
| Vendored utility packages (`@utils/*`) and `tools/utils/sync.ts` | `use-utils` |
| Okikio libraries such as `@okikio/observables` | `use-okikio` |
| Material dependency comparison or integration | `explore-ecosystems` |
| Renderer (Solid)/browser/focus/motion/asset execution in a panel surface | `build-web` |
| Panel state, routes, targeting and local state | `build-web-apps` |
| Visual hierarchy, interaction, motion purpose and catalogs | `design-interfaces` |
| Detailed accessibility audit | `accessibility` |
| Exact installed `src/ui` (shadcn-style) primitives and registry | `shadcn` |

A review of a change to the background runtime needs review-code,
build-extensions and, when scan jobs change, build-workflows. A small panel
fix needs build-web for rendering and build-web-apps when panel state changes;
it does not imply a new extension context. A benchmark still needs correct
output, readable fixtures and accurate comments. Keep one discovery, plan and
verdict; do not recursively load every companion. If one is unavailable,
inspect the contract and state the consequential limit.

Read required resources in bounded outputs and recover truncated portions.
Read the [shared quality contract](guides/software-quality.md) once, then only
applicable detail before making that decision. Each skill states its reading
boundary. Resource indexes are lookup maps, not reading checklists. Historical
entrypoints, and the skills DeepScope did not take (see [README](README.md)),
are available through Git rather than the active skill tree.

For upkeep, run the guidance check, `tools/lint/guidance.test.ts`
(`mise run test --project guidance`). It checks links, skill routes, playbook
back-links, task prompts and the utility authority, not model compliance or
human comprehension.
