# T17 Replace cross-package source imports with package exports

Use this prompt when one package reaches into another package's source with relative or aliased paths.

Skills: `build-libraries`, `refactor-code`.

Rules: [E01](../engineering/01-e01-establish-the-real-source-owners-and.md),
[H04](../handbook/04-give-each-maintained-file-a-clear-owner.md).

```text
T17 Replace cross-package source imports with package exports

CONTEXT
- Repository: <owner/name>. Branch or pull request: <name>. Verify the live head and base before editing. A remembered SHA is not permission to overwrite newer work.
- Read AGENTS.md, .agents/START.md, docs/kaiju/start/README.md and the plan under docs/migration/ that owns the work. Then load each skill named below when the task reaches its decision, and read each rule named below before acting on it.
- Keep the active task record (AE01). Report missing access and owner actions before long work (AE02).
- Make one coherent change per commit and keep a recoverable handoff (E06): commands, results, the SHA and the next step.
- Do not merge, tag, publish a release, submit to a store, edit another repository or start a costly workflow (the macOS Safari job) unless the owner asked for it.
- An unknown input, edge or owner means real work, never a skipped success. Label every check you did not run.

SKILLS AND RULES
- Load the `build-libraries` skill (.agents/skills/build-libraries/SKILL.md).
- Load the `refactor-code` skill (.agents/skills/refactor-code/SKILL.md).
- Follow E01 Establish the real source, owners and required work (docs/kaiju/engineering/01-e01-establish-the-real-source-owners-and.md).
- Follow H04 Give each maintained file a clear owner (docs/kaiju/handbook/04-give-each-maintained-file-a-clear-owner.md).

STEPS
1. Build the package map from the real manifests and workspace configuration.
2. Find imports that cross a package boundary through `../`, absolute paths or aliases. Leave same-package relative imports alone.
3. For each, find the public export to use. Add the smallest export only to a package this project owns.
4. Move one consumer group per commit, and add a check that rejects a new cross-package source import.

DELIVERABLE
The import table and the boundary check.

EXIT
No invalid cross-package import remains unlisted, real package entry points work, and the check rejects a new violation without rejecting same-package imports.

STOPPING POINT
Record the last command, its result, the SHA, the checks you did not run and the next task. Stop after this task.
```
