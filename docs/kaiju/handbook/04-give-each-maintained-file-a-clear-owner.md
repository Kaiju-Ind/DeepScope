# Give each maintained file a clear owner

This is a proposed starting layout, adapted from the audited repositories. Create only files that have a real consumer.
Existing upstream application layout remains authoritative; a framework migration is not part of self-hosting.

| File or directory                                    | Responsibility                                                                  | When to include it                                                                                     |
| ---------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `README.md`                                          | Purpose, first useful journey, setup entry point and public task families       | Every project                                                                                          |
| `AGENTS.md`                                          | Current ownership, scope and pointers to original guides                        | Every agent-maintained project                                                                         |
| `.agents/START.md` and selected original companions  | Capability routing, engineering and domain guidance                             | Keep the references that the selected rules actually require                                           |
| `mise.toml`                                          | One toolchain, pinned shared tooling, task composition and declared task inputs | Every project using Kaiju tooling                                                                      |
| `.mise/tasks/*.sh`                                   | Small argument-forwarding entry points                                          | Only recurring operations not already owned by the shared packs                                        |
| `deno.jsonc`, `deno.lock`                            | Deno operational tools and their exact dependencies                             | New Kaiju tooling; do not mirror independent Node owners                                               |
| `package.json` and native lock                       | Runtime-specific dependency owner                                               | Application/native tool requirements only; an overrides-only root manifest needs a demonstrated reason |
| `.npmrc`                                             | Explicit registry routing without embedded credentials                          | When private npm/JSR routing is required                                                               |
| `infra/Pulumi.yaml`, native manifest/lock/checker    | Native Pulumi program and provider generation                                   | Pulumi deployments                                                                                     |
| `infra/config.ts`                                    | Validated settings, secret references and immutable artifact selection          | One authoritative configuration contract                                                               |
| `infra/index.ts`                                     | Compose provider and resource functions                                         | Keep composition visible and small                                                                     |
| `infra/database.ts` or existing `data.ts`            | App data resources and protected persistence                                    | Database/cache required                                                                                |
| `infra/migration.ts` or existing setup owner         | Bootstrap and migration lifecycle                                               | Upstream requires schema setup or changes                                                              |
| `infra/network.ts`                                   | App-specific private connection                                                 | Hybrid placement or other verified network need                                                        |
| `infra/application.ts`                               | Workload roles, commands, env, probes and resource limits                       | Every deployed application                                                                             |
| `infra/edge.ts`                                      | App-specific public routing, TLS, cookies, cache and supported security policy  | Public exposure requires these resources                                                               |
| `infra/agents.ts`                                    | Dedicated runner/execution workloads                                            | The application needs them                                                                             |
| `infra/outputs.ts`                                   | Non-secret contract consumed by deployment tools                                | Operator code depends on deployment output                                                             |
| `infra/images.json` or existing image owner          | Upstream version/digest/platform cohort                                         | Consume upstream or prepared images                                                                    |
| `infra/Pulumi.<stack>.yaml`                          | Reviewed public settings and admitted encrypted secrets                         | Follow the backend's encryption contract; secret keys stay outside Git                                 |
| `tools/deployment/`                                  | Plan/evidence, maintenance, health and recovery behavior                        | Needed operator behavior beyond native commands                                                        |
| `tools/agents/`                                      | Finite model checks and supported agent configuration                           | AI setup is in scope                                                                                   |
| `agents/runner/`                                     | Installed-package image and artifact tests                                      | Package-based coding runner needed                                                                     |
| App-owned source and tests                           | Framework/product behavior                                                      | Owned-source strategy only                                                                             |
| `upstream/`                                          | Requested/integrated source identities and upgrade records                      | Source import without ordinary upstream merge ancestry                                                 |
| `.github/workflows/ci.yml`                           | Events and execution of public Mise families                                    | Hosted CI; Ubicloud is the current reviewed runner choice                                              |
| `.github/workflows/deploy.yml`                       | Target selection, serialized deployment and evidence transfer                   | Controlled deployment                                                                                  |
| `renovate.json`                                      | Dependency/image/source update rules by owner                                   | Automated update proposals                                                                             |
| `trivy.yaml`, `.gitleaks.toml` and exception records | Specific scanner scope and reviewed exceptions                                  | Only verified project requirements; never copy historical waivers                                      |
| `docs/setup.md`, `deployment.md`, `upgrades.md`      | Project-bound procedures and command mappings                                   | Keep exact commands with their repository                                                              |
| `docs/kaiju/`                                        | A versioned copy of this portable reference, if wanted                          | Codex/repository distribution                                                                          |
| Ignored `.temp/`                                     | Agent analysis, probes and temporary evidence                                   | Exclude from builds, packaging and permanent task discovery                                            |

Keep names short and grounded in the domain. `infra/network.ts` already supplies context. Avoid extra layers named
`manager`, `helpers`, `common` or `framework` unless they denote an actual concept. Comments explain ownership, units,
defaults, failure and lifecycle; they cannot repair a poor model.

## Keep one task interface

Use a small set of stable families with arguments. `prepare`, `check`, `test`, `build`, `deploy`, and an optional domain
family such as `agents` are the reviewed model. CI calls the same operations. It must not contain a second
implementation of setup or deployment.

Shell tasks should normally select and `exec` the real command. Put substantial recurring logic in `tools/` or the
existing capability owner. Use Mise's dependency graph for actual independent work and ordering. Declare relevant
inputs, outputs and environment effects. A cache hit is evidence of reuse, not proof that credentials or live
infrastructure remain ready.

The [project template](../project/README.md) requires a binding from each procedure to an existing command and its
help/source. It prevents proposed names such as `preview create` or `promote` from being mistaken for implemented CLI
features.

## Connect CI to the same operations

For owned-source or CI optimization work, use [Engineering changes: CI, tests and evidence](../engineering/README.md).
It defines the separate correctness gates for affected-work selection, cache reuse, test-runner behavior, package
exports and representative cost measurements. Use the target repository's pinned native tools, not Core-specific task
names or a shared wrapper assumed to exist. **Do not enumerate current test or benchmark files in package, Deno or Mise
task manifests.** Prefer native discovery and stable globs; validate newly added files and moved/removed files. Split
broad test files by coherent behavior where doing so enables correct affected selection and cheaper independent cache
units, without sacrificing setup, integration or lifecycle coverage.

GitHub Actions should select the event, candidate and target, then call the public Mise tasks. Use the repository's
verified Ubicloud runner labels and pinned shared actions. Do not copy a label or task-pack path from another revision
without checking its contract. Let source checks and independent artifact tests run concurrently; pass their exact
artifact identity to the deployment stage.

Give each job only the identity it needs. An untrusted pull request must not obtain production credentials by modifying
a task or workflow. Keep publication and deployment in the authorized execution context. Serialize changes to the same
environment, and do not cancel a running mutation merely because a newer commit arrives. Superseded read-only checks can
be cancelled when their evidence is no longer needed.

Agree source tag, readable image tag, immutable digest and publication destination before the first release. The
reviewed ItsAPlan convention uses `vMAJOR.MINOR.PATCH-REVISION`; use the target repository's current contract rather
than inventing a variant. Inspect outgoing ancestry and verify the published head/base afterward. When another session
changes the integration branch, admit and verify the combined revision before release. A requested parallel refactor is
valid work, but its new dependencies, permissions and validation cost must enter the release decision explicitly.

Reuse artifacts by their build inputs and digest. Cache dependency downloads separately from credential checks and live
readiness. An image-wrapper project may need no application build at all. A package launcher must test the installed
package and final image. Owned-source builds must retain the declared production platform matrix. Preserve failed-stage
logs and published artifacts so recovery can restart at the failed contract instead of rebuilding everything.
