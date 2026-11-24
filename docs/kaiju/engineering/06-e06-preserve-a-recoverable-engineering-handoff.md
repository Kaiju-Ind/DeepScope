# E06 Preserve a recoverable engineering handoff

Make one coherent change and one verified checkpoint at a time. Use the existing
[agent execution](../agents/07-ae07-preserve-work-and-resume-from-current.md) contract and the owning plan under
`docs/migration/`: full evolving plan, original research and sources, source and target ownership, all tasks' latest statuses, exact stopping point,
remote and local SHAs, tests/logs, changed files, patches/bundles when needed, and a self-contained next prompt. Save
durable artifacts outside an ephemeral workspace and verify read-back. Do not treat a push as proof CI passed. A new
agent must be able to resume without repeating the discovery or losing a competing branch.

## Worked example, not project-wide defaults

DeepScope's own CI work is recorded in [`docs/ci.md`](../../ci.md): one prepare job with trusted cache writers, parallel
check, test and per-browser build jobs, a cold release build, and a removed task-cache experiment with its run id.
Borrow the method; record new measurements there with run ids before tuning.
