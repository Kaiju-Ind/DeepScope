# T17 Replace cross-package source imports with package exports

Use this prompt when one package reaches into another package's source with relative or aliased paths.

Skills: `build-libraries`, `refactor-code`.

Rules: [A01](../product/01-a01-start-from-the-product-question.md),
[E01](../engineering/01-e01-establish-the-real-source-owners-and.md),
[H04](../handbook/04-give-each-maintained-file-a-clear-owner.md).

```text
T17 Replace cross-package source imports with package exports

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
- Load the `build-libraries` skill (.agents/skills/build-libraries/SKILL.md).
- Load the `refactor-code` skill (.agents/skills/refactor-code/SKILL.md).
- Follow E01 Establish the real source, owners and required work (docs/kaiju/engineering/01-e01-establish-the-real-source-owners-and.md).
- Follow H04 Give each maintained file a clear owner (docs/kaiju/handbook/04-give-each-maintained-file-a-clear-owner.md).

STEPS
1. Build the package map from the real manifests and workspace configuration.
2. Find imports that cross a package boundary through `../`, absolute paths or aliases. Leave same-package relative imports alone.
3. For each, find the public export to use. Add the smallest export only to a package this project owns.
4. Move one consumer group per commit, and add a check that rejects a new cross-package source import.

DELIVERABLE
The import table and the boundary check.

EXIT
No invalid cross-package import remains unlisted, real package entry points work, and the check rejects a new violation without rejecting same-package imports.

STOPPING POINT
Record the question, latest anchor and its limits, exact evidence, last command and result, source SHA, checks not run, next decision and next task. Keep the full plan and separate blockers recoverable. Stop after this task.
```
