import type { TechnologyDefinition } from '../../types';

export const wordadsTechnologyDefinition = {
	id: "wordads",
	name: "WordAds",
	website: "https://wordads.co",
	description: "WordAds is an advertising platform run by Automatic that allows bloggers and website owners to place advertisements on their blogs and websites.",
	icon: "WordAds.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "wordads:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.pubmine\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wordads:dom:1",
			kind: "dom",
			selector: "link[href*='.pubmine.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
