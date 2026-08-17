# Side-panel composition

The side panel is one window-scoped application. Chrome owns the outer side-panel surface. Kaiju owns one mounted Solid application inside that browser window.

The current refactor separates browser targeting, application state, routing, page sections, and presentation without changing the visible default layout.

```text
src/entrypoints/sidepanel/main.tsx
  -> PanelProvider
      owns current side-panel application state
      -> TanStack Router with hash history
          -> PanelShell.Root
              -> route content
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

The side panel listens to `tabs.onActivated` for its own `windowId`. It also listens to `tabs.onUpdated` for navigation in the active tab. The background service worker forwards the same activated/updated target through a small runtime notification. These two notification paths are intentionally redundant: either one can wake a mounted panel, while exact `{ windowId, tabId }` validation and identity comparison make duplicate signals harmless. A tab in another browser window cannot replace the panel's current target.

The background does not guess which tab the side panel means. `getVisibleTabIdentity()` receives `{ windowId, tabId }` and validates the concrete browser tab before returning its storage identity. A tab event supplies that exact target directly; only mount, visibility recovery, or a queued retry needs to query the current active tab again.

## State ownership

`src/panel/provider.tsx` owns the live application state that must survive route changes:

- current visible-tab identity;
- detector snapshot revisions;
- current normalized analysis;
- observation-session state;
- matcher progress;
- replay history and explanation summaries;
- automatic-scan preference state;
- local-data clearing state;
- in-flight refresh and tab-switch state.

The provider is mounted above `RouterProvider`. Navigation between panel pages therefore does not recreate detector state or browser subscriptions.

`src/lib/panel/` owns pure view-model and snapshot-projection functions. These functions do not own routing or browser-window selection.

## Routed pages

TanStack Router uses hash history because all routes live inside the generated `sidepanel.html` extension document.

```text
#/                CurrentPage
#/technologies    TechnologiesPage
#/scans           ScansPage
#/settings        SettingsPage
```

The three focused pages already exist, but the current UI does not link to them yet. The default route preserves the existing all-in-one layout by composing the page sections in their previous order:

```text
CurrentPage
  -> ScansPage
  -> SettingsPage
  -> TechnologiesPage
```

This lets a later UI pass add navigation and progressive disclosure without combining that visual change with the browser-lifecycle fix.

## Current shell

`src/panel/shell.tsx` owns the named presentational regions that existed before the route split:

```text
PanelShell.Root
├── PanelShell.Hero
│   ├── PanelShell.HeroCopy
│   ├── PanelShell.Actions
│   ├── PanelShell.Stats
│   │   └── PanelShell.Stat
│   └── PanelShell.Metrics
├── PanelShell.Feedback
└── PanelShell.ResultPanel
    └── PanelShell.ReplayHistory
```

The root intentionally retains the existing `popup-shell` CSS class. That class name is implementation residue in the current stylesheet, but changing it would be a formatting/UI change. Rename the CSS class only during the later visual migration.

## Zaidan staging

`src/ui/` contains a focused copy of the Platform Zaidan primitives:

```text
Alert
Badge
Button
Card
Collapsible
ScrollArea
Separator
Switch
Tabs
Tooltip
```

The source snapshot is `kaiju-platform(20260816-205556)`. The only source adaptation is the extension-local `@/utils/cn` import.

The current side-panel pages do not import these components. The later visual pass can adopt them deliberately without changing lifecycle behavior at the same time.

## Review rules

When changing this area, keep these rules intact:

1. The mounted side panel follows only the active tab in its own browser window.
2. Browser tab targeting is explicit. Do not reintroduce a background helper that searches the last-focused or current window.
3. A stale response from a previous tab cannot overwrite the currently visible tab.
4. Route changes do not recreate the side-panel state owner.
5. The default route remains the existing all-in-one UI until the separate UI-density work begins.
6. Staged Zaidan components remain unused until that visual pass.
