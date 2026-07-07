import type { TechnologyDefinition } from '../../types';

export const datashipsTechnologyDefinition = {
	id: "dataships",
	name: "Dataships",
	website: "https://dataships.io",
	description: "Dataships is a platform that ensures compliance with global data privacy regulations, helping businesses manage and protect customer data according to international standards.",
	icon: "Dataships.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "dataships:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dataships\\.io\\/"),
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
