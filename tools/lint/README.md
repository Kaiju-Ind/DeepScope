# Repository guidance checks

This private Node/TypeScript workspace package owns `guidance.ts` and its
Vitest tests. It checks guide links, skill routing, prompt inclusion and local
utility authority. Shared handbook examples describe upstream policy; local
project instructions describe the installed vendored closure. Both remain
visible, and the local checks do not treat an example import as a dependency.

From the repository root, run
`pnpm --filter ./tools/lint --fail-if-no-match run check` for TypeScript and
`pnpm --filter ./tools/lint --fail-if-no-match run test` for its tests. The root
Vitest config also discovers this package's native test config. No generated
list of test paths is maintained.
