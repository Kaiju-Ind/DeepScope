import type { TechnologyDefinition } from '../../types';

export const acecounterTechnologyDefinition = {
	id: "acecounter",
	name: "Acecounter",
	website: "https://www.home.acecounter.com",
	description: "Acecounter is a Korean analytics service that consolidates website analytics data into a single platform for streamlined access and analysis.",
	icon: "Acecounter.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "acecounter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.acecounter\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "acecounter:jsGlobal:1",
			kind: "jsGlobal",
			property: "_AceCounter",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
