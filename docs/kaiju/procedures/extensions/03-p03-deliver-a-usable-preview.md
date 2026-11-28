# P03 Deliver a usable preview

**Trigger:** a change that needs human feedback. **Outcome:** the reviewer loads a build of the exact commit in each
affected browser and completes the agreed journey.

**Entry:** the P01 contract, relevant P02 checks and a committed candidate.

| Step | Action                                                                 | Expected result                                                                       | If it fails                                                                 |
| ---- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 1    | Select the exact commit and lockfile.                                  | The candidate is recoverable and its identity is recorded.                            | Reconcile concurrent work first.                                            |
| 2    | Run `mise run check` and `mise run test`.                              | Types and the full Vitest suite pass.                                                 | Fix before building; do not hand over a build that fails its own tests.     |
| 3    | Build each affected browser: `mise run build <chrome\|firefox\|safari>`. | `.output/<browser>-mv3` exists and its manifest is Manifest V3.                     | Diagnose at the failing build stage.                                        |
| 4    | Lint Firefox: `mise run lint:firefox`.                                 | No `web-ext lint` errors.                                                             | Fix manifest errors; AMO rejects them.                                      |
| 5    | Run the real-browser scenarios: `mise run verify firefox`, `mise run verify safari`. | The scenarios the change affects pass; results saved with `--out`.      | Keep the result file; mark the journey incomplete.                          |
| 6    | Load the build by hand where no driver exists (Chrome) and walk the journey. | The journey works on a real page, including the surfaces involved.             | Record what failed and in which context.                                    |
| 7    | Give the reviewer the preview receipt.                                 | Commit, build location or CI artifact, browsers and versions, journey result, limits. | Do not hand over a build that was not loaded.                               |

The Verify workflow uploads each browser's zips as the `extension-<browser>` artifact for seven days; a reviewer can
load those instead of building locally. They are review builds only; a release always rebuilds from the tag.

Use complete journeys: a detection includes the page load, the badge, the panel showing the result, and what happens on
navigation and tab close. Include a private window when the change touches storage, because nothing from a private tab
may be persisted.

Load an unpacked build in Chrome from `chrome://extensions` (Developer mode, Load unpacked). In Firefox use
`about:debugging` > This Firefox > Load Temporary Add-on. Safari needs the steps in
[the Safari card](../../platforms/05-safari.md).

**Exit evidence:** the preview receipt. **Recovery:** P05. **Lifecycle:** P06.
