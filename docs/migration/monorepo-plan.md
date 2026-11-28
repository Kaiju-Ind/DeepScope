# DeepScope continuation and action list

## Active task: finish the review on existing PR #7

The user authorized the complete repository review, guidance adoption and
refactors, with changes saved to `integrate/cross-browser-runtime` in
[PR #7](https://github.com/Kaiju-Ind/DeepScope/pull/7). The published starting
point for this action list is `dfd1e73e3e45cb89575317fcdbafa9685f3e8d5c`, tree
`eebff4c62f40358acbb2cf74a58054947945a593`. `main` remains
`b3f4467ac13542dfba447499a92089a77a05c2bc`. The separate `fix/stress-green`
branch at `a5d97fba98566b7fd7e38dad8658c3be4b4b69e1` is unmerged; this record
does not declare either line canonical or authorize a merge, tag or store release.

The maintainer's goal is to trace a browser action through collection, matching,
persistence and the panel, with one explicit owner for each state and lifetime.
The [source map](../architecture/source-layout.md) describes the current code.
The [layout action list](source-layout-plan.md) records completed cuts and the
owners still requiring semantic review.

The supplied handbook is distribution 1.5.0 at
`7b299bb14a97fe33b6254c8206cdf491b3d7528d`. All 663 original installation paths
remain present: 650 are byte-identical and 13 retain project adaptations. The
extra extension guidance remains alongside them. These comparisons prove
installation provenance; they do not prove every implementation follows every
rule. Use the original skills and guides, the public-source-build
[Utils decision](../adr/01-public-source-builds.md), and the repository's own
contracts together. Read-only package access does not by itself decide a
published-package migration. The [.agents project record](../../.agents/project.md)
routes the current release owners and review coverage without replacing those
original sources.

## Published work and its evidence

Fifteen coherent commits follow the original PR head `1f439b9c`. The recovered
workspace migration and each focused repair were saved as native binary patches
and exact bundles. The connected writer produced separate commit identities
with matching trees; its exact objects and patches were also preserved and read
back before each guarded, non-force update of PR #7. The published source is
remotely recoverable. The [historical record](history/monorepo.md) preserves the
earlier plan, original native identities, failed probes and recovered batch5 work.

| Owner or behavior | Implemented result |
| --- | --- |
| Workspace | `apps/extension`, portable DOM/registry/detection packages, vendored Utils and native tool packages have explicit owners and consumers. |
| Catalog | 8,173 TypeScript catalog paths were relocated with mapped imports and AST/data parity. This was not a JSON conversion or a semantic revalidation of every third-party fingerprint. |
| Messaging and schemas | Rejected comctx sends release their own listener while preserving concurrent calls and error identity; category lookup requires an own category entry. |
| Stress scenario | The former 962-line module has eight owners. Forty-eight moved functions and 1,024 selected replay actions were compared; denied initial-window attempts and post-action confirmation have separate repairs. |
| DOM fixtures | Every owned JSDOM closes through `finally`, including property iterations and registry chunks. This repairs lifetime ownership without claiming the cause of earlier host kills. |
| Chrome verification | Process/profile/HTTP, CDP requests and page reporting have separate owners. Startup errors retain stderr and process status; cancellation and cleanup have real-process regressions. |
| Hosted browser setup | The clean extraction directory is explicit. Chromium uses an executable-specific AppArmor user-namespace profile after protected-path checks, with its own sandbox and the host's global restriction retained. |
| Build imports and local fixtures | Explicit local imports replace automatic local export discovery while WXT presets remain. Pre-install tabs use the existing local fixture; real-site scenarios remain separate. |

[Hosted run 46136715183](https://github.com/Kaiju-Ind/DeepScope/actions/runs/46136715183)
checked out merge `14d38a83fd88c9572081ba87077dad7b498ef38e`, whose tree exactly
matches the published `dfd1e73e` tree above. Nine executed jobs passed: dependency
setup, workflow lint, types, tests, all three browser builds, Firefox add-on lint
and Chrome artifact smoke. Tests passed in 250 files with 1,786 cases and four
skips. Optional Safari Xcode generation was skipped.

Those nine jobs totalled 441 seconds of execution time. The interval from the
first job's start to the last job's completion was 166 seconds (10:46:06 to
10:48:52 UTC). These are actual job timestamps, not queue-inclusive wall time,
billing-rounded minutes or a measured improvement over another source state.

Chromium 158.0.8127.0 loaded the scoped profile, started DevTools and passed all
25 artifact, availability and generated-page assertions. The side panel and
options page had their expected root elements and no reported exceptions. This
establishes packaged-page startup; the full navigation, observation, private-tab,
cleanup and stress journeys remain separate acceptance work.

Earlier local compiler/test/build exits with SIGKILL remain recorded failures
with an unconfirmed host cause. Earlier hosted runs failed on the missing
extraction parent, missing DevTools startup, a reported unusable sandbox, and
the helper/version-drift attempt. The last helper guard did not print a stat,
so it did not establish a specific observed helper mode. Image source, explicit
ShellCheck probes and the successful scoped profile informed the final repair.
Those failures are preserved, not replaced by the later pass.

A separate fresh Firefox-source rebuild used source ZIP SHA-256
`ff1b13a48f899b323d98e02b1a18feb0b59df3e0fdbb9b3d9a6303c272380531`, the pinned
Node/pnpm tools, an empty package user configuration and a frozen offline install.
All 56 emitted files and the resulting ZIP matched the retained candidate;
the ZIP SHA-256 was `2f122a8c23327d9416165546b362a374a5cf76ef89df6cdd5e0030fb6b072800`.
That record used build identity `0.1.0+local`. It does not establish identical
bytes for every later commit or a network-isolated build. Five selected local
Firefox scenarios also passed with Firefox 161.0 and geckodriver 0.37.1. Full
stress and Safari runtime acceptance remain open.

## Release preparation action list

The next reproduced defects affect a maintainer preparing a release. Native
disposable fixtures showed that `collect --out .` deleted source before failing,
and `--out .output` deleted its archive inputs. Notes for `0.1.0+build.1` were
missing, while a request for `0.1.0` incorrectly selected that suffixed section.
A failed inert Firefox submission retained exit 17 but leaked its extraction.
The actual checkout was never a destructive probe destination.

The selected contract protects the resolved source/input owners, accepts an
absent or empty destination or an intact checksum-described collection, and
stages every archive before replacing the previous candidate. A path denylist
alone would not prove ownership of external files; refusing every existing
directory would prevent a normal rerun. The documented external temporary-path
use and `.output/release` default remain supported. Parent aliases are resolved
before checking containment. Failed restoration retains both named candidates.
One command owns a destination at a time; two directory renames are not a
crash-atomic transaction.

1. Keep the existing CLI and Mise tasks; give collection ownership to
   `tools/release/collection.mjs`. Preserve public archive names and exact
   browser/source selection. Check unknown files, changed checksums, links,
   source/input aliases and partial copy/publication failure before replacement.
2. Match complete literal changelog versions with the pinned runtime's native
   `RegExp.escape`, including prerelease and build suffix boundaries. Preserve
   missing/empty-section status 3 for generated notes.
3. Retain the shell's Firefox extraction owner until unzip or submission
   settles, then remove it while preserving success/failure status. Exercise
   the actual task with inert adapters; do not submit to a store.
4. Discover the `release` Vitest project through the existing root configuration.
   Check strict types and JavaScript in the native release package. The first
   36 behavioral cases and the later 84 release/guidance/verify cases pass; the
   strict package check passes after correcting its initially exposed
   missing-argument types. The frozen release source, all release fixtures and
   actual callers have an independent review with no blocking finding. Preserve
   that scoped result separately from the unfinished whole-repository review.
5. Collect the real built browser archives into a fresh owned candidate and
   validate checksums and unchanged inputs. Run the full discovered test suite,
   guidance and workflow/shell lint. Preserve every passed, failed and skipped
   result with its source tree. No external release target is changed.
6. Review the complete frozen diff independently, save native and writer
   recoveries with full read-back, then update the existing PR with an exact
   expected-parent guard. Verify the new remote head and hosted merge tree.

The local 512 MiB aggregate passed 252 of 253 files and 1,805 cases, with four
skips; the remaining 17 DOM matcher cases hit the explicit V8 heap limit.
Isolated runs reproduce that limit on both clean `dfd1e73e` and the release
candidate. The extension, portable packages, Utils, lockfile and root test/runtime
configuration have identical Git objects in those two sources. A candidate run
with a process-only 1,536 MiB budget was separately killed after one case passed.
That SIGKILL has no established cause. The project limits and assertions remain
unchanged, and the local aggregate remains failed. The published baseline's
hosted DOM owner passed all 17 cases in 10,766 ms; the exact new head still needs
its own hosted suite. The workflow lint check passes on the frozen release source.

Final scoped checks also passed: the release package's strict JavaScript/types
and syntax checks, ShellCheck 0.11.0 on all three changed release tasks, and all
15 guidance cases. The native Firefox zip task built the extension and emitted
a source archive with 9,104 entries. The collector then copied the actual four
browser/source archives; native checksum verification, ZIP CRC/path checks and
manifest versions passed, and all input bytes remained unchanged. The Firefox
extension ZIP still has SHA-256
`2f122a8c23327d9416165546b362a374a5cf76ef89df6cdd5e0030fb6b072800`.
These results validate preparation and packaged bytes; no release or store
submission occurred. The scoped source reviews found no blocking issue, while
the full audit and exact new-head hosted acceptance remain open.

## Remaining semantic review and continuation

The published-baseline ledger inventoried all 9,930 paths and reconciled 61
explicit full reads. The current release reconciliation covers 9,940 paths and
89 explicit full reads, including the project routing record, release owners,
fixtures and retained history. It records catalog parity, 380 application
syntax/local-binding checks and handbook hashes separately. Unreconciled reads are neither
credited as completed nor silently described as never read. Each new owner
needs a source/caller/error/lifetime/test/doc disposition before completion.

After the release batch, continue in this order:

1. Trace WebDriver spawn errors, request/body deadlines, process disposal and
   partial setup in both Firefox and Safari drivers. Respect actual script and
   navigation timeout contracts. Repair cleanup without masking failed results.
2. Remove obsolete registry-limit mocks and the dead URL helper, then split the
   2,043-line background API test by harness and behavior owners. Retain every
   assertion, deferred lifetime and module-mock boundary through AST and tests.
3. Review the remaining large detection, snapshot, observation, matcher, panel
   and test owners. Split by state and consumer responsibility, migrate every
   caller/export/comment and delete obsolete paths rather than add aliases.
4. Compare the complete vendored closure with the exact historical Utils base
   and overlay objects. Their authentic commit/tree receipts are recovered;
   a newer Utils branch is not a substitute. Retain the credential-free source
   build unless the recorded adoption decision changes with consumer evidence.
5. Run the full affected Chrome/Firefox journeys and stress scenario, plus
   Safari on macOS. Builds and generated-page startup do not replace private
   windows, observation, navigation, cleanup, clipboard or search/focus checks.
6. Reconcile every current document, original guidance adaptation and per-file
   coverage record. Compare the separate stress branch from its verified common
   ancestor before proposing integration. Keep divergence and failed evidence.

Resume by reading this record, the latest user instruction, actual branch,
index/worktree and running workflows. Do not replay historical patches or
commands merely because the [retained record](history/monorepo.md) mentions them.
Preserve meaningful unpushed changes before checks, serialize expensive native
gates, and save coherent batches to PR #7. The full restructure is still open
while these semantic and runtime actions remain unfinished.
