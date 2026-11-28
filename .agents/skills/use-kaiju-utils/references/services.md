# Services, HTTP, queries and effects

## The programming model

```text
import-safe definition -> exact implementation binding -> compilation
  -> live owner -> ordinary request or operation -> result + cleanup
```

This graph describes declared services. It is not a required path for every utility: `csv.parse()` returns an
ordinary value, a bounded mapper returns an async iterable, and a Task handle carries its result in `done`. Choose by
the value and the lifetime that the task needs. Compilation checks the declared graph; it does not transpile code,
open resources, bind a port or prove that a deployed endpoint is reachable.

## Who owns what

| Concept                                                                  | Owner                                   | Role                                              |
| ------------------------------------------------------------------------ | --------------------------------------- | ------------------------------------------------- |
| Request input, cookies, headers, response representations, RFC 9457 problems | `@kaiju-ind/http/{request,cookie,response,problem}` | Protocol values and body completion        |
| Method, path, input and result definitions                               | `@kaiju-ind/server/endpoint`            | Import-safe API facts                             |
| Context producers, consumers and lanes                                   | `@kaiju-ind/server/middleware`          | Declared order and live callbacks                 |
| Binding, graph checks, resource and request lifetime                     | `@kaiju-ind/server/service`             | `define -> implement -> compile -> create`        |
| Routing and host middleware                                              | `@kaiju-ind/server/http`                | Native `Request`/`Response` composition           |
| Route ownership and forwarding                                           | `@kaiju-ind/server/gateway`             | A gateway is the union of its services            |
| OpenAPI                                                                  | `@kaiju-ind/server/endpoint/openapi`, `/gateway/openapi`, `service.openapi` | Generated from the compiled graph |
| An existing Hono application                                             | `@kaiju-ind/hono`                       | Optional adapter, not the service compiler        |

A compiled service validates input once and hands the handler a typed `input`. A second validator on the same path,
such as Hono's `c.req.valid()`, creates a second owner of the same rule.

Responses are declared HTTP representations; problems are public HTTP failures. A generic `result`, an expected
`failure`, an unexpected `fault` and an HTTP problem have different roles. Keep them apart even when their payloads
look alike.

## One complete service

This composition type-checks and runs against `@kaiju-ind/server` 1.0.0 and `@kaiju-ind/http` 1.0.0. The two polyfill
imports belong to the host when the runtime lacks Temporal or disposal, never to an import-safe definition.

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
	id: 'greeting.ok',
	description: 'A greeting for the supplied name.',
});
const Greet = endpoint.get({ id: 'greeting.get', path: '/greeting', query: QuerySchema, responses: [Greeting] });
const Api = service.define({ id: 'greeting-api', path: '/api', endpoints: [Greet] });
const implementation = service.implement(Api, {
	endpoints: [
		endpoint.handler(Greet, ({ input }) => response.create(Greeting, { message: `Hello, ${input.query.name}!` })),
	],
});
await using runtime = service.create(service.compile(implementation), { host: {} });
const result = await runtime.fetch(new Request('https://service.invalid/api/greeting?name=Sam'));
console.log(result.status, await result.text()); // 200 {"message":"Hello, Sam!"}
```

The request runs in process and starts no listener. The response body is read, and the runtime's disposal is
awaited.

## Resources and requirements

A `Context` scopes lifetime, cancellation, deadline, clock and identity. A resource collection owns what it creates;
callers borrow it. A handler receives `ctx`, `input`, `host` and its declared resources as separate arguments. Use
typed resource resolution from `@kaiju-ind/capability/resource`, not an untyped bag of dependencies.

Requirements (`@kaiju-ind/capability/requirement`) declare host policy, and the host decides what is active.
Permission, entitlement, quota and placement are different families. Do not cache one caller's authorization in a
shared resource.

## Effects are announcements

`@kaiju-ind/capability/effect` declares a side effect and `effect.emit()` hands an occurrence to an accepting emitter.
It is not the Effect TypeScript library, and it is not optional telemetry. A successful emit means the emitter accepted
responsibility under its own contract. A business write and its announcement are atomic only through a transactional
outbox (`@kaiju-ind/storage/outbox/postgres`); an in-memory emitter proves nothing about a crash.

## Queries are checked data

`query.define()` declares the fields, operators, sort and pagination that a caller may use; the definition's `parse()`
checks a request against them. Parsing does not execute anything. An adapter, such as `@kaiju-ind/query/postgres`,
executes the checked query and must reject what it cannot express. Parsing proves nothing about SQL, tenant
authorization, cursor consistency or transactions.

## Integration and proof

1. Pin the package version in the consumer and read its installed `exports`.
2. Read the package README's complete example, then the public types of the operation.
3. Compose only the level that the task needs; keep definitions inert and hosts explicit.
4. Test the import and type inference, the request, its rejection path, identity, cancellation and cleanup.

`build-apis` owns service and gateway behavior, `build-data` owns query execution, `build-workflows` owns durable
execution and `build-libraries` owns a change to a reusable API.

## Sources and freshness

Inspected 2026-11-22: the published `@kaiju-ind/server`, `http`, `query`, `capability`, `duration` and `dispose`
packages and the Kaiju-Ind/utils server, HTTP, query and effect guides. The example above was type-checked and run
against those releases.
