# T16 Move generic utilities to Kaiju-Ind/utils

Use this prompt when a project keeps its own copy of a generic mechanism.

Skills: `use-kaiju-utils`, `refactor-code`.

Rules: [H03](../handbook/03-build-on-the-libraries-already-maintained.md),
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

SKILLS AND RULES
- Load the `use-kaiju-utils` skill (.agents/skills/use-kaiju-utils/SKILL.md).
- Load the `refactor-code` skill (.agents/skills/refactor-code/SKILL.md).
- Follow H03 Build on the libraries already maintained (docs/kaiju/handbook/03-build-on-the-libraries-already-maintained.md).
- Follow P07 Update upstream artifacts and dependencies (docs/kaiju/procedures/07-p07-update-upstream-artifacts-and-dependencies.md).

STEPS
1. Treat the Utils source and the published packages as separate evidence. Read the published package's exports, types and version.
2. Map every local symbol and its consumers. Keep product-specific policy local.
3. Write a symbol-level mapping: old symbol, package export, version, behavior differences and missing API.
4. Move one family per commit: pin the version, update every consumer and test, then delete the local copy.
5. If the package lacks something, report it to the Utils owner instead of copying the implementation.

DELIVERABLE
The mapping, the removed code and the consumer test results.

EXIT
Every moved symbol resolves from a pinned published package, all consumers pass, and no local copy or orphaned caller remains.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
