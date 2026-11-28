# DOM selector planning and matching

`@deepscope/dom` compiles CSS selectors into cheap routes and matches them against
the caller's live document. The extension uses the same plan for initial
collection and later mutation scans. This private workspace package exports
TypeScript source; it has no WXT, RPC, storage or application imports.

```ts
import * as dom from '@deepscope/dom';

const plan = dom.create(['script[src*="example"]']);
const matches = await dom.match(plan, document, { signal });
```

The caller owns the document, cancellation signal and mutation observer.
`match` creates no observer. It yields between bounded slices and returns the
selectors found before cancellation. A native `Element.matches` call already
in progress cannot be interrupted. Routing only rejects selectors whose
necessary conditions fail; the browser still decides whether each admitted
selector matches.

Use `/plan`, `/match` or `/route` for the narrower operation family. The route
cache holds selector lists weakly plus one most recent compiled list. It
contains no document or browser handle. Invalid selectors do not terminate a
scan. The plan's mutation metadata tells the caller which existing regions
need another scan after structural changes.

`pnpm --filter ./packages/dom check` checks this package. Its consumer test runs
through the public operations under the root Vitest workspace. The extension build resolves the declared bare package exports. The extension's
DOM suites additionally compare the complete technology catalog and generated
selectors against the DOM implementation; those tests remain with that
integration consumer. Real browser scans remain a separate verification gate.
