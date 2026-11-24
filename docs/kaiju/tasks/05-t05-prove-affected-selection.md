# T05 Prove affected-work selection against a full oracle

Use this prompt when CI selects jobs or tests from changed paths.

Skills: `test-code`, `build-devtools`.

Rules: [E03](../engineering/03-e03-prove-affected-work-selection-and-cache.md),
[E04](../engineering/04-e04-keep-meaningful-tests-make-execution.md).

```text
T05 Prove affected-work selection against a full oracle

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md, docs/kaiju/start/README.md and the plan under docs/migration/ that owns the work. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, tag, publish a release, submit to a store, edit another repository or start a costly workflow (the macOS Safari job) unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `test-code` skill (.agents/skills/test-code/SKILL.md).
- Load the `build-devtools` skill (.agents/skills/build-devtools/SKILL.md).
- Follow E03 Prove affected-work selection and cache correctness separately (docs/kaiju/engineering/03-e03-prove-affected-work-selection-and-cache.md).
- Follow E04 Keep meaningful tests, make execution efficient (docs/kaiju/engineering/04-e04-keep-meaningful-tests-make-execution.md).

STEPS
1. Build the oracle: for each change class, the full set of tests and checks that must run.
2. Run the selector for each class and compare with the oracle, including type-only imports, nested configs, generated files (registry JSON, .wxt), moves and deletions, catalog edits and wxt.config.ts.
3. An unreadable history or an unknown input must select everything. Add a test for that fallback.
4. Fix one selection fault per commit, each with a test that failed before the fix.

DELIVERABLE
The oracle, the comparison per change class, and the fixed faults with their tests.

EXIT
No required test or check is skipped for any oracle case. Do not add a result cache in this task.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
