# Testing rules

## Canonical tools

DeepScope runs every test on Vitest 5:

```ts
import { describe, expect, it } from "vitest"; // or the configured globals
import { fc, test } from "@fast-check/vitest";
```

Use:

- Vitest for `describe`, `it`, lifecycle hooks and expectations. `vitest.config.ts` has three projects that discover files by glob: `runtime` (`src/tests/**`, Node environment), `ui` (`src/tests/app/**`, with the Solid transform) and `utils` (`utils/**/*.test.ts`);
- `fast-check` (through `@fast-check/vitest`) for high-value properties and adversarial generated inputs;
- `fake-indexeddb` for IndexedDB stores, and jsdom where a DOM is needed;
- the real browsers for extension behavior: `mise run verify firefox|safari` (WebDriver scenarios in `scripts/verify/`) and a loaded unpacked build for Chrome;
- Vitest `bench` for benchmarks (`src/benchmarks/*.bench.ts`).

The vendored `utils/` tests keep their upstream `node:test` and `@std/expect` imports; `utils/vitest.node-test.ts` maps `node:test` onto Vitest. Do not rewrite them, and do not create duplicate test implementations.

Runtime-specific tests are appropriate when they prove a capability that cannot exist in Node, such as a matcher `Worker` in a background page, an offscreen document, `storage.session`, or a content script on a real page.

## Apply the convention to its actual role

Namespace imports are useful for coherent runtime operation families, not a
blanket import style. Keep direct imports for test runners/assertions, schemas,
and types when they communicate the role. Document non-obvious test helpers and
invariants; trivial private fixtures do not require public API TSDoc. A runtime
schema owns validated serialized data, not every ephemeral object or live handle.
Preserve an explicit repository requirement and explain any material conflict.

## Test the contract, not the current line structure

A test should state which contract or regression it protects.

Before adding or moving a test, identify the failure it would catch, the
selected runner, the real fixture it needs, and why an existing test cannot
already cover it. Choose the smallest set of tests that exercises the changed
risk. The lifecycle list below is a set of scenarios to *consider*, not a
requirement to run every scenario on every PR.

Prefer tests near their owning package or capability. Do not create mirrored
`tests/unit/src/` trees, duplicate cross-runtime suites, or custom service
supervisors merely to match a reference layout. Use separate browser or
integration tests when the runtime or resource is itself part of the contract.
An assertion can be imported under an alias or executed by a helper; trace the
call before reporting a missing assertion from source text alone.

Prefer public behavior over private implementation state. Internal unit tests are appropriate for a complex parser, planner, state machine, or algorithm when that internal operation is itself a stable reasoning unit, but do not mirror private lines merely to increase coverage.

Tests are executable documentation. Keep the setup visible when it explains the scenario.

Tests must be deterministic and independent unless the test deliberately models shared state. Avoid order dependence, ambient wall-clock dependence, and shared mutable fixtures. Use a direct Arrange -> Act -> Assert story when it makes the protected contract easier to read. Do not over-abstract setup merely to remove repeated lines.

Public type inference is also part of the API. For schema-derived config helpers, generic APIs, overloads, discriminated unions, and adapter factories, compile small consumer fixtures that must succeed and fixtures that must fail. Check the inferred call-site surface directly instead of assuming implementation type checks prove caller ergonomics.

## Cover the lifecycle, not only the happy path

For a non-trivial capability, inspect and test the relevant layers:

- valid common path;
- invalid schema or malformed input;
- empty and minimum-size inputs;
- maximum configured limits and one step beyond;
- cancellation before start and during active work;
- cleanup after success, failure, and cancellation;
- close/abort or commit/rollback exclusivity;
- retries and exhausted retry policy;
- concurrency and stale/out-of-order completion;
- bounded memory and producer cancellation;
- partial reads/writes and range behavior;
- resource ownership and explicit disposal;
- real runtime behavior where the capability depends on runtime APIs.

Do not assume a type check proves I/O, streaming, browser storage, process signals, media behavior, or provider semantics.

## Diagnose a test process that will not finish

Find the live resource and its creation owner: a listener, pool, worker, timer,
subscription or unjoined task. Register cleanup immediately after acquisition,
make it run after setup/body failure, and await shutdown. Rerun the isolated
scenario and its affected checked lane. Use runner diagnostics available in the
installed version; Node handle diagnostics are optional and do not replace a
test that awaits the cleanup. Do not hide ownership with process.exit, arbitrary sleeps or
forced shutdown. A finite timeout makes failure observable; it does not fix it.

## Property-based tests

Use `fast-check` for invariants where many equivalent inputs or operation sequences can reveal defects.

High-value properties include:

- parser chunk invariance;
- round-trip stability;
- canonicalization idempotence;
- no virtual-root escape after path normalization;
- schema acceptance/rejection stability;
- equivalence between optimized and reference implementations;
- state-machine legality under generated operation sequences;
- source preservation when an editor changes an unrelated field;
- no stale completion replacing a terminal canceled/failed state.

A property needs an independent oracle or invariant. Do not generate the expected result by calling the same logic under test.

## Browser tests

Use the real browsers for actual browser and extension APIs instead of reproducing browser policy in Node. DeepScope's drivers speak WebDriver directly (`scripts/verify/`); Safari needs Remote Automation and an unsigned-extension setting first.

Probe capabilities rather than hard-code browser brand assumptions. Test fresh and persistent contexts when persistence matters. Use real workers, iframes, service workers, event pages, user activation, storage, private windows or permission flows where those are part of the contract.

Keep portable algorithms in Vitest; do not move selector routing, record adapters, or pure planners into a browser run merely because the final extension runs in a browser.

## Benchmarks

Benchmarks answer performance questions; tests answer correctness questions. Keep them separate.

Use Vitest `bench` with representative inputs (for the matcher: a realistic page's observations against the real shards). Measure the physical work that matters, such as throughput, latency, allocations, heap growth, requests, writes, process count, or cancellation latency. Compare against a baseline or alternative when the result is meant to justify an optimization.

Do not tune implementation on a tiny benchmark that does not resemble the production access pattern.

## Cross-runtime validation

When code claims to run in several extension contexts or browsers, use separate type/runtime views so one environment cannot accidentally provide globals for another (a service worker has no `Worker` and no DOM; a content script has no extension-only APIs).

The normal goal is:

```text
same deterministic TypeScript source
        |
        +-- Vitest under Node (logic, stores with fake-indexeddb)
        +-- Chrome build (service worker + offscreen document)
        +-- Firefox build (event page)
        `-- Safari build (background page)
```

If the current host lacks a browser, record that check as blocked. Do not replace production imports with host-specific shims merely to make an agent environment green. Validation-only shims belong in disposable validation infrastructure such as `.tmp/`.

## Artifact tests

For a release or ZIP deliverable, rerun the relevant validation against the exact extracted artifact.

At minimum:

1. build or create the deliverable;
2. extract it into a clean directory;
3. compare expected source/package file lists;
4. recreate only validation-side host setup when needed;
5. rerun the applicable type, test, build, and package checks;
6. inspect generated ESM/declarations/manifests or other produced output;
7. compute and report a hash when practical.

A source tree passing while the delivered archive fails is a failed delivery.

## Anti-patterns

- tests that only execute code without meaningful assertions;
- generated expected values that reproduce the implementation;
- giant snapshots for contracts better expressed structurally;
- timing-sensitive sleeps when an explicit signal/state transition can be awaited;
- hiding the scenario behind generic test helpers;
- marking browser or Bun behavior passed from type checking alone;
- using a compatibility shim as the only proof that the intended runtime works.
