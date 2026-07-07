import type { TechnologyDefinition } from '../../types';

export const productPersonalizerTechnologyDefinition = {
	id: "product-personalizer",
	name: "Product Personalizer",
	website: "https://productpersonalizer.com",
	description: "Product Personalizer apps can help you to customise your products and offer a more personalised experience for your customers.",
	icon: "Product Personalizer.png",
	categories: [
		"ecommerce-extensions",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "product-personalizer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/product-personalizer\\/pplr_common\\.js"),
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
