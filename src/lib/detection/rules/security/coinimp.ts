import type { TechnologyDefinition } from '../../types';

export const coinimpTechnologyDefinition = {
	id: "coinimp",
	name: "Coinimp",
	website: "https://www.coinimp.com",
	description: "CoinImp is a cryptocurrency mining service.",
	icon: "coinimp.png",
	categories: [
		"security",
	],
	rules: [
		{
			id: "coinimp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/www\\.hashing\\.win\\/scripts\\/min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "coinimp:jsGlobal:1",
			kind: "jsGlobal",
			property: "Client.Anonymous",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
