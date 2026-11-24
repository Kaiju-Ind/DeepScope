// Vendored from Kaiju-Ind/Utils packages/collection/record/types.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
/** One statically known entry of a record type. Runtime enumeration may include additional keys and does not return this type. */
export type Entry<RecordType extends Readonly<Record<string, unknown>>> = {
	readonly [Key in Extract<keyof RecordType, string>]: readonly [Key, RecordType[Key]];
}[Extract<keyof RecordType, string>];
