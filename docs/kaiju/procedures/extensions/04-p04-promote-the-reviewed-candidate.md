# P04 Release the reviewed candidate

**Trigger:** a reviewed commit on `main` is selected for release. **Outcome:** a published GitHub Release and ghcr
artifact for that commit, verified, and store submissions in the intended state.

**Entry:** the preview receipt, the commit, the version, and authorization to tag and release. The full procedure is
[`docs/release/README.md`](../../../release/README.md); the readiness items are in the
[platform cards](../../platforms/README.md).

| Step | Action                                                                     | Expected result                                                                     | If it fails                                                         |
| ---- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1    | Rehearse: Actions > Release > Run workflow with `dry-run` on the branch.   | Types, tests, three builds, Firefox lint and archives pass; nothing is published.   | Fix on the branch; a dry run creates no attestation or release.      |
| 2    | Set `version` in `apps/extension/package.json` and add a `CHANGELOG.md` section.          | The version is new; no store has seen it.                                           | Pick the next patch version; versions are never reused.             |
| 3    | Merge to `main`, then tag that commit `vX.Y.Z` and push the tag.          | The tag points at the reviewed commit; `mise run release:check-version` passes.     | Delete an unpushed wrong tag; never move a pushed one.              |
| 4    | Watch the Release workflow.                                                | `build`, `attest`, `github-release`, `ghcr` and `publish` succeed.                  | Enter P05 with the failing job.                                     |
| 5    | Verify the release.                                                        | `sha256sum -c SHA256SUMS`, `gh attestation verify` and `gh release verify` pass.     | Keep the release status failed until they pass.                     |
| 6    | Submit to stores where enabled.                                            | Chrome upload is unpublished for human review; AMO is signed listed with sources; Safari has its Xcode project. | Record the store's message and enter P05. |
| 7    | Record the release receipt.                                                | Version, tag, commit, run, asset digests, store states and limits.                  | Do not call the release accepted with missing evidence.             |

Assets are attached while the release is a draft, because immutable releases lock assets at publication. Store
publication is a separate state from GitHub publication; a store review can take days and may reject the version.

**Exit evidence:** the release receipt in the [project record](../../project/extensions/09-candidate-preview-and-production-receipts.md).
