# E01 Establish the real source, owners and required work

Begin with one repository, existing PR/branch and a bounded user-visible or engineering outcome. Verify remote head/base
and ancestry, dirty/staged/untracked state, concurrent writers, original skills, and every relevant caller before
editing. A migration can change which repository owns a package, worker or test; identify today's owner and intended
owner. Do not duplicate the implementation in a temporary owner or modify another PR just to make CI green. Record
exactly which automatic checks, manual checks, builds, browser journeys and protected release checks exist at that
revision. **Skipped is not passed.**

Use a source graph (prefer Oxc/TypeScript AST for imports, exports, type-only dependencies and consumers; parse
TOML/JSONC/YAML using their actual grammar). Include dynamic imports, generated contracts, test files, benchmarks,
package manifests, lockfiles, migrations, container contexts and workflow policy. For unknown relationships, select the
conservative required work. Record the smallest correct scope, then stop rather than silently expanding into other
repositories.

**Discovery is the default input contract.** The package manager and test runner must discover workspace packages and
tests from owned manifests, source conventions or well-scoped glob patterns. Do not keep an explicit array of individual
test or benchmark paths in `package.json`, `deno.json`/`deno.jsonc`, Mise tasks or CI workflows as the normal selection
mechanism. A new test must enter the full suite without manually editing an unrelated task declaration. Exact file names
are appropriate only for a reviewed, finite exception such as a public runtime entry point, a generated contract or a
regression fixture whose identity is the contract. Record why that exception cannot use discovery.
