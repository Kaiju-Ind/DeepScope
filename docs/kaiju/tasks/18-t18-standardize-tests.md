# T18 Standardize tests on the Vitest projects

Use this prompt when tests use several assertion styles, sit outside the discovered trees, or run in the wrong Vitest
project.

Skills: `test-code`.

Rules: [E04](../engineering/04-e04-keep-meaningful-tests-make-execution.md).

```text
T18 Standardize tests on the Vitest projects

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md, docs/kaiju/start/README.md and the plan under docs/migration/ that owns the work. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, tag, publish a release, submit to a store, edit another repository or start a costly workflow (the macOS Safari job) unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `test-code` skill (.agents/skills/test-code/SKILL.md).
- Follow E04 Keep meaningful tests, make execution efficient (docs/kaiju/engineering/04-e04-keep-meaningful-tests-make-execution.md).

STEPS
1. Inventory test files and their APIs: Vitest globals or imports, @fast-check/vitest, node:assert, and the vendored node:test suites under utils/ (which stay on node:test with @std/expect through utils/vitest.node-test.ts).
2. Check each file runs in the right project of vitest.config.ts: runtime (Node resolution), ui (Solid transform, src/tests/app), utils. A test that mounts Solid belongs in ui; anything that needs oxc-parser or Node-only modules does not.
3. Move tests outside the discovered globs into them; never add a file list.
4. Check that equality, thrown errors, rejected promises, hooks and timers behave the same after each change. Move a few files per commit.

DELIVERABLE
The inventory and the converted or moved files.

EXIT
mise run test discovers the same or more tests with the same results, and no task, script or workflow lists a test file.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
