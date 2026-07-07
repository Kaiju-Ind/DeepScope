import type { TechnologyDefinition } from '../../types';

export const passleTechnologyDefinition = {
	id: "passle",
	name: "Passle",
	website: "https://home.passle.net",
	description: "Passle is a digital marketing platform designed to help professionals create and share expert-led content.",
	icon: "Passle.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "passle:jsGlobal:0",
			kind: "jsGlobal",
			property: "Passel.API",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "passle:jsGlobal:1",
			kind: "jsGlobal",
			property: "PassleEnvironmentConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "passle:jsGlobal:2",
			kind: "jsGlobal",
			property: "PassleEvents",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "passle:jsGlobal:3",
			kind: "jsGlobal",
			property: "PassleFunctions",
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
