import type { TechnologyDefinition } from '../../types';

export const qomonTechnologyDefinition = {
	id: "qomon",
	name: "Qomon",
	website: "https://qomon.com",
	description: "Qomon is a Saas software and citizen engagement platform and mobile app for NGOs, movements, campaigns, advocacy groups, and citizen-driven organisations.",
	icon: "Qomon.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "qomon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\.qomon\\.org"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
