# P02 Verify required service contracts

**Trigger:** first setup, new environment, credential rotation, changed dependency/topology or expired evidence.
**Outcome:** every service required for the agreed journey has current capability evidence.

**Entry:** P01 contract, [service cards](../services/README.md), intended identities and an approved test scope. Check
names and metadata first. Use disposable objects, accounts or isolated probe workloads only when the task authorizes
them. Do not send external email or run paid inference without the necessary authorization and bounded inputs.

| Step | Action                                                        | Expected result                                                                     | If it fails                                                  |
| ---- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1    | Identify the actual consuming process and environment.        | Each check names its principal, network location and service scope.                 | A laptop-only result remains local evidence.                 |
| 2    | Validate the required configuration without printing secrets. | Endpoint, region, resource IDs, sender, protocol and required key references agree. | Repair the authoritative settings and every consumer.        |
| 3    | Exercise the smallest operation that proves the contract.     | The exact required access or behavior succeeds.                                     | Retain the first bounded error and provider request ID.      |
| 4    | Exercise a relevant refusal or recovery case in isolation.    | Wrong scope, missing object or interrupted request fails as designed.               | Fix unsafe defaults or incomplete error handling before use. |
| 5    | Confirm cleanup and record evidence.                          | Test resources are removed or have explicit retention and ownership.                | Mark cleanup incomplete with the remaining resource IDs.     |
| 6    | Reconcile all required services.                              | Every required row is passed; optional omitted capabilities are declared.           | Keep preview readiness blocked for required failures.        |

A readiness record contains service/contract version, environment, runtime, principal reference, source/client version,
checked operation, observation time, evidence and invalidation rules. Record credential identity or secret-version
references, never credentials or hashes of low-entropy secret values.

Credential discovery has four separate results: the credential exists, this operator can retrieve it, the intended job
can use it, and the destination accepts its scope. Inspect only the agreed repository, environment or service-specific
sources before requesting new credentials. An inaccessible value is not an absent value. A missing local file is not
proof that the backend is unconfigured. [AE02](../agents/01-ae01-maintain-the-active-task-record.md) provides the
bounded discovery and handoff rule.

Use the actual task's documented value-input interface. Do not assume Mise forwards piped stdin or that human-readable
task output is a raw secret channel. When the supported interface is a value file, use a private temporary file, safe
read-back and cleanup. Verify required local services are ready before starting their dependent tests; distinguish an
unavailable test environment from a failing application.

Reuse a record only when its scope still applies. A routine deployment may need cheap identity, reachability and health
checks. New clients, credentials, ports, regions, topology, schema or provider behavior require the relevant capability
test again. Do not cache a live access check indefinitely because a dependency download cache is warm.

For a first launch, some checks require a temporary workload or the new application itself. Mark these as pending
runtime checks at intake, then run them before declaring a usable preview. The procedure must expose that dependency
rather than falsely completing all readiness on the operator's machine.

**Exit evidence:** service records and a short required/optional capability summary. **Recovery:** follow the service
card, preserve partial state, and update the owner-action report. A service outage changes the status; it does not
invalidate the need for evidence.
