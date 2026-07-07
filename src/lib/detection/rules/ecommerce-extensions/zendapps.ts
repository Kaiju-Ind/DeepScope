import type { TechnologyDefinition } from '../../types';

export const zendappsTechnologyDefinition = {
	id: "zendapps",
	name: "ZendApps",
	website: "https://zendapps.com",
	description: "ZendApps is a tool designed to grow Shopify stores by streamlining operations and enhancing performance through automated features.",
	icon: "ZendApps.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "zendapps:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.zend-apps\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
