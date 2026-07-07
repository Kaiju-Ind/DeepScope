import type { TechnologyDefinition } from '../../types';

export const formboldTechnologyDefinition = {
	id: "formbold",
	name: "FormBold",
	website: "https://formbold.com",
	description: "FormBold is a complete web forms solution for static websites that allows you to create forms, collect data, and send notifications.",
	icon: "FormBold.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formbold:dom:0",
			kind: "dom",
			selector: "form[action*='//formbold.com/']",
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
