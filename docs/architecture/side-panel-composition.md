# Side-panel application composition

Kaiju Site Scope is one persistent, window-scoped side-panel application. Chrome owns the outer side-panel surface. The extension owns one mounted Solid application inside that browser window.

The current implementation separates browser targeting, detector state, routing, pages, and presentation so changing routes does not restart a scan or lose the active-tab lifecycle.

```text
src/entrypoints/sidepanel/main.tsx
  -> minimal boot + crash hooks
      -> dynamic import PanelApp
          -> PanelProvider
              owns window/tab subscriptions and detector state
              -> TanStack Router with hash history
                  -> PanelShell
                      -> Technologies
                      -> Technology detail
                      -> Scans
                      -> Diagnostics
                      -> Settings
      -> raw SupportFallback when normal UI cannot mount
```

## Browser ownership

`src/panel/tab.ts` resolves the browser window that contains the mounted side-panel document. It then resolves the active tab only inside that window.

```text
side panel mounts
  -> windows.getCurrent()
      -> windowId
          -> tabs.query({ active: true, windowId })
              -> { windowId, tabId }
                  -> background validates that exact target
```

The side panel listens to `tabs.onActivated` for its own `windowId` and to `tabs.onUpdated` for navigation in the active tab. The background service worker forwards the same activated/updated target through a typed runtime notification. The two paths are intentionally redundant. Exact `{ windowId, tabId }` validation and visible-identity comparison make duplicate notifications harmless while giving the panel another recovery path after an MV3 lifecycle transition.

The background does not guess which tab the side panel means. Analysis commands carry the exact target. Only initial mount, visibility recovery, and queued retry recovery query the current active tab again.

## State ownership

`src/panel/provider.tsx` owns state that must survive route changes:

- current window and visible-tab identity;
- current normalized analysis and detector snapshot revisions;
- observation-session and matcher state;
- replay history and explanation summaries;
- automatic-scan preference state;
- local detector-data clearing state;
- in-flight refresh and tab-switch ownership.

The provider is mounted above `RouterProvider`. Page navigation therefore does not recreate browser listeners, observation state, or the current detector result.

Each product page consumes a narrow projection from `src/panel/context.ts`:

```text
TechnologiesPage -> useTechnologies()
TechnologyPage   -> useTechnology()
ScansPage        -> useScans()
SettingsPage     -> useSettings()
```

Diagnostics is deliberately different. `DiagnosticsView` reads only the crash-durable diagnostic and matcher stores. It does not need `PanelProvider` or the detector registry.

## Routed user flows

TanStack Router uses hash history because all side-panel routes live inside the generated `sidepanel.html` document.

```text
#/                              Technologies
#/technology/$technologyId      Technology evidence
#/scans                         Scan controls and replay history
#/diagnostics                   Extension health and support report
#/settings                      Automatic scan and local-data controls
```

The route split follows how a person realistically uses a detection extension:

1. Open the panel to answer “what technologies are on this page?”
2. Select a technology only when evidence or version detail matters.
3. Open Scans when work is active, failed, or needs manual control.
4. Open Settings only to change persistent behavior or clear data.
5. Open Diagnostics when the extension behaves unexpectedly or support needs a report.

Raw evidence, replay history, storage controls, and runtime diagnostics are therefore available without competing with the primary technology list.

## Independent diagnostics page

WXT also builds `src/entrypoints/options/` as an extension options page and opens it in its own browser tab. Its minimal boot dynamically imports `DiagnosticsView` without importing `PanelProvider`, the route tree, detector registry, content-script connection, or offscreen matcher host. If that import or render fails, the page falls back to the raw support surface instead of depending on the normal Zaidan tree.

```text
Chrome extension options
  -> DiagnosticsView
      -> chrome.storage.local diagnostic journal
      -> durable matcher jobs
      -> runtime.getContexts()
```

This is intentional. If the side-panel renderer or its detector state is unhealthy, support still has a separate extension page from which to copy a report.

## Zaidan UI ownership

`src/ui/` is a complete source copy of the current Platform Zaidan primitive catalogue, with only the local import alias adapted from `#/` to `@/`. The extension also carries the Platform component CSS, density fixes, component registry metadata, Tailwind Vite integration, and Unplugin Icons integration.

The Unplugin Icons setup also retains the Platform `kaiju` filesystem collection hook, even though the current Platform source does not contain any custom icon files and the extension does not currently import a `~icons/kaiju/*` symbol. This keeps the build contract aligned without inventing icons.

The extension does not copy the Platform application shell. Chrome already supplies the outer sidebar, so putting the desktop Platform sidebar inside the browser side panel would waste narrow horizontal space and duplicate navigation chrome.

The extension uses the Platform typography roles:

```text
Space Grotesk -> primary UI and display text
Space Mono     -> metadata and diagnostic identifiers
brand role     -> Kaiju mark/wordmark
```

The Google-hosted font build step used by Platform is not appropriate for a self-contained extension. Site Scope uses package-contained `@fontsource` CSS for its general UI fonts so the built extension has no runtime font request. The proprietary Platform brand-font binary is not copied into this repository.

## Review rules

When changing this area, keep these invariants:

1. One mounted side panel follows only the active tab in its own browser window.
2. Browser tab targeting stays explicit. Do not restore last-focused-window heuristics in the background.
3. A stale response from a previous tab cannot replace the currently visible tab.
4. Route navigation does not recreate the state owner or browser subscriptions.
5. Technologies remains the default task, not a dashboard of implementation metrics.
6. Raw evidence belongs on technology detail, not every result row.
7. Scan/replay state belongs on Scans. Persistent preferences and storage controls belong on Settings.
8. Diagnostics remains independently readable when detector UI state is unhealthy.
9. The copied Zaidan primitives stay source-compatible with Platform unless an extension-specific constraint is documented beside the adaptation.
