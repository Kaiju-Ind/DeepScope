import type { TechnologyDefinition } from '../../types';

export const lignaTechnologyDefinition = {
	id: "ligna",
	name: "Ligna",
	website: "https://www.ligna.io",
	description: "Ligna is a sales, marketing, and enablement platform offering features to close clients, manage content, oversee projects, and track details, providing an all-in-one solution for business operations.",
	icon: "Ligna.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "ligna:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ligna\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
