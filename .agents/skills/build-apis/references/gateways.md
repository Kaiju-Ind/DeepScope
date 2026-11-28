# Gateway route authority and forwarding lifetime

## Mental model

A gateway owns a network hop. It derives method/path ownership from imported
service definitions, then forwards requests under explicit edge policy. A
mount describes the origin; it does not instantiate a service. Compilation
checks static route/policy data, not upstream business behavior.

The origin still owns validation, domain authorization, and storage. Edge
authentication is not permission to a domain record. For a local Fetch handler,
use in-process composition rather than creating a network gateway.

## Current utility composition

Resolve the published `@kaiju-ind/server/gateway` entries and the consumer revision:

```text
exact ServiceDefinition + origin -> gateway.mount
mounts + edge policies -> gateway.define -> gateway.compile
compiled graph + transport/adapters -> gateway.create -> fetch(Request)
```

Imported definitions are the route source. A provided service manifest can
check deployment drift; it does not replace the imported route contract.
The deployment host owns sockets, process lifetime, and upstream startup.

Inspect the current manifest and public module rather than importing an
unexported `server/gateway/openapi` or client path. Telemetry adapters belong
to the telemetry package; the application owns backend configuration.

## Forwarding policy

The inspected gateway defaults strip caller cookies, authorization, response
cookies, hop-by-hop headers, and untrusted forwarding/trust headers. Deliberate
pass-through requires route policy. Provider-auth routes may need cookies;
programmatic routes may strip a credential and attach a verified internal
assertion through the live host. Do not broaden every route to fix one provider.

The gateway reconstructs forwarding metadata from trusted host inputs. Test
spoofed `Forwarded`, `X-Forwarded-*`, `X-Real-IP`, and application trust fields.
Redirects are handled manually under preserve, rewrite, or allowlist policy.
Inspect request body admission, correlation, cache, timeout, and response policy
together, including headers nominated by `Connection`.

## Response lifetime is longer than headers

Preserve cancellation and any configured total timeout through body completion,
cancellation, or source error. Retire acquired upstream bodies after abort even
when downstream never begins reading. Release readers and listeners when the
body completes. Returning status/headers is not terminal resource completion.

Native Fetch may decode supported compressed responses while retaining wire
metadata. Use the selected implementation's response filtering; do not blindly
preserve stale content length/encoding or assume a custom transport has native
decoding semantics. Keep request forwarding streaming unless a bounded policy
explicitly requires inspection.

Observers record forwarding, response, completed, denied, failed, or aborted
stages. They do not provide a durable security audit or an outbox.

## Proof and common failures

Test with an injected upstream Fetch function and inspect both sides of the hop:

- compiled method/path and service prefix, including unknown routes;
- credential and response-cookie policy for each affected route class;
- forged forwarding metadata and manual redirect decisions;
- body-limit rejection before unintended upstream work;
- disconnect/deadline during streaming and retirement of unread bodies;
- observer terminal stage and absence of credential/body disclosure.

Then test the real listener/proxy topology when deployment behavior is claimed.
A unit test that returns an upstream Response is not proof of origin-side
authorization or real reverse-proxy streaming.

## Sources and freshness

Inspected 2026-11-22: the published `@kaiju-ind/server` 1.0.0 gateway exports
(`mount`, `define`, `compile`, `create`, `openapi`) and the Kaiju-Ind/utils
gateway guide. Earlier observations came from the server/gateway source and
tests. These are local source observations. Verify the selected tree, transport,
adapter, and deployment before asserting stronger guarantees.
