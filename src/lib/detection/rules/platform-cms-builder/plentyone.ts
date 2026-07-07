import type { TechnologyDefinition } from '../../types';

export const plentyoneTechnologyDefinition = {
	id: "plentyone",
	name: "PlentyONE",
	website: "https://www.plentyone.com/product/online-shop",
	description: "PlentyONE is a cloud-based ecommerce platform that provides ERP functionality, multichannel integration, and a built-in shop system.",
	icon: "PlentyONE.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "plentyone:header:0",
			kind: "header",
			key: "x-plenty-shop",
			valuePattern: new RegExp("^PlentyONE Shop$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "plentyone:header:1",
			kind: "header",
			key: "x-plenty-shop",
			valuePattern: new RegExp("^plentyone shop$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"node-js",
		"nuxt-js",
		"storefront-ui",
		"tailwind-css",
		"vue-js",
		"vue-storefront",
	],
} as const satisfies TechnologyDefinition;
