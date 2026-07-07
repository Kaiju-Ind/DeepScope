import type { TechnologyDefinition } from '../../types';

export const viskanTechnologyDefinition = {
	id: "viskan",
	name: "Viskan",
	website: "https://www.viskan.com/fi-fi",
	description: "Viskan is a scalable platform designed to support ecommerce growth.",
	icon: "Viskan.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "viskan:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.viskan\\.com\\/"),
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
