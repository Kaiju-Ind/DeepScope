import type { TechnologyDefinition } from '../../types';

export const googleSitesTechnologyDefinition = {
	id: "google-sites",
	name: "Google Sites",
	website: "https://sites.google.com",
	icon: "Google Sites.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "google-sites:url:0",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/sites\\.google\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "google-sites:dom:1",
			kind: "dom",
			selector: "[data-abuse-proto*='https://sites.google.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
