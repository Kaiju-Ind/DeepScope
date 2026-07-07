import type { TechnologyDefinition } from '../../types';

export const craftCommerceTechnologyDefinition = {
	id: "craft-commerce",
	name: "Craft Commerce",
	website: "https://craftcommerce.com",
	description: "Craft Commerce is the ecommerce plugin for Craft CMS.",
	icon: "Craft CMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "craft-commerce:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("\\bCraft Commerce\\b", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "craft-commerce:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("\\bcraft commerce\\b", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"craft-cms",
	],
} as const satisfies TechnologyDefinition;
