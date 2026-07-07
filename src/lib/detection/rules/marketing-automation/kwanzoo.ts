import type { TechnologyDefinition } from '../../types';

export const kwanzooTechnologyDefinition = {
	id: "kwanzoo",
	name: "Kwanzoo",
	website: "https://www.kwanzoo.com",
	description: "Kwanzoo is an AI-powered GTM automation platform that enables adaptive account-based marketing.",
	icon: "Kwanzoo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "kwanzoo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ads\\.kwanzoo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
