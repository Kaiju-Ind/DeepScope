import type { TechnologyDefinition } from '../../types';

export const metorikTechnologyDefinition = {
	id: "metorik",
	name: "Metorik",
	website: "https://metorik.com",
	description: "Metorik is a WooCommerce and Shopify store automation system providing custom reports and email marketing tools to manage and analyze ecommerce operations.",
	icon: "Metorik.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "metorik:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/metorik-helper(?:\\/.*)?(?:\\?.*)?$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "metorik:jsGlobal:1",
			kind: "jsGlobal",
			property: "metorik_params",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
