const SECRET_ASSIGNMENT_PATTERN = /\b((?:(?:access|refresh|id)?[-_ ]?token|authorization|password|passwd|secret|api[-_ ]?key|csrf|session)\s*[:=]\s*)(["']?)(?:Bearer\s+)?[^&\s"'<>}]+/gi;
const JWT_PATTERN = /\b[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g;
const EMAIL_PATTERN = /\b[^\s@<>"'&]+@[^\s@<>"'&]+\.[^\s@<>"'&]+\b/g;
const QUERY_VALUE_PATTERN = /([?&][^=&#\s"']+=)[^&#\s"']+/g;
const SENSITIVE_QUERY_VALUE_PATTERN = /([?&](?:(?:access|refresh|id)?[-_]?token|authorization|password|passwd|secret|api[-_]?key|csrf|session|code)=)[^&#\s"']+/gi;
const PHONE_PATTERN = /\b(?:\+?1[\s.-]?)?(?:\([0-9]{3}\)|[0-9]{3})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}\b/g;

/** Replace sensitive-looking scalars before values reach evidence or replay storage. */
export function redactEvidenceValue(value: string, maxVisibleChars = 160): string {
	const trimmed = value.trim();
	if (!trimmed) return '';
	return truncate(redactSensitiveFragments(trimmed).replace(QUERY_VALUE_PATTERN, '$1[redacted]'), maxVisibleChars);
}

/**
 * Redact diagnostics without hiding ordinary URL query values needed to debug routing.
 *
 * Diagnostic records keep non-secret query parameters such as locale, page, and
 * feature flags. Secret-like query keys, credentials, JWTs, email addresses, and
 * phone numbers remain redacted before the journal writes to extension storage.
 */
export function redactDiagnosticValue(value: string, maxVisibleChars = 400): string {
	const trimmed = value.trim();
	if (!trimmed) return '';
	return truncate(redactSensitiveFragments(trimmed).replace(SENSITIVE_QUERY_VALUE_PATTERN, '$1[redacted]'), maxVisibleChars);
}

/** Return true when an evidence scalar would not keep its original contents. */
export function hasSensitiveEvidenceFragment(value: string): boolean {
	return redactSensitiveFragments(value).replace(QUERY_VALUE_PATTERN, '$1[redacted]') !== value;
}

/** Redact sensitive fragments shared by evidence and diagnostics policies. */
function redactSensitiveFragments(value: string): string {
	const withoutSecretAssignments = value.replace(SECRET_ASSIGNMENT_PATTERN, (_match, prefix: string, quote: string) => `${prefix}${quote}[redacted]`);
	return withoutSecretAssignments.replace(JWT_PATTERN, '[redacted-jwt]').replace(EMAIL_PATTERN, '[redacted-email]').replace(PHONE_PATTERN, '[redacted-phone]');
}

/** Apply a caller-owned display/storage length after redaction. */
function truncate(value: string, maxVisibleChars: number): string {
	return value.length > maxVisibleChars ? value.slice(0, maxVisibleChars) : value;
}
