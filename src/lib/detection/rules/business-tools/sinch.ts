import type { TechnologyDefinition } from '../../types';

export const sinchTechnologyDefinition = {
	id: "sinch",
	name: "Sinch",
	website: "https://www.sinch.com",
	description: "Sinch is a platform that connects businesses and customers through tools that enable personal engagement.",
	icon: "Sinch.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "sinch:jsGlobal:0",
			kind: "jsGlobal",
			property: "SinchClient",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sinch:jsGlobal:1",
			kind: "jsGlobal",
			property: "SinchSdk",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
