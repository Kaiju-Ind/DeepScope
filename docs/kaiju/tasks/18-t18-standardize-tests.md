# T18 Standardize tests on node:test and @std/expect

Use this prompt when the project targets compatible Node/Deno behavior and has selected this runner/assertion
contract. It does not prescribe a runtime migration for other products.

Skills: `test-code`, `deno-software`.

Rules: [A01](../product/01-a01-start-from-the-product-question.md),
[E04](../engineering/04-e04-keep-meaningful-tests-make-execution.md).

```text
T18 Standardize tests on node:test and @std/expect

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
- Load the `test-code` skill (.agents/skills/test-code/SKILL.md).
- Load the `deno-software` skill (.agents/skills/deno-software/SKILL.md).
- Follow E04 Keep meaningful tests, make execution efficient (docs/kaiju/engineering/04-e04-keep-meaningful-tests-make-execution.md).

STEPS
1. Inventory test APIs per file: `node:test`, `Deno.test`, `@std/expect`, `node:assert`, Vitest.
2. Use `node:test` with `@std/expect` where Node and Deno share the same semantics. Keep Vitest browser suites and plain invariant asserts.
3. Check that equality, thrown errors, rejected promises, hooks and timers behave the same after each change.
4. Move a few files per commit.

DELIVERABLE
The inventory and the converted files.

EXIT
The same tests run with the same failures under each supported runtime.

STOPPING POINT
Record the question, latest anchor and its limits, exact evidence, last command and result, source SHA, checks not run, next decision and next task. Keep the full plan and separate blockers recoverable. Stop after this task.
```
