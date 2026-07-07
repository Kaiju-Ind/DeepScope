import type { TechnologyDefinition } from '../../types';

export const sixshopTechnologyDefinition = {
	id: "sixshop",
	name: "Sixshop",
	website: "https://www.sixshop.com",
	description: "Sixshop is a shopping store creation system from Korea.",
	icon: "Sixshop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sixshop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.sixshop\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
