import type { TechnologyDefinition } from '../../types';

export const pandectesTechnologyDefinition = {
	id: "pandectes",
	name: "Pandectes",
	website: "https://pandectes.io",
	description: "Pandectes is a cloud-based data privacy management compliance platform for Shopify stores, ensuring compliance with GDPR, CCPA/CPRA, VCDPA, APPI, PIPEDA, and PDPA regulations.",
	icon: "Pandectes.svg",
	categories: [
		"privacy-compliance",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "pandectes:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pandectes-core\\.js|(?:s3\\.us-west-2\\.amazonaws\\.com|gdpr-privacy-policy-assets\\.s3-us-west-2\\.amazonaws\\.com)\\/gdpr-privacy-policy-assets\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pandectes:jsGlobal:1",
			kind: "jsGlobal",
			property: "Pandectes",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pandectes:jsGlobal:2",
			kind: "jsGlobal",
			property: "PandectesBlocker",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pandectes:jsGlobal:3",
			kind: "jsGlobal",
			property: "PandectesCore",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pandectes:jsGlobal:4",
			kind: "jsGlobal",
			property: "PandectesGeolocation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pandectes:jsGlobal:5",
			kind: "jsGlobal",
			property: "PandectesRules",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pandectes:jsGlobal:6",
			kind: "jsGlobal",
			property: "PandectesSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pandectes:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^_pandectes_gdpr$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "pandectes:scriptSrc:8",
			kind: "scriptSrc",
			pattern: new RegExp("pandectes-core\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pandectes:scriptSrc:9",
			kind: "scriptSrc",
			pattern: new RegExp("s3\\.us-west-2\\.amazonaws\\.com\\/gdpr-privacy-policy-assets\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pandectes:scriptSrc:10",
			kind: "scriptSrc",
			pattern: new RegExp("gdpr-privacy-policy-assets\\.s3-us-west-2\\.amazonaws\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
