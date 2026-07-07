import type { TechnologyDefinition } from '../../types';

export const xpresslaneTechnologyDefinition = {
	id: "xpresslane",
	name: "Xpresslane",
	website: "https://www.xpresslane.in",
	description: "Xpresslane is a checkout platform for ecommerce that focuses on increasing conversion during the checkout process.",
	icon: "Xpresslane.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "xpresslane:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("apps\\.xpresslane\\.in\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "xpresslane:dom:1",
			kind: "dom",
			selector: "link[href*='/assets/xpresslane.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
