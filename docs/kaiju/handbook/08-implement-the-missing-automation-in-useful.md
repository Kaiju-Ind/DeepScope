# Implement the missing automation in useful increments

DeepScope already has the building blocks: Mise tasks, the Verify and Release workflows, real-browser drivers for
Firefox and Safari, and release archives with checksums and attestations. The gaps, in a useful order:

| Increment                         | Behavior                                                                                         | Acceptance evidence                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| 1. Reproducible builds everywhere | Two builds of a commit match for every browser; a test guards it                                | `SHA256SUMS` identical across two cold builds                                       |
| 2. Chrome real-browser driver     | The shared scenarios run in Chrome as they do in Firefox and Safari                              | `mise run verify chrome` passes the scenario matrix                                 |
| 3. Real-browser checks in CI      | Firefox scenarios run on pull requests; Safari on a label, as the Xcode build does               | A failing scenario fails the workflow                                               |
| 4. Store automation               | Chrome upload, AMO signing and Safari signing run from protected environments                    | A dry run and one real release, each recorded                                       |
| 5. Monorepo split                 | `apps/extension`, `packages/*` as `@deepscope/*`, `tools/`                                       | Each package builds and tests alone; no app imports from packages                   |

These are planned increments, not finished automation. If one needs an owner action (store credentials, an Apple
team), report it through P01 before building its consumer.
