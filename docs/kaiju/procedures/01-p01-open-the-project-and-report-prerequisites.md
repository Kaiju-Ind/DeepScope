# P01 Open the project and report prerequisites

Apply [A01](../product/01-a01-start-from-the-product-question.md) and the
[generic profile](../profiles/generic.md) unless current instructions select Kaiju contracts. Extract the unknowns from
the request and source. Start a direct test as soon as it can guide a decision; the full service inventory must not delay
an independent small experiment. Use the existing task record for the product brief, anchor and concrete plan.

**Trigger:** a new product task, project, environment, changed architecture or unfamiliar dependency.
**Outcome:** a clear customer outcome and decision, prioritized questions, a first useful experiment, and known owner actions.

**Entry:** repository access, requested outcome and current user authorization. Read the
[project template](../project/README.md), current repository instructions and applicable original skills. Do not start
by cloning another app's entire infrastructure folder.

Identify whether the task is a new installation or a change to an existing instance. Inspect actual target state before
choosing a first-create, upgrade or recovery path.

| Step | Action                                                                        | Expected result                                                                             | If it fails                                                                                                      |
| ---- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1    | Record the actual remote branch, full SHA, local changes and concurrent work. | A verified starting point and preserved local state.                                        | Resolve ancestry or access. Preserve divergent work before editing.                                              |
| 2    | Define one first-value journey with its intended reviewer.                    | Observable actions and results, including every required integration.                       | Use available requirements to draft the journey; ask only for a decision that changes scope.                     |
| 3    | Classify each component's artifact strategy and placement.                    | Artifact ownership and actual runtime/placement are independent; deployment is optional.                   | Inspect upstream entry points, license/edition and execution contract. Do not infer support from a package name. |
| 4    | Map every process, user flow and service consumer.                            | API, web, worker, migration, runner and one-off tools have explicit dependencies.           | Trace configuration and calls before adding more infrastructure.                                                 |
| 5    | Inventory existing platform outputs, task families and shared packages.       | Known reuse, versioned contracts and a short list of actual gaps.                           | Report missing publication, native generator or platform capability immediately.                                 |
| 6    | Check required access with the intended identity.                             | Registry, shared tooling, deployment network and service access have distinct results.      | Classify missing credential, scope, entitlement, expiry, network or unavailable runtime.                         |
| 7    | Send the owner-action report.                                                 | Each blocked item states who acts, where, what to change, and how success will be verified. | Do not postpone known blockers while waiting for unrelated research.                                             |
| 8    | Continue independent work and update the report.                              | Implementation proceeds on available contracts; new blockers appear promptly.               | Never treat an unperformed owner action as completed.                                                            |

The first report has a proposed target of 15 minutes after repository access. It may contain open checks. It is not a
promise that every unfamiliar provider can be understood in that time.

Before creating a maintained artifact, record the requirement's source and the existing platform capability that cannot
satisfy it. Distinguish an upstream requirement from a copied default or a separate platform security decision. Record
the selected configuration authority, publication branch, release naming and any newly introduced dependency/access
cost. See [AE03](../agents/03-ae03-prove-requirements-before-expanding.md).

Use bounded parallel work where it helps:

- One agent traces upstream source, artifact and application behavior.
- One agent verifies platform and service prerequisites.
- One agent reviews tests, release mechanics and previous failures.
- The lead resolves contradictions and owns the final file and deployment plan.

Give each implementation agent an exclusive file scope. Assign one owner for manifests, locks and shared contracts.
Parallelize reads and independent tests. Serialize Git reconciliation, shared state, migrations and provider mutations.

## What to tell the decision owner before long work

Use the owner-action table in the project template. A useful request names a concrete missing result. This example
applies when the Kaiju package profile is selected:

> The new repository's CI identity cannot download the locked Kaiju package cohort. Add repository Actions read access
> to the listed packages, or provide the already authorized read-only package credential through the approved secret
> route. The verification is a fresh dependency preparation using that CI identity. Application modeling and tests that
> use available dependencies can continue.

For publication, name the package, exact intended version, registry, missing export and consumer test. For a native CI
job, name the generator/runtime restriction, exact source, expected artifact and how it will be verified. For a
provider, name the account, environment, required permission or entitlement and the bounded test. Never request secret
values in a public report.

**Exit evidence:** customer outcome, questions and options, first experiment or exact blocker, current anchor if one
exists, source pins, applicable service and command bindings, and owner actions. Unknowns remain visible. **Recovery:** continue from the verified source and report; refresh any identity or prerequisite that
changed.
