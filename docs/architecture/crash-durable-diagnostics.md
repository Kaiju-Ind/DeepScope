# Crash-durable diagnostics

## Purpose

Developer-console output is not enough for an MV3 extension. Background service workers, offscreen documents, side panels, content scripts, and dedicated workers can disappear while useful state still exists in Chrome storage. Some disappearances are normal lifecycle behavior, not crashes.

Kaiju therefore persists a bounded local support journal before a later UI tries to explain what happened.

```text
extension context
  -> structured LogTape record
      +-> throttled human console
      `-> bounded local journal
             -> chrome.storage.local

matcher scheduler
  -> durable matcher job state

Diagnostics
  -> runtime.getContexts()
  -> context-run journal
  -> matcher jobs
  -> recent structured records
  -> Copy report
```

## What is persisted

The journal can retain:

- execution surface and context-run ID;
- extension version and build ID;
- timestamp, LogTape level, and category;
- bounded structured fields;
- error name, message, stack, and cause when available;
- worker filename, line, and column when Chrome reports them;
- matcher lifecycle IDs, partition counts, and interruption state.

Records are bounded before persistence. Sensitive-looking scalar values use the same evidence-redaction utility as detector explanations. The journal intentionally does not persist raw page HTML, page text, cookie values, authorization values, request bodies, or general browser storage contents.

## Retention

The local journal retains at most 400 recent records and 30 recent context starts, with a seven-day age limit. Trimming is best effort and also runs when a new context starts so many short-lived contexts cannot avoid the global retention limit. Up to 160 recent warning/error/fatal records receive reserved retention before the remaining slots are filled with the newest ordinary diagnostics, so a later debug burst is less likely to evict the failure that caused the investigation.

High-volume successful records are not silently rate-dropped from durable diagnostics. Each context keeps up to 20 detailed records for the same structured event in a one-second window, then writes a bounded summary containing the suppressed count plus the last message/properties. Warning, error, and fatal records bypass this compaction. This keeps the support history useful without allowing one successful matcher loop to consume the whole journal in a few seconds.

Terminal matcher lifecycle history is capped at 80 recent records with a seven-day age limit. Non-terminal matcher records are not trimmed because they must remain available for completion or interruption reconciliation. Matcher lifecycle records remain part of the detector's durable local state. A Diagnostics clear removes only diagnostic-journal keys. It does not remove detector snapshots, replay receipts, automatic-scan preferences, or matcher state.

## Failure capture

Extension-owned pages, service workers, and dedicated workers install handlers for:

```text
error
unhandledrejection
messageerror
```

The content script deliberately does **not** persist the host page's global `error` stream as extension failures. It keeps isolated-world `unhandledrejection` and `messageerror` capture, while synchronous content-script operations report through their explicit error paths. This avoids turning unrelated website JavaScript failures into Kaiju crash records.

The offscreen matcher host also retains dedicated-worker `ErrorEvent` information and `messageerror` failures instead of reducing them to an error message string.

Chrome offscreen documents do not own the normal extension storage API used by the journal. Their journal therefore sanitizes the same `DiagnosticContext` and `DiagnosticRecord` contracts locally, then forwards them over the extension runtime channel to the background service worker. Background validates the transport contract before writing those records to local storage.

```text
offscreen LogTape / crash hook
  -> sanitize + redact diagnostic record
  -> runtime.sendMessage(diagnostics.record)
  -> background validates transport message
  -> background storage.local write

dedicated matcher Worker failure
  -> worker journal sanitizes the record
  -> worker postMessage(diagnostics.record)
  -> offscreen relays the transport message
  -> background validates and persists it

worker slot ErrorEvent / messageerror / partition-failed
  -> offscreen also records host-side failure metadata
```

This makes offscreen and matcher-worker LogTape records visible in the same Diagnostics Timeline and copied support report as background and content records. The same success-only journal compaction still applies before high-volume debug records are transported. Host-side worker error handling remains a second source of failure metadata when a worker cannot complete its own diagnostic message. An active worker failure also disposes the shared matcher pool, which rejects the in-flight partition and prevents a broken worker heap from remaining resident after the job has already failed or been canceled.

LogTape sends records to two sinks. The console sink rate-limits ordinary trace/debug/info bursts. Warning, error, and fatal records bypass console throttling. The durable journal is not behind that console throttle. It applies its own success-only compaction after the detailed sample limit, while warning, error, and fatal records are always persisted.

## Interrupted matcher work

Matcher jobs already persist these active states:

```text
queued
  -> dispatching
      -> running
          -> streaming
```

A newly created background service-worker context cannot recover the previous context's Promise callbacks or transient `ObservationBatch`. The execution scheduler and diagnostic lifecycle store therefore reconcile different facts at startup:

1. The matcher scheduler asks the offscreen host to cancel orphaned CPU work and removes the obsolete scheduler claim.
2. The diagnostic lifecycle record preserves the previous matcher state as `interruptedStatus`, records `interruptedAt`, and becomes `failed` with reason `context-interrupted`.
3. Recovery carries only the tab/window identity and hashed document key. Raw document URLs, observation targets, HTML, text, and script source are not stored in matcher lifecycle diagnostics.
4. The background resolves the current Chrome tab. If its URL hash still matches the recovery key, it queues a new analysis that recollects evidence from the live document.

The old matcher job is **not resumed**. Recollection is a new job because the observation batch belonged to the lost JavaScript context and was deliberately never persisted. The term **interrupted** remains deliberate: Chrome may have normally suspended an MV3 worker, so the diagnostic history must not claim a crash when it only knows that JavaScript ownership disappeared before terminal state.

## Diagnostic surfaces

There are two UI paths:

```text
side panel #/diagnostics
  convenient while the panel works

extension options page
  independent support surface opened in its own tab

raw SupportFallback
  minimal recovery UI when the normal side-panel or diagnostics UI cannot mount
```

The options page does not mount `PanelProvider` and does not start detector work. It reads the durable journal, matcher records, current `runtime.getContexts()` topology, build identity, and platform information. Its normal diagnostics component is loaded dynamically so the entrypoint can still render the raw support fallback if the main UI chunk fails before mount.

The side-panel entrypoint uses the same principle. It configures diagnostics first, then dynamically imports the routed `PanelApp`. A failed application import or render is written directly to the journal and replaced by the minimal support UI. The support UI delays importing the full report formatter until the user asks to copy a report.

The primary support action is **Copy report**. It creates text that a friends-and-family tester can paste into an issue or chat without opening DevTools.

## Limitations

JavaScript cannot guarantee a final log record for a browser/renderer hard crash or force-kill. The useful evidence is therefore often the last durable state before the context disappeared plus reconciliation performed by the next context.

`runtime.getContexts()` reports what exists when the snapshot is built. It does not provide a historical process trace. Recent context-run records provide that historical hint.

Source maps and uploaded crash telemetry are not part of this local-first release. If remote diagnostics are added later, the privacy disclosure and explicit user/organization consent model must be redesigned before enabling them.
