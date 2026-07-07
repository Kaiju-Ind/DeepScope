import type { TechnologyDefinition } from '../../types';

export const agnicartTechnologyDefinition = {
	id: "agnicart",
	name: "Agnicart",
	website: "https://www.agnicart.com",
	description: "Agnicart is an ecommerce SaaS platform which allows users to create their own store.",
	icon: "Agnicart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "agnicart:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.agnicart\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
