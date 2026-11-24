# Keep both delivery passes focused

For **change to usable preview**, define one first-value journey and identify its necessary integrations. Report
owner-only prerequisites before substantial implementation. The report should name the exact publication, permission,
domain, credential scope, or CI action needed. Continue independent work while that action is completed, and report new
blockers as they appear.

The preview exit condition is a build of the exact commit that the intended reviewer loads in each affected browser to
complete that journey. Deliver the build location, exact commit, passed checks, browsers and versions, and limitations. [DORA's small-batch guidance][small-batches] supports independently useful, testable increments that
return feedback quickly.

For **preview to release**, select the reviewed commit. The release workflow rebuilds from the tag on a cold runner, so
the build must be reproducible: the released archives must match what was reviewed byte for byte, or the difference
must be explained and rechecked. Versioned build inputs and identifiable artifacts follow
[Google's release-engineering principles][release].

Stores own the rollout. Chrome Web Store supports a partial rollout percentage; AMO and the App Store do not roll back to
an older version number. Plan persisted-data compatibility separately from code: an extension update must read what the
previous version stored in `storage.local` and IndexedDB, and a fixed release must still read what a broken one wrote.
[Google's rollback guidance][rollback] illustrates staged compatible changes; [canary guidance][canary] describes an
evaluated partial rollout.

[small-batches]: https://dora.dev/capabilities/working-in-small-batches/
[release]: https://sre.google/sre-book/release-engineering/
[rollback]: https://cloud.google.com/blog/products/gcp/reliable-releases-and-rollbacks-cre-life-lessons
[canary]: https://sre.google/workbook/canarying-releases/
