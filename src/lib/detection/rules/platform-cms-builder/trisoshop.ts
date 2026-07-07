import type { TechnologyDefinition } from '../../types';

export const trisoshopTechnologyDefinition = {
	id: "trisoshop",
	name: "TRISOshop",
	website: "https://www.trisoshop.pl",
	description: "TRISOshop is an ecommerce platform.",
	icon: "TRISOshop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "trisoshop:dom:0",
			kind: "dom",
			selector: "a[href*='www.trisoshop.pl'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
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
