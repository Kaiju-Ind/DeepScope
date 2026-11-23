# Verification workflow

Use package scripts to check source and build the WXT extension. Inspect generated output and test extension behavior in Chrome before release. Record the commands that ran, their results, and any checks that remain unrun.

## Validation layers

Start with tests for the changed subsystem. Run the full Vitest suite and TypeScript check when the change crosses source owners. Build the Chrome extension for changes to entrypoints, UI, dependencies, manifests, or bundling. Inspect the generated files, then exercise the affected user flows in Chrome.

The package scripts finish at WXT output generation. Runtime checks of that output and manual Chrome checks require separate execution.

## Required command set

| Command | Purpose | Run when | Report as passing only when |
| --- | --- | --- | --- |
| `git diff --check` | Catches whitespace errors in the change. | Before review. | No whitespace warnings are reported. |
| `pnpm test:run` | Runs the Vitest suite non-interactively. | Runtime, contract, detector, collector, side-panel, storage, or test-support changes. | The command exits successfully. |
| `pnpm compile` | Runs TypeScript without emitting files. | Any TypeScript or TSX change. | The command exits successfully after WXT preparation exists. |
| `pnpm build:chrome` | Runs TypeScript, then builds through WXT for Chrome. | Side-panel, WXT, manifest, content, background, or build-sensitive changes. | Both stages exit successfully and `.output/chrome-mv3` is produced. |
| `pnpm check:release` | Runs TypeScript, the full Vitest suite, then a Chrome WXT build. | Every release candidate. | All three stages exit successfully. |
| `pnpm zip:chrome` | Runs TypeScript and Vitest, then creates the Chrome zip through WXT. | Release packaging. | All three stages exit successfully and the Chrome package is created. |
| `pnpm validate:chrome-artifact` | Optional. Checks an existing `.output/chrome-mv3` build: registry/HTML surfaces statically, then loads the side-panel and options pages in a local Chromium. Not part of `build:chrome` or `check:release`. | Build-sensitive changes when a Chromium binary is available (`CHROME_BIN`). | Every check in its JSON report passes, including the browser check; a missing browser is a failure, not a pass. |

When a command cannot be run or cannot complete, record the exact reason. Do not describe a partial command as passed.

## Targeted subsystem checks

Run targeted tests when the full suite is unavailable or when the patch only touches one seam. These commands are examples, not substitutes for full validation before release.

```bash
pnpm vitest run src/tests/app/model.test.ts --reporter=verbose
pnpm vitest run src/tests/storage/cache.test.ts --reporter=verbose
pnpm vitest run src/tests/collectors/planning.test.ts --reporter=verbose
pnpm vitest run src/tests/messaging/messages.test.ts --reporter=verbose
```

Use targeted tests to answer a specific review question. For example, a side-panel page or TSX change should run panel tests and build. A storage mock change should run storage tests and at least one consumer test that imports the shared mock. The generated-name and UI-binding rules use Oxc to inspect TypeScript and TSX syntax. Runtime tests exercise the behavior of the owning APIs.

## Inspect and run the generated extension

After `pnpm build:chrome`, inspect the manifest, HTML entrypoints, JavaScript, registry assets, and font assets in `.output/chrome-mv3`. Confirm that generated references resolve to packaged files and that extension HTML has no unwanted `preload` or `modulepreload` tags.

Load that output as an unpacked extension in Chrome or Chromium. Open the side panel and options page, then exercise collection, live observation, flush, stop, and cleanup. Check runtime errors and the diagnostic journal for failures introduced by bundling or minification, including invalid bindings in generated entrypoints.

These checks are separate from the package scripts in the table. Record the browser and built output used, the scenarios exercised, and any checks that could not run.

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
14. Interrupt or reload the background service worker while matcher work is non-terminal. Reopen Diagnostics and confirm the orphaned lifecycle record is marked `context-interrupted` with its previous status kept only as diagnostic history. If the exact tab and document still exist, confirm DeepScope recollects it as new recovery work rather than resuming the lost in-memory batch.
15. Exercise a page with many or repeatedly changing stylesheets. Confirm source collection stays within aggregate script/stylesheet limits and does not surface `PAYLOAD_TOO_LARGE` from cumulative observation snapshots.
16. Switch tabs while analysis is in flight, including onto a newly loading HTTP/HTTPS tab. Confirm the previous result cannot win after the active target changes.
17. Open every filter menu in Technologies, History, and Diagnostics. Repeatedly search, filter, sort, scroll, select records, and switch away from and back to Timeline. Confirm no Kobalte context errors are logged, no `Cannot read properties of undefined (reading 'index')` failure occurs, no TanStack `data-index` measurement warning appears, and extension HTML emits no unused/cross-world preload warnings.
18. Keep the panel open for at least ten minutes with automatic scanning disabled and switch through at least 20 to 50 HTTP/HTTPS tabs repeatedly. Use Chrome Task Manager to confirm DeepScope memory reaches a stable range instead of increasing with every switch. Revisit previously scanned tabs and confirm their injected content runtime is idle when no observation session owns the tab: no active `MutationObserver`, no `PerformanceObserver`, no refresh timer, and no retained session evidence. Close several tabs and confirm panel-local route, scroll, search, and view state for those tabs is released.
19. After matcher work finishes, wait more than 30 seconds. Confirm the dedicated matcher workers and the offscreen matcher document are released, then run another scan and confirm the host and workers restart and matching still succeeds. Inspect Diagnostics for the worker-pool disposal and offscreen-document close records. Confirm DOM selector detection still works from the live content document without an offscreen DOM parser.
20. Trigger or simulate an offscreen matcher failure or timeout. Confirm its structured error appears in Diagnostics and Copy report rather than only in the offscreen DevTools console. Confirm the offscreen job is canceled, its worker pool is disposed, and no production background matcher starts for the same job. A later user or lifecycle retry must create a new job with a new job id.
21. Start observation session A, start a newer session B for the same tab/document, then deliver a delayed stop for A. Confirm content returns `OBSERVATION_SESSION_UNAVAILABLE` and B remains observing.

If a step cannot be verified, record the browser, page URL type, and failure mode in the pull request notes.

## Pull request acceptance checklist

Use this checklist when preparing a change for review.

- The change is based on the intended branch and preserves concurrent work.
- The commit scope matches the subsystem touched.
- Public TypeScript exports have TSDoc that explains why they exist and what contract they protect.
- Comments explain constraints, invariants, or non-obvious control flow rather than restating syntax.
- Tests use shared fixtures when the same contract shape appears in multiple suites.
- Runtime-adjacent tests mock browser APIs at the browser interface.
- Documentation updates describe verified behavior, not intended behavior that has not shipped.
- Benchmark files are added only for measured hot paths with a baseline and consumed results.

## Reporting template

Record actual outcomes in the pull request description, including commands that failed or did not run.

```text
Validation:
- git diff --check: <result>
- pnpm test:run: <result, test counts or failure>
- pnpm compile: <result or reason not run>
- pnpm build:chrome: <result or reason not run>
- Generated-output inspection: <files inspected and result, or not run>
- Chrome runtime scenarios: <browser, scenarios and result, or not run>

Notes:
- Benchmark: <measured change and baseline, or why it was not needed>
- Full suite failure is pre-existing or unrelated only if the failure was observed before the patch or isolated by targeted tests.
```

Include enough detail for another maintainer to reproduce the checks and assess their limits.
