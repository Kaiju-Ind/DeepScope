# AE01 Maintain the active task record

Record the user's goal and customer problem before implementation choices. Apply
[A01](../product/01-a01-start-from-the-product-question.md): identify the decision, extract the relevant unknowns,
consider alternatives and choose the first useful experiment. Use questions already supplied by the user. Ask only
about material unresolved intent or constraints; independent authorized inspection and experiments can continue.

Distinguish the requested outcome from optional improvements. Treat a status question or clarification as steering the
active task unless the user cancels it or replaces it with an incompatible objective. Record new scope explicitly and
retain earlier completion criteria and authorization that still apply.

Use the following fields in the project's existing work record. Replace placeholders and omit inapplicable detail with
a reason. This is a handoff format, not a required new file, tracking system or substitute for the full plan. The shared
[templates](../../../.agents/guides/product/templates/brief.md) offer other views of the same information.

```markdown
## Active task

- Intent and completion: [customer; problem; decision; exact acceptance journey]
- Required now / deferred: [scope; maintenance and ownership decisions]
- Questions and options: [known evidence; decision-relevant unknowns; alternatives; answerable now / prerequisite / longer observation]
- First or next experiment: [smallest real mechanism; verified invocation; baseline; conditions; expected observation; decision; cleanup]
- Research and experiment time: [active minutes; useful test started; actual blocker if any]
- Current anchor: [time; exact observation; receipt; scope; implication; remaining unknown]
- Authority and profile: [current repository rules; original guides; generic or applicable Kaiju contracts]
- Source: [repository; branch; base and current full SHAs; remote check time]
- Workspace: [dirty/staged/untracked work; other writers and owned paths]
- Authorization: [operation; destination; principal; instruction reference]
- Concrete plan: [ordered verified owners/paths/APIs/commands; inputs; outputs; failure and cleanup; milestone exits]
- Acceptance: [actor; action; runtime; recipient if any; expected visible result]
- Evidence: [observations and limits; passed/failed/blocked/not checked/not required for acceptance checks; receipts]
- Separate issues: [traced architectural defect; impact; owner; evidence; blocking dependency or independent work]
- Owner actions: [exact missing capability; owner; impact; or none known]
- Parallel work: [question; exclusive write scope; status; integration owner]
- Recovery: [durable source/checkpoint; full plan and research; pending processes]
- Continuation: [read first; verify current state; next action; stop condition]
```

For each receipt, name the source/artifact, configuration, environment, time, command or operation, raw result and
interpretation limit. Preserve useful metadata and failure evidence. Reference secrets by role or location; never copy
their values. When source, environment or requirements change, mark only affected proof stale and explain why.

One concise result can be enough for a small task. Keep discovery questions open where evidence is inconclusive; do not
force them into a success/failure label merely to fill the record. Acceptance checks still use their actual pass or
failure conditions. The next agent must be able to distinguish an answered question from a delivered product change.
