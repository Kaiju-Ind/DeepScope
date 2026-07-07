import type { TechnologyDefinition } from '../../types';

export const leadfernoTechnologyDefinition = {
	id: "leadferno",
	name: "Leadferno",
	website: "https://leadferno.com",
	description: "Leadferno is a conversion platform to increase your website leads.",
	icon: "Leadferno.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "leadferno:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.leadferno\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
