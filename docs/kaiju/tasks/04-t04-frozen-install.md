# T04 Regenerate a lock and prove a frozen install

Use this prompt when a lock file is stale, a dependency moves, or an install differs between machines.

Skills: `build-devtools`, `explore-ecosystems`.

Rules: [P07](../procedures/07-p07-update-upstream-artifacts-and-dependencies.md),
[E01](../engineering/01-e01-establish-the-real-source-owners-and.md).

```text
T04 Regenerate a lock and prove a frozen install

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md, docs/kaiju/start/README.md and the plan under docs/migration/ that owns the work. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, tag, publish a release, submit to a store, edit another repository or start a costly workflow (the macOS Safari job) unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `build-devtools` skill (.agents/skills/build-devtools/SKILL.md).
- Load the `explore-ecosystems` skill (.agents/skills/explore-ecosystems/SKILL.md).
- Follow P07 Update upstream artifacts and dependencies (docs/kaiju/procedures/07-p07-update-upstream-artifacts-and-dependencies.md).
- Follow E01 Establish the real source, owners and required work (docs/kaiju/engineering/01-e01-establish-the-real-source-owners-and.md).

STEPS
1. Read every manifest and lock the change touches, including nested projects.
2. Check that the pinned pnpm version (mise.toml, packageManager) is the one that writes the lock, then regenerate the lock with it. Never edit integrity values by hand.
3. Run the frozen install and the frozen dependency check on a clean checkout.
4. Keep tool and dependency version bumps out of this change.
5. The install must need no credentials: DeepScope depends on no private registry. A package that asks for one is a defect to report, not a token to add.

DELIVERABLE
The lock diff, the install transcript and any blocker.

EXIT
The pinned tool wrote the lock, a clean frozen install passes, and the diff holds no unrelated change. Otherwise the task is blocked, not green.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
