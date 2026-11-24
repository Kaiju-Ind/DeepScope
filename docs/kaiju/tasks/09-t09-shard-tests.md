# T09 Select and shard tests with the native runner

Use this prompt when one test job is slow, or tests are listed by hand in task files.

Skills: `test-code`, `benchmark-code`.

Rules: [E04](../engineering/04-e04-keep-meaningful-tests-make-execution.md),
[E05](../engineering/05-e05-measure-representative-change-scenarios-and.md).

```text
T09 Select and shard tests with the native runner

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md, docs/kaiju/start/README.md and the plan under docs/migration/ that owns the work. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, tag, publish a release, submit to a store, edit another repository or start a costly workflow (the macOS Safari job) unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `test-code` skill (.agents/skills/test-code/SKILL.md).
- Load the `benchmark-code` skill (.agents/skills/benchmark-code/SKILL.md).
- Follow E04 Keep meaningful tests, make execution efficient (docs/kaiju/engineering/04-e04-keep-meaningful-tests-make-execution.md).
- Follow E05 Measure representative change scenarios (docs/kaiju/engineering/05-e05-measure-representative-change-scenarios-and.md).

STEPS
1. Read the installed runner's options for selection, sharding and concurrency (Vitest `--shard`, `--project` and the projects in vitest.config.ts). Search the current documentation.
2. Discover tests by the runner's conventions or scoped globs, not by listing current file paths.
3. Compare the selected tests with the full inventory for added, renamed and deleted files.
4. Measure one, two and four workers on the same runner, counting setup and install time per shard. Reject sharding that costs more than it saves.

DELIVERABLE
The inventory before and after, and the timing table.

EXIT
The same tests and assertions run, failures still fail, and the measured cost is recorded.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
