# Adopt a Kaiju Utils package

## Registry

The packages are on GitHub Packages. The consumer's `.npmrc` maps the scope; the token comes from the environment, never
from a tracked file:

```ini
@kaiju-ind:registry=https://npm.pkg.github.com
```

A token with `read:packages` reads them. In GitHub Actions, give the job `packages: read` and pass the workflow token;
on a workstation, keep the token in a private user configuration outside the repository. A token in a lockfile, a
log or a committed `.npmrc` is a leak; rotate it.

## Pin and verify

1. Add the package with an exact version, as the consumer pins its other dependencies, and refresh the lockfiles. A
   Deno workspace that reads `package.json` resolves the same npm package.
2. Read the installed package's `package.json` `exports`. Import only those subpaths. Utils `main` can have entries
   that the release does not.
3. Read the installed README and types for the operation. Do not copy a signature from memory or from another
   repository.
4. Run the consumer's type check and the tests of the code that uses the package.

To see the published versions without installing:

```sh
pnpm view @kaiju-ind/<package> versions --json
```

## Replace a local utility

A repository that grew its own generic helpers moves them to Utils one family at a time:

1. List the local module's exports and every importer.
2. Map each export to a Utils subpath, or mark it as product code that stays.
3. Change one family's imports, delete the local module in the same change, and run the affected tests.
4. Where the Utils behavior differs, keep the consumer's tests as the contract. Report the difference to Kaiju-Ind/utils
   instead of keeping a patched local copy.

Product rules stay in the product. A crawl budget, a credit policy or a site key is not a utility, even when it uses
Utils packages.

## Report a gap

When no package fits:

1. Check the Utils changelog and open issues for planned work.
2. Write the smallest local code that the task needs, in the module that uses it, with a comment that names the gap.
3. Propose the generic version to Kaiju-Ind/utils with the use case, the API you needed and the tests that prove it.
   When it is released, replace the local code.
