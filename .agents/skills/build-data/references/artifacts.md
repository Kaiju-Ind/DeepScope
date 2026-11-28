# Data artifacts, manifests, and staging

Use this reference when a pipeline writes JSONL, Parquet, RDF, CSV, snapshots, profiles, or other files that must survive process loss or feed another system. A file extension is not a contract. The artifact contract includes identity, schema, commit protocol, provenance, reader compatibility, retention, and recovery.

## Contents

- Authority and lifecycle
- Artifact identity and directory layout
- JSONL contracts
- Parquet contracts
- Raw evidence and derived records
- Completion manifests
- Atomic publication and resume
- Configuration model
- Integration sequence
- Failure and recovery
- Test matrix
- Executable verification
- Deliberate exclusions
- Sources and freshness

## Authority and lifecycle

Classify every artifact before choosing its format:

| Class | Authority | Required recovery path |
|---|---|---|
| Raw capture | Immutable evidence of what a source returned | Reparse with a newer parser without refetching |
| Normalized staging | Derived, versioned interchange | Regenerate from raw capture and parser version |
| Transfer artifact | Contract between independently deployed systems | Compatibility test with every supported reader |
| Checkpoint | Authority for committed progress only | Reject or migrate incompatible state |
| Projection input | Rebuild source for a search, graph, or analytical sink | Replay deterministically and reconcile |
| Report/export | User-facing result | Reproduce from named source and query versions where required |

Do not let a convenient staging file silently become the source of truth. Record which upstream object, transaction, or retrieval produced it and whether it is replaceable.

The retained PopModern code demonstrates both the useful intent and the incomplete implementation. It writes raw MediaWiki pages, daily staging JSONL, Parquet, RDF, Typesense documents, profiles, run-state YAML, and metrics. However, many writes are best-effort, several exceptions are swallowed, daily JSONL is appended across runs, and the run state contains counts rather than committed artifact identities. Treat that code as counterexample evidence for why a manifest is necessary, not as a production commit protocol to copy.

## Artifact identity and directory layout

An artifact identity should be stable enough to answer “is this the same input and transformation?” without trusting a filename:

```ts
interface ArtifactIdentity {
  runId: string
  artifactId: string
  kind: 'raw' | 'normalized' | 'checkpoint' | 'projection-input' | 'export'
  source: {
    system: string
    objectId: string
    version?: string
    etag?: string
    retrievedAt: string
  }
  schema: { name: string; version: string }
  producer: { name: string; version: string; configDigest: string }
  content: { sha256: string; bytes: number; records?: number }
}
```

Prefer run-isolated directories over date-only append targets:

```text
artifacts/
  mediawiki/
    2026-07-17T142233Z_01J.../
      raw/
      normalized/
      rejected/
      profile/
      manifest.in-progress.json
      manifest.json
```

A date is not a run identity. Two retries on the same date must not ambiguously append into one logical artifact unless the append log has its own transactional framing and committed offsets.

## JSONL contracts

JSONL is useful for line-oriented replay, streaming exchange, and append-only evidence. Define all of these:

- UTF-8 encoding and exactly one serialized JSON value per terminated line;
- object envelope and schema version per record or per artifact manifest;
- whether blank lines are forbidden, ignored, or meaningful;
- maximum line size and decompression limits;
- ordering and duplicate rules;
- newline and control-character handling through the JSON serializer, never manual interpolation;
- compression format and whether concatenated compressed members are supported;
- corrupt/truncated final-line policy;
- committed byte offset or record identity used for resume;
- file checksum and, for append logs, segment checksums.

Use an envelope when provenance or multiple record types must travel with each item:

```json
{"schema":"mediawiki.toy.normalized","version":2,"record_id":"tfwiki:123:456","source":{"page_id":123,"revision_id":456},"data":{"name":"Example"}}
```

Do not infer a production table schema by scanning the first thousand JSONL lines. The retained PopModern `pg_loader.py` does exactly that, flattens top-level keys, stringifies through CSV, skips invalid JSON, and interpolates table and column identifiers. Its own docstring says it is unsuitable for nested production structures. A production loader requires an explicit schema, safe identifier ownership, typed conversion, a rejected-record channel, and a count/hash reconciliation.

## Parquet contracts

Parquet is useful for typed columnar batches, analytical staging, and interoperability. Specify:

- explicit Arrow/Parquet schema rather than relying on whichever records appear first;
- nullability and distinction between absent, null, empty, and defaulted values;
- logical types for timestamps, dates, decimals, UUID-like values, and nested fields;
- timestamp unit and timezone semantics;
- decimal precision and scale;
- dictionary encoding choices for bounded-cardinality fields;
- compression codec and supported reader versions;
- target row-group size based on scan and memory behavior;
- partition keys based on common pruning, without creating tiny partitions;
- field-add, field-remove, rename, widening, and incompatible-change policy;
- empty artifact behavior and whether an empty schema is valid.

The retained `write_records_to_parquet()` materializes `list(records)` and derives a table from the resulting Python objects. Its comment correctly warns that large streams need chunking. Do not call that helper bounded merely because the surrounding pipeline is iterative. Use a `ParquetWriter` or equivalent and flush bounded record batches:

```py
writer = pq.ParquetWriter(temp_path, declared_schema, compression="zstd")
try:
    for batch in bounded_batches(records, 10_000):
        table = pa.Table.from_pylist(batch, schema=declared_schema)
        writer.write_table(table, row_group_size=10_000)
finally:
    writer.close()
```

Validate the resulting metadata and read it with every supported consumer. A successful writer call does not prove schema compatibility.

## Raw evidence and derived records

Raw capture should preserve enough context to replay and audit:

- retrieval timestamp and source endpoint;
- source object identity, revision, ETag, cursor, or version;
- request parameters that affect the response;
- response status and relevant headers;
- content digest and byte count;
- license, privacy, retention, and redaction classification;
- collection error if no payload was obtained.

Normalized records should add:

- deterministic record identity;
- parser, cleaner, mapper, ontology, and schema versions;
- raw artifact and source-object references;
- normalization warnings and rejected-field reasons;
- event time separately from processing time;
- transformation configuration digest.

Never overwrite raw capture during normalization. Never call a normalized field “source” if it actually identifies the parser or current website.

## Completion manifests

The manifest is the durable statement of what committed. A useful model is:

```ts
interface RunManifest {
  schemaVersion: 1
  runId: string
  state: 'in-progress' | 'complete' | 'failed' | 'cancelled'
  startedAt: string
  finishedAt?: string
  inputs: ArtifactIdentity[]
  stages: Array<{
    name: string
    version: string
    state: 'pending' | 'running' | 'complete' | 'failed' | 'skipped'
    checkpoint?: { inputIdentity: string; committedOffset: string }
    outputs: ArtifactIdentity[]
    accepted: number
    rejected: number
    errors: number
  }>
  sinks: Array<{
    name: string
    required: boolean
    state: 'pending' | 'complete' | 'failed'
    receipt?: Record<string, unknown>
  }>
}
```

Counts alone are not completion evidence. Include output identity, checksum, schema version, and sink receipt/checkpoint. A global `errors: 3` does not reveal which records failed, whether a required sink failed, or whether retry is safe.

## Atomic publication and resume

For local filesystems:

1. Write to a run-scoped temporary path on the same filesystem.
2. Flush the application writer.
3. Close it and fsync the file when durability requires it.
4. Validate content, counts, and checksum.
5. Atomically rename to the final artifact path.
6. Atomically publish the final manifest last.

For object storage, a rename may be copy-plus-delete and not atomic. Write immutable content-addressed or run-scoped objects and publish a small final manifest/pointer after validation. Readers only consume objects named by a complete manifest.

A checkpoint must describe committed output. Advancing the input cursor before the file segment or sink batch commits can lose data. Advancing it afterward may replay the last unit after a crash, so the sink must accept deterministic identities or another idempotency mechanism.

On resume:

- verify input identity and producer/schema/config versions;
- validate the last committed artifact segment and checksum;
- reject ambiguous or incompatible checkpoints;
- replay from the last committed checkpoint;
- reconcile outputs before marking the resumed run complete.

## Configuration model

Keep artifact configuration explicit and validated. The consumer may choose Zod, Standard Schema, Effect Config, Pydantic, or another owner; this reference does not require one validator.

```yaml
artifacts:
  root: ./var/artifacts
  run_id: auto
  raw:
    retain_days: 90
    compression: gzip
  jsonl:
    schema: mediawiki.toy.normalized
    version: 2
    max_line_bytes: 1048576
  parquet:
    compression: zstd
    rows_per_group: 10000
    schema_file: schemas/toy.arrow.json
  publication:
    required_fsync: false
    manifest_version: 1
```

Record the resolved configuration digest in the manifest. Redact secrets before recording configuration.

## Integration sequence

```text
discover source version
  -> create run identity and in-progress manifest
  -> capture immutable raw evidence
  -> validate/decode into bounded batches
  -> normalize with explicit schema and provenance
  -> quarantine rejected records
  -> write staged temporary artifacts
  -> close, validate, checksum, and publish artifacts
  -> commit sink receipts and checkpoints
  -> publish final complete manifest
```

If a downstream Typesense, QLever, ClickHouse, or PostgreSQL load is required, the manifest remains incomplete until the required sink receipt and reconciliation succeed.

## Failure and recovery

| Failure | Unsafe behavior | Recovery contract |
|---|---|---|
| Process dies mid-JSONL line | Append from attempted input offset | Truncate/discard uncommitted segment and resume from committed identity |
| Parquet writer dies before footer | Publish unreadable file | Keep temporary name; final manifest never references it |
| Schema changes during retry | Coerce old checkpoint silently | Reject or run a named checkpoint/schema migration |
| Invalid source record | Broad catch and continue | Quarantine raw identity, safe reason, stage, and retry disposition |
| Optional profile fails | Hide failure in global success | Mark optional stage failed and keep run complete only by explicit policy |
| Required projection load fails | Print error then “complete” | Keep run incomplete and persist retryable sink state |
| Daily file already exists | Append another run ambiguously | Use run identity or an append-log segment protocol |
| Checksum mismatch | Reprocess downstream anyway | Quarantine artifact and rebuild from its authoritative input |

## Test matrix

Test at least:

- zero records, one record, and a batch limit plus one;
- embedded newlines, Unicode normalization, very large values, and invalid encoding;
- truncated JSONL final line and corrupt middle line;
- stable Parquet schema with all-null early batches;
- decimals, timestamps, nested values, and reader round trips;
- process interruption before close, after close, before rename, and before manifest publication;
- duplicate delivery and replay of the last committed batch;
- schema/config/source-version mismatch on resume;
- required versus optional sink failure;
- disk full, permission denied, and object-store timeout;
- memory ceiling against a synthetic source larger than RAM;
- artifact retention without deleting objects still named by a live manifest.

## Executable verification

Adapt commands to the repository and installed tools:

```bash
jq -c . artifacts/run/normalized/*.jsonl >/dev/null
wc -l artifacts/run/normalized/*.jsonl
sha256sum -c artifacts/run/checksums.sha256
```

Use PyArrow or the chosen reader to assert the declared schema, row groups, counts, statistics, and a full scan of test artifacts. Then run the real downstream loader against a disposable store and compare accepted, rejected, and projected identities with the final manifest.

Verification is incomplete until an interruption test proves that no final manifest names a partial file and resume does not skip a committed record.

## Deliberate exclusions

- Do not require JSONL or Parquet when a database transaction or object is the actual appropriate commit mechanism.
- Do not prescribe Zod, LogTape, Effect, Python, Deno, or a particular storage provider. Preserve the consumer's chosen schema, logging, runtime, and storage owners.
- Do not infer schema from sample records for a production load.
- Do not treat a date-based filename, file existence, or non-zero size as identity or completion.
- Do not swallow required-stage errors to keep a batch moving.
- Do not promise exactly-once processing from a checkpoint alone.
- Do not publish temporary or partially validated artifacts.

## Sources and freshness

Grounded in the retained PopModern `DATA_PIPELINE.md`, `infra/mediawiki_ingest/etl_runner.py`, `infra/importer/utils/{parquet.py,pg_loader.py,profiling.py,state.py}`, the general importer and its JSONL/N-Triples sinks, reviewed 2026-07-17. The codebase is observational and includes acknowledged prototypes; its swallowed errors, materialized Parquet writes, inferred PostgreSQL loader, and non-transactional run state are counterexamples, not endorsed APIs. Format and storage-provider behavior must be rechecked against the versions installed by the consumer.
