import type { TechnologyDefinition } from '../../types';

export const mulPayTechnologyDefinition = {
	id: "mul-pay",
	name: "Mul-Pay",
	website: "https://static.mul-pay.jp",
	description: "Mul-Pay is a payment gateway platform from Japan.",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "mul-pay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.mul-pay\\.jp\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mul-pay:jsGlobal:1",
			kind: "jsGlobal",
			property: "Multipayment.config",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
