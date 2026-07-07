import type { TechnologyDefinition } from '../../types';

export const plattarTechnologyDefinition = {
	id: "plattar",
	name: "Plattar",
	website: "https://www.plattar.com",
	description: "Plattar is a 3D and augmented reality platform for businesses that facilitates product customization to help retailers increase sales and reduce returns.",
	icon: "Plattar.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "plattar:jsGlobal:0",
			kind: "jsGlobal",
			property: "PlattarARAdapter",
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
