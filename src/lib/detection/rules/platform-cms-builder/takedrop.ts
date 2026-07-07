import type { TechnologyDefinition } from '../../types';

export const takedropTechnologyDefinition = {
	id: "takedrop",
	name: "TakeDrop",
	website: "https://takedrop.pl",
	description: "TakeDrop is an ecommerce platform.",
	icon: "TakeDrop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "takedrop:dom:0",
			kind: "dom",
			selector: "img[src*='main.takedropstorage.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "takedrop:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackJsonptakedrop-react",
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
