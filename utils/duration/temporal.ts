// Vendored from Kaiju-Ind/Utils packages/duration/temporal.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
/**
 * Use Temporal in an application without installing a global.
 *
 * This ponyfill exports the complete temporal-polyfill implementation. It
 * works when the runtime has no Temporal and keeps globalThis unchanged. Import
 * the explicit polyfill subpath instead when other libraries use global Temporal.
 *
 * @example
 * ```ts
 * import { Temporal } from '@utils/duration/temporal';
 * const departure = Temporal.Instant.from('2026-01-01T12:00:00Z');
 * console.log(departure.add({ minutes: 15 }).toString());
 * ```
 * @module
 */
import { Temporal } from 'temporal-polyfill/full/implementation';
export { Temporal };

/**
 * Native Temporal when the host supplies it, otherwise the local implementation.
 * This binding is selected once when the module loads and never installs globals.
 * Use it to share Duration's implementation choice in another portable utility.
 * The exported Temporal namespace remains available for types and explicit local
 * implementation use. Values from either implementation compose structurally.
 */
export const temporal: typeof Temporal = globalThis.Temporal ?? Temporal;
