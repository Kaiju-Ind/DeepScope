# Zaidan UI source copy

These components are copied from `kaiju-platform/apps/frontend/src/ui/` in the attached 2026-08-16 Platform snapshot.

The staged set is intentionally small and matches the components selected for the later side-panel UI pass:

- `alert.tsx`
- `badge.tsx`
- `button.tsx`
- `card.tsx`
- `collapsible.tsx`
- `scroll-area.tsx`
- `separator.tsx`
- `switch.tsx`
- `tabs.tsx`
- `tooltip.tsx`

The extension does not import these components yet. They are staged here so the later side-panel UI pass can adopt the same Zaidan primitives without combining that visual change with the side-panel lifecycle and routing refactor.

The only source adaptation in the component files is the local `@/utils/cn` import alias. The current side-panel CSS and fonts are intentionally unchanged in this pass.
