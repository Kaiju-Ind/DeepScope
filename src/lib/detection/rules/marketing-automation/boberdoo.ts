import type { TechnologyDefinition } from '../../types';

export const boberdooTechnologyDefinition = {
	id: "boberdoo",
	name: "Boberdoo",
	website: "https://www.boberdoo.com",
	description: "Boberdoo is a performance marketing software platform that connects buyers and sellers in real time, enabling scalable lead distribution and transaction management.",
	icon: "Boberdoo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "boberdoo:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.boberdoo.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
