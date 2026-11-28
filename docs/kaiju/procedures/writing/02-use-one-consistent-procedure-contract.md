# Use one consistent procedure contract

Use the applicable fields below in the project's existing task or procedure record. The contract combines the cited
sources with lessons from Kaiju delivery work. It applies to other products through their verified commands and
customer outcomes. These fields describe documentation; they do not introduce a new CLI or configuration format.

Apply [A01](../../product/01-a01-start-from-the-product-question.md) before designing a large procedure. Establish the
product question and run the smallest useful experiment, then bind the supported next action. The
[planning guide](../../../../.agents/guides/product/planning.md) supplies the concrete plan contract.

| Field               | What to record                                                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Purpose and trigger | The outcome and when this procedure applies.                                                                          |
| Scope and owner     | Project, environment, tenant where relevant, exact source/artifact identity, and one accountable owner.               |
| Prerequisites       | Required permissions, credentials by reference, published artifacts, configuration, capacity, and reachable services. |
| Entry evidence      | How each prerequisite was checked, using the identity and runtime that will consume it.                               |
| Ordered actions     | The repository's real command or API, with its verified arguments and version.                                        |
| Expected result     | The state or behavior that demonstrates each step succeeded.                                                          |
| Failure branch      | What to inspect, when to stop, what remains safe, and how to recover or escalate.                                     |
| Retry behavior      | Which actions are repeatable and how to detect partial completion before retrying.                                    |
| Exit evidence       | Relevant run URL, resource identity, artifact digest, test result, or completed user journey.                         |
| Lifecycle           | Cleanup, expiration, retention, rollback/data recovery, and ownership after handoff.                                  |
| Maintenance         | Procedure version, source versions, last exercised date, reviewer, and limitations.                                   |

Write a warning or prerequisite next to the step it affects. Keep names consistent with the actual repository, CLI, and
provider interface. [HSE's operating-procedure guidance](https://www.hse.gov.uk/comah/sragtech/techmeasoperatio.htm) supports these choices and calls for a
walkthrough before issuing a procedure.

Use a short step table where the result changes the next action:

| Action                                 | Expected result                                         | Failure branch                                                |
| -------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------- |
| Confirm target and candidate identity. | Environment and artifact match the release record.      | Resolve the mismatch before changing resources.               |
| Check a required capability.           | The consuming identity performs the required operation. | Classify access, configuration, network, or provider failure. |
| Apply the authorized change.           | Actual state matches the requested state.               | Inspect partial state before retrying.                        |
| Exercise the agreed journey.           | The intended user completes the outcome.                | Keep the deployment incomplete and record the failed stage.   |

A timeout does not prove that an external operation did nothing. Recovery must start by inspecting actual state.
