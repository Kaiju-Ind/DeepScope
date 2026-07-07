import type { TechnologyDefinition } from '../../types';

export const econdaTechnologyDefinition = {
	id: "econda",
	name: "Econda",
	website: "https://www.econda.de",
	description: "Econda is a provider of web analytics solutions for online shops, offering detailed insights into customer behaviour, website performance, and sales optimisation.",
	icon: "Econda.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "econda:jsGlobal:0",
			kind: "jsGlobal",
			property: "econda",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "econda:jsGlobal:1",
			kind: "jsGlobal",
			property: "econdaActive",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
