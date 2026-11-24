// Vendored from Kaiju-Ind/Utils packages/activity/selection.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
/** Physical host references and admission failures, shared by native providers. Importing creates no hosts. @module */
import { placement } from '@utils/workflow';

/** Validated portable identity of one host in one provider lifetime. */
export const HostReferenceSchema = placement.HostSchema;
/** Save with an exact executor reference; neither value grants authorization or reserves a host. */
export type HostReferenceType = placement.HostType;
/** Exact host selection failed without substitution. A busy host may be retried under a bounded application policy; a lost reference needs explicit recovery. */
export class HostSelectionError extends Error {
	/** Busy permits a bounded retry of the same identity; lost requires explicit recovery. */
	readonly code: 'busy' | 'lost';
	constructor(code: 'busy' | 'lost') {
		super(`Physical host is ${code}.`);
		this.name = 'HostSelectionError';
		this.code = code;
	}
}
