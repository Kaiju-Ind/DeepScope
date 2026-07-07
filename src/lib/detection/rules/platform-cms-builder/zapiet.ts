import type { TechnologyDefinition } from '../../types';

export const zapietTechnologyDefinition = {
	id: "zapiet",
	name: "Zapiet",
	website: "https://www.zapiet.com",
	description: "Zapiet is a store pickup and local delivery solution for ecommerce.",
	icon: "Zapiet.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zapiet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.zapiet\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zapiet:jsGlobal:1",
			kind: "jsGlobal",
			property: "Zapiet",
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
