import type { TechnologyDefinition } from '../../types';

export const paygreenTechnologyDefinition = {
	id: "paygreen",
	name: "PayGreen",
	website: "https://www.paygreen.io",
	description: "PayGreen is a French payment processor.",
	icon: "PayGreen.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "paygreen:jsGlobal:0",
			kind: "jsGlobal",
			property: "paygreenjs",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
