import type { TechnologyDefinition } from '../../types';

export const hypercloudhostTechnologyDefinition = {
	id: "hypercloudhost",
	name: "Hypercloudhost",
	website: "https://hypercloudhost.com",
	description: "Hypercloudhost is a hosting service solution in Indonesia offering anti-DDoS protection and high-performance cloud hosting.",
	icon: "Hypercloudhost.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "hypercloudhost:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^hypercloudhost$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
