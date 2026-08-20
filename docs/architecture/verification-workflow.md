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
  -> WXT Chrome build
  -> generated Chrome artifact runtime check
  -> manual Chrome QA
```

The top of the stack is cheap and should run for every generated patch stack. The bottom of the stack is needed when behavior crosses extension runtime interfaces that unit tests cannot reproduce.

## Required command set

| Command | Purpose | Run when | Report as passing only when |
| --- | --- | --- | --- |
| `git apply --check <patch>` | Confirms the patch applies to the intended branch state. | Every patch stack. | The command exits with code 0 for every patch. |
| `git diff --check` | Catches whitespace errors before patches are packaged. | Every patch stack after application. | No whitespace warnings are reported. |
| `pnpm test:run` | Runs the Vitest suite non-interactively. | Runtime, contract, detector, collector, side-panel, storage, or test-support changes. | The command exits successfully. |
| `pnpm compile` | Runs TypeScript without emitting files. | Any TypeScript or TSX change. | The command exits successfully after WXT preparation exists. |
| `pnpm validate:chrome-artifact` | Executes generated Chrome runtime paths in headless Chrome or Chromium. | Content, lifecycle, messaging, side-panel, options, URL utilities, or build-sensitive changes. | Generated collection, live observation, analysis-update, and side-panel/options root-binding startup checks complete without the guarded runtime failures. |
| `pnpm build:chrome` | Type-checks, builds through WXT, then validates the generated Chrome artifact. | Side-panel, WXT, manifest, content, background, or build-sensitive changes. | Every stage exits successfully and `.output/chrome-mv3` is produced. |
| `pnpm check:release` | Runs TypeScript, the full Vitest suite, a Chrome WXT build, and generated-artifact validation. | Every release candidate. | Every stage exits successfully. |
| `pnpm zip:chrome` | Type-checks, runs Vitest, creates the Chrome zip through WXT, and validates generated Chrome runtime paths. | Release-oriented checkpoints. | Every stage exits successfully and the Chrome package is created. |

When a command cannot be run or cannot complete, record the exact reason. Do not describe a partial command as passed.

## Targeted subsystem checks

Run targeted tests when the full suite is unavailable or when the patch only touches one seam. These commands are examples, not substitutes for full validation before release.

```bash
pnpm vitest run src/tests/app/model.test.ts --reporter=verbose
pnpm vitest run src/tests/storage/cache.test.ts --reporter=verbose
pnpm vitest run src/tests/collectors/planning.test.ts --reporter=verbose
pnpm vitest run src/tests/messaging/messages.test.ts --reporter=verbose
```

Use targeted tests to answer a specific review question. For example, a side-panel page or TSX change should run panel tests and build. A storage mock change should run storage tests and at least one consumer test that imports the shared mock. Architecture tests parse handwritten TypeScript and TSX with Oxc instead of depending on the TypeScript compiler API, so TypeScript-native toolchain changes do not silently disable source-structure checks.

## Generated Chrome artifact runtime check

`pnpm validate:chrome-artifact` executes code from `.output/chrome-mv3` in headless Chrome or Chromium. It does not import the TypeScript source as a substitute for the emitted artifact.

The content check covers bounded DOM collection, images, metadata, inline scripts, stylesheets, visible text, cookie names, storage key names, live mutation observation, flush, stop, and cleanup. The app-model check executes the emitted `buildAnalysisUpdate` path for active and idle observation state. Separate startup checks execute each generated `sidepanel.html` and `options.html` entry prefix through its root guard with a real DOM root. They reject root-binding failures such as a generated URL helper replacing the browser `document` object without claiming that the complete routed UI has been mounted. The validator also rejects generated HTML `preload` and `modulepreload` tags so extension-resource and unused-preload warnings cannot re-enter the packaged artifact unnoticed.

This stage exists because source tests and `node --check` can both pass while scope hoisting or minification changes the meaning of a generated identifier. A missing Chrome/Chromium executable is a failed validation stage. Set `CHROME_BIN=/absolute/path/to/chrome` or pass `--chrome=/absolute/path/to/chrome` when automatic discovery is not suitable.

## Manual Chrome QA

Manual Chrome QA remains necessary for runtime behavior because Vitest does not model Manifest V3 lifecycle, real runtime content-script injection, visible-tab permission timing, side-panel mount/unmount cleanup, or page main-world execution.

Run this checklist after changes that touch side panel, background, content, lifecycle, messaging adapters, collection, permissions, or WXT configuration.

1. Build and load the extension from the WXT output directory.
2. Open a normal `https://` page and confirm the side panel returns either detections or a stable empty result.
3. Pin the side panel, switch between two supported tabs in the same browser window, and confirm the panel follows the active tab without showing the previous tab or `NO_ACTIVE_TAB`. With automatic scanning disabled, confirm tab switching alone does not start a new analysis or observer.
4. Open a second browser window, keep its active tab changing, and confirm those activations do not retarget the panel mounted in the first window.
5. Open an unsupported page such as `chrome://extensions` and confirm the side panel shows `UNSUPPORTED_URL` without hanging.
6. Close the side panel while observation is active and confirm that exact panel-owned observation stops. Reopen on the same origin and confirm a snapshot hit renders without creating an observer. On a snapshot miss, confirm the fresh panel-open analysis can start one panel-owned observation.
7. Click Refresh and confirm analysis bypasses stored snapshot reuse and starts observation again.
8. Switch away from a tab with panel observation active and confirm the old tab's observer stops. Switch repeatedly with automatic scanning disabled and confirm only retained snapshots change the UI until Refresh is pressed.
9. Test a page that lazy-loads scripts, links, or meta tags and confirm late detections can appear while the side panel is subscribed to storage revisions.
10. Navigate within the tab and confirm old observation state does not refresh the new page.
11. Open Technologies, a technology detail, History, Diagnostics, and Settings. Confirm route changes do not restart analysis or replace the visible-tab state owner.
12. Open Diagnostics, copy the report, and confirm it contains build identity, current extension contexts, recent context runs, matcher jobs, and recent warnings/failures without raw page bodies or cookie/header values.
13. Use **Open full page** from Diagnostics. Confirm the options page opens in its own tab and works without the side-panel detector state.
14. Interrupt or reload the background service worker while matcher work is non-terminal. Reopen Diagnostics and confirm the orphaned job is marked `context-interrupted` with its previous status retained.
15. Exercise a page with many or repeatedly changing stylesheets. Confirm source collection stays within aggregate script/stylesheet limits and does not surface `PAYLOAD_TOO_LARGE` from cumulative observation snapshots.
16. Switch tabs while analysis is in flight, including onto a newly loading HTTP/HTTPS tab. Confirm the previous result cannot win after the active target changes.
17. Open every filter menu in Technologies, History, and Diagnostics. Repeatedly search, filter, sort, scroll, select records, and switch away from and back to Timeline. Confirm no Kobalte context errors are logged, no `Cannot read properties of undefined (reading 'index')` failure occurs, no TanStack `data-index` measurement warning appears, and extension HTML emits no unused/cross-world preload warnings.
18. Keep the panel open for at least ten minutes with automatic scanning disabled and switch through at least 20 to 50 HTTP/HTTPS tabs repeatedly. Use Chrome Task Manager to confirm DeepScope memory reaches a stable range instead of increasing with every switch. Revisit previously scanned tabs and confirm their injected content runtime is idle when no observation session owns the tab: no active `MutationObserver`, no `PerformanceObserver`, no refresh timer, and no retained session evidence. Close several tabs and confirm panel-local route, scroll, search, and view state for those tabs is released.
19. After matcher work finishes, wait more than 30 seconds. Confirm the dedicated matcher workers and the offscreen matcher document are released, then run another scan and confirm the host and workers restart and matching still succeeds. Inspect Diagnostics for the worker-pool disposal and offscreen-document close records. Confirm DOM selector detection still works from the live content document without an offscreen DOM parser.
20. Trigger or simulate an offscreen matcher failure or timeout. Confirm its structured error appears in Diagnostics and Copy report rather than only in the offscreen DevTools console. Confirm the offscreen job is canceled, its worker pool is disposed, and no production background matcher starts for the same job. A later user or lifecycle retry must create a new job with a new job id.
21. Start observation session A, start a newer session B for the same tab/document, then deliver a delayed stop for A. Confirm content returns `OBSERVATION_SESSION_UNAVAILABLE` and B remains observing.

If a step cannot be verified, record the browser, page URL type, and failure mode in the pull request notes.

## Pull request acceptance checklist

Use this checklist for migration PRs after phase 8.

- The patch applies cleanly to `mvp`.
- The commit scope matches the subsystem touched.
- Public TypeScript exports have TSDoc that explains why they exist and what contract they protect.
- Comments explain constraints, invariants, or non-obvious control flow rather than restating syntax.
- Tests use shared fixtures when the same contract shape appears in multiple suites.
- Runtime-adjacent tests mock browser APIs at the browser interface.
- Documentation updates describe verified behavior, not intended behavior that has not shipped.
- Benchmark files are added only for measured hot paths with a baseline and consumed results.

## Reporting template

Use this shape in generated patch summaries and pull request descriptions.

```text
Validation:
- git apply --check: passed
- git diff --check: passed
- pnpm test:run: failed, reason ...
- pnpm compile: not run, reason ...
- pnpm build:chrome: passed
- pnpm validate:chrome-artifact: passed
- manual Chrome QA: not run in sandbox

Notes:
- No benchmark added because the patch changes docs/test support only.
- Full suite failure is pre-existing or unrelated only if the failure was observed before the patch or isolated by targeted tests.
```

The point is not to make every local environment perfect. The point is to make validation claims precise enough that another maintainer can reproduce or challenge them.
