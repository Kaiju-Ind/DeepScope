# T12 Cache container image layers

Use this prompt when image builds dominate CI time.

Skills: `build-devtools`, `release-software`.

Rules: [E03](../engineering/03-e03-prove-affected-work-selection-and-cache.md),
[E05](../engineering/05-e05-measure-representative-change-scenarios-and.md).

```text
T12 Cache container image layers

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md and docs/kaiju/start/README.md. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, deploy, edit another repository, reset shared data or start a paid workflow unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `build-devtools` skill (.agents/skills/build-devtools/SKILL.md).
- Load the `release-software` skill (.agents/skills/release-software/SKILL.md).
- Follow E03 Prove affected-work selection and cache correctness separately (docs/kaiju/engineering/03-e03-prove-affected-work-selection-and-cache.md).
- Follow E05 Measure representative change scenarios (docs/kaiju/engineering/05-e05-measure-representative-change-scenarios-and.md).

STEPS
1. Trace which Dockerfile stages CI actually builds, from source bundle to the final image. Ignore local-only stages.
2. Order layers from least to most frequently changed: base digest, OS packages, tool installs, manifests and locks, dependency fetch, source.
3. Choose a cache backend whose credentials stay out of the build shell, and save it only from trusted refs.
4. Keep tests that must run on every build in a stage that is not cached.
5. Build each architecture, then run the image and check its contents.

DELIVERABLE
The layer order, the cache scope and the timings per architecture.

EXIT
The image runs and its contents match the uncached build, and the cached build is measurably faster. Otherwise keep the original layers.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
