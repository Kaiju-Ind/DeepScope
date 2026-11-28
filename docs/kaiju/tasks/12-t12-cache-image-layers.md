# T12 Cache container image layers

Use this prompt when image builds dominate CI time.

Skills: `build-devtools`, `release-software`.

Rules: [A01](../product/01-a01-start-from-the-product-question.md),
[E03](../engineering/03-e03-prove-affected-work-selection-and-cache.md),
[E05](../engineering/05-e05-measure-representative-change-scenarios-and.md).

```text
T12 Cache container image layers

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
- Load the `build-devtools` skill (.agents/skills/build-devtools/SKILL.md).
- Load the `release-software` skill (.agents/skills/release-software/SKILL.md).
- Follow E03 Prove affected-work selection and cache correctness separately (docs/kaiju/engineering/03-e03-prove-affected-work-selection-and-cache.md).
- Follow E05 Measure representative change scenarios (docs/kaiju/engineering/05-e05-measure-representative-change-scenarios-and.md).

STEPS
1. Trace which Dockerfile stages CI actually builds, from source bundle to the final image. Ignore local-only stages.
2. Order layers from least to most frequently changed: base digest, OS packages, tool installs, manifests and locks, dependency fetch, source.
3. Choose a cache backend whose credentials stay out of the build shell, and save it only from trusted refs.
4. Keep tests that must run on every build in a stage that is not cached.
5. Build each architecture, then run the image and check its contents.

DELIVERABLE
The layer order, the cache scope and the timings per architecture.

EXIT
The image runs and its contents match the uncached build, and the cached build is measurably faster. Otherwise keep the original layers.

STOPPING POINT
Record the question, latest anchor and its limits, exact evidence, last command and result, source SHA, checks not run, next decision and next task. Keep the full plan and separate blockers recoverable. Stop after this task.
```
