import type { TechnologyDefinition } from '../../types';

export const seoManagerTechnologyDefinition = {
	id: "seo-manager",
	name: "SEO Manager",
	website: "https://venntov.com/pages/seo-manager",
	description: "SEO Manager is a platform that optimizes Shopify websites to enhance search engine visibility and improve organic traffic.",
	icon: "SEOManager.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "seo-manager:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.seomanager\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
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
