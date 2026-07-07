import type { TechnologyDefinition } from '../../types';

export const pixleeTurntoTechnologyDefinition = {
	id: "pixlee-turnto",
	name: "Pixlee TurnTo",
	website: "https://pixlee.com",
	description: "Pixlee TurnTo is a social UGC, ratings and reviews, and influencer marketing platform for community-driven brands.",
	icon: "Pixelee TurnTo.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pixlee-turnto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.pixlee\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pixlee-turnto:jsGlobal:1",
			kind: "jsGlobal",
			property: "Pixlee",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pixlee-turnto:jsGlobal:2",
			kind: "jsGlobal",
			property: "Pixlee_Analytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pixlee-turnto:jsGlobal:3",
			kind: "jsGlobal",
			property: "TurnTo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pixlee-turnto:jsGlobal:4",
			kind: "jsGlobal",
			property: "turnToConfig",
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
