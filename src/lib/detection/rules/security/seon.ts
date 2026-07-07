import type { TechnologyDefinition } from '../../types';

export const seonTechnologyDefinition = {
	id: "seon",
	name: "Seon",
	website: "https://seon.io",
	description: "Seon is a global fraud prevention solution designed to combat fraud and money laundering by identifying and blocking threats at all stages of the customer journey.",
	icon: "Seon.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "seon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.seon\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "seon:jsGlobal:1",
			kind: "jsGlobal",
			property: "seon.appIdentifier",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "seon:jsGlobal:2",
			kind: "jsGlobal",
			property: "waitForSeon",
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
