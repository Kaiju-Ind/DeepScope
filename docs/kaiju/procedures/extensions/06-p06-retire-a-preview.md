# P06 Retire a preview

**Trigger:** a review build is no longer needed, a draft release is abandoned, or a store test item is replaced.
**Outcome:** temporary artifacts are removed and nothing that users rely on is touched.

DeepScope previews are files, not environments, so most of this procedure is not needed: Verify workflow artifacts
expire after seven days, and local `.output/` is ignored. Retire these explicitly when they exist:

1. An abandoned draft GitHub Release and its ghcr package version (never a published one).
2. An unpublished Chrome Web Store upload that will not be submitted.
3. A temporary add-on or unsigned Safari build installed in a shared browser profile.
4. Real-browser result files that hold page data, kept outside `.tmp/`.

Confirm the exact version or tag before deleting; a prefix match is not enough. Record what was removed.
