# Find the first cause before changing the system

1. Record the exact source SHA, selected target, artifact digests, workflow run and first failed step. Read the first
   provider or application error before interpreting later messages about missing operations or skipped checks.
2. Preserve the reviewed plan, configuration identity, phase journal, provider state and relevant redacted logs. A
   failed apply may already have changed resources. Do not delete state, move a published tag, remove `--plan`, or lower
   a deployment phase to make a retry pass.
3. Reuse the exact artifact for diagnosis. OpenATS has an existing `smoke-existing` path; another repository must prove
   its own diagnostic interface before using that name. A new image build is unnecessary when the failing bytes and
   execution environment are already available.
4. Check the intended identity and execution location. A laptop request does not prove a hosted runner or deployed
   container can make the same request. SSH access, package access, registry pulls, Kubernetes access and provider
   administration are separate capabilities.
5. Follow the repository's recovery contract. OpenATS can recover original bound evidence for supported retries.
   ItsAPlan records partial progress and requires inspection and a new reviewed plan when state has changed. Do not
   impose one retry algorithm on both.
6. Convert the cause into an earlier capability check or behavioral regression. Update the service contract and
   procedure with an owner and verification result. A new warning paragraph alone does not close a preventable recurring
   defect.

Use [P01: intake](../procedures/01-p01-open-the-project-and-report-prerequisites.md) for missing owner actions,
[P02: service checks](../procedures/02-p02-verify-required-service-contracts.md) for prerequisite checks,
[P03: usable preview](../procedures/03-p03-deliver-a-usable-preview.md) for first value,
[P05: recovery](../procedures/05-p05-recover-a-failed-deployment.md) for partial failure, and
[P07: upstream updates](../procedures/07-p07-update-upstream-artifacts-and-dependencies.md) and
[P08: procedure maintenance](../procedures/08-p08-validate-and-maintain-a-procedure.md) to improve the procedure. Exact
service checks belong in [Service readiness contracts](../services/README.md).
