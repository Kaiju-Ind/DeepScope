import type { TechnologyDefinition } from '../../types';

export const canvyTechnologyDefinition = {
	id: "canvy",
	name: "Canvy",
	website: "https://canvy.com",
	description: "Canvy is an online tool designed for fine art painters and poster designers to enhance the promotion and presentation of their artwork online.",
	icon: "Canvy.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "canvy:jsGlobal:0",
			kind: "jsGlobal",
			property: "config.apiPath",
			valuePattern: new RegExp("api\\.canvy\\.app\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "canvy:jsGlobal:1",
			kind: "jsGlobal",
			property: "config.cdnPath",
			valuePattern: new RegExp("api\\.canvy\\.app\\/"),
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
} as const satisfies TechnologyDefinition;
