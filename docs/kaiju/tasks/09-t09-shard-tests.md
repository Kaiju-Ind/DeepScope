# T09 Select and shard tests with the native runner

Use this prompt when one test job is slow, or tests are listed by hand in task files.

Skills: `test-code`, `benchmark-code`, `deno-software`.

Rules: [A01](../product/01-a01-start-from-the-product-question.md),
[E04](../engineering/04-e04-keep-meaningful-tests-make-execution.md),
[E05](../engineering/05-e05-measure-representative-change-scenarios-and.md).

```text
T09 Select and shard tests with the native runner

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
- Load the `benchmark-code` skill (.agents/skills/benchmark-code/SKILL.md).
- Load the `deno-software` skill (.agents/skills/deno-software/SKILL.md).
- Follow E04 Keep meaningful tests, make execution efficient (docs/kaiju/engineering/04-e04-keep-meaningful-tests-make-execution.md).
- Follow E05 Measure representative change scenarios (docs/kaiju/engineering/05-e05-measure-representative-change-scenarios-and.md).

STEPS
1. Read the installed runner's options for selection, sharding and concurrency (for example `node --test-shard`, `deno test --filter`, Vitest `--shard` and `--project`). Search the current documentation.
2. Discover tests by the runner's conventions or scoped globs, not by listing current file paths.
3. Compare the selected tests with the full inventory for added, renamed and deleted files.
4. Measure one, two and four workers on the same runner, counting setup and install time per shard. Reject sharding that costs more than it saves.

DELIVERABLE
The inventory before and after, and the timing table.

EXIT
The same tests and assertions run, failures still fail, and the measured cost is recorded.

STOPPING POINT
Record the question, latest anchor and its limits, exact evidence, last command and result, source SHA, checks not run, next decision and next task. Keep the full plan and separate blockers recoverable. Stop after this task.
```
