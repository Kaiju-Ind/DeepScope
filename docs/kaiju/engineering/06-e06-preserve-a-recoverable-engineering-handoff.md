# E06 Preserve a recoverable engineering handoff

Preserve the customer problem, decision questions, alternatives, experiment receipts, current anchors, source conditions
and remaining uncertainty with the concrete plan. Include the earliest next test and what result would change the plan.
Keep separate architectural issues and their blocking dependencies visible. A review must distinguish an implemented
component, an answered discovery question and an accepted product outcome. Follow
[A01](../product/01-a01-start-from-the-product-question.md) and
[AE07](../agents/07-ae07-preserve-work-and-resume-from-current.md).

Make one coherent change and one verified checkpoint at a time. Use the existing
[agent execution](../agents/06-ae06-retry-at-the-smallest-valid-scope.md) and Code History contracts: full evolving
plan, original research and sources, source and target ownership, all tasks' latest statuses, exact stopping point,
remote and local SHAs, tests/logs, changed files, patches/bundles when needed, and a self-contained next prompt. Save
durable artifacts outside an ephemeral workspace and verify read-back. Do not treat a push as proof CI passed. A new
agent must be able to resume without repeating the discovery or losing a competing branch.

## Worked example, not project-wide defaults

Core's CI work is the worked example of this procedure: inventory and measurement first, then one experiment per tool
(Deno, Mise, pnpm, Node, TypeScript, tsdown, Vitest, BuildKit), then cache correctness and cost scenarios. Borrow the
method, not its constraints. **Do not copy Core's pins, task names or status into an unrelated repository.** A guide
revision is not evidence that any task has run.
