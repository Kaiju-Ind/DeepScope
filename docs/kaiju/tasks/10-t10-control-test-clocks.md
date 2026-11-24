# T10 Replace real waits in tests with controlled clocks

Use this prompt when tests sleep or wait on real timers without testing real timing.

Skills: `test-code`.

Rules: [E04](../engineering/04-e04-keep-meaningful-tests-make-execution.md).

```text
T10 Replace real waits in tests with controlled clocks

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md and docs/kaiju/start/README.md. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, deploy, edit another repository, reset shared data or start a paid workflow unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `test-code` skill (.agents/skills/test-code/SKILL.md).
- Follow E04 Keep meaningful tests, make execution efficient (docs/kaiju/engineering/04-e04-keep-meaningful-tests-make-execution.md).

STEPS
1. Find tests whose waits do not test timing, cancellation, networking, databases or process cleanup.
2. Move those to the runner's fake clock (for example `@std/testing/time` FakeTime, Node's mock timers or Vitest fake timers) one suite per commit.
3. Keep real timers where the test proves real cancellation, races or cleanup.
4. Check that fake clocks are restored and no timer or promise leaks.

DELIVERABLE
The changed suites and the before and after timings.

EXIT
Assertions and failure behavior match before and after, and real-timer integration tests still cover cancellation.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
