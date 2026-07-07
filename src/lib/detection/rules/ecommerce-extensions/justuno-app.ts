import type { TechnologyDefinition } from '../../types';

export const justunoAppTechnologyDefinition = {
	id: "justuno-app",
	name: "Justuno App",
	website: "https://apps.shopify.com/justuno-pop-ups-email-conversion",
	description: "Justuno is a premium conversion marketing and analytics platform that provides retailers with powerful tools to increase conversions.",
	icon: "Justuno.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "justuno-app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/scripttags\\.justuno\\.com\\/shopify_justuno"),
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
		"justuno",
	],
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
