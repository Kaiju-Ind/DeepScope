import type { TechnologyDefinition } from '../../types';

export const sizebayTechnologyDefinition = {
	id: "sizebay",
	name: "Sizebay",
	website: "https://sizebay.com",
	description: "Sizebay is a virtual fitting room that helps ecommerce and even brick-and-mortar stores provide their shoppers with a personalised shopping.",
	icon: "Sizebay.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "sizebay:jsGlobal:0",
			kind: "jsGlobal",
			property: "Sizebay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sizebay:jsGlobal:1",
			kind: "jsGlobal",
			property: "SizebayParams",
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
