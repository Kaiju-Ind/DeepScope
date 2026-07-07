import type { TechnologyDefinition } from '../../types';

export const seopressTechnologyDefinition = {
	id: "seopress",
	name: "SEOPress",
	website: "https://www.seopress.org",
	description: "SEOPress is a WordPress plugin for SEO.",
	icon: "SEOPress.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "seopress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/seopress\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:seopress:seopress:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
