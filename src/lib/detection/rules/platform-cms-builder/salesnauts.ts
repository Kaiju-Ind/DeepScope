import type { TechnologyDefinition } from '../../types';

export const salesnautsTechnologyDefinition = {
	id: "salesnauts",
	name: "Salesnauts",
	website: "https://salesnauts.com",
	description: "Salesnauts is a fashion ecommerce platform.",
	icon: "Salesnauts.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "salesnauts:dom:0",
			kind: "dom",
			selector: "link[href*='//image.salesnauts.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
