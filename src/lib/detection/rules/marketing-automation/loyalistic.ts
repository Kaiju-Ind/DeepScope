import type { TechnologyDefinition } from '../../types';

export const loyalisticTechnologyDefinition = {
	id: "loyalistic",
	name: "Loyalistic",
	website: "https://loyalistic.com",
	description: "Loyalistic is a marketing automation software designed for small and medium-sized professional teams to showcase their expertise by creating content that helps people to buy.",
	icon: "Loyalistic.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "loyalistic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.loyalistic\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
