import type { TechnologyDefinition } from '../../types';

export const onjaxTechnologyDefinition = {
	id: "onjax",
	name: "Onjax",
	website: "https://onjax.com",
	description: "Onjax is a suite of sales and marketing tools designed to connect agents with more customers and support customer engagement and lead management.",
	icon: "Onjax.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "onjax:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.onjax\\.com"),
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
