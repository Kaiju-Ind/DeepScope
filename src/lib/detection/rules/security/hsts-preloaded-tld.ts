import type { TechnologyDefinition } from '../../types';

export const hstsPreloadedTldTechnologyDefinition = {
	id: "hsts-preloaded-tld",
	name: "HSTS Preloaded TLD",
	website: "https://hstspreload.org/",
	description: "The hostname uses a top-level domain that is shipped in browser HSTS preload lists, so browsers require HTTPS before contacting the site. This does not prove the site sends a Strict-Transport-Security header.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "hsts-preloaded-tld:url:0",
			kind: "url",
			pattern: new RegExp("^https:\\/\\/[^/?#]+\\.(?:app|dev|page)(?::\\d+)?(?:[/?#]|$)", "i"),
			confidence: 90,
			description: "URL uses a commonly preloaded HTTPS-only TLD. Report separately from response-header HSTS.",
		},
	],
} as const satisfies TechnologyDefinition;
