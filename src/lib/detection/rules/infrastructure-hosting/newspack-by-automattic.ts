import type { TechnologyDefinition } from '../../types';

export const newspackByAutomatticTechnologyDefinition = {
	id: "newspack-by-automattic",
	name: "Newspack by Automattic",
	website: "https://newspack.pub/",
	description: "Automattic's Newspack service is an all-in-one platform designed for small and medium-sized news organizations that simplifies publishing and drives audience and revenue right out of the box.",
	icon: "NewspackLogo.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "newspack-by-automattic:header:0",
			kind: "header",
			key: "host-header",
			valuePattern: new RegExp("Newspack", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "newspack-by-automattic:header:1",
			kind: "header",
			key: "host-header",
			valuePattern: new RegExp("newspack", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"newspack",
	],
} as const satisfies TechnologyDefinition;
