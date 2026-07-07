import type { TechnologyDefinition } from '../../types';

export const viomaTechnologyDefinition = {
	id: "vioma",
	name: "Vioma",
	website: "https://www.vioma.de",
	description: "Vioma is an online marketing system.",
	icon: "Vioma.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "vioma:dom:0",
			kind: "dom",
			selector: "link[href*='.viomassl.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "vioma:jsGlobal:1",
			kind: "jsGlobal",
			property: "viomaManipulate",
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
