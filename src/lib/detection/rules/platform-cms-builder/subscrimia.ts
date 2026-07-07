import type { TechnologyDefinition } from '../../types';

export const subscrimiaTechnologyDefinition = {
	id: "subscrimia",
	name: "Subscrimia",
	website: "https://subscrimia.com",
	description: "Subscrimia is a subscription management solution for BigCommerce stores that enables recurring product sales, automated billing, and customer subscription administration.",
	icon: "Subscrimia.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "subscrimia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.subscrimia\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
