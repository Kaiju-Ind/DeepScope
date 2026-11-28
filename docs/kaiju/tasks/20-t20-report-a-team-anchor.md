# T20 Report a team anchor

Use this prompt when the team needs to understand what changed in the customer problem or what the next decision should be.

Skills: `verify-behavior`, `write-docs`.

Rules: [A01](../product/01-a01-start-from-the-product-question.md),
[AE01](../agents/01-ae01-maintain-the-active-task-record.md),
[AE05](../agents/05-ae05-deliver-bounded-milestones-with-one.md).

```text
T20 Report a team anchor

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
- Load the `verify-behavior` skill (.agents/skills/verify-behavior/SKILL.md).
- Load the `write-docs` skill (.agents/skills/write-docs/SKILL.md).
- Follow A01 (docs/kaiju/product/01-a01-start-from-the-product-question.md).
- Follow AE01 (docs/kaiju/agents/01-ae01-maintain-the-active-task-record.md).
- Follow AE05 (docs/kaiju/agents/05-ae05-deliver-bounded-milestones-with-one.md).

STEPS
1. Read the current customer outcome, questions, exact source and existing experiment/acceptance receipts. Do not infer behavior from implementation or a completed ticket.
2. Identify the latest observed result that could guide a product decision. Check its timestamp, conditions, raw evidence, source validity and remaining limits. If none exists, say that plainly and identify the shortest authorized test that can produce one.
3. Run that small test if it is within scope and available. Preserve valid failure or inconclusive evidence. If blocked, name the exact prerequisite and the independent work still possible.
4. Write the update in plain language: the customer problem; what was observed and when; what it changes in the team's understanding; what remains open; and the next decision or experiment. Link the receipt and explain component scope.
5. Keep code changes, local checks, integrated behavior and customer acceptance distinct. Describe an expected milestone as a target, not a proved outcome. Do not invent a completion estimate from implementation activity.

DELIVERABLE
A concise progress update that a nontechnical teammate can use, plus links to scoped evidence and the current next action.

EXIT
Every substantive progress claim has an observation and a limit. The team can tell what is known, what remains uncertain and what will resolve the next question. If no new anchor exists, the absence and path to one are explicit.

STOPPING POINT
Preserve the full plan, research, question, raw observations, anchor, limits, exact source and next decision. Record incomplete checks, real blockers, cleanup and the next executable action. Stop after this task.
```
