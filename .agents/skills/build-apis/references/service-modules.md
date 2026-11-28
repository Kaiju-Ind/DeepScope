# Definitions, bindings, compilation, and Fetch services

## The programming model

A service can begin as `(Request) => Response | Promise<Response>`. Add declared
contracts when clients, hosts, gateways, and documentation need the same API
facts. Use the smallest level that solves the use case:

```text
plain Fetch route -> optional HTTP middleware -> Response

endpoint descriptions + exact handlers/resources
  -> service implementation -> compile -> create Fetch runtime
  -> host listener -> requests -> body completion -> owned cleanup
```

Definitions describe accepted inputs and results. Bindings supply behavior.
Compilation links the imported graph and rejects missing/conflicting contracts.
The compiled service contains a handler-free route plan and prepared operation
information reused by Fetch execution and projections; it is partial evaluation
of stable structure, not code generation or permission to skip declared checks.
Runtime creation owns live request/resource lifetimes. The deployment host owns
the listener. These are different operations even when one file composes them.

## Select the actual API

The Kaiju-Ind/utils workspace publishes `@kaiju-ind/server/*` and
`@kaiju-ind/http/*`, both at 1.0.0. This is not a requirement to reproduce an
application's folder tree. `@kaiju-ind/utils/<package>` forwards focused public
entries; `/all` deliberately loads the broad graph. Use `use-kaiju-utils` for
the package map and adoption.

Resolve the consumer manifest, public entrypoint, implementation, and tests.
The current service exports `compile`, not `compileDefinition`; server client
and gateway OpenAPI subpaths are not declared. Do not infer API availability
from another repository or infer publication from a local manifest.

## One complete current service

This composition follows the inspected current workspace public entrypoints. Use the
consumer's resolved imports; these names do not assert registry availability.
The two explicit polyfill imports belong at the host when Temporal/disposal
globals are absent, never in import-safe endpoint definitions.

```ts
import '@kaiju-ind/duration/polyfill';
import '@kaiju-ind/dispose/polyfill';
import * as endpoint from '@kaiju-ind/server/endpoint';
import * as service from '@kaiju-ind/server/service';
import * as response from '@kaiju-ind/http/response';
import { z } from 'zod';

const GreetingSchema = z.strictObject({ message: z.string() });
const QuerySchema = z.strictObject({ name: z.string().min(1) });
const Greeting = response.ok(GreetingSchema, {
  id: 'greeting.ok', description: 'A greeting for the supplied name.',
});
const Greet = endpoint.get({
  id: 'greeting.get', path: '/greeting', query: QuerySchema,
  responses: [Greeting],
});
const Api = service.define({ id: 'greeting-api', path: '/api', endpoints: [Greet] });
const implementation = service.implement(Api, {
  endpoints: [endpoint.handler(Greet, ({ input }) =>
    response.create(Greeting, { message: `Hello, ${input.query.name}!` }))],
});
await using runtime = service.create(service.compile(implementation), { host: {} });
const result = await runtime.fetch(new Request('https://service.invalid/api/greeting?name=Sam'));
console.log(result.status, await result.text());
```

The request runs in process; it starts no network listener. The response body is
consumed, and runtime disposal is awaited. Validation produces typed
`input.query`; Hono's `c.req.valid()` is not part of this handler contract.

## Exact identity and static contracts

Bind handlers, middleware, resources, requirements, and result definitions to
the exact imported objects. An equal diagnostic ID does not recreate identity.
Do not rebuild a definition inside each handler or compare only strings.

Endpoint method helpers handle a single method. Use `endpoint.operation.*`
and `endpoint.define()` for multiple methods sharing a path. Groups and
selections compose path and policy data without starting work. Compiler checks
must cover exhaustive handler bindings, route conflicts, resource reachability,
and middleware preconditions before traffic arrives.

Input locations are lower-case `param`, `query`, `header`, `cookie`, `json`,
`form`, and `raw`. `raw` is mutually exclusive with parsed body contracts.
Use Standard Schema for validator-neutral runtime acceptance and transformations.
Use Standard JSON Schema or the verified projector for the wire description;
request input and response output projections can differ.

Declare allowed response/problem values. Ordinary handlers return those values;
an operation must opt into `rawResponse: true` to return a native Response.
Raw SSE/proxy/provider responses still need cancellation and body completion.

## Live ownership and middleware

For an input-rejection review, follow the declared operation into the selected
runtime, not a neighboring framework example. Current service parsing failure
uses `ServerProblems.InvalidRequest` (400); unsupported media is a distinct
problem. Authentication runs before ordinary input parsing/validation, within
the declared middleware lanes. Compilation neither performs that authentication
nor licenses skipping it. Read [runtime](runtime.md) for request ordering and
verify the current implementation/tests before claiming observed HTTP behavior.

Runtime-owned resource collections acquire declared implementations lazily and
share admitted acquisition. A borrowed host/client is not disposed by its
consumer. Request admission and resource use must apply the current actor's
policy, not reuse the first actor's authorization with a cached client.

Middleware declares required/provided request values and executes in the
verified lane: `wholeRequest`, `beforeValidation`, `afterValidation`, or
`aroundOperation`. Inspect exact ordering and handler signatures. Static
availability does not authenticate an actor or implement a permission check;
the live host supplies that behavior. Keep generic execution context lifetime
separate from endpoint `input`, `host`, and `resources`.

`@kaiju-ind/capability/effect` declares required side-effect announcements;
they are not the Effect TypeScript runtime. An observer records lifecycle
metadata. A required effect needs an accepting emitter. Neither log delivery
nor sequential calls create a transactional outbox.

## Files follow ownership, not a compulsory tree

Keep API descriptions import-safe, implementations beside the behavior they
bind, and live composition at an executable root. A substantial service may
separate domain contracts, endpoint definitions/handlers, storage adapters, and
real workflows. A small route does not need empty `runtime/activities/workflows`
folders or a universal registry just to resemble an example.

Gateways import the same service definitions and derive method/path forwarding
ownership. They do not start services or replace origin-side validation and
authorization. Read the gateway reference when a network hop is involved.

## Verification and failure signatures

- Import definitions without environment reads, listeners, or provider clients.
- Reject a missing handler, duplicate route, and same-ID/different-object binding.
- Send valid and malformed requests through the compiled Fetch runtime. Verify
  the declared rejection status; do not assume the old Hono 422 default.
- Reject an undeclared/invalid handler result and compare generated OpenAPI with
  the reachable service graph and wire transformations.
- Verify current actor policy on repeated resource borrowing, shared acquisition,
  failure cleanup, cancellation, and stream-body retirement where affected.
- Exercise the actual host for networking/readiness/shutdown claims. In-process
  Fetch tests prove service behavior but do not prove the listener adapter.

## Sources and freshness

Inspected 2026-11-22: the example above type-checks and runs against the
published `@kaiju-ind/server` 1.0.0 and `@kaiju-ind/http` 1.0.0. Earlier
observations came from the HTTP/server/resource source, guides and tests. These
establish package contracts, not deployment. Recheck current exports and the consumer revision
before an upgrade; an archived application is not the forward contract.
