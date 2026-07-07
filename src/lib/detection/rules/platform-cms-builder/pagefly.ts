import type { TechnologyDefinition } from '../../types';

export const pageflyTechnologyDefinition = {
	id: "pagefly",
	name: "PageFly",
	website: "https://pagefly.io",
	description: "PageFly is an app for Shopify that allows you to build landing pages, product pages, blogs, and FAQs.",
	icon: "pagefly.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pagefly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pagefly\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pagefly:jsGlobal:1",
			kind: "jsGlobal",
			property: "__pagefly_setting__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pagefly:header:2",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("PageFly", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "pagefly:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("pagefly", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
