# Overview

The intended user outcome must survive a long session, parallel work and a fresh start. Keep one short active-task
record beside the full plan and evidence. Update it when intent, authorization, source, release state or the next
action changes. A new agent should be able to identify what is required, what has been proved and what to do next
without reconstructing the conversation.

In DeepScope the active task record is the `## Active task` section of the plan that owns the work, under
`docs/migration/` (for example [the cross-browser plan](../../migration/cross-browser-runtime-plan.md)). Scratch probes
and reports go in `.tmp/`, which Git ignores.

This procedure supplements [project intake](../procedures/01-p01-open-the-project-and-report-prerequisites.md),
[release recovery](../procedures/05-p05-recover-a-failed-deployment.md) and the current original guides. It
introduces no installed skill, runtime configuration or additional approval policy. Existing authorization remains valid
for the same action and destination.

**Normal path:** establish the record; report known owner actions; advance one bounded milestone with exact acceptance
evidence; preserve the result and the next action. Use the exceptions below when access, scope, a failure or a session
boundary requires them. One small change does not need eight new forms.
