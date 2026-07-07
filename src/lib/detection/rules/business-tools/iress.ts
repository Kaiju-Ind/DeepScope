import type { TechnologyDefinition } from '../../types';

export const iressTechnologyDefinition = {
	id: "iress",
	name: "Iress",
	website: "https://www.iress.com",
	description: "Iress is a platform that provides software solutions for the financial services industry.",
	icon: "Iress.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "iress:jsGlobal:0",
			kind: "jsGlobal",
			property: "IRESSWebToolbox",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
