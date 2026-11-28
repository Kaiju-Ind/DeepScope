# Adopt a vendored utility package

DeepScope is public and builds without access to Kaiju-Ind/Utils or its package registry. The packages are copied
into `utils/` and resolved as pnpm workspace packages (`pnpm-workspace.yaml` lists `utils/*`). No `.npmrc` scope, no
registry token and no `@kaiju-ind/*` dependency is ever added; one would break every public build.

## Use a package that is already vendored

1. Read the vendored `package.json` `exports` and the package README. Import only those subpaths.
2. Add `"@utils/<package>": "workspace:*"` to the root `package.json` when DeepScope code imports a package it did
   not depend on before, then `mise exec -- pnpm install`.
3. Check the bundle: the package must load in the context that imports it. The content script imports none of them;
   a background service worker cannot use dynamic `import()`; `duration` imports `temporal-polyfill`, which
   `wxt.config.ts` aliases to native Temporal for every browser except Safari (see the utils README, "Temporal").
4. Run `mise run check` and the tests of the code that uses the package, plus `mise run test --project utils`
   when the vendored files changed.

## Vendor more of Utils

1. Add the entry points to `utils/sync.json#entries`. Transitive files and tests that stay inside the copied set
   follow automatically.
2. Resync from a local Utils checkout and check the result:

   ```sh
   node tools/utils/sync.ts --source ../kaiju-utils
   mise exec -- pnpm install && mise run check && mise run test --project utils
   ```

3. `node tools/utils/sync.ts --check` writes nothing and fails when `utils/` differs from a fresh sync. Run it
   before reviewing a change to vendored files.
4. Keep the attribution header on every copied file and the MIT `utils/LICENSE`. Never hand-edit a vendored file; a
   needed change goes in `utils/patches/*.patch` and `utils/sync.json#patches`, and is proposed upstream.

## Replace DeepScope code with a package

`utils/README.md` ("Migrating DeepScope code") holds the order. For each step:

1. List the local module's exports and every importer.
2. Map each export to an `@utils/*` subpath, or mark it as product code that stays.
3. Change one family's imports, delete the local module in the same change, and run the affected tests.
4. Where the package behaves differently, DeepScope's tests are the contract. Report the difference upstream instead
   of keeping a patched copy.

Product rules stay in the product. A scan budget, tab fairness or a page-controlled key policy is not a utility, even
when it uses one.

## Report a gap

When no vendored package fits:

1. Check whether Utils has it upstream but it was not vendored (the utils README lists what was left out and why).
2. Write the smallest local code that the task needs, in the module that uses it, with a comment that names the gap.
3. If it is generic, write it so it can be proposed upstream unchanged, as `utils/storage/` and
   `utils/scheduler/queue/extensions.ts` were.
