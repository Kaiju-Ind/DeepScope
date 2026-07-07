import type { TechnologyDefinition } from '../../types';

export const shopmakerTechnologyDefinition = {
	id: "shopmaker",
	name: "Shopmaker",
	website: "https://www.shopmaker.com",
	description: "Shopmaker is a platform designed for creating adult shops to sell videos and images.",
	icon: "Shopmaker.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopmaker:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Shopmaker$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "shopmaker:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^shopmaker$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
