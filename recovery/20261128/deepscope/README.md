# DeepScope recovery after the execution environment stopped

This tree preserves source evidence for Kaiju-Ind/DeepScope PR #7. It is a
recovery tree based on the last observed live PR head
`1f439b9c33134cbb9755c231db3ced6024f3074b`, not the refactored application tree.
No PR or branch reference was moved while preparing it.

The unavailable checkout was clean at
`480500ea365e928f46738d24903723ecec248672`, whose native source tree is
`9bd1c68bc90250cbb2cccbde1083cbb7cd9e4a74`. The complete 35,194,126-byte
checkpoint archive had been prepared and validated locally, with SHA-256
`6537dabd25b0cbad0a44188df0383cececa500babfd0ac267aae04dc11b6d70d`,
but its independent save failed when the execution environment disappeared.

## What is preserved here

- `commits/` holds the exact raw content of all five native commit objects.
  Hashing each with Git object type `commit` reproduces its recorded full SHA.
  The author and committer are Codex <codex@openai.com>, with timezone -0500.
- `review-overlay.patch` recovers the complete printed diff from the preserved
  migration to the first reviewed candidate: 27 files, 680 inserted lines and
  144 removed lines. It targets intermediate tree
  `a10de960d83e2018e717ae6b2e543ce87ac6386d`.
- `plan-followup.patch` preserves the two exact later plan edits: the passing
  changed-test type check and the already-created commit record. Applying it
  after the overlay must yield tree
  `9bd1c68bc90250cbb2cccbde1083cbb7cd9e4a74`.
- `changes/` separates the same delta by the four original repair/documentation
  commits. Apply `plan-followup.patch` after `changes/0005.patch` and before
  writing that final commit's tree.
- `source/` contains 14 complete current source files independently recovered
  and checked against their recorded Git blob identities. The manifest lists
  them. The remaining existing files are preserved as exact recorded hunks,
  not as fabricated complete files.
- `native-commits.json` records the exact messages, trees, parents and timestamp
  metadata. `VALIDATION.md` separates prior local checks from this recovery.

The seven new files reproduce the original recorded blob hashes. For six
existing files, the live PR's blob exactly matches the recovered migration's
before-blob; applying the recorded hunks reproduces the recorded after-blob.
The verification package manifest was recovered from its full displayed source
and matches its recorded after-blob. Both original and repaired minified comctx
runtime contents also match their complete upstream blob hashes.

The full migration baseline is not available to the current executor, so the
entire reconstructed overlay has not been reapplied after the outage. Verify
every expected tree before using these recovered commits. This tree does not
assert a fresh full-source replay, a full test/build pass, or completion of the
remaining restructure.

## Required baseline

The exact first migration patch was independently saved and read back before
the outage. Its Library file ID is
`libfile_fde3_f-9a33bee43728819191cb013787beefbc_2a999c65827881919d40239cf9ff24e7`,
filename `0001-workspace-migration.patch`, size 14,529,959 bytes, SHA-256
`8ba5ff2754709b73c4179e00c1aa9920adf8f78fa725fda8c926dd2ff7288871`.

Apply that patch against native commit
`1f439b9c33134cbb9755c231db3ced6024f3074b`. Its exact tree must be
`5ec68fe6020da894ec8bed8bcadfaffb2094f30a`, and its raw commit file here must
hash to `b28d7cf3ce2b84572fa64b061d9e6c9b318bb377`.
Do not use an older/newer archive solely because its filename or date differs.
The historical batch5 follow-up and hidden-artifact repair were already in this
baseline and must not be applied again.

## Restore without changing the existing PR

Use an isolated clone or checkout with the original native objects. Use a
separate temporary index so recovery cannot overwrite an existing worktree.

1. Load the original PR head into the temporary index. Apply the independently
   saved migration patch with `git apply --cached --binary`.
2. Write the index tree and compare it with the migration tree above. Only after
   it matches, store `commits/b28d7cf3ce2b84572fa64b061d9e6c9b318bb377.txt`
   with `git hash-object -t commit -w --stdin`; require the expected commit SHA.
3. Apply each `changes/0002.patch`, `0003.patch`, `0004.patch` and
   `0005.patch` to that same temporary index in order. For the last group,
   also apply `plan-followup.patch` before writing the tree.
4. After each group, compare `git write-tree` with the corresponding expected
   tree in `native-commits.json`. Stop on a mismatch. Store its raw commit
   object only when the tree matches and require the expected commit SHA.
5. Run strict native object verification. Regenerate binary-capable
   `git format-patch` files and a complete native bundle, save them independently
   and verify read-back. The four original format-patch file hashes are retained
   in the manifest as evidence, not as a claim that their original file bytes
   were recovered here.
6. Review the resulting actual application tree and remaining validation.
   The integration owner controls publication to existing PR #7. Do not merge
   this recovery tree into that PR or substitute its source identity.

## Continue the implementation

The next source task is the unchanged 962-line `tools/verify/stress.mjs`.
Separate scenario configuration and seeded randomness, page expectations,
tab/window ownership, browser actions, observations and reporting. Preserve
random draw order, model labels, timing semantics and the persisted-state
oracle at `kaiju-deepscope-execution/work`. Its production caller is
`tools/verify/scenarios.mjs`; migrate references and docs with the split.

Review failed window creation in the seeding loop, option validation, Chrome
HTTP startup/process cleanup and caller timeout ownership. These were remaining
review questions, not additional completed fixes. Preserve late panel-response
cleanup: canceling all panel RPC calls can lose the observation target needed
for disposal. Reproduce the vendor-header refresh only from its exact recorded
upstream objects. The separate `fix/stress-green` branch remains unmerged.

Current full type/test/build failures, source archive rebuilds and actual
Chrome/Firefox/Safari acceptance remain open. The complete project action list
is reconstructed by the migration baseline plus these plan patches.
