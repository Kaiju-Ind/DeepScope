import type { TechnologyDefinition } from '../../types';

/**
 * Detects the `feature-policy` response header from captured page or HAR response
 * surfaces. Security headers are emitted as technology cards only when the
 * browser actually receives the policy, not when policy names appear in copy.
 */
export const featurePolicyTechnologyDefinition = {
	id: "feature-policy",
	name: "Feature Policy",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy",
	description: "Legacy Feature Policy headers restrict access to browser capabilities before the modern Permissions-Policy syntax.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "feature-policy:header:main-document",
			kind: "header",
			key: "feature-policy",
			valuePattern: /(?:^|;)\s*[a-z-]+\s+(?:'self'|'none'|\*)/i,
			confidence: 95,
			description: "Main document response includes the Feature Policy policy header.",
		},
		{
			id: "feature-policy:responseHeader:captured-response",
			kind: "responseHeader",
			key: "feature-policy",
			valuePattern: /(?:^|;)\s*[a-z-]+\s+(?:'self'|'none'|\*)/i,
			confidence: 90,
			description: "Captured response includes the Feature Policy policy header.",
		},
	],
} as const satisfies TechnologyDefinition;
