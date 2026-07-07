import type { TechnologyDefinition } from '../../types';

export const sizmekTechnologyDefinition = {
	id: "sizmek",
	name: "Sizmek",
	website: "https://sizmek.com",
	icon: "Sizmek.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "sizmek:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("serving-sys\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sizmek:html:1",
			kind: "html",
			pattern: new RegExp("(?:<a [^>]*href=\"[^/]*\\/\\/[^/]*serving-sys\\.com\\/|<img [^>]*src=\"[^/]*\\/\\/[^/]*serving-sys\\.com\\/)"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
