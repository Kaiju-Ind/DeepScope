# Three scenario walkthroughs

**A detection change.** Add or change catalog rules, or matcher code. Run the golden matcher test
(`src/tests/matcher/golden.test.ts`) and the registry tests; check new patterns for nested unbounded quantifiers. Build
Chrome and Firefox, load a page that should match and one that should not, and compare the technology list with the
previous build.

**A browser API or surface change.** Check browser-compat-data for every supported minimum, choose by capability, and
keep listeners registered synchronously. Build all three browsers, lint Firefox, run `mise run verify firefox` and, where
possible, `mise run verify safari`, and check Chrome's side panel by hand. Include a private window if storage is
touched.

**A dependency or Utils update.** Read the upstream changes, update coupled packages together, run check, test and all
builds. For Utils, resync with `scripts/utils/sync.ts` and run the `utils` Vitest project. Deliver a preview when runtime
behavior can change.

These are walkthroughs, not exercised procedures; label a run preview- or release-exercised only with its evidence.
