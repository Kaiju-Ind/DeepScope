import type { TechnologyDefinition } from '../../types';

export const outplayTechnologyDefinition = {
	id: "outplay",
	name: "Outplay",
	website: "https://outplay.ai",
	description: "Outplay is a sales engagement platform that uses AI to optimize interactions and support fast-scaling small and medium-sized businesses.",
	icon: "Outplay.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "outplay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.outplayhq\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "outplay:jsGlobal:1",
			kind: "jsGlobal",
			property: "outplayhq",
			description: "Page-owned global matches a known technology marker.",
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
