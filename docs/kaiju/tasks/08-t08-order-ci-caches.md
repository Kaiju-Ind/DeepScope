# T08 Order CI caches and scope their saves

Use this prompt after one task cache is proven, before adding caches to more jobs.

Skills: `build-devtools`, `review-code`.

Rules: [E03](../engineering/03-e03-prove-affected-work-selection-and-cache.md),
[E05](../engineering/05-e05-measure-representative-change-scenarios-and.md).

```text
T08 Order CI caches and scope their saves

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md and docs/kaiju/start/README.md. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, deploy, edit another repository, reset shared data or start a paid workflow unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `build-devtools` skill (.agents/skills/build-devtools/SKILL.md).
- Load the `review-code` skill (.agents/skills/review-code/SKILL.md).
- Follow E03 Prove affected-work selection and cache correctness separately (docs/kaiju/engineering/03-e03-prove-affected-work-selection-and-cache.md).
- Follow E05 Measure representative change scenarios (docs/kaiju/engineering/05-e05-measure-representative-change-scenarios-and.md).

STEPS
1. Draw which cache owns what: tool installs, the package store, DENO_DIR, compiler and transform caches, the one task result cache, image layers.
2. Check the order in each job: checkout, tool and lock keys, restore, frozen install, run, save after success.
3. Scope saves: only trusted refs (the default branch, a manual dispatch) save. Pull requests and tags restore only. Keys include every input that changes the cached bytes.
4. On a fresh runner, measure the hit, the restored bytes and the restore time against the work saved.

DELIVERABLE
The cache map, the key and scope of each cache, and the measurements.

EXIT
Every cache has one owner, a key that covers its inputs and a trusted save scope, and saves more time than it costs.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
