import type { TechnologyDefinition } from '../../types';

export const shopimindTechnologyDefinition = {
	id: "shopimind",
	name: "ShopiMind",
	website: "https://www.shopimind.com",
	description: "ShopiMind is a multi-channel marketing automation solution for all ecommerce activities.",
	icon: "ShopiMind.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "shopimind:jsGlobal:0",
			kind: "jsGlobal",
			property: "_spmq.id_cart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shopimind:jsGlobal:1",
			kind: "jsGlobal",
			property: "_spmq.spm_ident",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
