import type { TechnologyDefinition } from '../../types';

/**
 * Detects the `x-content-type-options` response header from captured page or HAR response
 * surfaces. Security headers are emitted as technology cards only when the
 * browser actually receives the policy, not when policy names appear in copy.
 */
export const xContentTypeOptionsTechnologyDefinition = {
	id: "x-content-type-options",
	name: "X-Content-Type-Options",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options",
	description: "X-Content-Type-Options tells browsers not to MIME-sniff responses when `nosniff` is sent.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "x-content-type-options:header:main-document",
			kind: "header",
			key: "x-content-type-options",
			valuePattern: /^nosniff$/i,
			confidence: 95,
			description: "Main document response includes the X-Content-Type-Options policy header.",
		},
		{
			id: "x-content-type-options:responseHeader:captured-response",
			kind: "responseHeader",
			key: "x-content-type-options",
			valuePattern: /^nosniff$/i,
			confidence: 90,
			description: "Captured response includes the X-Content-Type-Options policy header.",
		},
	],
} as const satisfies TechnologyDefinition;
