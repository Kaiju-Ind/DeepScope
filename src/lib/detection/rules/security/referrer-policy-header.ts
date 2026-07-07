import type { TechnologyDefinition } from '../../types';

/**
 * Detects the `referrer-policy` response header from captured page or HAR response
 * surfaces. Security headers are emitted as technology cards only when the
 * browser actually receives the policy, not when policy names appear in copy.
 */
export const referrerPolicyHeaderTechnologyDefinition = {
	id: "referrer-policy-header",
	name: "Referrer Policy Header",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy",
	description: "Referrer Policy controls how much source URL information browsers send when navigating or fetching subresources.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "referrer-policy-header:header:main-document",
			kind: "header",
			key: "referrer-policy",
			valuePattern: /^(?:no-referrer|no-referrer-when-downgrade|origin|origin-when-cross-origin|same-origin|strict-origin|strict-origin-when-cross-origin|unsafe-url)$/i,
			confidence: 95,
			description: "Main document response includes the Referrer Policy Header policy header.",
		},
		{
			id: "referrer-policy-header:responseHeader:captured-response",
			kind: "responseHeader",
			key: "referrer-policy",
			valuePattern: /^(?:no-referrer|no-referrer-when-downgrade|origin|origin-when-cross-origin|same-origin|strict-origin|strict-origin-when-cross-origin|unsafe-url)$/i,
			confidence: 90,
			description: "Captured response includes the Referrer Policy Header policy header.",
		},
	],
} as const satisfies TechnologyDefinition;
