# Kaiju project playbook for DeepScope

Kaiju's project playbook, adapted to DeepScope: a browser extension for Chrome, Firefox and Safari that is built,
verified in real browsers and released as per-browser archives on GitHub Releases and ghcr, then submitted to the
stores. It has no servers, so the playbook's deployment chapters were replaced by platform readiness for browsers,
stores and the release channel. The source is Kaiju-Ind/Crawl `docs/kaiju/` at `a00f0036d` (release 1.2.1 plus
unreleased changes); the [changelog](CHANGELOG.md) records what changed.

Each folder has a README that lists its parts and names the skills that carry out its work; each of those skills in
`.agents/skills/` links back. The root `AGENTS.md` routes the playbook, the skills and DeepScope's own records. Start
with [Start here](start/README.md).

| Folder                                      | Read it to                                                                                     |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Start here](start/README.md)               | What the playbook is for, what to read for each task, and the first action.                    |
| [Handbook](handbook/README.md)              | Ownership, placement across extension contexts, files, and the planned monorepo layout.        |
| [Procedures](procedures/README.md)          | P01 to P08: from opening work to a usable preview, a release, recovery and maintenance.        |
| [Platform readiness](platforms/README.md)   | How to prove browsers, stores and the release channel are ready.                               |
| [Project record](project/README.md)         | The records each piece of work keeps in its plan under `docs/migration/`.                      |
| [Agent execution](agents/README.md)         | Controls AE01 to AE08 that keep agent work aligned through long tasks and resumed sessions.    |
| [Engineering and CI](engineering/README.md) | Rules E01 to E06 for CI, test discovery, caching, builds and package ownership.                |
| [Task prompts](tasks/README.md)             | Copyable prompts that run one engineering task with the right skills and rules.                |
| [Failure catalogue](failures/README.md)     | DeepScope's known failures, causes, repairs and prevention.                                    |
| [Platform references](references.md)        | The browser, store and GitHub documentation behind the platform cards.                         |
