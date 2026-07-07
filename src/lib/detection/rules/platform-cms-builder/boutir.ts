import type { TechnologyDefinition } from '../../types';

export const boutirTechnologyDefinition = {
	id: "boutir",
	name: "Boutir",
	website: "https://www.boutir.com",
	description: "Boutir is a platform offering a minimalist shop interface and design system.",
	icon: "Boutir.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "boutir:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.boutir\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
