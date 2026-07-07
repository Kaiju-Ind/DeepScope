import type { TechnologyDefinition } from '../../types';

export const civicChampsTechnologyDefinition = {
	id: "civic-champs",
	name: "Civic Champs",
	website: "https://www.civicchamps.com",
	description: "Civic Champs is a volunteer management platform that streamlines event coordination, tracks volunteer hours, and simplifies communication between organizations and their volunteers.",
	icon: "CivicChamps.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "civic-champs:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.civicchamps\\.com"),
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
