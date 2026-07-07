import type { TechnologyDefinition } from '../../types';

export const compositeProductsTechnologyDefinition = {
	id: "composite-products",
	name: "Composite Products",
	website: "https://woocommerce.com/products/composite-products",
	description: "Composite Products is a service that provides customizable product kits allowing selection and assembly of components to suit specific needs.",
	icon: "CompositeProducts.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "composite-products:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/woocommerce-composite-products"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "composite-products:jsGlobal:1",
			kind: "jsGlobal",
			property: "wc_composite_params",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "composite-products:jsGlobal:2",
			kind: "jsGlobal",
			property: "wc_cp_composite_scripts",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:woocommerce:composite_products:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
