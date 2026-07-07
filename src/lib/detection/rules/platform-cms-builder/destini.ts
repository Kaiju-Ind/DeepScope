import type { TechnologyDefinition } from '../../types';

export const destiniTechnologyDefinition = {
	id: "destini",
	name: "Destini",
	website: "https://destini.co/",
	description: "Destini is a product locator solution that offers automated store-level data, advanced analytics, and customizable web and mobile applications.",
	icon: "Destini.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "destini:jsGlobal:0",
			kind: "jsGlobal",
			property: "destini.init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "destini:jsGlobal:1",
			kind: "jsGlobal",
			property: "destiniAddProducts",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "destini:jsGlobal:2",
			kind: "jsGlobal",
			property: "destiniDataLayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "destini:jsGlobal:3",
			kind: "jsGlobal",
			property: "destiniReset",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
