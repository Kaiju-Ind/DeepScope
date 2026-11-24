# Routing fragment for AGENTS.md

DeepScope's root `AGENTS.md` carries this routing. Keep the two consistent when either changes. The fragment is
ordinary Markdown, not an installable skill.

## Section kept in AGENTS.md

Use `docs/kaiju/` for any change that has to reach users. Read the chapters the task needs. The playbook routes work;
current repository instructions, the skills and guides in `.agents/`, verified source contracts and the user's
requirements remain authoritative.

Keep one active-task record ([AE01](../agents/01-ae01-maintain-the-active-task-record.md)) in the plan under
`docs/migration/` that owns the work. After a reset, handoff or interruption, reconcile it with the latest user message,
the branch, local changes and running workflows ([AE07](../agents/07-ae07-preserve-work-and-resume-from-current.md)).

Before editing, establish the actual branch, base, dirty state and other writers, and preserve concurrent changes.
Report owner-only actions early: licence, catalog rights, store accounts, Apple membership, repository settings.

For CI, builds, test runners or package imports, read [engineering](../engineering/README.md) first. Use native test
discovery (the Vitest projects in `vitest.config.ts`); never list test files in `package.json`, Mise tasks or
workflows. Keep one root `mise.toml` and thin argument-bearing tasks under `.mise/tasks/`.

Utilities come from the vendored `@utils/*` packages under `utils/`, resynced with `tools/utils/sync.ts`. DeepScope
never depends on a private `@kaiju-ind/*` package.

Verify in the browsers the change affects. Mark checks passed, failed, blocked, not checked or not required. A green
workflow proves only its own steps. Record failures in the [catalogue](../failures/README.md) with evidence, cause
confidence, repair and a prevention action.
