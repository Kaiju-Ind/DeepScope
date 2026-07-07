import type { TechnologyDefinition } from '../../types';

export const fluroTechnologyDefinition = {
	id: "fluro",
	name: "Fluro",
	website: "https://www.fluro.io",
	description: "Fluro is an automation platform designed to support operational growth and management for expanding churches.",
	icon: "Fluro.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "fluro:jsGlobal:0",
			kind: "jsGlobal",
			property: "$flurosite",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fluro:jsGlobal:1",
			kind: "jsGlobal",
			property: "__FLUROSITE__",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
