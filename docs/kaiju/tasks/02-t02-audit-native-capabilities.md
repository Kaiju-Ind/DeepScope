# T02 Audit custom tooling against native capabilities

Use this prompt when a repository keeps its own scripts for task selection, caching, test discovery or builds.

Skills: `explore-ecosystems`, `build-devtools`.

Rules: [E02](../engineering/02-e02-select-native-capabilities-before.md),
[AE03](../agents/03-ae03-prove-requirements-before-expanding.md).

```text
T02 Audit custom tooling against native capabilities

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md and docs/kaiju/start/README.md. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, deploy, edit another repository, reset shared data or start a paid workflow unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `explore-ecosystems` skill (.agents/skills/explore-ecosystems/SKILL.md).
- Load the `build-devtools` skill (.agents/skills/build-devtools/SKILL.md).
- Follow E02 Select native capabilities before maintaining custom code (docs/kaiju/engineering/02-e02-select-native-capabilities-before.md).
- Follow AE03 Prove requirements before expanding maintenance (docs/kaiju/agents/03-ae03-prove-requirements-before-expanding.md).

STEPS (read-only)
1. List each custom tool, script and workflow step, with its live callers.
2. For each one, read the installed and pinned versions of the native tools that could own the job (Mise, Deno, the package manager, the test runner, the build tool, BuildKit) and their command help. Search the current documentation; do not rely on memory.
3. Write down what the native tool does not cover. A gap must be shown with a command, not assumed.
4. Propose a replacement only with a parity test that runs both and compares results.

DELIVERABLE
A table of tool, owner, native equivalent, missing behavior, parity test and decision.

EXIT
Every custom tool has a native equivalent with a parity test, or a demonstrated gap. No tool is removed on speculation.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
