import type { TechnologyDefinition } from '../../types';

export const jetboostTechnologyDefinition = {
	id: "jetboost",
	name: "Jetboost",
	website: "https://www.jetboost.io",
	description: "Jetboost is a tool that enables real-time search, dynamic filtering, and other features for Webflow sites without requiring code.",
	icon: "Jetboost.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "jetboost:jsGlobal:0",
			kind: "jsGlobal",
			property: "JETBOOST_SITE_ID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jetboost:jsGlobal:1",
			kind: "jsGlobal",
			property: "Jetboost.loaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"webflow",
	],
} as const satisfies TechnologyDefinition;
