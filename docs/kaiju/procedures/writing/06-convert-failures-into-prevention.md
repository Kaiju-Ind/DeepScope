# Convert failures into prevention

Keep incident records factual and searchable. Record the symptom, affected environment/version, impact, trigger, cause
confidence, diagnosis, repair, and evidence. Distinguish a confirmed cause from a hypothesis. If several changes
preceded the next successful run, that success alone does not identify the cause.

Each prevention action needs an owner and a verifiable end state. [Google's postmortem guidance](https://sre.google/workbook/postmortem-culture/) emphasizes
evidence, tracked actions, and improvements to the system. It also describes structured incident metadata for finding
recurring failure patterns.

For Kaiju, prefer a fix that removes the repeated decision: validate the configuration, test the actual package cohort,
assert the cookie domain, or check a required provider operation. Document the decisions that still need judgment. Use
the [failure catalogue](../../failures/README.md) to connect a symptom to its proven diagnosis and prevention.

[HSE](https://www.hse.gov.uk/humanfactors/topics/procedures.htm) cautions against relying on procedures as the sole defence. The enforceable rule is that readiness
needs evidence and failed mandatory checks cannot be bypassed silently. External services can still fail; the procedure
must make that failure quick to identify and safe to handle.
