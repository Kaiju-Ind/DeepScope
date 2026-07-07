import type { TechnologyDefinition } from '../../types';

export const schemaplusTechnologyDefinition = {
	id: "schemaplus",
	name: "SchemaPlus",
	website: "https://schemaplus.io",
	description: "SchemaPlus is a Shopify app for Shopify ecommerce shops to add schema to them and thereby make them easier to find for search engines.",
	icon: "SchemaPlus.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "schemaplus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/schemaplusfiles\\.s3\\.amazonaws\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "schemaplus:jsGlobal:1",
			kind: "jsGlobal",
			property: "SchemaPlus_Reviews",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "schemaplus:jsGlobal:2",
			kind: "jsGlobal",
			property: "SchemaPlus_handleCallback",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
