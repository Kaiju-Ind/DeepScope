import type { TechnologyDefinition } from '../../types';

export const mycashflowTechnologyDefinition = {
	id: "mycashflow",
	name: "MyCashFlow",
	website: "https://www.mycashflow.fi/",
	description: "MyCashFlow is an ecommerce platform based in Finland that provides tools and services for businesses to create, manage, and optimize online stores.",
	icon: "mycashflow.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
