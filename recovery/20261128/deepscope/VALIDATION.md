# Validation status at the environment outage

The last local source head was
`480500ea365e928f46738d24903723ecec248672`. Node 26.13.0 and pnpm 12.19.0
matched this repository's exact pins. No current hosted CI result is claimed.

## Observed before the outage

- The recovered tree `5ec68fe6` passed a frozen install and native root type
  check before the new repairs. That is not a type-check pass for later edits.
- The installed comctx regression failed four of eight cases before the patch
  and passed all eight afterward, through both real browser adapters.
- Four inherited-name schema cases failed before the category repair; all nine
  schema cases passed afterward.
- The filtered registry, DOM, extension UI, guidance and verification projects
  passed 116 tests in 13 files. The separate RPC file gives 124 unique passing
  tests in 14 files. Repeat runs are not counted as additional tests.
- The changed RPC/schema tests and their imported source closure passed a strict
  native TypeScript check with explicit compiler flags and `--ignoreConfig`.
  The verification package's TypeScript and JavaScript syntax check also passed.
- Native actionlint 1.7.12 and offline zizmor 1.32.0 passed. One pre-existing
  ignored audit remained.
- The full current root type check, including serial execution, was killed at
  the registry compiler with exit 137. A registry-only timed probe was killed
  after 7.65 seconds, with recorded child peak RSS 433,856 KiB. Its exact host
  cause remains unconfirmed.
- Native file discovery returned 8,591 compiler inputs, including 8,173 catalog
  paths and 8,182 repository TypeScript paths. No incremental/composite setting
  or `.tsbuildinfo` explained the earlier passing check.
- Three bounded whole-suite attempts were killed with exit 137 before a test
  file result. They do not establish a full suite pass.
- The native Chrome build was killed by SIGKILL during WXT startup. No current
  browser bundle, archive or source rebuild was validated.
- Frozen restoration relinked 491 cached packages, then WXT prepare exited 137.
  Later scoped installs with lifecycle scripts disabled passed.
- The actual Chrome for Testing download returned HTTP 403. Current Chrome and
  Firefox journeys remained unrun; Safari requires macOS.
- The locally prepared checkpoint passed strict Git object verification,
  replayed all five original binary-capable patches to their exact parent
  trees, and matched all 9,913 source archive blobs and modes. That archive's
  independent upload later failed; its local validation is historical evidence,
  not proof that the archive is now durable.

The raw log files were inside the unavailable complete checkpoint. This
document preserves observed results and their limits; it is not a replacement
for those raw logs.

## Recovery checks after the outage

All five raw native commit objects reproduce their full recorded Git SHAs.
Fourteen complete current source files reproduce recorded blob identities.
Every reconstructed hunk's old/new line counts were checked. The complete
initial overlay reproduces the recorded 680/144 diff statistics, and the final
plan edits are preserved separately. Dangling GitHub blob read-back is recorded
in the recovery manifest.

The entire application tree cannot be re-created in this executor while its
migration baseline remains unavailable. Full native tree comparisons remain
required before attaching the recovered application commits to a branch.
