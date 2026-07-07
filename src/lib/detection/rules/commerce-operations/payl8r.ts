import type { TechnologyDefinition } from '../../types';

export const payl8rTechnologyDefinition = {
	id: "payl8r",
	name: "Payl8r",
	website: "https://payl8r.com/",
	description: "PayL8r.com offers repayment plans and online finance which allow you to purchase products online.",
	icon: "Payl8r.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "payl8r:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("payl8r\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
