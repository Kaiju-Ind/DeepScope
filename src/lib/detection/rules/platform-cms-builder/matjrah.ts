import type { TechnologyDefinition } from '../../types';

export const matjrahTechnologyDefinition = {
	id: "matjrah",
	name: "Matjrah",
	website: "https://matjrah.com",
	description: "Matjrah is an ecommerce platform for building online stores.",
	icon: "Matjrah.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "matjrah:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.matjrah\\.store\\/"),
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
