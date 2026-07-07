import type { TechnologyDefinition } from '../../types';

export const yektanetTechnologyDefinition = {
	id: "yektanet",
	name: "Yektanet",
	website: "https://www.yektanet.com",
	description: "Yektanet is the biggest and most advanced native advertising network in Iran.",
	icon: "Yektanet.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "yektanet:jsGlobal:0",
			kind: "jsGlobal",
			property: "yektanet",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
