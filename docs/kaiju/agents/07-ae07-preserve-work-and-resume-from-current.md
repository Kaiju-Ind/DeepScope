# AE07 Preserve work and resume from current sources

For CI/tooling changes, carry the affected-work oracle, cache-admission conditions, representative scenario results and
actual test/build execution status in the handoff. See [engineering CI](../engineering/README.md). A green workflow with
skipped application lanes is not equivalent to a verified full suite.

Checkpoint meaningful work before a handoff, context boundary, risky integration or prolonged unattended operation.
Follow current Code History recovery and Git-writing rules: preserve the full evolving plan, research, every task's
status, validation, exact stopping point and self-contained continuation. Save required source recovery artifacts,
including dirty, staged and untracked work. Preserve meaningful unpushed commits independently with the required
patches; use a bundle when exact ancestry or merges must survive. Verify recovery artifacts can be read back. A local
temporary directory alone is not durable recovery.

For a cold resume:

1. Read current repository instructions, original guides and the latest active-task record. Confirm the original intent,
   later steering and existing authorization. Report a missing mandatory source precisely.
2. Check actual remote refs, full SHAs, worktree state and other writers. Establish ancestry against the recorded
   starting point. Do not treat the newest archive or newest timestamp as canonical source.
3. Inspect ongoing jobs and actual target state before starting another writer. A lost terminal or cancelled CI run does
   not prove that a provider operation stopped.
4. Compare source, artifacts, configuration, credentials, runtime and deployment state with the evidence receipts.
   Retain unchanged proof; repeat checks invalidated by changed inputs. Verify the combined revision after integrating
   concurrent work.
5. State the current milestone, next bounded action and stop condition. Resume that action, then refresh the record.

Commit and push according to existing authorization; verify the remote full SHA separately from CI. The ItsAPlan
inventory records lost uncommitted refactor work and subsequent reconstruction, while leaving the outage's cause
unknown. The corrective lesson is recoverable source and evidence, not an unsupported claim about why the environment
failed. See A10 in the inventory.
