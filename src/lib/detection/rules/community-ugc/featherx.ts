import type { TechnologyDefinition } from '../../types';

export const featherxTechnologyDefinition = {
	id: "featherx",
	name: "FeatherX",
	website: "https://featherx.ai",
	description: "FeatherX captures content from all major reviews and social media channels.",
	icon: "FeatherX.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "featherx:jsGlobal:0",
			kind: "jsGlobal",
			property: "featherx.clientId",
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
