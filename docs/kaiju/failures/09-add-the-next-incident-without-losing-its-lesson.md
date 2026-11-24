# Add the next incident without losing its lesson

Under [P08](../procedures/08-p08-validate-and-maintain-a-procedure.md), add a stable entry with the exact symptom, first
failed operation, cause confidence, source/artifact/target identities, repair, evidence and earlier prevention. Mark
unknowns as unknown. Link a provider defect, upstream issue or current limitation when relevant. Keep the diagnostic
path usable without rerunning unrelated expensive stages.

Record closure only when the claimed behavior has been checked at the intended level. “Committed,” “CI passed,” “plan
accepted,” “workload healthy,” and “user completed the journey” should remain separate fields in the incident and
release records.
