# P03 Deliver a usable preview

**Trigger:** a new project or a change that needs human feedback. **Outcome:** the reviewer can reach an isolated
application and complete the agreed journey.

**Entry:** P01 contract, relevant P02 checks, a bound deployment command, preview identity and authorization. Automatic
per-PR environments are a proposed capability. A manually operated isolated preview can satisfy this procedure when its
identity and lifecycle are explicit.

| Step | Action                                                          | Expected result                                                                            | If it fails                                                                    |
| ---- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| 1    | Select the exact candidate source and dependency locks.         | The change is recoverable and its input identity is recorded.                              | Reconcile concurrent work before creating candidate evidence.                  |
| 2    | Resolve or build the candidate artifact.                        | Upstream images are pinned; owned images/packages are built from verified inputs.          | Diagnose access, generator or build failure at its owning stage.               |
| 3    | Run affected checks and required artifact tests.                | Types, behavior, startup and required platform contracts pass.                             | Reuse the existing artifact for diagnosis where possible.                      |
| 4    | Allocate preview-specific data, credentials and origin.         | No preview path uses production data or external side effects by default.                  | Stop before deploying shared or ambiguous state.                               |
| 5    | Review and apply the preview environment's infrastructure plan. | Planned resources match the preview identity and ownership contract.                       | Inspect native state and the recorded failure phase before retrying.           |
| 6    | Finish runtime-dependent service checks.                        | The app can reach its data, objects, mail and required models from its actual environment. | Follow P02 and the matching failure class.                                     |
| 7    | Complete onboarding and the first-value journey.                | The intended user action succeeds through the real application.                            | Keep the environment reachable for diagnosis, but mark the journey incomplete. |
| 8    | Give the reviewer the preview receipt.                          | URL, access, identity, checked journey, limits, owner and expiry are explicit.             | Do not hand off a guessed URL or an unusable login flow.                       |

Build one candidate artifact per effective build configuration. Keep application artifact identity separate from
environment settings and the infrastructure plan. If a web build embeds a public URL, use a supported runtime/relative
URL arrangement or rebuild and retest the changed candidate. Do not claim that different bytes were promoted unchanged.

Validate the installed package and final image when a package-based application is wrapped. A successful TypeScript
check does not prove its command, native executable, signal handling or writable paths. For an image wrapper, test the
actual upstream image and adaptation without inventing an unnecessary source build.

Use complete journeys. A storage journey includes upload, authorized download and the intended privacy check. An agent
journey includes task acceptance, progress, result and cancellation where required. An email journey distinguishes
connection, authenticated submission, provider acceptance and intended recipient receipt. Use an approved test
recipient. A provider dashboard key alone is not mail evidence.

Bind the test to the reported action, originating process, exact environment, intended identity/recipient and permitted
side effect. A generic diagnostic to a group address cannot establish that an authenticated member invitation works.
Trace persistence, callbacks and external effects through the installed library, and preserve partial results for safe
retry. Apply the [conditional connected-system checks](../services/08-user-access-and-connected-capabilities.md) only
when the journey needs them.

**Exit evidence:** preview receipt and bounded journey evidence. **Recovery:** P05. **Lifecycle:** P06 owns expiration,
data retention and teardown. Optional features remain explicitly unavailable until their own journey passes.

## Existing ItsAPlan commands are a worked binding

The following commands are verified at the
[reviewed source](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/docs/deployment.md).
Replace the example stack and path with the intended target. These commands do not create a generic PR preview system.

```bash
mise install
mise run prepare
mise run check
mise run test
mise run deploy -- preview --stack organization/itsaplan/kaiju --plan .temp/kaiju-review/plan.json
```

`preview` produces a saved plan. It requires the repository's clean committed state and an unused plan path. After
reviewing that plan, an authorized operator can invoke the actual apply command:

```bash
mise run deploy -- apply --stack organization/itsaplan/kaiju --plan .temp/kaiju-review/plan.json --timeout 5400
```

The timeout is an existing upper bound, not a deployment-duration target. The app still needs onboarding and user-flow
checks. ItsAPlan's `deploy check` verifies its documented health and rollout conditions; it does not prove mail, object
privacy, model semantics or restored data.
