# T15 Classify tests by purpose and remove disposable checks

Use this prompt when a suite mixes real tests with one-off verification scripts or source-text checks.

Skills: `test-code`, `refactor-code`.

Rules: [E04](../engineering/04-e04-keep-meaningful-tests-make-execution.md),
[H04](../handbook/04-give-each-maintained-file-a-clear-owner.md).

```text
T15 Classify tests by purpose and remove disposable checks

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md and docs/kaiju/start/README.md. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, deploy, edit another repository, reset shared data or start a paid workflow unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `test-code` skill (.agents/skills/test-code/SKILL.md).
- Load the `refactor-code` skill (.agents/skills/refactor-code/SKILL.md).
- Follow E04 Keep meaningful tests, make execution efficient (docs/kaiju/engineering/04-e04-keep-meaningful-tests-make-execution.md).
- Follow H04 Give each maintained file a clear owner (docs/kaiju/handbook/04-give-each-maintained-file-a-clear-owner.md).

STEPS
1. Inventory every test, suite and verification tool with its runner and callers.
2. Classify each by what it protects: behavior or regression; a public structural contract (exports, manifests, typed API); a brittle check of source text that should test behavior; a one-off verification with no ongoing contract; unknown.
3. Rewrite brittle checks against behavior or a parsed API, and run old and new against a mutation.
4. Delete one-off verification only after proving nothing calls it. Keep unknowns.

DELIVERABLE
The classification table and the replacement tests.

EXIT
Every removed test has a replacement or a proof that nothing depended on it, and the security and release checks are intact.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
