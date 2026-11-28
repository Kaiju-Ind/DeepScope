# Public source builds and Kaiju Utils

## Decision

Keep the current, explicitly recorded Kaiju Utils source closure in `utils/`
while the extension requires a reviewer to rebuild its source archive without
private package credentials. Use the current `use-kaiju-utils` guidance to
assess published packages. The retained `use-utils` skill owns this repository's
existing sync mechanism; it does not redefine upstream publication policy.

`utils/sync.json` records the exact upstream base, the selected overlay, adopted
public entries and dependency pins. `tools/utils/sync.ts` resolves the complete
reachable source and test closure, writes attribution and applies recorded
patches. Read `utils/README.md` before changing those inputs. The extension
already imports the Result, context, duration, disposal, scheduler, pool,
worker, workflow and activity capabilities from that closure.

## Why source is still required

The current extension and source archive use only public npm dependencies and
workspace sources. A private registry dependency would add a credential to a
clean reviewer build. Copying an import name cannot remove that requirement,
and replacing the vendored revision with a newer local Utils checkout would
silently change runtime behavior and the recorded lineage.

The current options are:

| Option | Required evidence |
| --- | --- |
| Retain the recorded source closure | Reproduce sync from its exact base and overlay, keep licensing and public exports, run the vendored tests and all consuming browser gates. |
| Use exact published package releases directly | Verify each release and narrow export, prove installation in the required reviewer environment, and verify the complete resolved consumer graph. Private credentials must not become a hidden source-build prerequisite. |
| Include reviewed published artifacts in the source delivery | Confirm that the store accepts the artifact and source arrangement, include complete corresponding source and licensing, and prove a clean credential-free rebuild. |

A change to the source-build contract is a concrete maintainer decision. It
must name the selected publication versions, credential or redistribution
requirements, rebuild mechanism and browser acceptance. Until that decision
has evidence, preserve the current closure. This is a present integration
constraint, not a permanent ban on published Kaiju Utils.

## Separate wire and collection contracts

The extension RPC already uses the vendored Result envelope. Its failure
payload is a serializable `code`, `message` and optional `stack`. Portable
`AnalysisFailure` owns that data shape, while `messaging/failure.ts` owns the
extension's allowed codes and conversion policy. The vendored Failure
occurrence is an Error with a validated definition and its own encoding.
Replacing the payload would require a deliberate message, snapshot and replay
migration, not a file move.

Detection's mutable null-prototype dictionaries hold page-controlled keys.
The current Utils record constructors produce frozen snapshots and have
explicit validation and duplicate policies. Preserve the domain dictionary
while those contracts differ. Do not adopt an unused utility dependency or
replace a validated contract to make a dependency table look uniform.
