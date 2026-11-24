---
name: plan-changes
description: Plan a concrete software change, migration or implementation before editing. Use for acceptance criteria, alternatives, dependency ordering, removal inventory and verification planning; planning does not authorize implementation.
---

# Plan changes

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



Lock the complete intended outcome, constraints, non-goals and observable acceptance criteria. Inspect repository instructions, exports, callers, tests, docs and existing mechanisms before proposing replacement code. Distinguish current behavior from target architecture.

Read [planning](references/planner.md) and [delivery cases](../../references/cases.md) before a substantial plan. Use [workflow](references/workflow.md) for research/reuse and [delivery evidence](../../references/delivery.md) for broad acceptance and handoff. Read the [decision guide](../../guides/how-to-justify-decisions-properly.md) when alternatives have material tradeoffs and the [PRD guide](../../guides/prd-guide.md) when product scope needs specification.

Plan implementation, cleanup, validation, actual verification and final reconciliation separately. Enumerate every in-scope deliverable and what must stop existing. Name owners, ordering, failure/recovery and exact available verification targets. Ask only for information that changes the decision; do not repeatedly ask for supplied context. A plan remains read-only unless implementation is independently authorized.

## Kaiju projects

In a Kaiju project, the playbook says which procedure this work belongs to and what evidence it needs: [Start here](../../../docs/kaiju/start/README.md), [Handbook](../../../docs/kaiju/handbook/README.md), [Project record](../../../docs/kaiju/project/README.md), [Agent execution](../../../docs/kaiju/agents/README.md), [Task prompts](../../../docs/kaiju/tasks/README.md).

## Resource navigation

The [complete resource index](references/resources.md) lists this capability’s maintained detail and assets. Use it only to
locate a decision-specific resource; it is not a reading checklist.
