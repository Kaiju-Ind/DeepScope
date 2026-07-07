import type { TechnologyDefinition } from '../../types';

export const elasticPathTechnologyDefinition = {
	id: "elastic-path",
	name: "Elastic Path",
	website: "https://www.elasticpath.com",
	description: "Elastic Path is a headless ecommerce system that integrates with enterprise ERP systems as middleware, enabling template-less commerce experiences.",
	icon: "ElasticPath.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "elastic-path:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.moltin\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "elastic-path:jsGlobal:1",
			kind: "jsGlobal",
			property: "Moltin",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
