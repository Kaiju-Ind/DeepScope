import type { TechnologyDefinition } from '../../types';

export const bottle360TechnologyDefinition = {
	id: "bottle360",
	name: "Bottle360",
	website: "https://bottlethreesixty.com",
	description: "Bottle360 is a winery ecommerce platform that provides branded storefronts and order management for direct-to-consumer wine sales.",
	icon: "Bottle360.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bottle360:meta:0",
			kind: "meta",
			key: "platform",
			valuePattern: new RegExp("B360\\shttps?:\\/\\/www.bottlethreesixty.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bottle360:meta:1",
			kind: "meta",
			key: "platform",
			valuePattern: new RegExp("b360\\shttps?:\\/\\/www.bottlethreesixty.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
