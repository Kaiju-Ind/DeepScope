import type { TechnologyDefinition } from '../../types';

export const moastTechnologyDefinition = {
	id: "moast",
	name: "Moast",
	website: "https://www.moast.io",
	description: "Moast is a Shopify app that enables brands to leverage user-generated content for marketing and engagement purposes.",
	icon: "Moast.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "moast:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.moast\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "moast:jsGlobal:1",
			kind: "jsGlobal",
			property: "moast.mapUrl",
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
		"shopify",
	],
} as const satisfies TechnologyDefinition;
