# R02 Answer the smallest Rust question that changes the decision

Use [A01](../product/01-a01-start-from-the-product-question.md) and the shared
[evidence guide](../../../.agents/guides/rust/evidence.md). A product question
should determine the next experiment, not a preferred library or implementation.

## Separate immediate questions from missing prerequisites

State the customer outcome, decision, known observations, alternatives, and
consequential unknowns. Extract questions already supplied by the user.
Investigate technical gaps directly. Ask only when a missing human choice
would materially change the outcome, scope, or acceptable tradeoff.

Mark which questions can be answered now, which require a named host/tool or
fixture, and which need longer observation. Do not let a blocked integration
test prevent an independent local question from being answered.

Read current primary docs and the selected source revision. As soon as they
identify a useful operation, run it directly. A small Rust function, compiler
invocation, consumer fixture, or configuration change may be sufficient.
Keep the mechanism being investigated; remove unrelated workers, queues,
containers, and service setup unless the question depends on them.

## Make the probe discriminate between plausible answers

Write the expected result and what a different result would mean before the
run. Preserve a baseline, exact inputs, toolchain/dependency versions, target,
features, host, commands, output, failures, and relevant metrics.

Examples of useful narrow questions include:

- Does this exact crate feature compile and perform the required operation?
- Does this streaming algorithm preserve complete output across every short
  input partition, including a split delimiter or UTF-8 sequence?
- Does the native or Wasm accelerated kernel match a separate simple oracle
  at tails, unaligned offsets, and numerical edge cases?
- Does a foreign consumer keep a buffer valid through allocation, callback,
  reuse, cancellation, and the matching release operation?

These are probe shapes, not a requirement to run every test for every task.
Select the check that can change the actual decision. Preserve malformed,
empty, oversized, and failed observations when they affect the contract.

## Keep research and execution in a loop

For every 60 minutes of active research, spend at least 10 minutes on relevant
experiment preparation, execution, inspection, or interpretation. Start early.
Each cycle must include execution or direct observation; reading, idle waiting,
and general harness construction do not satisfy it. Do not pad solved work or
claim a ratio that was not recorded or honestly estimated.

When setup fails, record the setup result and the intended question still open.
When the probe is defective, retain the attempt, correct it, and distinguish
the corrected evidence. Respect read-only scope, paused builds, and authorized
effects; discovery does not authorize unrelated fixes or external publication.

## Turn the result into a shared anchor

State the dated observation, exact scope, product meaning, decision it permits,
and next unknown. A negative answer is useful if it rules out an option.
An inconclusive result needs a better distinction or a reason to stop spending
on it. A completed implementation is not evidence that the customer issue changed.

Before implementing, bind the next step to verified files, symbols, tools,
inputs, outputs, owners, failure/cleanup behavior, and observable acceptance.
Revisit the plan when the evidence changes the question.
