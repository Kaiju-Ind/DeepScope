# Background runtime

**DS-08 The executor is recorded as `offscreen-worker-pool` on Firefox and Safari.** *Symptom:* snapshots name the
offscreen pool when the local executor in the background page ran the job. *Cause (confirmed by source reading):* the
runtime records a fixed value instead of the executor that was chosen; the value is persisted. *Repair:* each partition
executor declares its kind (`offscreen-worker-pool` or `background-workers`), the matcher scheduler copies it into job
states and results, and the snapshot guard still reads the old value. *Prevention:* `src/tests/scheduler/matcher.test.ts`
checks the recorded value for each executor.

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

**DS-14 A tab stayed blank while it remained active.** *Symptom:* in the Firefox stress run (`tools/verify/stress.mjs`)
a tab logged `auto-scan-start` with no `analysis-requested` after it, then `auto-scan-already-in-flight` for every later
request. *Cause (confirmed by a failing unit test, not caught in a browser trace):* the analysis lane lost a wake-up.
Work committed while the running lane read an empty store joined that lane, which then stopped; re-activating an
already-active tab fires no event, so nothing drained it. An earlier path (callers left waiting when the tab changed
during claim removal) was repaired before. *Repair:* the lane claims again before it stops when a caller joined it; one
lane execution is bounded (`ANALYSIS_TIMEOUT` after 120 s); the automatic-scan controller releases a scan that has not
settled in 150 s, retries it once and then frees the tab. *Prevention:* `src/tests/scheduler/analysis-stall.test.ts`
and the watchdog tests in `src/tests/autostart/controller.test.ts`; the stress harness's `inv1` invariant.

**DS-15 Stored sessions outlived their closed tab.** *Symptom:* the stress harness's `inv3-closed-tab-cleanup` found
`rd:session-index:<id>`, `rd:session:<id>:…` and `rd:content-session:<id>:…` after the tab closed. *Cause (confirmed):*
the removal cleanup deleted the index while a scan's snapshot write was still in flight, and the write recreated it; a
content script's lifecycle records were not always in the index, and its last "stopped" write could land after the
cleanup; a replaced tab id was not cleaned up at all. *Repair:* snapshot writes pass a per-tab gate that refuses a
closed tab and tracks earlier writes; cleanup runs again after they settle and a short grace; it sweeps every session
key with the tab's id; a content script does not write "stopped" for a session with nothing stored; `tabs.onReplaced`
forgets the old id like a closed tab. *Prevention:* `src/tests/lifecycle/closed-tab-storage.test.ts` and the stress
harness's `inv3` invariant.
