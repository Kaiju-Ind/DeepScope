# T06 Register each task's inputs, outputs and environment

Use this prompt before any task result is cached, or when task definitions are spread across tools.

Skills: `build-devtools`.

Rules: [E03](../engineering/03-e03-prove-affected-work-selection-and-cache.md),
[E02](../engineering/02-e02-select-native-capabilities-before.md).

```text
T06 Register each task's inputs, outputs and environment

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md, docs/kaiju/start/README.md and the plan under docs/migration/ that owns the work. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, tag, publish a release, submit to a store, edit another repository or start a costly workflow (the macOS Safari job) unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `build-devtools` skill (.agents/skills/build-devtools/SKILL.md).
- Follow E03 Prove affected-work selection and cache correctness separately (docs/kaiju/engineering/03-e03-prove-affected-work-selection-and-cache.md).
- Follow E02 Select native capabilities before maintaining custom code (docs/kaiju/engineering/02-e02-select-native-capabilities-before.md).

STEPS (read-only)
1. List every Mise task, package script, WXT module and direct workflow command.
2. For each one, record its command, its source inputs (traced through imports), configs, locks and tool pins, the names of the environment variables it reads, its outputs and its side effects.
3. Classify each as always-run, download-only, artifact-only or a pure result. Anything unclear is always-run.
4. Note where the native tool can declare these inputs (Mise `sources` and `outputs`) and where it cannot.

DELIVERABLE
The task register.

EXIT
No task is called cacheable without a complete input list. Unknowns are listed with their safe fallback.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
