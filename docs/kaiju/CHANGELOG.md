# Changelog

## Unreleased

[Task prompts](tasks/README.md) T01 to T18 return as project-agnostic prompts. They replace the 24 Core CI prompts that
were removed below: the Core paths, pull request numbers and pinned versions are gone, related prompts are merged, and
each prompt names the skills to load and the rules to follow inside the block that is copied into a session. The
guidance check fails when a prompt's skills or rules are missing, unknown or absent from its copyable block.

Each folder's README names its skills on a `Skills:` line, and each named skill links back to the folder from a
`Kaiju projects` section. The repository's guidance check fails when either side is missing.

The task table in [Start here](start/01-read-in-the-order-your-task-needs.md) names the skills that carry out each task,
and gains rows for adopting a private package or shared utility and for updating a dependency. Shared utilities come
from the Kaiju-Ind/utils packages (`@kaiju-ind/*`) through the `use-kaiju-utils` skill.

The pack keeps only procedures and the records a project keeps. The Core CI task prompts, the pack's own validation
receipts, the source-review evidence and `manifest.json` are removed; they described how this release was built, not how
a project is run. The service references move to [references.md](references.md), and the artifact examples into the
[ownership chapter](handbook/02-choose-ownership-and-placement-separately.md). Links to private library copies are
removed.

## 1.2.1 (November 19, 2026)

Clarified the default requirement to discover tests and benchmarks through native conventions or scoped globs instead of
enumerating current file paths in task manifests. Added behavior-based test file partitioning, separate cache-layer
accounting, fresh-runner restore/save evidence, and correctness checks for added, renamed and deleted tests. This is
documentation-only; no repository CI or live workflow was changed. Preserves all v1.2.0 and v1.1.0 history and
retrospective evidence.

## 1.2.0 (November 19, 2026)

Added [engineering-ci.md](engineering/README.md) as a native-first CI, testing, caching and change-impact procedure
derived from the Core CI v20 research. Added links and CI evidence fields to the existing intake, handbook, agent
execution, deployment routing, validation, sources and portable agent instructions. The release is documentation-only,
with no application CI or runtime success implied. The v1.1.0 archive remains recoverable in Library.

## 1.1.0 (November 18, 2026)

Retained the Kaiju self-hosting/deployment review and supplied ItsAPlan and OpenATS retrospectives.
