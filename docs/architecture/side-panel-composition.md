# Side-panel application composition

Kaiju Deepscope is one persistent, window-scoped side-panel application. Chrome owns the outer side-panel surface. The extension owns one mounted Solid application inside that browser window.

The application separates browser targeting, detector state, routing, pages, and presentation so changing routes does not restart a scan or lose the active-tab lifecycle.

```text
src/entrypoints/sidepanel/main.tsx
  -> minimal boot + crash hooks
      -> dynamic import PanelApp
          -> PanelProvider
              owns detector state and mounts tab-target subscription
              -> TanStack Router with hash history
                  -> PanelShell
                      -> Summary
                      -> Technologies
                      -> Technology detail
                      -> Scans
                      -> Diagnostics
                      -> Settings
      -> raw SupportFallback when normal UI cannot mount
```

## Browser ownership

`src/app/tab.ts` resolves the browser window that contains the mounted side-panel document. It then resolves the active tab only inside that window.

```text
side panel mounts
  -> windows.getCurrent()
      -> windowId
          -> tabs.query({ active: true, windowId })
              -> { windowId, tabId }
                  -> background validates that exact target
```

The side panel listens to `tabs.onActivated` for its own `windowId` and to `tabs.onUpdated` for navigation in the active tab. The background service worker forwards the same activated/updated target through a typed runtime notification. These two signals are intentionally redundant. Exact `{ windowId, tabId }` validation and visible-identity comparison make duplicate notifications harmless while giving the panel another recovery path after an MV3 lifecycle transition.

The background does not guess which tab the side panel means. Analysis commands carry the exact target. Only initial mount, visibility recovery, and queued retry recovery query the current active tab again.

## State ownership

`src/app/tab.ts` owns Chrome active-tab subscriptions and exact window/tab targeting. `src/app/provider.tsx` mounts that subscription and owns state that must survive route changes:

- current window and visible-tab identity;
- current normalized analysis and detector snapshot revisions;
- observation-session and matcher state;
- replay history and explanation summaries;
- automatic-scan preference state;
- local detector-data clearing state;
- in-flight refresh and tab-switch ownership.

The provider is mounted above `RouterProvider`. Page navigation therefore does not recreate browser listeners, observation state, or the current detector result.

Each product page consumes a narrow projection from `src/app/context.ts`:

```text
SummaryPage      -> useSummary()
TechnologiesPage -> useTechnologies()
TechnologyPage   -> useTechnology()
ScansPage        -> useScans()
SettingsPage     -> useSettings()
```

Diagnostics is deliberately different. `DiagnosticsView` reads only the crash-durable diagnostic and matcher stores. It does not need the detector registry to assemble a support report.

## Routed user flows

TanStack Router uses hash history because all side-panel routes live inside the generated `sidepanel.html` document.

```text
#/                              Summary of current findings
#/technologies                  Full technology list
#/technology/$technologyId      Technology evidence
#/scans                         Scan controls and replay history
#/diagnostics                   Extension health and support report
#/settings                      Automatic scan and local-data controls
```

The route split follows a realistic side-panel workflow:

1. Open the panel and get a concise summary of the current page.
2. Open Technologies when the complete detection list matters.
3. Select a technology when evidence or version detail matters.
4. Open Scans when work is active, failed, or needs manual control.
5. Open Settings only to change persistent behavior or clear detector data.
6. Open Diagnostics when the extension behaves unexpectedly or support needs a report.

Summary, Technologies, and Scans use the same `AnalysisActivity` model. The UI keeps stale usable results visible while a refresh is active and shows indeterminate progress until matcher partition counts are known. Once the matcher publishes partition counts, the pages show determinate `completed / total` progress.

Raw evidence, replay history, storage controls, and runtime diagnostics are available without competing with the first summary view.

## Independent diagnostics page

WXT also builds `src/entrypoints/options/` as an extension options page and opens it in its own browser tab. Its minimal boot dynamically imports `DiagnosticsView` without importing `PanelProvider`, the route tree, detector registry, content-script connection, or offscreen matcher host. If that import or render fails, the page falls back to the raw support surface instead of depending on the normal Zaidan tree.

```text
Chrome extension options
  -> DiagnosticsView
      -> chrome.storage.local diagnostic journal
      -> durable matcher jobs
      -> runtime.getContexts()
```

This is intentional. If the side-panel renderer or detector state is unhealthy, support still has a separate extension page from which to copy a report.

## Zaidan UI ownership

`src/ui/` contains the Platform Zaidan primitive catalogue used by the extension. The extension also carries the Platform component CSS, density fixes, component registry metadata, Tailwind Vite integration, and Unplugin Icons integration.

The user removed the unused local custom-icon collection. `wxt.config.ts` therefore keeps the normal Solid Unplugin Icons compiler but does not reference a nonexistent `src/icons/` directory. Add a filesystem icon collection again only when the extension has actual project-owned icons that need it.

The extension does not copy the Platform application shell. Chrome already supplies the outer sidebar, so putting the desktop Platform sidebar inside the browser side panel would waste narrow horizontal space and duplicate navigation chrome.

The extension uses the Platform typography roles:

```text
Space Grotesk -> primary UI and display text
Space Mono     -> metadata and diagnostic identifiers
brand role     -> Kaiju mark/wordmark
```

The extension keeps its general fonts package-contained so the built extension does not need a runtime font request. Proprietary font binaries are not copied into this repository.

## Review rules

When changing this area, keep these rules true:

1. One mounted side panel follows only the active tab in its own browser window.
2. Browser tab targeting stays explicit. Do not restore last-focused-window heuristics in the background.
3. A stale response from a previous tab cannot replace the currently visible tab.
4. Route navigation does not recreate the state owner or browser subscriptions.
5. Summary is the first page and explains current findings before exposing operational detail.
6. Technologies visibly shows loading and matcher progress without removing usable prior results during refresh.
7. Raw evidence belongs on technology detail, not every result row.
8. Scan/replay state belongs on Scans. Persistent preferences and storage controls belong on Settings.
9. Diagnostics remains independently readable when detector UI state is unhealthy.
10. Declarative technology definitions stay under `src/registry/`; runtime detector behavior stays under `src/lib/detection/`.
11. Generic reusable primitives stay under `src/utils/`; executable browser composition stays in `src/entrypoints/` and `src/app/`.
