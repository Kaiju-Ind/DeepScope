# P05 Recover a failed release

**Trigger:** a Release workflow job fails, a published archive is wrong, or a store rejects or breaks a version.
**Outcome:** a known state and a justified next action.

| Step | Action                                                       | Expected result                                                                 | If it fails                                                          |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 1    | Stop further publication and keep the first error.           | Failing job, step, commit, tag and log are retained.                            | Record what is missing.                                              |
| 2    | Read the actual state.                                       | Draft or published release, pushed ghcr version, attestations, store uploads.   | Treat an unreadable state as unknown, never as absent.               |
| 3    | Find the earliest cause.                                     | A class and cause confidence from the [failure catalogue](../../failures/README.md). | Keep hypotheses separate; do not repair unrelated symptoms first.   |
| 4    | Choose the recovery path from the table below.               | The path fits the state.                                                        | Ask for the one missing decision; continue safe diagnosis.           |
| 5    | Execute only the authorized action.                          | The release reaches a consistent state.                                         | Re-read the state before another attempt.                            |
| 6    | Repeat the affected checks.                                  | Checksums, attestations, release verification and store states pass again.      | Keep the failure status until they do.                               |
| 7    | Record one owned prevention action.                          | A test, check or simpler step with an owner.                                    | A warning paragraph alone is not closure.                            |

| State                                               | Recovery                                                                                                    |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Failed before `publish`                             | Delete the draft (`gh release delete v<version>`) and any pushed package version, fix, re-run for the same tag. |
| Published, wrong or broken                          | Never move the tag or replace assets. Fix forward with a new patch version.                                 |
| Store rejected the version                          | Read the reviewer's reason, fix, release a new patch version; the store will not accept the same version again. |
| Store accepted a broken version                     | Release a fixed patch version; stores do not roll back to an older version number.                           |
| Flaky step with unchanged inputs (network, runner)  | Re-run the failed job once; a second identical failure needs diagnosis, not another re-run.                  |

Never weaken the tag-equals-version check or the cold install to get a release out. Keep credentials out of logs and
reports.
