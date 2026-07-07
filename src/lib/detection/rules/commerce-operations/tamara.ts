import type { TechnologyDefinition } from '../../types';

export const tamaraTechnologyDefinition = {
	id: "tamara",
	name: "Tamara",
	website: "https://tamara.co/",
	description: "Tamara ia a BNPL (Buy now pay later) provider in Saudi Arabia.",
	icon: "Tamara.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "tamara:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.tamara\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tamara:jsGlobal:1",
			kind: "jsGlobal",
			property: "TamaraProductWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
