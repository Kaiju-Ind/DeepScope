import type { TechnologyDefinition } from '../../types';

export const blueknowTechnologyDefinition = {
	id: "blueknow",
	name: "Blueknow",
	website: "https://www.blueknow.com",
	description: "Blueknow is an ecommerce personalization software designed to serve enterprises, SMEs.",
	icon: "Blueknow.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "blueknow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.blueknow\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "blueknow:jsGlobal:1",
			kind: "jsGlobal",
			property: "Blueknow",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blueknow:jsGlobal:2",
			kind: "jsGlobal",
			property: "BlueknowTracker",
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
