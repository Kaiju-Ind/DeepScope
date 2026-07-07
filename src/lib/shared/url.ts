export function getOrigin(url: string): string {
	return new URL(url).origin;
}

export function tryGetOrigin(url: string): string | null {
	try {
		return getOrigin(url);
	} catch {
		return null;
	}
}

/** Compare the loaded document URL while ignoring hash-only navigation noise. */
export function getDocumentUrl(url: string): string {
	const parsed = new URL(url);
	parsed.hash = '';
	return parsed.href;
}

export function isSameDocumentUrl(left: string, right: string): boolean {
	try {
		return getDocumentUrl(left) === getDocumentUrl(right);
	} catch {
		return false;
	}
}