# Custom ClickHouse Drizzle-like adapter design

## Contents

- Status and evidence
- Capability matrix
- Module architecture
- Schema DSL
- Query AST and dialect
- Driver, session, and results
- Writes and mutations
- Migration and seed system
- Public API shape
- Unsupported semantics
- Test matrix
- Delivery sequence
- Sources and freshness

## Status and evidence

The uploaded Kaiju `libs/clickhouse` package is an inspectable custom adapter, not a verified package published for general use. Its source implements native ClickHouse columns, engine/table metadata, a Drizzle-SQL-based dialect, select/insert/mutation builders, a session and database facade, migration snapshots/diffs/generation/application, seed execution, an Optique CLI, and live integration tests.

Do not invent an import specifier for it. Reuse the architecture only after confirming the consuming repository contains or publishes the package.

## Capability matrix

Use an explicit matrix in the package documentation and release gates:

| Surface | Uploaded implementation | Required production proof |
|---|---|---|
| native table/columns | implemented | DDL and round-trip breadth |
| MergeTree engine helpers | implemented | server-version grammar tests |
| settings, codecs, TTL, indexes, projections | implemented | snapshot/diff/live DDL |
| select/CTE/joins/sets | implemented | SQL goldens and live results |
| `PREWHERE`, `FINAL`, `SAMPLE`, `QUALIFY`, totals, limit-by, settings | implemented | version matrix |
| prepared placeholders | implemented over compiled queries | typed binding and repeated execution |
| streaming iterator | implemented | early-return disposal/backpressure |
| values insert | implemented through native client | batch/type/default behavior |
| insert-select | implemented | live integration |
| `ALTER UPDATE/DELETE` mutation | implemented and requires `WHERE` | async completion/error behavior |
| multi-statement transaction | explicitly rejected | rejection test remains |
| relational query API | not established | do not advertise |
| FK/unique OLTP constraints | not ClickHouse semantics | do not emulate in types |
| `RETURNING` parity | not established | do not advertise |
| snapshot/diff/generate | implemented | transition/property tests |
| migration apply/history | implemented | interrupted-file repair |
| introspection/push/studio | not established | mark unsupported |
| seed journal/hash | implemented | crash/retry/idempotency |

## Module architecture

Recommended ownership:

```text
schema/
  columns.ts       native builders, encode/decode, DDL metadata
  engines.ts       structured engine arguments
  table.ts         ClickHouse table identity and physical config
  ddl.ts           CREATE TABLE renderer
params.ts          bound value + ClickHouse type identity
dialect.ts         Drizzle SQL AST -> ClickHouse SQL
session.ts         prepare/execute/iterate + result mapping
result.ts          ordered selection and decoder mapping
select.ts          typed SELECT builder
insert.ts          values and insert-select
mutation.ts        ALTER UPDATE/DELETE with safety guard
db.ts              public facade + unsafe escape hatch + close
migrations/        snapshot, diff, types, SQL splitting, runner
kit/               config loader and generation filesystem adapter
seeds/             seed definition, hash/history, runner
cli/               generate/migrate/seed/config commands and man page
```

Keep the native client behind a structural `ClickHouseClientLike` interface so unit tests do not require a server. Avoid exporting Drizzle internal compiler types as the adapter's public contract where a small structural interface suffices.

## Schema DSL

The uploaded package attaches a ClickHouse-specific table config to a Drizzle `Table` subclass and uses native `ColumnBuilder`/`Column` subclasses. The table config covers:

- engine;
- `PARTITION BY`, `ORDER BY`, `PRIMARY KEY`, and `SAMPLE BY` expressions;
- TTL actions;
- data-skipping indexes;
- projections;
- engine settings and comments;
- database and cluster.

Use typed engine arguments:

```ts
type EngineArgument =
  | { kind: "identifier"; value: string }
  | { kind: "string"; value: string }
  | { kind: "number"; value: number }
  | { kind: "expression"; value: string };
```

This prevents a replica path string, a version column identifier, a number, and `cityHash64(id)` from sharing an unsafe string-rendering rule. Keep `unsafeEngine()` or raw expression entrypoints visibly unsafe and limited to trusted static fragments.

Example design, using names from the uploaded local source only:

```ts
const events = clickhouseTable(
  "events",
  {
    id: chUInt64("id"),
    tenantId: chUUID("tenant_id"),
    occurredAt: chDateTime64("occurred_at", { precision: 3, timezone: "UTC" }),
    kind: chLowCardinality("kind", chString()),
  },
  (column) => ({
    engine: mergeTree(),
    partitionBy: sql`toYYYYMM(${column.occurredAt})`,
    orderBy: [column.tenantId, column.occurredAt, column.id],
  }),
);
```

Verify actual factory signatures before copying this example: the source may evolve.

Column coverage should be grouped and tested by behavior:

- integer widths and signedness, big integer mapping;
- floating, Decimal, Boolean;
- String, FixedString, UUID;
- Date, Date32, DateTime, DateTime64/timezone;
- Enum8/Enum16;
- LowCardinality, Nullable;
- Array, Map, Tuple, Nested;
- IPv4/IPv6;
- JSON/Object/Variant where server support permits;
- aggregate-function state types;
- aliases, materialized/default expressions, codecs, comments, statistics.

## Query AST and dialect

Build on Drizzle's SQL AST, not a second ad hoc expression language. The dialect must compile ClickHouse clause order exactly:

```text
WITH -> SELECT -> FROM -> SAMPLE -> JOIN/ARRAY JOIN -> PREWHERE -> WHERE
-> GROUP BY -> HAVING -> QUALIFY -> ORDER BY -> LIMIT BY -> LIMIT/OFFSET
-> SETTINGS -> FORMAT
```

Keep format ownership in the session when the result mapper requires `JSONCompactEachRow`; avoid allowing user `FORMAT` to invalidate decoding accidentally.

Parameterize values with ClickHouse's typed query parameters. Preserve explicit type identity for placeholders and column-bound parameters. Reject unsafe inferred types when ambiguity would change semantics.

Test the dialect independently of transport:

```ts
const compiled = query
  .prewhere(eq(events.tenantId, sql.placeholder("tenant")))
  .where(gte(events.occurredAt, from))
  .orderBy(desc(events.occurredAt), desc(events.id))
  .limit(100)
  .settings({ max_execution_time: 10 })
  .toSQL();
```

Assert exact SQL, named parameter values, and ClickHouse parameter types.

## Driver, session, and results

Define four native operations:

- `query({ query, format, query_params, clickhouse_settings, query_id, abort_signal })`;
- `command(...)` for DDL/mutations;
- `insert({ table, values, format, ... })` for batches;
- `close()` for lifetime.

The uploaded structural interface also models a result set with `json()`, `stream()`, and `close()`. The adapter session should close it after array materialization and in an iterator's `finally` path.

Use positional rows such as `JSONCompactEachRow` only when `orderSelectedFields(...)` and result positions are deterministic. Apply each selected column's decoder. For outer joins, return a nested joined object as `null` when every selected field for that joined table is null; do not leave a misleading object full of null values.

The database factory should return both the typed facade and reachable native client ownership. Logger hooks should receive SQL and parameters but redact secrets and high-volume payloads.

## Writes and mutations

Values inserts should:

- require at least one row;
- map property names to physical columns;
- run column encoders;
- omit server-default columns when absent;
- reject runtime SQL defaults the native insert format cannot express;
- avoid serializing `undefined` as a value accidentally;
- support request settings, query IDs, and cancellation;
- encourage batches and idempotency tokens.

Insert-select compiles through the dialect and executes as a command. It is not the same transport as `client.insert(values)`.

Mutation builders must require `WHERE` before execution. Accept only known target columns, encode assignments through those columns, and expose settings such as synchronous mutation waiting deliberately.

Do not add `update()`/`delete()` names that imply immediate row-level OLTP semantics without documenting that they issue ClickHouse mutations.

## Migration and seed system

The uploaded design snapshots physical table metadata and diffs named columns, indexes, projections, TTL, settings, and layout keys. It classifies operations:

- `safe`: additive/retryable DDL;
- `caution`: type/index/projection/TTL work needing explicit acceptance;
- `destructive`: data/object removal;
- `manual`: physical layout changes requiring replacement/backfill/swap.

Generation writes a pending metadata record before atomically installing SQL, snapshot, and journal. Preserve this crash-recovery protocol. Never advance the snapshot when risk gates reject the plan.

The migration runner:

- sorts and de-duplicates identifiers;
- hashes normalized statements;
- rejects applied-ID hash mismatch by default;
- executes statements one at a time with stable query-ID prefixes;
- records successful or failed attempts;
- cannot roll back prior statements in the file.

Seeds need their own identifiers/hashes/history. Make callbacks idempotent or rely on a proven ClickHouse deduplication guarantee. A failed seed may have written data before the process died.

## Public API shape

Export by capability, not internal file layout:

```ts
// runtime
export { drizzleClickHouse, alias, bindValue } from "./src/index.ts";
export type { ClickHouseDatabase, ClickHouseQueryOptions } from "./src/index.ts";

// schema
export { clickhouseTable, mergeTree, replacingMergeTree } from "./src/schema/index.ts";

// migration generation/application
export { defineClickHouseConfig, generateClickHouseMigration } from "./src/kit/index.ts";
export { migrateClickHouse } from "./src/migrations/index.ts";
```

These paths illustrate ownership. Use the actual package export map, not deep imports, in consumers.

## Unsupported semantics

Reject or clearly omit:

- transactional ORM sessions and multi-statement rollback;
- foreign-key or unique-constraint enforcement not provided by ClickHouse;
- PostgreSQL/MySQL conflict and returning clauses;
- relational-query API unless fully implemented;
- implicit row-by-row save/delete methods;
- schema introspection, push, Studio, or Kit compatibility not implemented;
- automatic migration of engine/sorting/partition keys;
- exactly-once claims spanning external effects;
- server features not covered by the supported version matrix.

An explicit throw is a feature. Silent fallback to unsafe SQL is not.

## Test matrix

Unit and property tests:

- every engine argument renderer and injection rejection;
- every column type DDL plus encode/decode;
- table DDL for partition/order/primary/sample/TTL/index/projection/settings;
- SQL clause order and parameter types;
- aliases, CTEs, joins, set operations, partial/nested selections;
- prepared execution and result mapping;
- iterator early close;
- empty/mixed/default inserts;
- mutation missing-`WHERE` rejection;
- snapshot determinism and diff transitions;
- SQL statement splitting across strings/comments;
- pending-generation recovery;
- migration/seed hash mismatch and failed history;
- explicit transaction rejection and client close.

Live container tests:

- create all supported DDL against minimum and target servers;
- values insert, insert-select, select, join, aggregation, and prepared query;
- timestamps/timezones, UInt64/Decimal, nested types;
- synchronous mutation and system-table observation;
- async insert/dedup/retry behavior;
- materialized view and projection use;
- clean migration, representative upgrade, interrupted migration repair;
- restart persistence and client shutdown.

## Delivery sequence

1. Publish a capability matrix and supported server/Drizzle/client versions.
2. Stabilize native client and parameter interfaces.
3. Complete schema/DDL breadth with container tests.
4. Stabilize select/result mapping and streaming disposal.
5. Stabilize inserts and bounded mutations.
6. Freeze snapshot schema version and build exhaustive diff tests.
7. Harden generation/history/crash recovery.
8. Add seeds, CLI, man/completion, and configuration tracing.
9. Run compatibility consumers outside the monorepo.
10. Only then declare a stable public package.

## Sources and freshness

- Attachment: `kaiju-site-scope(17).zip/libs/clickhouse/src` and `tests`, inspected 2026-07-17. This is the direct source for the described implementation.
- Primary connected systems: [ClickHouse documentation](https://clickhouse.com/docs/) and [Drizzle ORM documentation](https://orm.drizzle.team/docs/overview), verified 2026-07-17 for public database and ORM contracts.

The adapter's package identity, publication status, compatibility range, and external API are unverified and version-sensitive. Do not invent an import specifier or claim parity with Drizzle dialects that have upstream support.
