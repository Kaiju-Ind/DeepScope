import type { NormalizedObservation } from "../../observations/index.ts";

/** Return exact routing keys in the same canonical form used when rules are indexed. */
export function getObservationRouteKeys(observation: NormalizedObservation): readonly string[] {
	if (!observation.key) {
		return [];
	}

	switch (observation.kind) {
		case 'header':
		case 'responseHeader':
		case 'requestHeader':
		case 'meta':
			return [canonicalHeaderKey(observation.key)];
		case 'link':
			return canonicalLinkRels(String(observation.attributes?.rel ?? observation.key));
		default:
			return [observation.key];
	}
}

/** Lowercase header-like keys because matching treats those names case-insensitively. */
export function canonicalHeaderKey(key: string): string {
	return key.toLowerCase();
}

/** Normalize one link relation token using the same semantics as `matchLinkRule`. */
export function canonicalLinkRel(rel: string): string {
	return rel.trim().toLowerCase();
}

/** Return unique relation tokens because a link can declare several `rel` values. */
function canonicalLinkRels(rel: string): readonly string[] {
	return [...new Set(rel.split(/\s+/).map(canonicalLinkRel).filter(Boolean))];
}
