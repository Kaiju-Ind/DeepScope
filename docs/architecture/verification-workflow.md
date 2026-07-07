# Verification workflow

This workflow gives reviewers a repeatable way to validate migration patches without pretending that every environment can run every check. It separates command-level validation, targeted subsystem validation, and manual Chrome verification so each pull request can report what actually ran.

Phase 8 does not add a new test runner. It documents the checks that already matter for this WXT extension and the boundaries introduced by phases 1 through 7.

## Validation layers

Use this diagram to choose the narrowest useful check first, then widen validation as the patch touches more runtime surface.

```text
patch applies
  -> formatting check
  -> targeted subsystem tests
  -> full Vitest suite
  -> TypeScript compile
  -> WXT build
  -> manual Chrome QA
```

The top of the stack is cheap and should run for every generated patch stack. The bottom of the stack is needed when behavior crosses extension runtime boundaries that unit tests cannot reproduce.

## Required command set

| Command | Purpose | Run when | Report as passing only when |
| --- | --- | --- | --- |
| `git apply --check <patch>` | Confirms the patch applies to the intended branch state. | Every patch stack. | The command exits with code 0 for every patch. |
| `git diff --check` | Catches whitespace errors before patches are packaged. | Every patch stack after application. | No whitespace warnings are reported. |
| `npm test -- --run` | Runs the Vitest suite non-interactively. | Runtime, contract, detector, collector, popup, storage, or test-support changes. | The command exits successfully. |
| `npm run compile` | Runs TypeScript without emitting files. | Any TypeScript or TSX change. | The command exits successfully after WXT preparation exists. |
| `npm run build` | Builds the extension through WXT. | Popup, WXT, manifest, content, background, or build-sensitive changes. | The command exits successfully and produces build output. |
| `npm run zip` | Packages the extension. | Release-oriented checkpoints. | The command exits successfully. |

When a command cannot be run or cannot complete, record the exact reason. Do not describe a partial command as passed.

## Targeted subsystem checks

Run targeted tests when the full suite is unavailable or when the patch only touches one seam. These commands are examples, not substitutes for full validation before release.

```bash
npx vitest run src/tests/popup/view-model.test.ts --reporter=verbose
npx vitest run src/tests/storage/cache.test.ts --reporter=verbose
npx vitest run src/tests/collectors/planning.test.ts --reporter=verbose
npx vitest run src/tests/graph/compiled-analysis.test.ts --reporter=verbose
npx vitest run src/tests/messaging/messages.test.ts --reporter=verbose
```

Use targeted tests to answer a specific review question. For example, a popup-region docs or TSX change should run popup tests and build. A storage mock change should run storage tests and at least one consumer test that imports the shared mock.

## Manual Chrome QA

Manual Chrome QA remains necessary for runtime behavior because Vitest does not model Manifest V3 lifecycle, real runtime content-script injection, visible-tab permission timing, popup close cleanup, or page main-world execution.

Run this checklist after changes that touch popup, background, content, lifecycle, messaging adapters, collection, permissions, or WXT configuration.

1. Build and load the extension from the WXT output directory.
2. Open a normal `https://` page and confirm the popup returns either detections or a stable empty result.
3. Open an unsupported page such as `chrome://extensions` and confirm the popup shows `UNSUPPORTED_URL` without hanging.
4. Open the popup twice on the same origin and confirm the snapshot-hit path renders without starting live observation.
5. Click Refresh and confirm analysis bypasses stored snapshot reuse and starts observation again.
6. Close the popup and confirm observation stops for the visible tab.
7. Test a page that lazy-loads scripts, links, or meta tags and confirm late detections can appear while the popup is subscribed to storage revisions.
8. Navigate within the tab and confirm old observation state does not refresh the new page.

If a step cannot be verified, record the browser, page URL type, and failure mode in the pull request notes.

## Pull request acceptance checklist

Use this checklist for migration PRs after phase 8.

- The patch applies cleanly to `mvp`.
- The commit scope matches the subsystem touched.
- Public TypeScript exports have TSDoc that explains why they exist and what contract they protect.
- Comments explain constraints, invariants, or non-obvious control flow rather than restating syntax.
- Tests use shared fixtures when the same contract shape appears in multiple suites.
- Runtime-adjacent tests mock browser APIs at the browser boundary.
- Documentation updates describe verified behavior, not intended behavior that has not shipped.
- Benchmark files are added only for measured hot paths with a baseline and consumed results.

## Reporting template

Use this shape in generated patch summaries and pull request descriptions.

```text
Validation:
- git apply --check: passed
- git diff --check: passed
- npm test -- --run: failed, reason ...
- npm run compile: not run, reason ...
- npm run build: passed
- manual Chrome QA: not run in sandbox

Notes:
- No benchmark added because the patch changes docs/test support only.
- Full suite failure is pre-existing or unrelated only if the failure was observed before the patch or isolated by targeted tests.
```

The point is not to make every local environment perfect. The point is to make validation claims precise enough that another maintainer can reproduce or challenge them.
