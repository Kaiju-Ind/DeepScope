import type { TechnologyDefinition } from '../../types';

export const tiktakProTechnologyDefinition = {
	id: "tiktak-pro",
	name: "Tiktak Pro",
	website: "https://tiktakpro.tn",
	description: "Tiktak Pro is an all-in-one ecommerce platform from Tunisia.",
	icon: "Tiktak Pro.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tiktak-pro:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^tiktak-themes$", "i"),
			description: "Meta tag matches a known technology marker.",
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
