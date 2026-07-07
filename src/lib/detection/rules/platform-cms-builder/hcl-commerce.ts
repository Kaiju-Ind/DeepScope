import type { TechnologyDefinition } from '../../types';

export const hclCommerceTechnologyDefinition = {
	id: "hcl-commerce",
	name: "HCL Commerce",
	website: "https://www.hcltechsw.com/commerce",
	description: "HCL Commerce is a software platform framework for ecommerce, including marketing, sales, customer and order processing functionality.",
	icon: "HCL Commerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hcl-commerce:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\/webapp\\/wcs\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "hcl-commerce:url:1",
			kind: "url",
			pattern: new RegExp("\\/wcs\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "hcl-commerce:dom:2",
			kind: "dom",
			selector: "link[href*='/wcsstore/'], link[href*='webapp/wcs/'], a[href*='/wcsstore/'], a[href*='webapp/wcs/'], script[src*='/wcsstore/'], script[src*='webapp/wcs/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:hcltechsw:hcl_commerce:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
