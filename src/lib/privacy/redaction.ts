const SECRET_ASSIGNMENT_PATTERN = /\b((?:(?:access|refresh|id)?[-_ ]?token|authorization|password|passwd|secret|api[-_ ]?key|csrf|session)\s*[:=]\s*)(["']?)(?:Bearer\s+)?[^&\s"'<>}]+/gi;
const JWT_PATTERN = /\b[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g;
const EMAIL_PATTERN = /\b[^\s@<>"'&]+@[^\s@<>"'&]+\.[^\s@<>"'&]+\b/g;
const QUERY_VALUE_PATTERN = /([?&][^=&#\s"']+=)[^&#\s"']+/g;
const PHONE_PATTERN = /\b(?:\+?1[\s.-]?)?(?:\([0-9]{3}\)|[0-9]{3})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}\b/g;

/** Replace sensitive-looking scalars before values reach evidence, replay, or storage. */
export function redactEvidenceValue(value: string, maxVisibleChars = 160): string {
	const trimmed = value.trim();
	if (!trimmed) {
		return '';
	}

	return truncateRedactedValue(redactSensitiveFragments(trimmed), maxVisibleChars);
}

/** Return true when a persisted scalar should not keep its original contents. */
export function hasSensitiveEvidenceFragment(value: string): boolean {
	return redactSensitiveFragments(value) !== value;
}

function redactSensitiveFragments(value: string): string {
	const withoutSecretAssignments = value.replace(
		SECRET_ASSIGNMENT_PATTERN,
		(_match, prefix: string, quote: string) => `${prefix}${quote}[redacted]`,
	);

	return withoutSecretAssignments
		.replace(JWT_PATTERN, '[redacted-jwt]')
		.replace(EMAIL_PATTERN, '[redacted-email]')
		.replace(PHONE_PATTERN, '[redacted-phone]')
		.replace(QUERY_VALUE_PATTERN, '$1[redacted]');
}

function truncateRedactedValue(value: string, maxVisibleChars: number): string {
	return value.length > maxVisibleChars ? value.slice(0, maxVisibleChars) : value;
}
