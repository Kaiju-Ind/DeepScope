import type { TechnologyDefinition } from '../../types';

export const postscriptTechnologyDefinition = {
	id: "postscript",
	name: "Postscript",
	website: "https://www.postscript.io",
	description: "Postscript is an SMS and MMS marketing platform for Shopify stores.",
	icon: "Postscript.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "postscript:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.postscript\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "postscript:jsGlobal:1",
			kind: "jsGlobal",
			property: "Postscript.isSubscriberInputChecked",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "postscript:jsGlobal:2",
			kind: "jsGlobal",
			property: "postscript.getSubscriberId",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
