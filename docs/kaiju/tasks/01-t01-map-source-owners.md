# T01 Map the source owners of a change

Use this prompt before any CI, test or package change, or when a branch has changed paths nobody has accounted for.

Skills: `plan-changes`, `explore-ecosystems`.

Rules: [A01](../product/01-a01-start-from-the-product-question.md),
[E01](../engineering/01-e01-establish-the-real-source-owners-and.md),
[AE01](../agents/01-ae01-maintain-the-active-task-record.md),
[AE02](../agents/02-ae02-prove-access-and-report-owner-actions-early.md).

```text
T01 Map the source owners of a change

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
- Load the `plan-changes` skill (.agents/skills/plan-changes/SKILL.md).
- Load the `explore-ecosystems` skill (.agents/skills/explore-ecosystems/SKILL.md).
- Follow E01 Establish the real source, owners and required work (docs/kaiju/engineering/01-e01-establish-the-real-source-owners-and.md).
- Follow AE01 Maintain the active task record (docs/kaiju/agents/01-ae01-maintain-the-active-task-record.md).
- Follow AE02 Prove access and report owner actions early (docs/kaiju/agents/02-ae02-prove-access-and-report-owner-actions-early.md).

STEPS (read-only)
1. List every changed path on the branch against its base, with the commit that changed it.
2. For each path, find the owning package or project from the real manifests (deno.json, package.json, Cargo.toml, mise.toml), not from folder names.
3. Trace callers and consumers with the language's own graph (deno info, cargo metadata, a TypeScript or Oxc AST), including type-only and dynamic imports.
4. Name open pull requests and branches that touch the same owners, and how this branch relates to them.
5. Record unknown relationships as unknown, with what would resolve them.

DELIVERABLE
An ownership table (path, owner, consumers, covering test) and a list of conflicting work.

EXIT
Every changed path has an owner, consumers and a test that covers it, or is listed as unknown. The next owner of the work is named.

STOPPING POINT
Record the question, latest anchor and its limits, exact evidence, last command and result, source SHA, checks not run, next decision and next task. Keep the full plan and separate blockers recoverable. Stop after this task.
```
