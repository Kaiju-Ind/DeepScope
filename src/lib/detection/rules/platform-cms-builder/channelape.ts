import type { TechnologyDefinition } from '../../types';

export const channelapeTechnologyDefinition = {
	id: "channelape",
	name: "ChannelApe",
	website: "https://www.channelape.com",
	description: "ChannelApe is an ecommerce and inventory management solution for the footwear and apparel industry.",
	icon: "ChannelApe.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "channelape:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.channelape\\.com"),
			description: "Observed request URL matches a known technology marker.",
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
