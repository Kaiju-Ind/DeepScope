# Popup snapshot and observation lifecycle

The popup has one job when it opens: show the newest detector state already stored for the visible tab. A snapshot hit is a read path. It can reuse a content observation session that already exists, but it must not start a new observer or enqueue matcher work just because the window mounted.

The runtime now keeps three state lanes separate:

```text
POPUP OPEN
  -> read stored detector snapshot
  -> render replay history when available
  -> subscribe to snapshot revisions

CONTENT OBSERVATION
  -> observe page-local DOM and resource changes
  -> write lifecycle snapshots for observing/stopped state
  -> notify background when queued facts need detector work

BACKGROUND DETECTOR
  -> validate the session from the dirty notification
  -> flush queued observations from content
  -> enqueue matcher persistence
  -> write detector snapshots and replay traces
```

This separation avoids the bug where closing and reopening the popup started a new scan even though fresh detector output was already available. Content lifecycle snapshots can still move the UI from observing to stopped, but they do not replace richer detector results. Detector snapshots remain the popup-visible source of truth for technologies, explanations, and replay history.

Dirty observation notifications are coalesced in the background per tab and session. That keeps mutation bursts from producing one matcher job per DOM change while still allowing page facts to reach the detector when the popup is closed or only rendering stored revisions.

## Debugging checklist

When snapshot-first popup rendering looks wrong, check the background log order.

A fresh snapshot hit should show storage reads and `analysis-snapshot-hit`. It should not immediately show `analysis-fresh-start` or `matcher-job-dispatch` unless the user clicked Refresh, the snapshot was stale or missing, or content sent an observation-dirty notification.

When continuous observation looks stuck, check the content log for `session-dirty` and the background log for `observation-refresh-scheduled`. The popup should not log a snapshot-owned refresh request. It should only log stored snapshot application and lifecycle rendering.

When replay history disappears after reopen, verify that the popup receives replay history from the snapshot-backed response or hydrates it through `getReplayTraceHistory` with the URL already visible in the popup after applying a stored detector snapshot.
