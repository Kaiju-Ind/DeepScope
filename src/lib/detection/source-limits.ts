/**
 * Bounded signal limits shared by collectors, validation, and emission.
 *
 * Detection runs over page-owned content, so every broad source has a hard cap
 * before it reaches storage or popup explanations. Keeping these limits in a
 * small module lets hot-path helpers import them without loading the full rule
 * registry.
 */
export const SOURCE_LIMITS = {
	htmlChars: 200_000,
	textChars: 80_000,
	scriptSrc: 300,
	stylesheetHref: 300,
	resourceUrls: 500,
	requestUrls: 500,
	linkTags: 200,
	storageKeys: 200,
	scriptContentItems: 200,
	stylesheetContentItems: 200,
	scriptContentChars: 40_000,
	stylesheetContentChars: 40_000,
	scriptContentTotalChars: 320_000,
	stylesheetContentTotalChars: 240_000,
	jsGlobals: 6_000,
	jsGlobalValueChars: 500,
	robotsTxtChars: 40_000,
	headers: 80,
	headerValueChars: 1_000,
	probeResults: 50,
	metaValueChars: 500,
	metaValuesPerKey: 5,
	cookieNames: 200,
	evidenceValueChars: 160,
} as const;
