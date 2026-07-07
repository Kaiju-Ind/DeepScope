import type { TechnologyDefinition } from '../../types';

/**
 * Detects the `x-frame-options` response header from captured page or HAR response
 * surfaces. Security headers are emitted as technology cards only when the
 * browser actually receives the policy, not when policy names appear in copy.
 */
export const xFrameOptionsTechnologyDefinition = {
	id: "x-frame-options",
	name: "X-Frame-Options",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options",
	description: "X-Frame-Options is a legacy clickjacking defense that controls whether a page can be framed.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "x-frame-options:header:main-document",
			kind: "header",
			key: "x-frame-options",
			valuePattern: /^(?:DENY|SAMEORIGIN|ALLOW-FROM\s+.+)$/i,
			confidence: 95,
			description: "Main document response includes the X-Frame-Options policy header.",
		},
		{
			id: "x-frame-options:responseHeader:captured-response",
			kind: "responseHeader",
			key: "x-frame-options",
			valuePattern: /^(?:DENY|SAMEORIGIN|ALLOW-FROM\s+.+)$/i,
			confidence: 90,
			description: "Captured response includes the X-Frame-Options policy header.",
		},
	],
} as const satisfies TechnologyDefinition;
