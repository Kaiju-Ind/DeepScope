# Registry maintenance tools

This private Node package owns catalog statistics, name/relation/provider
checks, source corpus scans and the Intelligence conversion/diff commands.
Its direct `rolldown` dependency belongs here because the comparison tools
bundle the TypeScript catalogs before comparing data.

Run commands from the repository root so their documented relative inputs
resolve correctly. `intelligence-diff.mjs` reads `packages/registry` by default
and takes `--intelligence` for an explicit neighboring Intelligence registry.
It writes only requested reports. `intelligence-convert.mjs` is a source-writing
import tool; inspect its explicit input/output flags before use. A directory
move does not authorize replacing catalog IDs or importing a different
Intelligence revision.

`pnpm --filter ./tools/registry --fail-if-no-match run check` uses Node's
syntax checker on each `.mjs` entry. This is a syntax gate, not a claim of
JavaScript type checking or current Intelligence contract compatibility.
