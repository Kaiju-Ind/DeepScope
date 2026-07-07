import type { TechnologyDefinition } from '../../types';

export const unstackTechnologyDefinition = {
	id: "unstack",
	name: "Unstack",
	website: "https://www.unstack.com",
	description: "Unstack is a no-code CMS enabling the deployment of high-performance ecommerce storefronts and websites without engineering overhead.",
	icon: "Unstack.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "unstack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.unstack\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "unstack:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^unstack_sid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
