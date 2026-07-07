import type { TechnologyDefinition } from '../../types';

export const skyPilotTechnologyDefinition = {
	id: "sky-pilot",
	name: "Sky Pilot",
	website: "https://web.skypilotapp.com",
	description: "Sky Pilot is a solution for selling digital products on Shopify.",
	icon: "SkyPilot.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sky-pilot:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("sky_pilot_"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "sky-pilot:jsGlobal:1",
			kind: "jsGlobal",
			property: "SkyPilot",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
