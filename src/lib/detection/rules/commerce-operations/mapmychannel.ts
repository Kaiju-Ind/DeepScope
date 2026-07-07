import type { TechnologyDefinition } from '../../types';

export const mapmychannelTechnologyDefinition = {
	id: "mapmychannel",
	name: "MapMyChannel",
	website: "https://www.mapmychannel.com",
	description: "MapMyChannel is a cloud-based fulfillment platform that integrates with ecommerce systems to automate inventory, shipping, and order management.",
	icon: "MapMyChannel.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "mapmychannel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mapmychannel\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
