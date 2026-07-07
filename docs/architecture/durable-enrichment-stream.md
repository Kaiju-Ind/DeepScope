# Incremental matcher snapshots

The popup should not wait for every detector surface before it shows useful results. Storage-backed snapshots make the visible state durable, and observation-kind matcher shards let the runtime publish real revisions as groups of evidence complete.

```text
popup asks for visible-tab analysis
  -> background loads the complete registry for planning and graph refinement
  -> content collects initial observations from the complete collection plan
  -> background queues matcher tasks by observation kind
  -> offscreen workers load registry.kind.<kind>.json shards
  -> each completed partition returns evidence progress
  -> background refines candidates with accumulated evidence
  -> storage receives a monotonic snapshot revision
  -> popup paints each newer revision
  -> content observers keep sending late observations through the same scheduler
```

The first visible result is now a real partial analysis, not a separate bootstrap truth model. Cheap observations such as metadata, DOM selectors, page globals, links, cookies, storage keys, and the page URL still tend to finish first because their partitions are cheaper and higher priority. Script, request, resource, HTML, text, and content surfaces can complete later without changing the final registry authority.

## Snapshot revisions from matcher progress

The event pipeline still refines candidates against a consistent accumulated evidence set before each snapshot is shown. That keeps graph refinement deterministic for the evidence known at that revision: requirements, implications, exclusions, confidence, and ordering are evaluated together.

```text
completed partitions: meta + url
snapshot n:          [A, B]

completed partitions: meta + url + scriptSrc + resourceUrl
snapshot n+1:        [A, B, C, D, E]

completed partitions: meta + url + scriptSrc + resourceUrl + html + header
snapshot n+2:        [A, B, C, D, E, F, G]
```

Snapshots are still bounded by storage and paint cost. The runtime should not write one record per individual evidence match because storage writes, popup paint work, and extension messaging all have real cost. The scheduler publishes revisions when partition progress changes the accumulated detector result or when a terminal state needs to be visible.

Replay traces remain associated with the most complete analysis available. A partial snapshot can update the visible technology count while preserving the previous replay UI until a terminal revision supplies a complete trace.

## Terminal states

Long-running evidence work now ends in storage. A pending state must not spin forever just because the background service worker stopped, a content-script call timed out, or a deeper collector failed.

```text
pending
  -> complete
  -> failed
  -> timed-out
  -> not-needed
  -> skipped
```

The popup renders those terminal states from the snapshot. Cached detector output stays visible when later matching fails or times out, which is better than clearing results or saying the extension is still checking indefinitely.

## Why the old bootstrap stream was removed

The earlier staged model computed one detector result, then wrote bounded prefixes of the final ordered detection list as if they were progressive frames. That made the UI look active after the expensive work had already completed, and it also made the first result depend on a smaller bootstrap registry. The smaller registry was fast, but it could not match the complete detector output because entire rule surfaces were missing from the first collection plan.

The incremental matcher path keeps the complete registry as the planning and graph authority while letting workers load small kind shards for matching work. This keeps the first paint fast without making the first paint define a smaller truth surface.
