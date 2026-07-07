import type { TechnologyDefinition } from '../../types';

export const interactivecalculatorTechnologyDefinition = {
	id: "interactivecalculator",
	name: "InteractiveCalculator",
	website: "https://www.interactivecalculator.com",
	description: "InteractiveCalculator is a platform that enables users to create customized calculators that can be embedded on their website.",
	icon: "InteractiveCalculator.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "interactivecalculator:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.interactivecalculator\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
