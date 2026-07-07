import type { TechnologyDefinition } from '../../types';

export const wetravelTechnologyDefinition = {
	id: "wetravel",
	name: "WeTravel",
	website: "https://www.wetravel.com",
	description: "WeTravel is a platform providing booking and payment solutions tailored for travel companies.",
	icon: "WeTravel.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "wetravel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wetravel\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wetravel:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.wetravel.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
