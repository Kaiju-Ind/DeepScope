import type { TechnologyDefinition } from '../../types';

export const metaContentSecurityPolicyTechnologyDefinition = {
	id: "meta-content-security-policy",
	name: "Meta Content Security Policy",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/http-equiv",
	description: "Declares a Content Security Policy in document metadata. Header-delivered CSP is still preferred because meta CSP supports a narrower delivery model.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "meta-content-security-policy:meta:http-equiv",
			kind: "meta",
			key: "content-security-policy",
			valuePattern: new RegExp("\\b(?:default-src|script-src|style-src|img-src|connect-src|font-src|frame-ancestors|base-uri|object-src)\\b", "i"),
			confidence: 100,
			description: "Document declares Content-Security-Policy metadata.",
		},
	],
} as const satisfies TechnologyDefinition;
