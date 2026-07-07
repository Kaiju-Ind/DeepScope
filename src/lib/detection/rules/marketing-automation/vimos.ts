import type { TechnologyDefinition } from '../../types';

export const vimosTechnologyDefinition = {
	id: "vimos",
	name: "Vimos",
	website: "https://vimos.io",
	description: "Vimos is a marketing SaaS specializing in marketing automation.",
	icon: "Vimos.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "vimos:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.vimos\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
