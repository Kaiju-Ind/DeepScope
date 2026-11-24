# P01 Open the work and report prerequisites

**Trigger:** a new piece of work, a new browser, a new store, a changed release model or an unfamiliar upstream release.
**Outcome:** a short work contract and an early list of actions that only the owner can complete.

**Entry:** repository access, the requested outcome and current authorization. Read `AGENTS.md`, the plan under
`docs/migration/` that owns the work, the [project template](../project/README.md) and the skills the task needs.

| Step | Action                                                                        | Expected result                                                                     | If it fails                                                                             |
| ---- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1    | Record the branch, base, full SHA, local changes and concurrent work.         | A verified starting point; other writers' paths are known.                          | Resolve ancestry. Preserve divergent work before editing.                               |
| 2    | Prepare the toolchain: `mise install`, `mise exec -- pnpm install --frozen-lockfile`. | Node and pnpm at the pinned versions; a frozen install with no credentials.  | Report the failing package or tool; do not loosen the lockfile.                          |
| 3    | Establish the baseline: `mise run check`, `mise run test`.                    | Types and the Vitest suite pass, or known failures are recorded with their cause.   | Record the failure before changing anything, so it is not blamed on the new work.       |
| 4    | Define one journey and the browsers it covers.                                | Observable actions in the built extension, including the surfaces involved.         | Draft it from the requirements; ask only for a decision that changes scope.             |
| 5    | Map the extension contexts and modules the journey crosses.                   | Background, content script, offscreen document or workers, and panel surfaces named. | Trace messages and storage before adding code.                                          |
| 6    | Check the browser APIs and manifest keys the change relies on.                | Each is available at every supported minimum, or the fallback is chosen.            | See [browser runtimes](../platforms/02-browsers.md).                                    |
| 7    | Send the owner-action report.                                                 | Each blocked item states who acts, where, what to change and how it is verified.    | Do not postpone known blockers while waiting for unrelated research.                    |
| 8    | Continue independent work and update the report.                              | Implementation proceeds; new blockers appear promptly.                              | Never treat an unperformed owner action as done.                                        |

Before adding a dependency, a polyfill or a permission, record the requirement and why the platform or an existing
package cannot meet it. See [AE03](../agents/03-ae03-prove-requirements-before-expanding.md).

Use bounded parallel work where it helps, with exclusive file scopes and one owner for `package.json`, the lockfile,
`wxt.config.ts`, `vitest.config.ts` and shared contracts. Parallelize reads and independent tests; serialize
integration.

## What to tell the owner early

Name a concrete missing result. For example:

> Firefox store submission needs an add-on id. Choose one (for example `deepscope@<your domain>`); the manifest and
> `web-ext lint` use it. Building and testing all three browsers can continue meanwhile.

Typical DeepScope owner actions: the project licence, catalog and font redistribution rights, store listings and
credentials, Apple Developer Program membership, immutable releases, tag rules, environments and runners. Never request
secret values in a report.

**Exit evidence:** work contract, baseline results, browser and API matrix, and owner-action report.
