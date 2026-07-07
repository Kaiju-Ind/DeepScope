import type { TechnologyDefinition } from '../../types';

export const textlineTechnologyDefinition = {
	id: "textline",
	name: "Textline",
	website: "https://www.textline.com",
	description: "Textline is a business texting platform designed for customer support, sales, marketing, and logistics teams to streamline communication and improve workflow efficiency.",
	icon: "Textline.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "textline:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.textline\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
