# Background runtime

**DS-08 The executor is recorded as `offscreen-worker-pool` on Firefox and Safari.** *Symptom:* snapshots name the
offscreen pool when the local executor in the background page ran the job. *Cause (confirmed by source reading):* the
runtime records a fixed value instead of the executor that was chosen; the value is persisted. *Repair (open):* record
the selected executor; keep reading the old value. See the
[source layout plan](../../migration/source-layout-plan.md#separate-behaviour-fixes-found). *Prevention:* a test per
executor that checks the persisted value.

**DS-09 Private-tab state reached local storage and crossed sessions.** *Symptom:* private matcher jobs were written to
local storage, and retained history or delayed replies could cross panel sessions. *Cause (confirmed):* the private
context was not passed through collection, matcher persistence, content lifecycle and diagnostics. *Repair:* the
trusted private context flows through each of them; private saves avoid local storage; replies and history are bound to
the requesting tab and session. *Prevention:* private-tab work uses memory stores only (`@utils/storage/queue/memory`,
workflow `history.memory()`); `src/tests/privacy/` covers redaction. *Open:* a real Chrome incognito and restart journey
has not been run.

**DS-10 The toolbar badge went blank or stale.** *Symptom:* the count disappeared or lagged after navigation, partial
progress, live refresh or a single-page-app navigation. *Cause (confirmed):* the badge was written only after one
complete pipeline run and cleared on every load or URL change, and asynchronous calls could complete out of order.
*Repair:* one owner writes the count for each published snapshot revision, ignores older revisions, clears on
cross-document navigation, recomputes on same-document navigation and restores badges after a background restart.
*Prevention:* badge tests keyed by revision; the `spa` and `idle-wake` real-browser scenarios.
