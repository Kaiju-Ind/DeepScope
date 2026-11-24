# AE08 Close incidents in fresh-install instructions

A live remedy is incomplete when the next operator follows an old recipe and recreates the failure. Identify every
maintained consumer of the changed contract: configuration schema, runtime default, task, example, installation guide,
recovery path and acceptance check. Search for superseded values and names; use structural code inspection when
references require it. Distinguish a valid generic default from a host-specific requirement.

Update the owning contract and its consumers together. Prefer one authoritative default or cross-reference over repeated
executable recipes. Keep a one-off investigation in evidence unless it establishes a recurring capability that belongs
in maintained tooling.

Recheck the exact failed action within its authorization. Then walk through a fresh configuration without relying on the
repaired production override. Have an independent operator rehearse the affected procedure when practical, using
disposable resources and an explicit cleanup owner. Record document review, source tests and live rehearsal as different
proof levels. If rehearsal is pending, name the owner and remaining case; do not claim the procedure has been exercised.

Record the symptom, earliest cause, cause confidence, repair, prevention or detection control, recovery path and
residual limit. Attribute an agent's wrong assumption or test choice plainly. Distinguish it from an external
constraint, a later user clarification or an unknown cause. Feed the result into
[procedure maintenance](../procedures/08-p08-validate-and-maintain-a-procedure.md) and the
[failure catalogue](../failures/README.md).
