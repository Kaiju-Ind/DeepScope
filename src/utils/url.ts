/** Display-safe URL parts used by dense extension surfaces. */
export interface UrlParts {
	/** Host and optional port without protocol or credentials. */
	readonly host: string;
	/** Path, query, and hash retained as the page-specific identity. */
	readonly path: string;
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

/** Split an absolute URL into a stable host and page-specific display path. */
export function parts(value: string): UrlParts {
	try {
		const parsed = new URL(value);
		const path = `${parsed.pathname}${parsed.search}${parsed.hash}`;
		return { host: parsed.host, path: path === '/' ? '/' : path };
	} catch {
		return { host: value, path: '' };
	}
}
