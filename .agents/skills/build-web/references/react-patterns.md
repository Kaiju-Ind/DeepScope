# Component composition and performance rules

Read this reference for component APIs or a demonstrated rendering/bundle
problem. DeepScope renders with Solid 1.9, not React; the rule files below come
from Vercel's React guidance and are kept only where the idea is independent of
React (composition shapes, bundles, plain JavaScript hot paths, browser
rendering). React-only rules (server components, hooks, re-render tuning,
hydration) were removed. Translate the idea to Solid's model; never copy a hook
recipe.

## Composition

Prefer explicit variants and children when independent boolean modes make
invalid combinations easy. Compound components can share a provider-owned
state/actions interface (Solid context); lift state only as far as the actual
consumers require. Render props remain useful when the caller needs data, and
ordinary boolean state is valid. Read the specific
[composition rules](vercel-composition-patterns/rules/architecture-compound-components.md)
for compound components; related rule files are indexed in resources.md. The
Zaidan catalogue in `src/ui/` already follows these shapes; extend it before
adding a parallel component.

## Performance

Measure the user-visible cost first. Remove independent-request waterfalls
(panel reads from the background should run in parallel), keep heavy optional
code out of the panel's first bundle, and keep per-tab data out of module-level
mutable state. Public exports and actual bundler output govern import
decisions. In Solid, derive values with memos only when the computation is
measurably costly; a plain accessor is the default. Use
[async parallelism](vercel-react-best-practices/rules/async-parallel.md) when
operations are independent; inspect the specific rule only for the affected
cost. The `js-*` rules apply equally to matcher and DOM-scan hot paths.

The rule directories retain technical examples from Vercel's MIT-licensed
[agent skills](https://github.com/vercel-labs/agent-skills). Their filenames
are lookup keys, not mandatory read order or unconditional optimization
requirements. Consult [Solid](https://docs.solidjs.com/) for renderer behavior.
