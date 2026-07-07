import type { TechnologyDefinition } from '../../types';

export const octorateTechnologyDefinition = {
	id: "octorate",
	name: "Octorate",
	website: "https://octorate.com",
	description: "Octorate is a hotel booking system and channel manager, facilitating management of reservations across various platforms.",
	icon: "Octorate.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "octorate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.octorate\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "octorate:jsGlobal:1",
			kind: "jsGlobal",
			property: "octorate",
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
