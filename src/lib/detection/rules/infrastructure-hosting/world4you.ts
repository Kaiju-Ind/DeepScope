import type { TechnologyDefinition } from '../../types';

export const world4youTechnologyDefinition = {
	id: "world4you",
	name: "World4You",
	website: "https://www.world4you.com",
	description: "World4You operates homepage and domain solutions. World4Youu operates data centers in Austria and provides data protection.",
	icon: "World4You.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "world4you:dns:0",
			kind: "dns",
			valuePattern: new RegExp("ns\\d+\\.world4you\\.at", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
