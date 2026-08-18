# Side-panel application composition

Kaiju DeepScope is one persistent, window-scoped side-panel application. Chrome owns the outer side-panel surface. The extension owns one mounted Solid application inside that browser window.

The routed product model is now:

```text
DeepScope
  Summary       current findings + live inspection controls
  Technologies search/filter/sort + list/card/group views
  History       retained replay receipts + emitted-result comparison
  More
    Diagnostics extension health, jobs, contexts, virtualized log timeline
    Settings    automatic inspection and local data controls
```

There is no separate Scan page. Live inspection state belongs to Summary, while completed runs belong to History. This removes the previous duplication where Summary and Scans described the same active detector state in two places.

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

The background never guesses which tab the side panel means. Analysis commands carry the exact target. Initial mount and lifecycle recovery may query the current active tab again.

## Current state owner

`src/app/provider.tsx` still owns state that must survive route changes, including current analysis, observation state, matcher state, settings, and tab identity. Pages use narrow projections from `src/app/context.ts`:

```text
SummaryPage      -> useSummary()
TechnologiesPage -> useTechnologies()
TechnologyPage   -> useTechnology()
HistoryPage      -> useHistory()
SettingsPage     -> useSettings()
```

This is not the final state-ownership refactor. The provider remains larger than the desired capability model. New History and Diagnostics work does not add more replay or diagnostic responsibilities to it: History reads retained replay receipts through storage, and Diagnostics remains independent of detector UI state.

### Observation ownership while switching tabs

The mounted panel can own at most one live observation session. Opening the panel on an inspectable page or pressing Refresh may start `while-panel-open` observation for that exact tab and document. A tab switch releases that panel-owned session before the new tab projection is shown.

Tab activation itself does not make the panel start another scan. Background automatic scanning owns that decision. Automatic scans are one-shot analyses with `observe: "none"`, so enabling automatic scanning does not leave a five-minute observer behind in every tab the user visits. When automatic scanning is disabled, switching tabs only restores the newest retained snapshot for that tab. A fresh scan happens when the panel is first opened or the user presses Refresh.

```text
panel opens on A
  -> restore A snapshot
  -> explicit panel analysis may observe A

user activates B
  -> release panel-owned observation A
  -> restore B snapshot
  -> do not start panel analysis because of the tab switch

background tabs.onActivated
  -> auto-scan enabled  -> one-shot B analysis, no observer retained
  -> auto-scan disabled -> no analysis

panel closes
  -> release its current observation target
```

Analysis responses also carry exact session identity. If an old response finishes after the panel has moved to another tab, the panel rejects the UI result and best-effort stops any observation session created by that stale response. The stop request carries the old `sessionId` and expected document URL, and content refuses it if a newer session already owns the document. This prevents a response race from producing an orphan content observer or terminating a newer observer.

Panel-local route, scroll, search, and view state is also tied to live browser tabs. `tabs.onRemoved` deletes that transient state when Chrome closes a tab in the panel's window, so a long-running side-panel document does not keep state for closed tabs.

## Routed user flows

TanStack Router uses hash history because every side-panel route lives inside generated `sidepanel.html`.

```text
#/                              Summary and live inspection
#/technologies                  Searchable technology results
#/technology/$technologyId      Technology evidence
#/history                       Retained replay history and comparison
#/diagnostics                   Extension health and support investigator
#/settings                      Automatic inspection and local-data controls
```

The normal flow is:

1. Open Summary and understand the current page.
2. Open Technologies to find or compare current detections.
3. Open History to inspect earlier detector runs and changes.
4. Open More only for Diagnostics, Settings, or version information.

## Adaptive navigation

Available width and pointing mode are separate design inputs. Fine-pointer layouts keep compact navigation under the header. Coarse-pointer or no-hover environments use a fixed bottom application bar with safe-area padding.

The More surface uses the existing Corvu drawer primitive. It opens from the right for fine pointers and from the bottom for touch-oriented input. This preserves the same product model without forcing a desktop sidebar into a narrow browser side panel.

## Diagnostics

The options entrypoint remains independent of `PanelProvider`. `DiagnosticsView` reads the crash-durable diagnostic journal, matcher jobs, runtime contexts, and build data directly.

Diagnostics has five views:

```text
Overview  health and build identity
Timeline  searchable/filterable chronological LogTape records
Jobs      matcher lifecycle records
Contexts  active contexts + persisted context starts
Raw       complete bounded support snapshot
```

Timeline filtering is a derived projection. It does not mutate the journal. TanStack Virtual limits DOM rows after filtering and uses stable record ids. Diagnostic rows use a fixed 84-pixel virtual size with a two-line message clamp, so the Timeline does not depend on `measureElement()` or TanStack's `data-index` measurement contract. This removes a Solid reactive timing failure that could leave a virtual item undefined while the row closure still tried to read its index. The journal currently retains at most 400 records, while the query layer has a 10,000-record synthetic test so UI scaling work does not accidentally couple search cost to DOM size.

## Typography and brand

The header mirrors the DeepScope website treatment:

```text
KAIJU      American Kestrel
DeepScope  Space Grotesk on the cyan brand surface
```

The licensed American Kestrel face is copied into the extension at `public/fonts/american-kestrel/americankestral.ttf`. The regular UI keeps package-contained Space Grotesk, Inter, and Space Mono assets. Fontless runs in the WXT/Vite build so font CSS remains build-owned, with no runtime remote-font requirement.

## Review rules

1. One side panel follows only the active tab in its own browser window.
2. Live inspection state belongs to Summary, not a duplicate route.
3. Completed replay receipts belong to History.
4. History comparison only claims facts persisted by replay v1. It does not claim rejected candidates.
5. Diagnostics remains usable without normal detector UI state.
6. Diagnostic filters never mutate persistent records.
7. Console rate control cannot remove records from the durable diagnostic journal.
8. Touch navigation must preserve keyboard accessibility and focus behavior.
9. `src/ui/` primitives are the default building blocks before new UI components are introduced.
10. The extension remains one package. Do not create a monorepo or top-level package workspace for internal capabilities.
