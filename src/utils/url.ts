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
export function origin(value: string): string {
	return new URL(value).origin;
}

/** Return the origin when the input is an absolute URL. */
export function maybeOrigin(value: string): string | null {
	try {
		return origin(value);
	} catch {
		return null;
	}
}

/** Return the document URL while ignoring hash-only navigation noise. */
export function document(value: string): string {
	const parsed = new URL(value);
	parsed.hash = '';
	return parsed.href;
}

/** Compare loaded document URLs while ignoring hash-only navigation noise. */
export function same(left: string, right: string): boolean {
	try {
		return document(left) === document(right);
	} catch {
		return false;
	}
}

/** Split an absolute URL into host and page-specific display parts. */
export function parts(value: string): UrlPartsType {
	try {
		const parsed = new URL(value);
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
