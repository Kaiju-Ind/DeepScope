# Task prompts

Prompts for engineering tasks that DeepScope runs one at a time. Each prompt names the skills to load and the
playbook rules to follow, so a session started from it uses the same methods as the playbook. Copy one fenced prompt
into a new session and fill in the repository and branch. See [how to use them](00-overview.md).

Skills: `plan-changes`, `explore-ecosystems`, `build-devtools`, `benchmark-code`, `verify-behavior`, `test-code`,
`review-code`, `build-libraries`, `release-software`, `refactor-code`, `use-utils`.

T12 (cache container image layers) was dropped because DeepScope builds no images. T16 and T18 were rewritten for the
vendored `@utils/*` packages and the Vitest projects.

| Part                                                                                           | Skills                                                      | Use it                                                                                              |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Overview](00-overview.md)                                                                     |                                                             | How to run a prompt and how prompts are checked.                                                    |
| [T01 Map the source owners of a change](01-t01-map-source-owners.md)                           | `plan-changes`, `explore-ecosystems`                        | Before any CI, test or package change, or when a branch has changed paths nobody has accounted for. |
| [T02 Audit custom tooling against native capabilities](02-t02-audit-native-capabilities.md)    | `explore-ecosystems`, `build-devtools`                      | When a repository keeps its own scripts for task selection, caching, test discovery or builds.      |
| [T03 Record the CI baseline before changing it](03-t03-record-ci-baseline.md)                  | `benchmark-code`, `verify-behavior`                         | Before a change that claims to make CI faster or cheaper.                                           |
| [T04 Regenerate a lock and prove a frozen install](04-t04-frozen-install.md)                   | `build-devtools`, `explore-ecosystems`                      | When a lock file is stale, a dependency moves, or an install differs between machines.              |
| [T05 Prove affected-work selection against a full oracle](05-t05-prove-affected-selection.md)  | `test-code`, `build-devtools`                               | When CI selects jobs or tests from changed paths.                                                   |
| [T06 Register each task's inputs, outputs and environment](06-t06-register-task-inputs.md)     | `build-devtools`                                            | Before any task result is cached, or when task definitions are spread across tools.                 |
| [T07 Pilot one native task cache](07-t07-pilot-task-cache.md)                                  | `build-devtools`, `benchmark-code`                          | After the task register exists, to test one cache owner on one task.                                |
| [T08 Order CI caches and scope their saves](08-t08-order-ci-caches.md)                         | `build-devtools`, `review-code`                             | After one task cache is proven, before adding caches to more jobs.                                  |
| [T09 Select and shard tests with the native runner](09-t09-shard-tests.md)                     | `test-code`, `benchmark-code`                               | When one test job is slow, or tests are listed by hand in task files.                               |
| [T10 Replace real waits in tests with controlled clocks](10-t10-control-test-clocks.md)        | `test-code`                                                 | When tests sleep or wait on real timers without testing real timing.                                |
| [T11 Evaluate a compiler or build tool change](11-t11-evaluate-build-tool.md)                  | `build-libraries`, `release-software`, `explore-ecosystems` | Before moving to a new compiler, bundler or major tool version.                                     |
| [T13 Report CI impact per change class](13-t13-report-ci-impact.md)                            | `benchmark-code`, `verify-behavior`                         | After a CI change, to show what it does for each kind of edit.                                      |
| [T14 Decide on the final head with measured cost](14-t14-decide-final-head.md)                 | `verify-behavior`, `review-code`                            | At the end of a CI or tooling project, before asking for review.                                    |
| [T15 Classify tests by purpose and remove disposable checks](15-t15-classify-tests.md)         | `test-code`, `refactor-code`                                | When a suite mixes real tests with one-off verification scripts or source-text checks.              |
| [T16 Move a generic mechanism onto the vendored utilities](16-t16-adopt-kaiju-utils.md)        | `use-utils`, `refactor-code`                                | When DeepScope keeps its own copy of a mechanism a vendored `@utils/*` package provides.            |
| [T17 Replace cross-package source imports with package exports](17-t17-use-package-exports.md) | `build-libraries`, `refactor-code`                          | When one package reaches into another package's source with relative or aliased paths.              |
| [T18 Standardize tests on the Vitest projects](18-t18-standardize-tests.md)                    | `test-code`                                                 | When tests use mixed styles, sit outside the discovered trees or run in the wrong Vitest project.   |
