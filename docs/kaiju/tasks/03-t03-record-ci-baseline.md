# T03 Record the CI baseline before changing it

Use this prompt before a change that claims to make CI faster or cheaper.

Skills: `benchmark-code`, `verify-behavior`.

Rules: [A01](../product/01-a01-start-from-the-product-question.md),
[E05](../engineering/05-e05-measure-representative-change-scenarios-and.md),
[AE04](../agents/04-ae04-test-the-exact-user-action.md).

```text
T03 Record the CI baseline before changing it

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md and docs/kaiju/start/README.md. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, deploy, edit another repository, reset shared data or start a paid workflow unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

PRODUCT QUESTION AND EVIDENCE
- Follow A01 (docs/kaiju/product/01-a01-start-from-the-product-question.md) and .agents/guides/product/README.md. Use the generic profile unless current instructions select another.
- Before substantial implementation, state the customer/product outcome, decision, known evidence, unknowns, alternatives and smallest useful test in the existing task record. Use supplied questions; ask only about material unresolved intent or constraints.
- Test a useful claim immediately with a native executable, existing public API or small configuration. Keep the real mechanism and remove unrelated setup. Do not wait for a full inventory or build a harness without a demonstrated need.
- Alternate research and experiments: at least 10 active experimental minutes per 60 research minutes, including necessary narrow preparation, execution and interpretation. Each cycle requires an executed relevant probe or direct observation; setup alone does not satisfy it. Start early, do not wait or pad time, and record actual blockers. Read-only audit scope still limits allowed effects.
- Preserve baseline, conditions, timing, failures and useful metadata. Report the observation, its scope, the product implication and next decision. An unanswered or inconclusive question stays explicit; code changes are not evidence of improvement.
- Bind any implementation step to verified files, APIs, commands, inputs, outputs, runtime, failure behavior, cleanup and observable exits. Trace larger architectural defects into a separate issue; repair only within scope and expose blocking dependencies.

SKILLS AND RULES
- Load the `benchmark-code` skill (.agents/skills/benchmark-code/SKILL.md).
- Load the `verify-behavior` skill (.agents/skills/verify-behavior/SKILL.md).
- Follow E05 Measure representative change scenarios (docs/kaiju/engineering/05-e05-measure-representative-change-scenarios-and.md).
- Follow AE04 Test the exact user action (docs/kaiju/agents/04-ae04-test-the-exact-user-action.md).

STEPS (read-only)
1. Collect recent runs for the base and the head at exact commits: run IDs, jobs, skipped jobs, runner type and architecture, per-step times, cache sizes and test counts.
2. Separate automatic pull request work from manual, image and release work.
3. Add up billed runner time, not only wall time.
4. Choose the representative change classes (a source edit, a shared utility, a type-only import, a lock change, a workflow change, a Dockerfile change, a deletion) and record which jobs each one runs today.

DELIVERABLE
A baseline table per change class, with run IDs.

EXIT
Each run's selected and skipped work is explicit. A run with skipped work is never compared as a cost saving.

STOPPING POINT
Record the question, latest anchor and its limits, exact evidence, last command and result, source SHA, checks not run, next decision and next task. Keep the full plan and separate blockers recoverable. Stop after this task.
```
