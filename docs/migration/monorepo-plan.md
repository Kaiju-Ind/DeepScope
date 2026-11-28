# DeepScope continuation and action list

## Active task: finish the review on existing PR #7

The user authorized the complete repository review, guidance adoption and
refactors, with changes saved to `integrate/cross-browser-runtime` in
[PR #7](https://github.com/Kaiju-Ind/DeepScope/pull/7). The published starting
point for this action list is `6fa311d76e3285e54eee895504fc3567275cc7ec`, tree
`e4adadd949d486ab31ce98209fe14823855555e5`. `main` remains
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
routes the current browser/release owners and review coverage without replacing those
original sources.

## Published work and its evidence

Seventeen coherent commits follow the original PR head `1f439b9c`. The recovered
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
| Release preparation | Collection protects resolved source/input owners, checks existing output ownership and stages replacements. Notes match complete literal versions; Firefox temporary extraction survives until the command settles, then is removed. |

[Hosted run 46142000497](https://github.com/Kaiju-Ind/DeepScope/actions/runs/46142000497)
checked out merge `ed596ee4b028a5c090c0cef7b50b878a8df2de7a`, whose tree exactly
matches the published `6fa311d7` tree above. Nine executed jobs passed: dependency
setup, workflow lint, types, tests, all three browser builds, Firefox add-on lint
and Chrome artifact smoke. Tests passed in 253 files with 1,822 cases and four
skips. Optional Safari Xcode generation was skipped.

Those nine jobs totalled 406 seconds of execution time. The interval from the
first job's start to the last job's completion was 157 seconds (11:53:38 to
11:56:15 UTC). These are actual job timestamps, not queue-inclusive wall time,
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

## Published release preparation action list

The release defects affected a maintainer preparing a release. Native
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

The following six actions are complete for the published release batch. Their
local failures and subsequent exact-head hosted result remain distinct below.

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
unchanged, and the local aggregate remains failed. The later exact-head hosted
release suite passed all 17 DOM matcher cases in 10,915 ms and every other
discovered owner. The workflow lint check also passes on that source.

Final scoped checks also passed: the release package's strict JavaScript/types
and syntax checks, ShellCheck 0.11.0 on all three changed release tasks, and all
15 guidance cases. The native Firefox zip task built the extension and emitted
a source archive with 9,104 entries. The collector then copied the actual four
browser/source archives; native checksum verification, ZIP CRC/path checks and
manifest versions passed, and all input bytes remained unchanged. The Firefox
extension ZIP still has SHA-256
`2f122a8c23327d9416165546b362a374a5cf76ef89df6cdd5e0030fb6b072800`.
These results validate preparation and packaged bytes; no release or store
submission occurred. The scoped source reviews found no blocking issue. The
published release head now has the hosted acceptance recorded above; the full
repository audit remains open.

## WebDriver ownership action list

The next native probes reproduced false readiness, invalid session/response
acceptance, a stalled response body, unhandled startup errors, lost late stderr,
and fixture or CLI setup/report failures that retained their native driver.
Safari also had an unbounded request outside the shared client. All probes used
disposable processes and loopback fixtures. The suspected inherited fixture
route was disproved with HTTP 404 and is closed, not a defect.

The selected repair keeps plain Node and the existing narrow WebDriver protocol
contract. Selenium's maintained driver-service and HTTP APIs were considered;
adopting them would also require migrating browser-specific commands and caller
lifetimes. It would not itself put fixture acquisition or report writing under
cleanup ownership. No runtime dependency or browser scenario marker changes.

1. Replace `tools/verify/webdriver.mjs` with `webdriver/driver.mjs`,
   `protocol.mjs` and `session.mjs`. The native driver owns startup, process
   events, its log descriptor and joined termination. The protocol owner bounds
   complete response bodies and validates envelopes; the session owns a valid
   identity, accepted timeout policy and bounded DELETE.
2. Preserve both 180-second script budgets, Firefox's 300-second navigation
   policy and Safari's 30-second policy, with five seconds for their responses.
   Startup, creation, metadata and cleanup have their own finite budgets. A
   canceled exchange does not prove that browser-side work stopped.
3. Protect every acquisition in the Firefox/Safari callers. Keep diagnostics,
   primary errors and cleanup errors, then write the report after disposal.
   Listen failures reject normally; fixture closure cancels delayed responses
   and joins handlers. Keep complete logs for diagnosis.
4. Cancel ordinary work independently of remote cleanup. Review caught an
   initial defect where immediate driver termination prevented known-session
   DELETE. A retained native red trace proves the omission; the corrected
   session and both actual CLI regressions observe DELETE before termination.
   Safari's known extension is also removed through the still-live driver.
5. Verify the native owners and actual callers. The type/syntax check and all
   78 verification cases in 12 files pass. Twenty-two unchanged helper/data
   ASTs, Firefox capabilities and both generated Safari probe scripts retain
   parity. The 16 baseline observations and the earlier test-fixture failure
   remain in recovery, alongside independent source reviews with no blocker.
6. Build and inspect the Firefox archive, then use a clean extraction for the
   real browser run. Firefox 161.0 and geckodriver 0.37.1 produced four passing
   asserted records and one informational pre-install observation in 19.979
   seconds. The extension ZIP retains the SHA-256 recorded above. The driver
   log and final result JSON are retained; this selection does not cover all
   scenarios, stress or Safari on macOS.
7. Reconcile the guidance and source archive, preserve native and writer
   recovery with full read-back, then guard the existing PR update against
   `6fa311d7`. Verify the actual new-head hosted suite, types and builds. These
   publication/acceptance actions remain pending in this source record.

The Safari diagnostic worker, storage-probe keys and manual base-URL/control-page
flow remain open. A source read also found unrestricted removal of caller-selected
output in `.mise/tasks/safari-project`; reproduce that separately in disposable
input before repairing its output ownership. A native driver fixture does not
prove that a real Safari browser or extension outside its process group was
removed. Keep those next owners and macOS acceptance separate from this repair.

## Remaining semantic review and continuation

The earlier published ledger inventoried all 9,930 paths and reconciled 61
explicit full reads. The release reconciliation covered 9,940 paths and 89 full
reads. The current WebDriver reconciliation covers 9,948 paths and 104 explicit
full reads, including native process/protocol/session owners, all new fixtures,
both migrated callers and the original verification guidance. It records catalog parity, 380 application
syntax/local-binding checks and handbook hashes separately. Unreconciled reads are neither
credited as completed nor silently described as never read. Each new owner
needs a source/caller/error/lifetime/test/doc disposition before completion.

After publishing the WebDriver batch, continue in this order:

1. Finish Safari diagnostic-worker and storage-probe cleanup, the manual
   base-URL/control-page flow and the packaging task's output ownership. Preserve
   actual remote budgets, known extension/session cleanup and primary errors.
   Run the affected native regressions and a real Safari selection on macOS.
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
