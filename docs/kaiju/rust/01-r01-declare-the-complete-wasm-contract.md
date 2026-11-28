# R01 Declare the complete Wasm contract

Before adding or accepting Rust implementation, identify what the customer or
operator must be able to do. Apply the [Rust policy](../../../.agents/guides/rust/policy.md)
to that operation and the actual package graph. The requirement covers every
maintained Rust package and binary, including workers and internal tools.

## Start from real artifacts and consumers

Inspect all Cargo manifests, workspace membership and exclusions, implicit
binaries, feature requirements, generated inputs, and package/container outputs.
Trace each artifact to its caller. Confirm whether Rust under `crates/`,
`workers/`, or another directory owns reusable computation, a host adapter,
an executable, or a build step. Do not infer that role from its path alone.

For each maintained artifact, record:

1. Required operation, observable results, failures, limits, and cleanup.
2. Native OS/architecture and minimum CPU assumptions.
3. Wasm target, runtime/version, imports, permissions, and feature set.
4. Actual entrypoint and the consumer that exercises it.
5. Equivalent semantic fixtures and any explicitly agreed host differences.
6. Build, load, operation, and integration evidence that establishes support.

Use the skill's [portability contract](../../../.agents/skills/rust-software/references/portability.md)
and [support matrix](../../../.agents/skills/rust-software/assets/support-matrix.md).
Select a real browser, core-module, or WASI/component host; "Wasm" alone is
not a sufficient deployment description.

## Keep the operation intact across hosts

Share portable computation when it reduces coupling. Implement the host
capability through an actual adapter with explicit ownership and error behavior.
A native CLI and a browser export can expose the same operation through
different entrypoints; both must execute the agreed behavior.

Do not remove a binary from the matrix, hide its work behind an empty `main`,
return `Unsupported`, or invoke the original native service remotely and call
that a portable implementation. Compiling a helper library leaves the full
worker's host dependencies unresolved.

If the required operation has no viable Wasm implementation, name the exact
capability conflict and keep its acceptance row failed. Research alternative
implementations or host interfaces. Ask for a necessary product/deployment
decision only after the technical options and evidence are concrete.

Cargo build scripts and procedural macros execute during construction on the
build host. Record that distinction. It does not excuse a maintained task
binary from the functioning Wasm requirement.

## Establish an anchor before a broad migration

Choose one consequential uncertainty and execute the smallest authorized probe.
Compile the real target, inspect imports/exports, load the artifact, and call
the operation as needed for that question. Do not make a compilation claim
stand in for execution or a local operation stand in for the customer journey.

The exit is a verified artifact inventory and a concrete operation/host matrix.
Unknown support remains explicit with its next test or prerequisite. Use
[R02](02-r02-answer-the-smallest-rust-question.md) to continue the evidence loop.
