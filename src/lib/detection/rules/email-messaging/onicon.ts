import type { TechnologyDefinition } from '../../types';

export const oniconTechnologyDefinition = {
	id: "onicon",
	name: "Onicon",
	website: "https://onicon.ru",
	description: "Onicon is a Russian-based live chat software developed by Megagroup.",
	icon: "Onicon.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "onicon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.onicon\\.ru"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
