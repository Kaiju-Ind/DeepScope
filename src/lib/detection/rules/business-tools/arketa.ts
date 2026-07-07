import type { TechnologyDefinition } from '../../types';

export const arketaTechnologyDefinition = {
	id: "arketa",
	name: "Arketa",
	website: "https://www.arketa.com",
	description: "Arketa is a business platform for the fitness and wellness industry, providing tools to manage operations and support business growth.",
	icon: "Arketa.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "arketa:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.arketa\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "arketa:jsGlobal:1",
			kind: "jsGlobal",
			property: "ArketaChatbot",
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
