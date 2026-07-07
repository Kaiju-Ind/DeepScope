import type { TechnologyDefinition } from '../../types';

export const pickystoryTechnologyDefinition = {
	id: "pickystory",
	name: "PickyStory",
	website: "https://pickystory.com",
	description: "PickyStory is the ecommerce conversion platform.",
	icon: "PickyStory.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "pickystory:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pickystory\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pickystory:jsGlobal:1",
			kind: "jsGlobal",
			property: "pickystory.overrideStore",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
