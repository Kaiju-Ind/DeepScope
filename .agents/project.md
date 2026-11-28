# DeepScope work and evidence

Read [AGENTS.md](../AGENTS.md), select the capability in [START.md](START.md),
then use the [active action list](../docs/migration/monorepo-plan.md). This record
connects the shared guidance to the current project owners. The original handbook
remains authoritative; the [DeepScope profile](../docs/kaiju/profiles/deepscope.md)
selects the extension's actual runtime and public-source-build contract.

The release preparation batch starts from `dfd1e73e3e45cb89575317fcdbafa9685f3e8d5c`
on `integrate/cross-browser-runtime`, existing [PR #7](https://github.com/Kaiju-Ind/DeepScope/pull/7).
Check the actual head, index, worktree and hosted run before continuing. The
separate `fix/stress-green` branch remains unmerged. A source review, a saved
commit, a build and an accepted browser journey are separate results.

## Release preparation owners

Use [release-software](skills/release-software/SKILL.md) for release evidence and
publication decisions, [build-devtools](skills/build-devtools/SKILL.md) for native
task and packaging ownership, and [review-code](skills/review-code/SKILL.md) with
[test-code](skills/test-code/SKILL.md) for source and failure review. Use
[write-docs](skills/write-docs/SKILL.md) when reconciling the maintainer's commands,
recovery instructions and current evidence. No store or release publication is
needed to validate these preparation changes.

| Owner | Contract |
| --- | --- |
| `tools/release/archives.mjs` | Read the app version; check the requested tag; select the complete literal changelog version; delegate archive collection. |
| `tools/release/collection.mjs` | Resolve destination ancestry, protect source and input owners, verify ownership of a prior collection, prepare complete copies and checksums, then replace or restore. |
| `tools/release/fixture.ts` and the three release test files | Invoke the real CLI and Bash task in disposable trees. Replace only store adapters or the specific filesystem refusal needed to exercise failure. |
| `tools/release/tsconfig.json`, `package.json` and `vitest.config.ts` | Own strict JavaScript/type checks, syntax checks and the discovered `release` test project. |
| `.mise/tasks/release/archives` | Run native browser zip tasks, then collect the selected archives into an owned destination. |
| `.mise/tasks/release/store-upload` | Keep the Firefox shell alive until unzip or submission settles, then remove its private extraction while retaining the command's status. |
| `.github/workflows/release.yml` | Consume preparation results and distinguish a GitHub draft from already published OCI or store artifacts. |

The output may be absent, empty or an intact collection containing exactly its
regular archives and matching `SHA256SUMS`. Extra files, links, changed bytes,
source/input owners and aliases into unpacked builds cause refusal. Prepare all
new copies before moving the old collection. If restoration fails, retain both
named candidates for recovery. One command owns an output at a time; the two
renames do not form a crash-atomic transaction. The [release package guide](../tools/release/README.md)
and [maintainer instructions](../docs/release/README.md) give the commands and
recovery steps. Temporary cleanup after a settled Firefox command does not
promise a deadline for a hung external store client.

## What has been reviewed and what remains open

The current reconciliation records 89 explicit full reads among 9,940 source,
test, asset and guidance paths. That count includes original guidance reads and
files with open findings; it is not a completed semantic audit. Earlier reads
without a reconciled file record are not converted into completion claims.
The complete path/blob/mode ledger accompanies the saved audit checkpoint.

Keep the following evidence distinct: 8,173 catalog paths have structural and
data parity; 380 application files have syntax/local-binding checks; all 663
original handbook paths remain installed, with 650 exact copies and 13 retained
project adaptations. These comparisons do not validate every fingerprint,
browser behavior or implementation against every guide. The release implementation,
all release fixtures and actual callers received independent source review.

The 512 MiB local aggregate passed 252 of 253 files and 1,805 cases, with four
skips. Its 17-case DOM matcher worker reached the explicit V8 heap limit. The
same isolated owner fails at that budget on both the authentic published commit
and this candidate. A candidate attempt with a process-only 1,536 MiB budget was
killed after one case; the cause of that SIGKILL is unconfirmed. No project limit
or assertion changed. Keep the aggregate failed until an actual candidate suite
passes. The earlier published commit's hosted 17-case pass is baseline evidence,
not acceptance of a later head.

Continue with WebDriver request/process and partial-acquisition ownership,
Firefox/Safari setup and probe cleanup, the 2,043-line background API test and its
obsolete mocks, large application owners, and the exact historical Utils closure.
Full browser journeys, stress and Safari on macOS remain acceptance work.
The [layout action list](../docs/migration/source-layout-plan.md) identifies the
next cuts; the complete prior [migration](../docs/migration/history/monorepo.md)
and [layout](../docs/migration/history/layout.md) plans remain historical records.

For each change, trace the source, consumers, state, errors, cleanup, tests and
documentation before editing. Record passed, failed and skipped gates against
their exact source. Save native and connected-writer recovery before advancing
the existing PR, verify the expected parent without force, and inspect the actual
hosted merge tree. The full restructure remains open while these actions remain.
