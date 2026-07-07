import type { TechnologyDefinition } from '../../types';

export const sellingoTechnologyDefinition = {
	id: "sellingo",
	name: "Sellingo",
	website: "https://sellingo.pl",
	description: "Sellingo is a Polish ecommerce platform.",
	icon: "Sellingo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sellingo:dom:0",
			kind: "dom",
			selector: "a[href*='sellingo.pl'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sellingo:text:1",
			kind: "text",
			pattern: new RegExp("Oprogramowanie sklepu internetowego Sellingo.pl"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "sellingo:jsGlobal:2",
			kind: "jsGlobal",
			property: "sellingoQuantityCalc",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sellingo:text:3",
			kind: "text",
			pattern: new RegExp("Sellingo"),
			description: "Page text contains a known technology marker.",
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
