# T13 Report CI impact per change class

Use this prompt after a CI change, to show what it does for each kind of edit.

Skills: `benchmark-code`, `verify-behavior`.

Rules: [E05](../engineering/05-e05-measure-representative-change-scenarios-and.md),
[E03](../engineering/03-e03-prove-affected-work-selection-and-cache.md).

```text
T13 Report CI impact per change class

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md and docs/kaiju/start/README.md. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, deploy, edit another repository, reset shared data or start a paid workflow unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `benchmark-code` skill (.agents/skills/benchmark-code/SKILL.md).
- Load the `verify-behavior` skill (.agents/skills/verify-behavior/SKILL.md).
- Follow E05 Measure representative change scenarios (docs/kaiju/engineering/05-e05-measure-representative-change-scenarios-and.md).
- Follow E03 Prove affected-work selection and cache correctness separately (docs/kaiju/engineering/03-e03-prove-affected-work-selection-and-cache.md).

STEPS
1. For each change class in the baseline, make a disposable edit and record the expected and actual selected work and cache invalidation.
2. Compare each with the oracle.
3. Measure the representative classes with three cold and three warm runs on comparable runners.
4. Mark anything not measured as unverified. Never present an estimate as a measurement.

DELIVERABLE
The impact table, with run IDs.

EXIT
Every change class has a correctness result; representative classes have measured costs.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
