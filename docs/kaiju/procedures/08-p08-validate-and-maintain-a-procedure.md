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
procedure **source reviewed**, **locally exercised**, **preview exercised**, or **production exercised** only with the
corresponding evidence. These are proposed Kaiju labels, not an external certification.

The [procedure research](writing/README.md) explains the primary sources behind this method. Repeated operator mistakes
should become a simpler workflow, stronger invariant or automated check where possible. Keep detailed prose for
decisions that still need judgment.

Select drills for the contract being introduced or changed. These are proposed rehearsal requirements, not authority to
run live operations and not a checklist to repeat for every small update.

| Contract under review                  | Rehearsal and expected evidence                                                                                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cold preparation                       | A fresh intended runner fetches the entire locked private cohort and genuine generated dependencies; missing access fails before build/tag.                                          |
| Image admission                        | Detect an absent digest, an existing but wrong tag/digest pair, a wrong platform and a missing required runtime capability. Preserve root/child-manifest and tested-byte identity.   |
| First creation and ordinary update     | Exercise native empty and metadata-only states, unknown provider outputs and exact saved-plan apply; run a second preview after custom-domain attachment.                            |
| Partial migration and restart          | Interrupt an isolated instance at a relevant phase; preserve passwords/data/volumes; stop only owned consumers; follow that repository's plan/retry contract.                        |
| Retained-data recovery                 | Restore into a separate destination and verify the selected application's reads. A disposable preview reset does not satisfy this contract.                                          |
| Fresh-install instructions after a fix | Search defaults, audits, examples and recovery paths for the old setting; settle generic versus host-specific behavior; repeat setup without relying on the old production override. |

Record the owner, exact source/environment, observed result, elapsed time and intervention count. Use
[AE08](../agents/08-ae08-close-incidents-in-fresh-install.md) to close the original defect and its stale
installation paths together. Keep every unexercised drill explicit.
