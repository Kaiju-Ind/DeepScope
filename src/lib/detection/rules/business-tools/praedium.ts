import type { TechnologyDefinition } from '../../types';

export const praediumTechnologyDefinition = {
	id: "praedium",
	name: "Praedium",
	website: "https://praedium.com.br",
	description: ".",
	icon: "Praedium.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "praedium:dom:0",
			kind: "dom",
			selector: "link[href*='.praedium.com.br/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "praedium:jsGlobal:1",
			kind: "jsGlobal",
			property: "PraediumFilters",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "praedium:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^site_praedium_session$", "i"),
			description: "Cookie name matches a known technology marker.",
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
