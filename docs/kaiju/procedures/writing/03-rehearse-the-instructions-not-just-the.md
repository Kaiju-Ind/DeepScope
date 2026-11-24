# Rehearse the instructions, not just the application

[EPA][epa] recommends having someone other than the author test a draft. [HSE][hse-procedures] recommends task analysis
with the people who perform the work and adapting the detail to the task. Apply those principles through a bounded
rehearsal:

1. Start from a fresh checkout or clean environment with the documented inputs.
2. Ask another qualified operator or agent to follow the procedure. Record every intervention the author must supply.
3. Exercise the normal path and one relevant failure path in an isolated environment.
4. Verify the stated outcome independently of the command that performed the action.
5. Update missing steps, ambiguous results, and unsafe retry behavior.
6. Record what was actually exercised, with the procedure revision and source/artifact identity.

An independent agent can find gaps in a document. It cannot establish that a deployment works without the corresponding
runtime evidence. Label evidence precisely: **source reviewed**, **locally exercised**, **preview exercised**, or
**production exercised**. These are proposed Kaiju labels, not certifications.

For example, a mocked object-storage test can validate error handling. A real round trip from the application runtime
can establish that the selected credentials, endpoint, bucket, and required operations work together. Preserve both
results without treating one as a substitute for the other.

Review a procedure after an incident or a change to its provider, runtime, credentials, deployment mechanism, or
application contract. Archive old versions so historical evidence remains interpretable. Avoid a calendar-only review
that misses a breaking change between reviews.
