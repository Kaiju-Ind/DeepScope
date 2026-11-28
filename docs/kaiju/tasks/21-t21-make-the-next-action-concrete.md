# T21 Make the next action concrete

Use this prompt when evidence must become an implementation plan that another person can execute consistently.

Skills: `plan-changes`, `explore-ecosystems`, `review-code`.

Rules: [A01](../product/01-a01-start-from-the-product-question.md),
[AE01](../agents/01-ae01-maintain-the-active-task-record.md),
[E01](../engineering/01-e01-establish-the-real-source-owners-and.md).

```text
T21 Make the next action concrete

CONTEXT
- Repository or source set: <owner/name>. Branch or revision: <name>. Customer outcome and question: <known request>.
- Read AGENTS.md, .agents/START.md and docs/kaiju/start/README.md. Verify the actual source and current instructions, preserve existing work, and use one existing task record.
- Existing user questions, decisions and authorization carry forward. Ask only about a materially unresolved intent or constraint. Do not expand scope, send external messages, publish or deploy without applicable authorization.

PRODUCT QUESTION AND EVIDENCE
- Follow A01 (docs/kaiju/product/01-a01-start-from-the-product-question.md) and .agents/guides/product/README.md. Use the generic profile unless current instructions select another.
- Before substantial implementation, state the customer/product outcome, decision, known evidence, unknowns, alternatives and smallest useful test in the existing task record. Use supplied questions; ask only about material unresolved intent or constraints.
- Test a useful claim immediately with a native executable, existing public API or small configuration. Keep the real mechanism and remove unrelated setup. Do not wait for a full inventory or build a harness without a demonstrated need.
- Alternate research and experiments: at least 10 active experimental minutes per 60 research minutes, including necessary narrow preparation, execution and interpretation. Each cycle requires an executed relevant probe or direct observation; setup alone does not satisfy it. Start early, do not wait or pad time, and record actual blockers. Read-only audit scope still limits allowed effects.
- Preserve baseline, conditions, timing, failures and useful metadata. Report the observation, its scope, the product implication and next decision. An unanswered or inconclusive question stays explicit; code changes are not evidence of improvement.
- Bind any implementation step to verified files, APIs, commands, inputs, outputs, runtime, failure behavior, cleanup and observable exits. Trace larger architectural defects into a separate issue; repair only within scope and expose blocking dependencies.

SKILLS AND RULES
- Load the `plan-changes` skill (.agents/skills/plan-changes/SKILL.md).
- Load the `explore-ecosystems` skill (.agents/skills/explore-ecosystems/SKILL.md).
- Load the `review-code` skill (.agents/skills/review-code/SKILL.md).
- Follow A01 (docs/kaiju/product/01-a01-start-from-the-product-question.md).
- Follow AE01 (docs/kaiju/agents/01-ae01-maintain-the-active-task-record.md).
- Follow E01 (docs/kaiju/engineering/01-e01-establish-the-real-source-owners-and.md).

STEPS
1. Restate the customer outcome, decision, observed anchors and unresolved questions. Check that the evidence supports the proposed direction. Resolve a cheap important unknown with a direct test before designing around it.
2. Read the applicable original skills and guides and trace the actual owners, callers, state, lifecycle, consumers, tests, docs, configuration and failure paths affected by the change.
3. Compare plausible approaches against the outcome, existing capabilities and observed constraints. Select the smallest coherent change. Trace larger architectural defects into separate issues with evidence, owners and blocking dependencies; do not silently add them to scope.
4. Bind each ordered step to exact verified paths and symbols, public APIs, commands and flags, environment and versions. Include inputs, outputs, dependencies, owner, failure behavior, cleanup and an observable exit. Label genuinely new files as proposed and unknown bindings as unresolved.
5. Add pseudocode for branching, state transitions, retries, cancellation or lifecycle when it removes ambiguity. Link each step to its relevant guide and acceptance evidence. Keep experimental proof, regression tests and actual customer verification clear.
6. Review the plan as the next operator: can they execute it without guessing? Check source names and commands against the current repository. Rehearse only safe scoped checks; proposed production actions remain governed by existing authorization.
7. Store the full evolving plan with the current task record and handoff. State the next executable action, its stop condition and the decision its result will enable.

DELIVERABLE
A source-bound action plan with verified tooling, sequence, decision branches, owners, risks, failure/cleanup behavior and customer-visible acceptance evidence.

EXIT
The next step is executable without invented APIs or ambiguous owners. Remaining unknowns have explicit tests or prerequisites. The plan follows applicable guides and preserves the authorized scope.

STOPPING POINT
Preserve the full plan, research, question, raw observations, anchor, limits, exact source and next decision. Record incomplete checks, real blockers, cleanup and the next executable action. Stop after this task.
```
