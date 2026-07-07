import type { TechnologyDefinition } from '../../types';

export const storehippoTechnologyDefinition = {
	id: "storehippo",
	name: "StoreHippo",
	website: "https://www.storehippo.com",
	description: "StoreHippo is a SaaS based ecommerce platform.",
	icon: "StoreHippo.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "storehippo:dom:0",
			kind: "dom",
			selector: "link[href*='.storehippo.com'], img[src*='.storehippo.com']",
			description: "DOM selector matches a known technology marker.",
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
