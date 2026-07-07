import type { TechnologyDefinition } from '../../types';

export const target2sellTechnologyDefinition = {
	id: "target2sell",
	name: "Target2Sell",
	website: "https://www.target2sell.com/",
	description: "Target2Sell is a personalisation solution for ecommerce sites.",
	icon: "Target2Sell.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "target2sell:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.target2sell\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
