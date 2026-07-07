import type { TechnologyDefinition } from '../../types';

export const projesoftTechnologyDefinition = {
	id: "projesoft",
	name: "Projesoft",
	website: "https://www.projesoft.com.tr",
	description: "Projesoft is a Turkish software development company that provides custom IT solutions, including ecommerce platforms, ERP systems, and digital transformation services.",
	icon: "projesoft.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "projesoft:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("projesoft\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
