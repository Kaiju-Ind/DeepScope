import type { TechnologyDefinition } from '../../types';

export const bianoTechnologyDefinition = {
	id: "biano",
	name: "Biano",
	website: "https://www.biano.ro",
	description: "Biano is a furnisher store tracking pixel designed to gather data on user interactions with furniture items for analytical purposes.",
	icon: "Biano.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "biano:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pixel\\.biano\\.ro\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "biano:jsGlobal:1",
			kind: "jsGlobal",
			property: "bianoTrack",
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
