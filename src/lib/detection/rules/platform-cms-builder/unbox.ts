import type { TechnologyDefinition } from '../../types';

export const unboxTechnologyDefinition = {
	id: "unbox",
	name: "Unbox",
	website: "https://unbox.com.br",
	description: "Unbox is an ecommerce platform for D2C brands.",
	icon: "unbox.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "unbox:dom:0",
			kind: "dom",
			selector: "link[imagesrcset*='unbox-customer-images-production'], img[srcset*='unbox-customer-images-production']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "unbox:jsGlobal:1",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.props.pageProps.shop.storeTemplateUrl",
			valuePattern: new RegExp("unbox-store-production"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"next-js",
	],
} as const satisfies TechnologyDefinition;
