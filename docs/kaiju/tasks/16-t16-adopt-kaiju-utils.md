# T16 Move a generic mechanism onto the vendored utilities

Use this prompt when DeepScope keeps its own copy of a mechanism that a vendored `@utils/*` package provides, following
the migration order in `utils/README.md`.

Skills: `use-utils`, `refactor-code`.

Rules: [H03](../handbook/03-build-on-the-libraries-already-maintained.md),
[P07](../procedures/07-p07-update-upstream-artifacts-and-dependencies.md).

```text
T16 Move a generic mechanism onto the vendored utilities

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md, docs/kaiju/start/README.md and the plan under docs/migration/ that owns the work. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, tag, publish a release, submit to a store, edit another repository or start a costly workflow (the macOS Safari job) unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `use-utils` skill (.agents/skills/use-utils/SKILL.md).
- Load the `refactor-code` skill (.agents/skills/refactor-code/SKILL.md).
- Follow H03 Build on the libraries already maintained (docs/kaiju/handbook/03-build-on-the-libraries-already-maintained.md).
- Follow P07 Update upstream artifacts and dependencies (docs/kaiju/procedures/07-p07-update-upstream-artifacts-and-dependencies.md).

STEPS
1. Pick the next step of the migration order in utils/README.md. Read the vendored package's exports, types, README and tests under utils/.
2. Map every local symbol and its consumers. Keep DeepScope policy (budgets, fairness, private-tab rules) local.
3. Write a symbol-level mapping: old symbol, @utils export, behavior differences and missing API.
4. Move one family per commit: add the workspace dependency, update every consumer and test, then delete the local copy. Persisted values, storage keys and log event names stay byte-identical.
5. Never import a private @kaiju-ind package and never patch a vendored file by hand. If the package lacks something, propose it upstream to Kaiju-Ind/Utils and resync with scripts/utils/sync.ts, or record a patch in utils/sync.json.
6. Run mise run check, mise run test and every browser build.

DELIVERABLE
The mapping, the removed code and the test and build results.

EXIT
Every moved symbol resolves from a vendored @utils export, all consumers pass, node scripts/utils/sync.ts --check passes, and no local copy or orphaned caller remains.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
