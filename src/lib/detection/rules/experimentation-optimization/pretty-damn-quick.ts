import type { TechnologyDefinition } from '../../types';

export const prettyDamnQuickTechnologyDefinition = {
	id: "pretty-damn-quick",
	name: "Pretty Damn Quick",
	website: "https://www.prettydamnquick.com/",
	description: "Pretty Damn Quick is a Shopify app for eCommerce brands to deliver personalized checkout experiences.",
	icon: "PrettyDamnQuick.png",
	categories: [
		"experimentation-optimization",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "pretty-damn-quick:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pdq-scripts\\.pdqprod\\.link"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pretty-damn-quick:jsGlobal:1",
			kind: "jsGlobal",
			property: "initPDQscript",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
