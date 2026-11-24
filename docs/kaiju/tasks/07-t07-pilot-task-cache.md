# T07 Pilot one native task cache

Use this prompt after the task register exists, to test one cache owner on one task.

Skills: `build-devtools`, `benchmark-code`.

Rules: [E03](../engineering/03-e03-prove-affected-work-selection-and-cache.md),
[E05](../engineering/05-e05-measure-representative-change-scenarios-and.md).

```text
T07 Pilot one native task cache

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md, docs/kaiju/start/README.md and the plan under docs/migration/ that owns the work. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, tag, publish a release, submit to a store, edit another repository or start a costly workflow (the macOS Safari job) unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `build-devtools` skill (.agents/skills/build-devtools/SKILL.md).
- Load the `benchmark-code` skill (.agents/skills/benchmark-code/SKILL.md).
- Follow E03 Prove affected-work selection and cache correctness separately (docs/kaiju/engineering/03-e03-prove-affected-work-selection-and-cache.md).
- Follow E05 Measure representative change scenarios (docs/kaiju/engineering/05-e05-measure-representative-change-scenarios-and.md).

STEPS
1. Pick one deterministic task from the register and one cache owner for it (Mise `sources` and `outputs`; docs/ci.md records an earlier Mise trial that stored but never restored a result). Never stack two result caches on one task.
2. Declare its full inputs and outputs in the native tool.
3. Measure a cold run, a local hit and a hit restored on a fresh checkout or runner.
4. Test the negative cases: a changed source, config, environment variable or tool version; a glob that matches nothing; a deleted output; a failed or cancelled run; a corrupted cache.
5. Remove the cache if it is slower once restore and save are counted, or if any negative case passes when it should run.

DELIVERABLE
The declared inputs, the timings and the negative-case results.

EXIT
The task stays correct in every negative case, and a fresh-runner hit is shown or documented as not possible.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
