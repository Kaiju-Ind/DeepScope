import type { TechnologyDefinition } from '../../types';

export const qukasoftTechnologyDefinition = {
	id: "qukasoft",
	name: "Qukasoft",
	website: "https://www.qukasoft.com",
	description: "Qukasoft is an online solution that offers integration for your ecommerce platform with leading online marketplaces, expanding your reach to potential customers.",
	icon: "Qukasoft.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "qukasoft:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.qukasoft.com/']",
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
