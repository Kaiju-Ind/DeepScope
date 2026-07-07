# Popup composition with named regions

The popup uses named regions so UI structure can grow without turning `App.tsx` into a list of structural flags. A named region is a stable place in the interface, such as hero copy, actions, stats, feedback, or results. The caller chooses which content goes into each region. The region component owns layout wrappers, classes, semantic containers, and accessibility attributes.

This document records how that pattern applies to the Solid popup after phase 7. It is not a new UI feature and it does not change detector output.

## Current composition shape

Read this diagram as the static shell owned by `src/entrypoints/popup/PopupRegions.tsx`. `App.tsx` supplies reactive content to each region, while the shell keeps layout and semantic wiring in one place.

```text
PopupShell.Root
├── PopupShell.Hero
│   ├── PopupShell.HeroCopy
│   ├── PopupShell.Actions
│   ├── PopupShell.Stats
│   │   ├── PopupShell.Stat
│   │   ├── PopupShell.Stat
│   │   └── PopupShell.Stat
│   └── PopupShell.Metrics
├── PopupShell.Feedback
└── PopupShell.ResultPanel
```

This shape matches the current popup responsibilities. The popup still owns background calls, Solid signals, timers, and result rendering. The named-region shell owns repeated markup and accessibility-sensitive wrappers such as `aria-busy`, status feedback placement, and the live result panel.

## Why named regions fit this popup

The popup has multiple meaningful areas that may evolve independently. The hero copy explains the product, actions run analysis and observation commands, stats summarize cache and result counts, feedback reports recoverable state, and the result panel renders the current `SiteAnalysis`. Those areas are structural, not primitive button or text-field props.

Named regions keep that structure visible in JSX:

```tsx
<PopupShell.Root busy={busy()}>
  <PopupShell.Hero>
    <PopupShell.HeroCopy>...</PopupShell.HeroCopy>
    <PopupShell.Actions>...</PopupShell.Actions>
    <PopupShell.Stats>...</PopupShell.Stats>
    <PopupShell.Metrics>...</PopupShell.Metrics>
  </PopupShell.Hero>

  <PopupShell.Feedback>...</PopupShell.Feedback>
  <PopupShell.ResultPanel meta={...} modeChip={...}>...</PopupShell.ResultPanel>
</PopupShell.Root>
```

The alternative would be a large shell with booleans like `showStats`, `showFeedback`, `showModeChip`, or callback props such as `renderActions`. Those props hide the interface structure and make future explanation or replay regions harder to review.

## Solid-specific rules

`App.tsx` should keep Solid owner-sensitive behavior close to the component that creates it. Timers, background RPC calls, signal writes, and cleanup still belong in `App.tsx` because that component owns the popup lifecycle.

`PopupRegions.tsx` should stay presentational. It should not import `BackgroundApi`, the detector, storage, or registry data. It should accept `JSX.Element` region content and small primitive values such as `busy`, `meta`, and `accent` when those values control semantic or visual shell behavior.

Keep reactive reads in `App.tsx` or in JSX passed into a region. Do not destructure accessors in a way that freezes their value. Solid components run once, so region helpers should not assume React-style rerender behavior.

## Region ownership rules

| Region | Owns | Does not own |
| --- | --- | --- |
| `Root` | Popup landmark and busy state. | Background calls or analysis state. |
| `Hero` | Hero panel grouping. | Button behavior. |
| `HeroCopy` | Product copy placement. | Product copy generation. |
| `Actions` | Button row layout. | Refresh or stop handlers. |
| `Stats` and `Stat` | Metric card layout and labels. | Where metric values come from. |
| `Metrics` | Compact source, host, and live-update layout. | Observation-mode derivation. |
| `Feedback` | Placement for errors and notices. | Error formatting or notice rules. |
| `ResultPanel` | Result heading, mode chip, metadata, and live region. | Detection grouping or card rendering. |

If a future feature needs a new structural area, add a named region. If a future feature only changes a button label or disabled state, keep it as a normal prop or element state.

## Future explanation and replay regions

The target architecture includes explanations and replayable evidence. When those become public UI features, add regions instead of threading explanation booleans through the existing result panel.

Possible future shape:

```text
PopupShell.ResultPanel
├── CategoryGroup[]
└── PopupShell.ExplanationPanel

PopupShell.Diagnostics
└── replay summary or evidence trace link
```

Those regions should consume a popup-facing view model, not raw detector internals. The UI should receive an explanation-shaped contract only after the detector exposes one deliberately.

## Review checklist

Use this checklist when reviewing popup composition changes.

- Does `App.tsx` still own lifecycle, timers, and background calls?
- Does the region component own only layout, semantics, and styling hooks?
- Are structural additions modeled as regions instead of mode booleans?
- Are primitive states such as `disabled`, `aria-busy`, and metric values still normal props or native attributes?
- Are errors and status notices announced through the existing feedback region?
- Does result rendering still flow through the popup view model instead of detector internals?
- Did the change run popup view-model tests and WXT build when TSX changed?
