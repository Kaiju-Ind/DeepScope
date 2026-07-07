import type { TechnologyDefinition } from '../../types';

export const shareaholicTechnologyDefinition = {
	id: "shareaholic",
	name: "Shareaholic",
	website: "https://www.shareaholic.com/",
	description: "Shareaholic is a all-in-one content amplification and monetisation platform.",
	icon: "shareaholic.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "shareaholic:jsGlobal:0",
			kind: "jsGlobal",
			property: "Shareaholic",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
