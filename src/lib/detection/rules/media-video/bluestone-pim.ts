import type { TechnologyDefinition } from '../../types';

export const bluestonePimTechnologyDefinition = {
	id: "bluestone-pim",
	name: "Bluestone PIM",
	website: "https://www.bluestonepim.com",
	description: "Bluestone PIM is primarily a product information management (PIM) solution, which is focused on managing and distributing product data across multiple channels. However, it also includes some features that are typically associated with digital asset management (DAM), such as the ability to manage and store product images, videos, and other digital assets.",
	icon: "Bluestone PIM.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "bluestone-pim:dom:0",
			kind: "dom",
			selector: "img[src*='media.bluestonepim.com/'], img[data-srcset*='media.bluestonepim.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
