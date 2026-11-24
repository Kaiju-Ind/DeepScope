# P08 Validate and maintain a procedure

**Trigger:** a new procedure, changed provider/runtime, incident or failed walkthrough. **Outcome:** instructions that
another operator can execute with observable success and recovery.

1. Trace the real operation, including its state and external side effects.
2. Put prerequisites before the first step that needs them.
3. Bind actions to verified commands and current source contracts.
4. Give each action an expected observation and failure branch.
5. Have another operator follow the procedure in an isolated target.
6. Record every undocumented intervention as a defect.
7. Exercise one relevant failure or cancellation path safely.
8. Verify cleanup and the claimed user outcome independently.
9. Publish the procedure's evidence level, revision and last exercised environment.
10. Update the procedure and its automation when evidence changes.

An independent document review can expose omissions. It cannot prove live runtime behavior or human usability. Mark a
procedure **source reviewed**, **locally exercised**, **preview exercised** (loaded in the target browsers), or **release exercised** only with the
corresponding evidence. These are proposed Kaiju labels, not an external certification.

The [procedure research](writing/README.md) explains the primary sources behind this method. Repeated operator mistakes
should become a simpler workflow, stronger invariant or automated check where possible. Keep detailed prose for
decisions that still need judgment.

Select drills for the contract being introduced or changed. These are proposed rehearsal requirements, not authority to
run live operations and not a checklist to repeat for every small update.

| Contract under review                  | Rehearsal and expected evidence                                                                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cold preparation                       | A fresh runner installs from the lockfile with no caches and no credentials, and builds all three browsers.                                           |
| Reproducible build                     | Two builds of the same commit produce identical archives (`SHA256SUMS` match); the Firefox sources zip rebuilds to the same files as AMO would.         |
| Release dry run                        | The Release workflow's dry run passes on the branch and publishes nothing.                                                                            |
| Partial release                        | A failure before `publish` leaves a draft that the documented cleanup removes, and a re-run for the same tag succeeds.                                 |
| Extension update with open tabs        | Upgrading the add-on with tabs open keeps detection working (`mise run verify firefox -- --only reinstall`).                                           |
| Fresh-install instructions after a fix | Search defaults, examples, docs and recovery paths for the old setting; repeat setup from a clean checkout without relying on a local override.        |

Record the owner, exact commit and browser, observed result, elapsed time and intervention count. Use
[AE08](../agents/08-ae08-close-incidents-in-fresh-install.md) to close the original defect and its stale instructions
together. Keep every unexercised drill explicit.
