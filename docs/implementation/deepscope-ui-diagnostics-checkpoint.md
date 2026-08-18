DeepScope UI and diagnostics checkpoint
=======================================

Status
------

This checkpoint contains the current DeepScope UI, diagnostics, History, branding, active-tab session, toolbar badge, and baseline-regression fixes.

The extension remains one package.  This work does not create a repository-level `packages/` folder or convert DeepScope into a monorepo.

Implemented
-----------

- Fixed the side-panel temporal-dead-zone failure that surfaced as `Cannot access 'o' before initialization`.  The computed boolean no longer shadows `shouldKeepLiveUpdatesActive()`.
- Fixed the missing `limitStringsByTotalChars` import in the page-signal collector.  This was one of the known collector/test regressions.
- The header uses the licensed American Kestrel font and the Kaiju/DeepScope hierarchy from the DeepScope website header.
- Fontless owns UI font discovery, generated `@font-face` rules, fallback metrics, and emitted font assets in the WXT Vite build.  American Kestrel is supplied from the copied local font as a build-time data URL, so the proprietary font does not need a runtime network request.
- The old Fontsource CSS imports are removed.  Space Grotesk, Inter, and Space Mono are resolved by Fontless through its Fontsource provider and emitted as build assets.
- The redundant top-level Scans route remains removed.  Summary owns the current inspection.  History owns retained detector runs and comparison.
- Summary now gives detected technologies the strongest visual priority and keeps observation state secondary.  The redundant Current inspection card is removed.
- Technologies has search, category filtering, confidence filtering, a new-this-inspection filter, sorting, and list, card, and grouped views.  Technology icon work remains intentionally deferred.
- History starts with the selected run's same-page comparison before the long run inventory.  Search and filtering now belong to the Runs section instead of pushing the high-value delta down the page.
- History URLs render as host plus a secondary path instead of one dominant unbroken URL.  Full details remain available in the run drawer.
- History comparison never compares two different page URLs.  Cross-route differences are no longer presented as technology changes.
- History filters support all retained runs, the current page, and runs with real same-page changes.
- One side-panel document is one navigation session.  The first visit to a newly activated browser tab starts on Summary.  Returning to a tab already seen in that session restores its last DeepScope route and page-local search/filter state.
- The toolbar action badge shows the latest detected technology count for the tab.  A new navigation clears the stale count.  Badge updates happen after analysis without extending the analysis response path.
- Touch/coarse-pointer navigation uses the bottom application bar.  Diagnostics and Settings remain behind the More drawer.
- Diagnostics has Overview, Timeline, Jobs, Contexts, and Raw views.
- The Timeline uses TanStack Virtual with stable record keys, fixed-height rows, bounded overscan, and a fixed scroll viewport. Search and filters operate on a derived projection and do not mutate the journal. Fixed-height rows avoid the dynamic `data-index` measurement path that could crash after reactive list changes.
- Timeline filtering is behind an explicit Filter control.  It covers severity, runtime surface, and chronology.  Newest-first is the investigation default; oldest-first remains available for trace reading.
- Diagnostic search, filter, selected record, job search, and active diagnostic tab remain in the current diagnostics document session.
- Diagnostic detail uses the existing drawer component.  It opens from the bottom for coarse/no-hover input and from the right for fine-pointer input.
- LogTape configuration continues to use short namespace-oriented operations: `logging.configure()` and `logging.get()`.
- Console diagnostics use LogTape throttling for lower-severity bursts.  Warning, error, and fatal records bypass console throttling.
- The durable diagnostic journal separately compacts repeated successful records into explicit summary records.  Console rate control does not decide what survives in Diagnostics.
- Diagnostic redaction preserves ordinary query values while still removing secret-like query parameters, credentials, JWTs, email addresses, and phone numbers.
- Stale registry test imports use the current `registry/technology/catalog/` source paths.

Performance posture
-------------------

The new UI work does not add page-world DOM scanning or new content-script observers.

The toolbar badge update is a background action and is deliberately fire-and-forget after a completed analysis.  History, Technologies, and Diagnostics search/filter work runs only in extension UI documents.  Diagnostics virtualizes rendered timeline rows instead of mounting the complete result set.

The existing content observer still coalesces relevant DOM mutations with its 1.5 second throttle and records `session-dirty` only when the session first transitions into the dirty state.  The diagnostic journal batches storage writes and summarizes repeated successful records.  No additional hot-page logging was added in this pass.

Validation completed in this environment
----------------------------------------

- Parsed every TypeScript and TSX source file with the installed TypeScript compiler API: 8,408 files, 0 syntax errors.
- Checked every `@/` source import against the repository: 0 missing local imports.
- Parsed the changed JSON manifests successfully.
- Executed the emitted History query/comparison, URL display/comparison, and side-panel session modules against deterministic runtime fixtures.  The checks passed.
- Verified History's changed-run query compares only previous runs for the same document URL.
- Checked that no top-level or source-level `packages/` folder was introduced.
- The delivery ZIP is extracted and compared byte-for-byte with the working tree before delivery.

Validation blocked by the execution environment
-----------------------------------------------

This execution host has Node.js but does not have pnpm, installed project dependencies, or a generated `.wxt/tsconfig.json`.  Direct npm registry access from the shell has also timed out.

Therefore this checkpoint does not claim the following gates passed here:

```text
pnpm compile
pnpm test:run
pnpm build:chrome
pnpm zip:chrome
```

Run those gates on the normal connected development host, then inspect the built Chrome artifact and verify:

- American Kestrel, Space Grotesk, Space Mono, and Inter are emitted as extension assets by Fontless.
- The built extension makes no runtime font request to Google Fonts, Fontsource, jsDelivr, or another font CDN.
- The toolbar badge updates and clears per browser tab.
- First activation of a tab starts on Summary; revisiting that tab in the same side-panel session restores the exact route and transient History, Technology-list, and Diagnostics state.
- Summary, Technologies, History, Diagnostics, and Settings load from the built extension.
- Touch/coarse-pointer bottom navigation and adaptive drawers work on a real touch device.
- Keyboard focus returns correctly when a drawer closes.
- Diagnostics can render a synthetic 10,000-record projection without creating 10,000 DOM rows.
- The known previously failing collector, model, tab-update, observer, and registry evidence tests are green in the complete suite.

Remaining architecture work
---------------------------

The large side-panel provider is not fully decomposed in this checkpoint.  The new state rules avoid adding more responsibilities to it, but the existing universal state owner still needs a separate capability-ownership refactor before that architecture can be called complete.

`@logtape/testing` adoption is also not included because this environment cannot install or execute the new test dependency.  Current LogTape documentation provides `@logtape/testing` recorders and a dedicated Vitest integration, so that should be the next logging-test migration once the dependency can be installed and the lockfile can be regenerated by pnpm.
