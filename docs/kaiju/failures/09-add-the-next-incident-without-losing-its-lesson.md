# Add the next incident without losing its lesson

Under [P08](../procedures/extensions/08-p08-validate-and-maintain-a-procedure.md), add an entry with the next `DS-*` number to the
file for its class (content scripts and catalog, builds, background runtime, verification and CI; add a file for a new
class). Give the exact symptom, first failed operation, cause and its confidence, commit, browser and context, repair,
evidence and earlier prevention, and add a row to the [symptom table](02-start-from-the-symptom.md). Mark unknowns as
unknown. Link the browser bug, upstream issue or plan section when relevant.

Record closure only when the claimed behavior has been checked at the intended level. "Committed", "tests passed",
"Verify passed", "loaded in the browser" and "user completed the journey" stay separate fields in the incident and
release records.
