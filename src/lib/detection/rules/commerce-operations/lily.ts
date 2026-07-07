import type { TechnologyDefinition } from '../../types';

export const lilyTechnologyDefinition = {
	id: "lily",
	name: "Lily",
	website: "https://www.getlily.io",
	description: "Lily is a BigCommerce app that rewards customers with loyalty points for making purchases, signing up, following or sharing on social media, and more.",
	icon: "Lily.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "lily:jsGlobal:0",
			kind: "jsGlobal",
			property: "lilyCustomerId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lily:jsGlobal:1",
			kind: "jsGlobal",
			property: "lilyHash",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lily:jsGlobal:2",
			kind: "jsGlobal",
			property: "lilyPl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"bigcommerce",
	],
} as const satisfies TechnologyDefinition;
