# T14 Decide on the final head with measured cost

Use this prompt at the end of a CI or tooling project, before asking for review.

Skills: `verify-behavior`, `review-code`.

Rules: [E05](../engineering/05-e05-measure-representative-change-scenarios-and.md),
[AE04](../agents/04-ae04-test-the-exact-user-action.md),
[E06](../engineering/06-e06-preserve-a-recoverable-engineering-handoff.md).

```text
T14 Decide on the final head with measured cost

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md and docs/kaiju/start/README.md. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, deploy, edit another repository, reset shared data or start a paid workflow unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `verify-behavior` skill (.agents/skills/verify-behavior/SKILL.md).
- Load the `review-code` skill (.agents/skills/review-code/SKILL.md).
- Follow E05 Measure representative change scenarios (docs/kaiju/engineering/05-e05-measure-representative-change-scenarios-and.md).
- Follow AE04 Test the exact user action (docs/kaiju/agents/04-ae04-test-the-exact-user-action.md).
- Follow E06 Preserve a recoverable engineering handoff (docs/kaiju/engineering/06-e06-preserve-a-recoverable-engineering-handoff.md).

STEPS
1. Review every earlier task's results against the current head.
2. Run the full checks that the change affects: types, tests, builds, integration, images and runtime.
3. Compare automatic and manual work separately. Compute cost only from confirmed runner rates.
4. Keep or revert each change on its evidence.

DELIVERABLE
The decision per change, with evidence.

EXIT
All affected checks pass on the head and the cost saving is measured for the same work. Otherwise report what is missing.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
