import type { TechnologyDefinition } from '../../types';

export const pickzenTechnologyDefinition = {
	id: "pickzen",
	name: "Pickzen",
	website: "https://www.pickzen.com",
	description: "Pickzen is an AI-powered tool designed for conversational search.",
	icon: "Pickzen.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "pickzen:jsGlobal:0",
			kind: "jsGlobal",
			property: "pickzen.server",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pickzen:jsGlobal:1",
			kind: "jsGlobal",
			property: "pickzenLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pickzen:jsGlobal:2",
			kind: "jsGlobal",
			property: "pickzenonActivation",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
