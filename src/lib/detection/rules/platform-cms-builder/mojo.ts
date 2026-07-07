import type { TechnologyDefinition } from '../../types';

export const mojoTechnologyDefinition = {
	id: "mojo",
	name: "Mojo",
	website: "https://mojo-app.com/ecommerce",
	description: "Mojo is a platform for direct-to-consumer ecommerce websites, designed for the next generation of online shop owners to boost sales through their social content.",
	icon: "Mojo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mojo:jsGlobal:0",
			kind: "jsGlobal",
			property: "mojoApp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mojo:jsGlobal:1",
			kind: "jsGlobal",
			property: "mojoTrackUrl",
			description: "Page-owned global matches a known technology marker.",
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
