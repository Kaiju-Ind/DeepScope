import type { TechnologyDefinition } from '../../types';

/**
 * Detects the `cross-origin-resource-policy` response header from captured page or HAR response
 * surfaces. Security headers are emitted as technology cards only when the
 * browser actually receives the policy, not when policy names appear in copy.
 */
export const crossOriginResourcePolicyTechnologyDefinition = {
	id: "cross-origin-resource-policy",
	name: "Cross-Origin Resource Policy",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy",
	description: "Cross-Origin Resource Policy tells browsers whether other origins may embed or read a response.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "cross-origin-resource-policy:header:main-document",
			kind: "header",
			key: "cross-origin-resource-policy",
			valuePattern: /^(?:same-origin|same-site|cross-origin)$/i,
			confidence: 95,
			description: "Main document response includes the Cross-Origin Resource Policy policy header.",
		},
		{
			id: "cross-origin-resource-policy:responseHeader:captured-response",
			kind: "responseHeader",
			key: "cross-origin-resource-policy",
			valuePattern: /^(?:same-origin|same-site|cross-origin)$/i,
			confidence: 90,
			description: "Captured response includes the Cross-Origin Resource Policy policy header.",
		},
	],
} as const satisfies TechnologyDefinition;
