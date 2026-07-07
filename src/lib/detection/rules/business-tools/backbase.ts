import type { TechnologyDefinition } from '../../types';

export const backbaseTechnologyDefinition = {
	id: "backbase",
	name: "Backbase",
	website: "https://www.backbase.com",
	description: "Backbase is an engagement banking platform, facilitating the modernization of core customer interactions and the restructuring of business operations with a customer-centric approach.",
	icon: "Backbase.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "backbase:jsGlobal:0",
			kind: "jsGlobal",
			property: "backbase_com_2013_aurora",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
