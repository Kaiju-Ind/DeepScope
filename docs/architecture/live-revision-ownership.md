# Live revision ownership

The popup is the product surface. Runtime internals only matter when they help the popup show the right state for the right tab without getting stuck. The live revision model therefore treats storage snapshots as the receive stream and treats visible-tab commands as ways to start or steer work.

The cleanup removes targetless observation and replay reads from the popup path. A command that can change visible state must carry the session, tab, or URL that the popup already rendered. If the user switches tabs while background work is still finishing, the old response is ignored instead of being allowed to overwrite the new tab.

## User-visible contract

```text
Popup visible tab
  -> read stored session/origin snapshot
  -> render latest known detections
  -> start or reattach analysis for that same target
  -> apply only newer matching snapshot revisions
  -> ignore stale RPC responses from older targets
```

This keeps the UI aligned with the target the user is looking at. Cached detections, replay summaries, matcher lifecycle state, and observation status all come from the same visible snapshot or from a command whose target still matches the visible tab.

The popup consumes a `PopupVisibleRevision`, not the raw background command as its rendering contract. Background commands acknowledge that analysis was queued or that a stored snapshot was found; storage revisions remain the receive stream for exact visible state.

## Runtime ownership

```text
POPUP
  owns visible tab identity
  owns workflow state for refresh, stop, tab switch, and stored-snapshot loading
  reads snapshot revisions from storage
  sends commands with explicit targets whenever a known session or URL exists

BACKGROUND
  owns browser tab lookup and privileged browser APIs
  queues the first matcher revision after the cheap collection pass
  schedules enrichment passes after initial matcher persistence
  cancels session-keyed matcher work on navigation, tab close, and superseding refresh
  records matcher lifecycle diagnostics on snapshots

STORAGE
  owns the durable visible state
  rejects stale snapshot revisions
  keeps origin latest and per-session snapshots recoverable after service-worker restart
  keeps origin summaries and compact status separate from exact visible-tab snapshots
```

## Why targetless browser-tab helpers were removed from the popup path

Targetless helpers are convenient but unsafe in a popup that can stay open while the user changes tabs. A request might start for Tab A, then the user activates Tab B before the response resolves. If the response asks the background for “the visible tab” again, it can accidentally read or mutate Tab B even though the command was created by Tab A state.

The safer rule is:

```text
A response may update the popup only when it still belongs to the visible target.
```

Replay history follows the same rule. The popup hydrates replay history by the URL already visible in the current analysis, not by whichever tab is active when the hydration request reaches the background.

## First-result timing

Fresh analysis now queues matcher persistence after the initial collection pass. Deeper evidence passes run later and publish ordinary newer revisions.

```text
initial cheap observations
  -> register and dispatch matcher revision
  -> popup can render queued or cached output
  -> enrichment pass collects deeper evidence
  -> queue newer matcher revision
  -> popup applies newer storage snapshot
```

That prevents deeper collection from owning first paint. The user can see initial detections sooner, then watch them improve through the same snapshot stream.

## Development matcher diagnostics

WXT development mode can be hostile to extension worker pools because dev-time worker transforms and hot module machinery do not always behave like packaged extension runtime. The development executor therefore avoids constructing the offscreen worker pool and records a `dev-fallback` executor on snapshots. Production builds can still use the offscreen worker pool, and backend diagnostics can show which executor produced a revision without making that an end-user popup label.

## Review checklist

Use this checklist when changing popup, background, storage, or matcher code:

- Does the command carry the session, URL, or tab identity already visible in the popup?
- Can a late response from an old tab overwrite the current tab?
- Does a tab-change event during an in-flight identity sync rerun once for the newest visible tab?
- Does navigation, tab close, or newer visible-session work cancel active matcher jobs before stale progress can write?
- Does the first matcher job register before enrichment collection starts?
- Does replay UI render from the snapshot summary even if full history hydration fails?
- Does the snapshot carry enough matcher lifecycle metadata to debug dev/build execution without exposing executor details in the popup?
- Does storage remain the only source of truth for visible detector state after service-worker restart?
