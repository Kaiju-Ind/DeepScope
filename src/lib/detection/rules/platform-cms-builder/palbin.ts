import type { TechnologyDefinition } from '../../types';

export const palbinTechnologyDefinition = {
	id: "palbin",
	name: "Palbin",
	website: "https://www.palbin.com",
	description: "Palbin is an ecommerce platform designed to create and manage online businesses.",
	icon: "Palbin.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "palbin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.palbin\\.com"),
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
