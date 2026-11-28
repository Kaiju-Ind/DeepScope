# T19 Answer one product question with the smallest experiment

Use this prompt when a customer problem depends on an untested assumption or an uncertain capability.

Skills: `plan-changes`, `explore-ecosystems`, `benchmark-code`.

Rules: [A01](../product/01-a01-start-from-the-product-question.md),
[AE01](../agents/01-ae01-maintain-the-active-task-record.md),
[AE04](../agents/04-ae04-test-the-exact-user-action.md).

```text
T19 Answer one product question with the smallest experiment

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
- Load the `benchmark-code` skill (.agents/skills/benchmark-code/SKILL.md).
- Follow A01 (docs/kaiju/product/01-a01-start-from-the-product-question.md).
- Follow AE01 (docs/kaiju/agents/01-ae01-maintain-the-active-task-record.md).
- Follow AE04 (docs/kaiju/agents/04-ae04-test-the-exact-user-action.md).

STEPS
1. State the customer problem, the decision and which unknown could change it. Extract supplied questions and plausible alternatives. Separate what is testable now from named prerequisites or longer observation.
2. Read the relevant primary documentation, exact source/version and installed command help. As soon as a test is useful, run the existing executable, public API or small config directly. Keep the real mechanism; remove unrelated wrappers and orchestration.
3. Define baseline, changed factor, control conditions, expected observations, decision for each result, allowed effects, timeout and cleanup before the run. Choose only the metrics that could change the decision.
4. Execute and retain exact command, source/configuration/environment, time, outcomes, failures and metadata. Test one factor and then a small combination when interaction matters. Repeat or block comparisons when noise or changing conditions prevent the claim.
5. Separate observations from interpretation. Record what this isolated test proves, what remains unknown and whether the next action is more research, a better experiment, implementation or verification in the real consumer.
6. Share a concise anchor and clean up the disposable scope. Do not describe a successful local probe as a solved product journey.

DELIVERABLE
A reproducible experiment receipt and team anchor: question, tested conditions, raw result, metrics, limits, product implication and next decision.

EXIT
The evidence answers the selected question within a stated scope, or identifies precisely why it remains inconclusive or blocked and the next discriminating test. No successful outcome is required to report useful learning.

STOPPING POINT
Preserve the full plan, research, question, raw observations, anchor, limits, exact source and next decision. Record incomplete checks, real blockers, cleanup and the next executable action. Stop after this task.
```
