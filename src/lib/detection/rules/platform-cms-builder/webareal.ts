import type { TechnologyDefinition } from '../../types';

export const webarealTechnologyDefinition = {
	id: "webareal",
	name: "Webareal",
	website: "https://webareal.cz",
	description: "Webareal is a Czech-based ecommerce platform designed for creating and managing online stores.",
	icon: "Webareal.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webareal:dom:0",
			kind: "dom",
			selector: "input[value*='www.webareal.sk']",
			description: "DOM selector matches a known technology marker.",
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
