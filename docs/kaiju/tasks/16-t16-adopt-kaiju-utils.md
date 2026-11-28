# T16 Move generic utilities to Kaiju-Ind/utils

Use this prompt when the project explicitly selects the Kaiju package profile and keeps its own copy of a shared
mechanism. Other projects should inspect their own maintained dependencies first.

Skills: `use-kaiju-utils`, `refactor-code`.

Rules: [A01](../product/01-a01-start-from-the-product-question.md),
[H03](../handbook/03-build-on-the-libraries-already-maintained.md),
[P07](../procedures/07-p07-update-upstream-artifacts-and-dependencies.md).

```text
T16 Move generic utilities to Kaiju-Ind/utils

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
- Load the `use-kaiju-utils` skill (.agents/skills/use-kaiju-utils/SKILL.md).
- Load the `refactor-code` skill (.agents/skills/refactor-code/SKILL.md).
- Follow H03 Build on the libraries already maintained (docs/kaiju/handbook/03-build-on-the-libraries-already-maintained.md).
- Follow P07 Update upstream artifacts and dependencies (docs/kaiju/procedures/07-p07-update-upstream-artifacts-and-dependencies.md).

STEPS
1. Confirm the Kaiju package profile is selected. The source authority is Kaiju-Ind/Utils, not a similarly named personal repository. Treat the Utils source and the published packages as separate evidence. Read the published package's exports, types and version.
2. Map every local symbol and its consumers. Keep product-specific policy local.
3. Write a symbol-level mapping: old symbol, package export, version, behavior differences and missing API.
4. Move one family per commit: pin the version, update every consumer and test, then delete the local copy.
5. If the package lacks something, report it to the Utils owner instead of copying the implementation.

DELIVERABLE
The mapping, the removed code and the consumer test results.

EXIT
Every moved symbol resolves from a pinned published package, all consumers pass, and no local copy or orphaned caller remains.

STOPPING POINT
Record the question, latest anchor and its limits, exact evidence, last command and result, source SHA, checks not run, next decision and next task. Keep the full plan and separate blockers recoverable. Stop after this task.
```
