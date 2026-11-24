# Changelog

## DeepScope adaptation (November 24, 2026)

Copied from Kaiju-Ind/Crawl `docs/kaiju/` at `a00f0036d` (its guidance is identical to `baee4f46a`) and adapted to
DeepScope, a browser extension with no servers. Open Crawl branches were checked for newer guidance; the only change
not in Crawl's main is a Crawl-specific handbook section on `claude/inngest-worker` about giving a built dependency
(such as a scheduler image) its own package, which was not taken.

- **Start, handbook, procedures, project, agents, engineering:** kept and rewritten for extension work. Preview means a
  per-browser build loaded in real browsers; promotion means a tagged GitHub Release with checksums, attestations and
  the ghcr copy, then store submissions; recovery means fixing forward with a new version. The handbook describes
  placement across extension contexts and the planned monorepo (`apps/extension`, `packages/*` as `@deepscope/*`,
  `utils/*` as `@utils/*`, `tools/`, `docs/adr/`). Engineering uses pnpm, Node 26, Vitest projects and the Verify and
  Release workflows; Deno, BuildKit and container images were removed.
- **Services → platforms:** the Kubernetes and KubeBlocks, Bunny, Tailscale, Resend, Backblaze B2, model and user-access
  cards were removed. New cards cover vendored packages, browser runtimes, Chrome Web Store, AMO, Safari and App Store
  Connect, and GitHub Releases with ghcr. `references.md` lists browser and store documentation.
- **Project record:** records live in the owning plan under `docs/migration/`; the model and agent selection record was
  removed.
- **Task prompts:** T12 (container image layers) removed; T16 rewritten to adopt the vendored `@utils/*` packages; T18
  rewritten for the Vitest projects; `deno-software` removed from every prompt; `use-kaiju-utils` is now `use-utils`.
- **Failure catalogue:** Crawl's 46 deployment entries and the ItsAPlan and OpenATS retrospective coverage were removed.
  DeepScope's own entries DS-01 to DS-13 were added.
- **Skills:** folders name `build-extensions` and `use-utils`; `build-data` and `deno-software` are no longer named.

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
