import type { TechnologyDefinition } from '../../types';

export const prettyLinksTechnologyDefinition = {
	id: "pretty-links",
	name: "Pretty Links",
	website: "https://prettylinks.com",
	description: "Pretty Links is a WordPress plugin URL shortener, link cloaker, branded link, and QR code generator.",
	icon: "Pretty Links.png",
	categories: [
		"wordpress-ecosystem",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "pretty-links:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/pretty-link/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
