import type { TechnologyDefinition } from '../../types';

export const mirusTechnologyDefinition = {
	id: "mirus",
	name: "Mirus",
	website: "https://mirusresearch.com",
	description: "Mirus is a platform that provides scalable solutions capable of adjusting capacity to meet demand while maintaining resilience against unexpected challenges.",
	icon: "Mirus.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "mirus:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.mirus\\.io"),
			description: "Script content contains a bounded technology signature.",
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
