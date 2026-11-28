/**
 * URL operations intentionally avoid browser-global names such as `document`, `location`, and `origin`.
 *
 * Extension bundles can scope-hoist utility exports beside browser globals. A previous `document()`
 * export was assigned the generated identifier later used for the DOM `document`, which made the
 * generated side panel call `getElementById()` on the URL helper instead of the DOM object.
 */
/** Display-safe URL parts used by dense extension surfaces. */
export interface UrlPartsType {
	/** Host and optional port without protocol or credentials. */
	readonly host: string;
	/** Pathname without query or fragment. */
	readonly pathname: string;
	/** Query text including the leading `?`, when present. */
	readonly search: string;
	/** Fragment text including the leading `#`, when present. */
	readonly hash: string;
	/** Number of query parameters represented by the URL. */
	readonly parameterCount: number;
}

/** Return the origin for an absolute URL. */
export function getOrigin(value: string): string {
	return new globalThis.URL(value).origin;
}

/** Return the origin when the input is an absolute URL. */
export function getOriginOrNull(value: string): string | null {
	try {
		return getOrigin(value);
	} catch {
		return null;
	}
}

/** Return the document URL while ignoring hash-only navigation noise. */
export function withoutHash(value: string): string {
	const parsed = new globalThis.URL(value);
	parsed.hash = '';
	return parsed.href;
}

/** Compare loaded document URLs while ignoring hash-only navigation noise. */
export function sameDocument(left: string, right: string): boolean {
	try {
		return withoutHash(left) === withoutHash(right);
	} catch {
		return false;
	}
}

/** Split an absolute URL into host and page-specific display parts. */
export function getParts(value: string): UrlPartsType {
	try {
		const parsed = new globalThis.URL(value);
		const pathname = parsed.pathname || '/';
		return {
			host: parsed.host,
			pathname,
			search: parsed.search,
			hash: parsed.hash,
			parameterCount: parsed.searchParams.size,
		};
	} catch {
		return { host: value, pathname: '', search: '', hash: '', parameterCount: 0 };
	}
}
