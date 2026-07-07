import type { TechnologyDefinition } from '../../types';

export const sverveTechnologyDefinition = {
	id: "sverve",
	name: "Sverve",
	website: "https://www.sverve.com",
	description: "Sverve is a platform facilitating content curation and social post management with targeted matchmaking services.",
	icon: "Sverve.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sverve:dom:0",
			kind: "dom",
			selector: "a[href*='.sverve.com/'] > img[src*='.sverve.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sverve:jsGlobal:1",
			kind: "jsGlobal",
			property: "svervdiv",
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
