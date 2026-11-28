# Dependency patches

The frozen pnpm install applies the patches declared in `pnpm-workspace.yaml`.
Their hashes are recorded in `pnpm-lock.yaml`, and the Firefox source archive
must include this directory so reviewers can rebuild the same dependencies.

## comctx 1.7.7 request cleanup

When browser delivery rejects, comctx 1.7.7 rejects the RPC promise but keeps its
reply listener registered. Repeated requests to a missing content script or an
invalidated extension context retain those listeners. The patch releases the
failed request's listener before rejecting with the original transport error.
Other requests keep their subscriptions.

The patch changes the readable injector in `core/src/comctx.ts` and the published
runtime in `core/dist/index.js`. It preserves the message format and both client
APIs. DeepScope's RPC methods accept data, so this repair does not change comctx's
separate callback-argument subscription behavior. A caller timing out while the
transport remains open also remains distinct from a rejected send.

`apps/extension/src/tests/messaging/client-lifetime.test.ts` runs the installed
package through both real browser adapters. It checks failed delivery, concurrent
requests, successful replies and provider errors. The unpatched package fails
the delivery and concurrency cases. When upgrading comctx, remove this patch
only after the replacement passes these tests without it.

Published package: <https://registry.npmjs.org/comctx/1.7.7>.
Upstream repository: <https://github.com/molvqingtai/comctx>.
The package is distributed under its existing MIT license.
