# Bind procedures to real commands

A plan must make the next action executable by another person. Use the shared
[planning guide](../../../.agents/guides/product/planning.md) and connect each action to the product question or
validated decision it serves. Verify exact existing paths, symbols, public APIs, command flags and installed versions.
Label proposed new files and unresolved commands explicitly. Include prerequisites, environment, ordered inputs and
outputs, failure behavior, cleanup, owner and observable exit. Add pseudocode for state transitions or branching where
prose would leave ambiguity. Bind the first isolated experiment before designing a larger implementation.

Before running an operation, verify its current `--help`, task source and caller. Record the repository and version. Use
existing families with arguments; do not create one permanent task per checkbox.

| Procedure operation                 | Existing command or API          | Owning file and revision | Inputs and result                               | Side effect and recovery                                    |
| ----------------------------------- | -------------------------------- | ------------------------ | ----------------------------------------------- | ----------------------------------------------------------- |
| Smallest product experiment | Verified native command or public API | Exact source/version | Question, baseline, controlled change and observation | Allowed side effects, stop condition and cleanup |
| Prepare dependencies/native tooling | Fill from source                 | Required                 | Native lock/runtime/result                      | Downloads/generation; no invented lock                      |
| Source/type/security checks         | Fill from source                 | Required                 | Affected scope and required gates               | Read-only except normal build outputs                       |
| Behavioral/artifact tests           | Fill from source                 | Required                 | Real runtime and artifact matrix                | Disposable fixture scope and cleanup                        |
| Required-input/service audit        | Fill from source or mark missing | Required                 | Sanitized capability results                    | Explicit live probe scope                                   |
| Infrastructure plan                 | Fill from source                 | Required                 | Stack/config/artifact identity and saved plan   | May read/refresh provider state according to tool semantics |
| Preview environment creation/update | Fill from source or mark missing | Required                 | Isolated resources and usable URL               | Deployment authorization and P05 recovery                   |
| Production apply                    | Fill from source                 | Required                 | Approved candidate and target-specific plan     | Serialized state/migrations                                 |
| Verify first-value journey          | Fill actual UI/API steps         | Required                 | Actions, expected result and evidence           | Approved test users/objects/recipients                      |
| Diagnose existing artifact          | Fill from source or mark missing | Required                 | Existing digest, platform and diagnostic result | Avoid rebuild/promotion side effects                        |
| Retire preview                      | Fill from source or mark missing | Required                 | Owned resource inventory                        | P06 protects borrowed/retained resources                    |

If a command is missing, mark the automation gap. A documented manual procedure can cover the operation until a
maintained implementation exists. Do not imply `deploy preview` creates an application environment unless source and
runtime evidence prove it.
