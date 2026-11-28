# R05 Deliver and resume from verified Rust evidence

Use this before review completion, packaging, interruption, or handoff. The
[evidence guide](../../../.agents/guides/rust/evidence.md) owns what a claim
requires. The current task record owns the full plan, decisions and open work.

## Reconcile the declared operation matrix

For each package/binary/host/feature row, record the relevant format, lint,
tests, build, actual execution, consumer, and artifact results. Distinguish
passed, failed, blocked, skipped with a reason, and not attempted. A required
unverified host prevents a complete support claim.

Check the real public entrypoint and connected consumer. Verify failure,
memory/lifetime limits, cancellation and cleanup where they belong to the
contract. A core test does not prove the worker, a compiled C ABI does not prove
C# marshalling, and a Node Wasm run does not prove browser worker behavior.

Inspect the actual package, library, component, or archive being handed over.
Verify required files, imports/exports, generated bindings, data/assets and
documented commands. Reproduce the meaningful acceptance checks from a clean
consumer or extracted artifact. Do not rely only on the working tree.

## Review source and explanation as one deliverable

Check public and important private rustdoc/comments against behavior. Explain
ownership, units, limits, defaults, errors, unsafe assumptions and lifecycle.
Keep examples runnable and their target requirements explicit. Preserve the
repository's formatting and coherent code ownership.

Read the artifact as its next operator: can they find the mandatory policy,
select the needed topic, reproduce the evidence, and identify the next action?
Short files and route checks reduce omissions; they do not guarantee that an
agent remembers or follows every rule. Keep mechanical requirements in
executable inventories, host gates and CI checks.

## Preserve enough state to continue without the chat

Retain, in the established task record and linked evidence:

1. Customer outcome, authorized mode, acceptance criteria and constraints.
2. Starting/full current revision, dirty state, guidance version and source lineage.
3. Selected skills and topic files actually read.
4. Complete artifact/host matrix and required operation for each row.
5. Known evidence, raw attempts, failures, limits and unresolved questions.
6. Full evolving plan, changed owners/files, consumers and pending dependencies.
7. Resource/unsafe assumptions and cleanup still to verify.
8. Exact stopping point, next safe command, expected observation and decision.
9. Recoverable source, patches/bundle/archive where required, and divergence.

Use [continuity](../../../.agents/skills/rust-software/references/continuity.md)
and the existing [handoff procedure](../agents/07-ae07-preserve-work-and-resume-from-current.md).
Do not replace the full plan with a summary that silently drops earlier work.

## Resume from current evidence

Reload the skill entrypoint, mandatory contract, current repository instructions,
and task record. Verify the actual revision/state before trusting a past check.
Reload the short topic files needed for the next decision. Reopen a conclusion
when toolchain, dependencies, host, feature set, inputs or product requirements
change. An old successful run is not evidence for an untested new combination.

Report an anchor first: what was observed, when and where, why it matters to the
product, what decision follows, and what remains unknown. Completion requires
the agreed evidence, not simply that implementation activity stopped.
