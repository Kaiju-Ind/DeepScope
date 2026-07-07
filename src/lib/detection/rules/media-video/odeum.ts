import type { TechnologyDefinition } from '../../types';

export const odeumTechnologyDefinition = {
	id: "odeum",
	name: "Odeum",
	website: "https://odeum.io",
	description: "Odeum is a SaaS platform for creating a video-based subscription service including a completely branded website & set of apps.",
	icon: "Odeum.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "odeum:jsGlobal:0",
			kind: "jsGlobal",
			property: "OdeumAccount",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
