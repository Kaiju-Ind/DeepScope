# A01 Start from the product question

An anchor is an observed result with a stated scope and a clear implication for a product decision. It gives the team a
shared understanding of where the work stands. A failed retrieval, a persistent delay or an inconclusive comparison
can all provide an anchor when their evidence and limits are clear. Implementation activity alone does not establish
that the customer problem changed.

Use the [shared product method](../../../.agents/guides/product/README.md) as the owner of the detailed rules. Apply
it through the existing [active task record](../agents/01-ae01-maintain-the-active-task-record.md).

## Establish the next question before implementation

State who is affected, what they are trying to achieve, the current obstacle, and the decision this work should enable.
Extract the unknowns from the request, source and observed behavior. If the user already supplied questions, work on
them and add missing dependencies. Ask only when an unresolved intent, outcome or constraint would materially change
the work. Do available inspection and safe experiments first. Do not ask the user to repeat known requirements or
approve an action that is already authorized.

Name the plausible options, including the current behavior, and choose the unknown most likely to change the next
decision. Distinguish questions answerable now, those needing a named prerequisite, and those requiring a longer
observation. This is enough to start a bounded experiment. It is impossible to discover every unknown in advance.

Before substantial implementation, record the outcome, selected question, baseline or known evidence, smallest useful
experiment, expected observations and the decision each result could change. A deterministic small edit may need only a
short acceptance check. Discovery can proceed before a full implementation plan exists.

## Start testing as soon as research produces a useful lead

Read current primary sources and installed command help. Then test the relevant claim in the target version. Prefer
running the existing browser, executable, public API or small configuration directly. Remove unrelated orchestration,
queues, deployment, wrappers and fixtures only when the test still exercises the mechanism being investigated. Do not
build a harness just to start learning. Introduce shared tooling only when repeated experiments show a real need.

Test one factor when that isolates a useful distinction, then a small combined comparison when interactions could
change the result. Keep a baseline and comparable conditions. Preserve the actual request, response, metadata,
timestamps and failure stage within the project's data policy. An HTTP error is an observed result; it must not erase
the evidence needed to understand it. Follow the shared [experiment](../../../.agents/guides/product/experiments.md)
and [measurement](../../../.agents/guides/product/metrics.md) rules for retries, noisy outcomes and comparisons.

For every 60 minutes of research, spend at least 10 minutes on active experimentation. Start the first test as soon as it
can answer something useful; do not wait for the hour. This is the user's operating rule, not a scientifically established
optimum or permission to pad time. Count necessary narrow preparation, execution, inspection and interpretation. Each
cycle must include an executed relevant probe or direct observation; setup or interpretation alone does not satisfy the
rule. Reading alone, idle waits and a general harness do not count. A setup failure can establish a setup limitation
while leaving the intended feature question open. When the question is already answered, move on. If experimentation is blocked, name the exact missing capability, the
effect on the claim and the next available test. Do not conceal the shortfall with further speculative research.

## Turn each result into an action

Retain the question, exact source and environment, controlled changes, raw observations, interpretation, limits and next
decision in the same task record or its linked evidence. A local isolated observation supports a local claim. Reconnect
the selected option to the actual consumer and agreed customer journey before claiming an integrated product change.
An uninformative test is still useful to record: say why it could not distinguish the options and what must change.

Use the [planning guide](../../../.agents/guides/product/planning.md) when the evidence supports implementation.
Name verified files, owners, APIs, commands, inputs, outputs, dependencies, environment, failure paths, cleanup and
observable exit conditions. Mark proposed files as new and unresolved bindings as unknown. Use pseudocode when it makes
logic and state changes reviewable. Do not invent a command or assume an export exists to make the plan look complete.

Trace a larger architectural defect far enough to establish its impact and owner. Record it separately with evidence and
the dependency on this task. Repair it when the authorized scope includes that work; otherwise continue independent
work and surface any genuine blocker. Do not quietly turn a small experiment into a redesign or hide an issue that
invalidates the result.

Report progress using [AE05](../agents/05-ae05-deliver-bounded-milestones-with-one.md): what was observed, under which
conditions and when, how it changes the team's understanding, what remains open, and the next test or action. If no new
anchor exists, say so and identify the shortest path to one. Preserve it through review and
[AE07 handoff](../agents/07-ae07-preserve-work-and-resume-from-current.md). A completed discovery task can establish
that an approach does not work; a product delivery claim still requires its agreed acceptance evidence.
