import type { TechnologyDefinition } from '../../types';

export const tagshopTechnologyDefinition = {
	id: "tagshop",
	name: "Tagshop",
	website: "https://tagshop.ai/",
	description: "Tagshop is a platform that allows ecommerce brands to create, collect, and integrate user-generated content on product pages, social ads, and emails, thereby increasing sales.",
	icon: "Tagshop.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "tagshop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.taggshop\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tagshop:dom:1",
			kind: "dom",
			selector: "div[view-url*='app.taggshop.io/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
