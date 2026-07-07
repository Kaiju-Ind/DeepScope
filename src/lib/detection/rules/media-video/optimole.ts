import type { TechnologyDefinition } from '../../types';

export const optimoleTechnologyDefinition = {
	id: "optimole",
	name: "Optimole",
	website: "https://optimole.com",
	description: "Optimole is a cloud-based platform that provides media optimization, real-time image transformations, and digital asset management for improved website performance and delivery.",
	icon: "Optimole.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "optimole:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.i\\.optimole\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "optimole:jsGlobal:1",
			kind: "jsGlobal",
			property: "optimoleData",
			description: "Page-owned global matches a known technology marker.",
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
