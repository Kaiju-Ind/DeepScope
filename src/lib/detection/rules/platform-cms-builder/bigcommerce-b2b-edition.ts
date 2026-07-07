import type { TechnologyDefinition } from '../../types';

export const bigcommerceB2bEditionTechnologyDefinition = {
	id: "bigcommerce-b2b-edition",
	name: "BigCommerce B2B Edition",
	website: "https://www.bundleb2b.com",
	description: "BigCommerce B2B Edition is a specialised version of the BigCommerce ecommerce platform tailored for B2B companies, offering features such as custom pricing, catalogues, bulk ordering, quote requests, multi-user accounts, PO processing, and advanced reporting.",
	icon: "BigCommerce B2B Edition.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bigcommerce-b2b-edition:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.bundleb2b\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bigcommerce-b2b-edition:jsGlobal:1",
			kind: "jsGlobal",
			property: "bundleB2BFeatureFlags",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bigcommerce-b2b-edition:jsGlobal:2",
			kind: "jsGlobal",
			property: "bundleb2b.text.tpa",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	requires: [
		"bigcommerce",
	],
	excludes: [
		"bigcommerce",
	],
} as const satisfies TechnologyDefinition;
