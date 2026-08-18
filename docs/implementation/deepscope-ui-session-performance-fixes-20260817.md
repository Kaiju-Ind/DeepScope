# DeepScope side-panel, diagnostics, session, and performance fixes

**Source authority:** `kaiju-deepscope-extension(5).zip`, supplied August 17, 2026
**Scope:** Chrome MV3 side panel and background/content runtime behavior
**Repository shape:** one extension package. This work does not add a root `packages/` tree.

## Outcome

This pass fixes the visible side-panel crash, removes the competing manual font
pipeline, puts current-page history changes before the long run inventory,
adds explicit filters, restores browser-tab UI state during one mounted panel
session, adds a technology-count browser-action badge, and reduces repeated
page/content and side-panel work.

The implementation keeps generic UI primitives in `src/ui/`, application
composition in `src/app/`, extension runtime code in `src/entrypoints/` and
`src/lib/`, and small contextual utilities behind namespace-oriented APIs.

## Runtime crash

The source contained a temporal-dead-zone self-shadow:

```ts
const shouldApplyReplayState = shouldApplyReplayState(revision);
```

The local constant hid the imported function while its own initializer was
running. The bundled variable was minified to `o`, which produced:

```text
ReferenceError: Cannot access 'o' before initialization
```

The local value is now named `applyReplay`. A second namespace shadow in storage
contracts was also removed so a local URL string no longer hides the imported
`url` namespace.

Static AST checks now report no direct local self-call initializers and no
parameter/namespace property-use shadows.

## Why the panel was doing too much work

The supplied DevTools log contained 133 copies of the TDZ error and 131
`snapshot-revision-applied` messages. Across the 131 timestamped snapshot
records, the median interval was about 25 ms and 109 of 130 adjacent intervals
were under 100 ms.

Several independent behaviors were amplifying that churn:

1. The content `PerformanceObserver` callback could rescan the complete resource
   Performance Timeline instead of consuming only new observer entries.
2. Mutation callbacks could trigger descendant work too close to the browser's
   mutation delivery path.
3. Content observation rewrote durable lifecycle snapshots when batches were
   queued and again when they were flushed, even though lifecycle state was
   still `observing`.
4. Detector partition progress could publish side-panel-visible snapshots at a
   much higher cadence than a human could use.
5. A content-owned snapshot that preserved detector output could make the panel
   apply the full result set again even though only observation lifecycle had
   changed.

## Performance changes

### Content document work

`src/lib/content/observed-page-signals.ts` now:

- reads existing resource timings once when observation starts;
- consumes only `PerformanceObserverEntryList.getEntries()` for later resource
  events;
- keeps the synchronous `MutationObserver` callback to root collection and
  scheduling;
- coalesces overlapping mutation roots;
- moves descendant scans behind the existing trailing throttle;
- coalesces resource-only dirty notifications to the same cadence;
- falls back to one full-document scan only after the bounded root queue
  overflows.

The content observer therefore does not add new per-mutation page traversal.

### Durable content lifecycle

`src/entrypoints/content.ts` now writes content lifecycle state only when the
lifecycle actually changes:

```text
observation starts -> observing snapshot
observation stops  -> stopped snapshot
```

Queued and flushed late observations use the existing background dirty signal.
They do not rewrite an unchanged `observing` snapshot. Lifecycle writes are
serialized so a slow start write cannot settle after a later stop write.

### Detector revisions

`src/lib/background/revision.ts` owns the visible partial-revision cadence.

- The first partial revision is visible immediately.
- Later non-final partial revisions are limited to one every 250 ms.
- A final revision is always visible immediately.

The detector still retains its authoritative work. This only coalesces the
side-panel projection.

### Side-panel revision state

Same-page content revisions are lifecycle-only. They no longer replace the
current detector result list. The latest content lifecycle revision is stored as
non-reactive bookkeeping because no component renders that revision number.

## Fontless ownership

The old packaged extension contained both:

```text
/fonts/american-kestrel/...
/assets/_fonts/...
```

and the side panel attempted to load a missing
`/fonts/american-kestrel/americankestral.ttf` file.

There is now one font pipeline.

```text
licensed source font
src/assets/fonts/american-kestrel/americankestral.ttf
        |
        v
wxt.config.ts
        |
        v
Fontless manual source
        |
        +-- generated @font-face
        +-- fallback metrics
        +-- preload
        `-- emitted /assets/_fonts asset
```

Space Grotesk and Space Mono are resolved through Fontless's Fontsource
provider. Application CSS declares the same logical font hierarchy as the Kaiju
website:

```text
font-sans    -> Space Grotesk
font-display -> Space Grotesk
font-mono    -> Space Mono
font-logo    -> American Kestrel -> Space Grotesk
```

No application CSS owns a manual Kestrel `@font-face` and no production source
references `/fonts/american-kestrel/...`.

The licensed font itself is intentionally not part of this source handoff. Copy
it to the documented source path before the production build.

## History information architecture

History is current-page-first because the side panel already has a concrete
active page.

Reading order is now:

```text
History
  |
  +-- changes from previous same-page run
  |
  +-- current-page run inventory
       |
       +-- search
       `-- Filter
```

The default page filter is `Current page only`. `All pages on this origin` is an
explicit investigation mode instead of the default. This avoids opening History
into a wall of unrelated long paths.

A run is compared only with the immediately older retained run for the same
page. Different paths on the same origin are never treated as sequential
versions of one page.

The collapsed comparison shows counts and a few examples. The full Added,
Removed, and Changed lists live in an adaptive drawer.

### URL presentation

Dense URL surfaces separate identity into useful parts:

```text
pathname       primary in origin-scoped investigation
host           secondary
query values   hidden in compact rows; query count remains visible
fragment       tertiary
detail drawer  can show the full query text
```

When the run inventory is already filtered to the current page, rows do not
repeat the same URL. Origin-wide mode restores the route identity in each row.

## Filters

Search, filtering, sorting, and view selection remain separate operations.

History filters:

- current page or all pages on the current origin;
- any run;
- any difference;
- technology added;
- technology removed;
- version, evidence, or confidence modified.

Technology filters:

- category;
- confidence;
- technologies added during the current live inspection.

Diagnostics filters:

- LogTape severity;
- runtime surface.

Diagnostics chronology is a sort choice rather than being disguised as a
filter.

`src/app/components/filter-menu.tsx` owns only the shared Filter trigger and
menu presentation. Each page owns the meaning of its filters.

## Browser-tab side-panel session

`src/app/session.ts` is intentionally in-memory. Closing the side-panel document
starts a new UI session.

For a mounted panel session:

```text
activate unseen browser tab
        -> Summary
        -> top of page

navigate inside DeepScope
        -> remember route, scroll, and page controls

activate another browser tab
        -> first visit starts at Summary

return to a browser tab already seen in this panel session
        -> restore its last DeepScope route
        -> restore document scroll
        -> restore page-owned controls
```

History, Technologies, and Diagnostics retain their search/filter/view state per
browser tab. Diagnostics also retains the selected inner view, record, jobs
search, and virtual timeline scroll position.

No durable storage is used for these controls because the requested behavior is
panel-session state, not extension account state.

## Diagnostics composition and virtual scrolling

The previous large Diagnostics component is split into:

```text
src/app/components/diagnostics-view.tsx  composition
src/app/diagnostics/state.ts             tab-scoped investigator state
src/app/diagnostics/timeline.tsx          virtual timeline + record drawer
src/app/diagnostics/views.tsx             overview/jobs/contexts/raw views
```

The timeline uses TanStack Solid Virtual with:

- the real scroll element;
- stable diagnostic record IDs;
- dynamic row measurement;
- overscan;
- a fixed viewport height;
- a virtual total-size container;
- record detail outside the virtual row in a drawer.

This keeps the rendered DOM proportional to the visible diagnostic window rather
than the complete journal.

## Browser action badge

A completed analysis updates the browser action:

```text
0      -> no badge
1..99  -> exact count
100+   -> 99+
```

The tooltip also includes the strongest current evidence-backed technology. It
uses confidence, directness, evidence count, and stable name ordering. It does
not claim business impact or surprise because the registry has no such score.

The badge is cleared when a new navigation begins or the tab URL changes, so a
result from the previous document is not presented as current.

## Naming and composition changes

New generic/contextual APIs use namespace-oriented short operations:

```ts
import * as session from '@/app/session';
import * as history from '@/lib/history';
import * as rank from '@/lib/detection/rank';
import * as url from '@/utils/url';
import * as bytes from '@/utils/bytes';
import * as clipboard from '@/utils/clipboard';

session.open(...);
history.query(...);
rank.top(...);
url.parts(...);
bytes.format(...);
clipboard.copy(...);
```

Retrieval helpers touched by this pass use `get...` rather than `read...` unless
the operation actually consumes a file or stream. New project-owned types use
`Type` suffixes. Important private helpers in the changed code have comments or
TSDoc that explain their invariant or ownership.

This pass does not claim that every older detector/runtime symbol in the entire
repository has been renamed. That would be a separate large refactor with a
wider consumer and persistence review.

## Tests repaired or added

Architecture tests were updated where they had become assertions for obsolete
UI/source structure. They now test the intended contracts rather than deleted
copy or old component locations.

Added or materially updated coverage includes:

- direct same-page History comparison/query behavior;
- browser-tab panel-session restoration;
- partial detector revision coalescing;
- MutationObserver callback architecture;
- content lifecycle write behavior;
- same-page lifecycle-only snapshot behavior;
- Diagnostics composition and virtual scrolling;
- Fontless ownership and absence of the old runtime font path;
- Summary/History information architecture.

## Validation performed in this environment

The implementation was checked with the tools available in this host:

- TypeScript/TSX syntax parse over the full source tree;
- repository-local `@/` import resolution;
- AST check for direct self-shadowed function initializers;
- namespace/parameter shadow check;
- focused runtime execution of pure session, URL, byte-format, revision-policy,
  and ranking modules;
- architecture source assertions for the changed UI/runtime contracts;
- source scan for obsolete Kestrel runtime paths and manual `@font-face` ownership;
- repository-shape check confirming there is no root `packages/` directory.

The final ZIP is also extracted and compared byte-for-byte with the final working
tree after private font files are excluded.

## Gates not executable here

This host does not have the project dependency installation, generated WXT
TypeScript configuration, pnpm executable, or Deno runtime needed to run the
canonical repository gates. Therefore these commands are **not** claimed as
passed here:

```text
pnpm install
pnpm compile
pnpm test:run
pnpm build:chrome
pnpm zip:chrome
```

Run them on the normal development machine after restoring the licensed American
Kestrel source file. Inspect the packaged extension and confirm that Kestrel is
emitted under `/assets/_fonts` and that no `/fonts/american-kestrel/...` request
appears in side-panel DevTools.
