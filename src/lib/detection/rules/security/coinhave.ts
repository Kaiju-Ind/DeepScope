import type { TechnologyDefinition } from '../../types';

export const coinhaveTechnologyDefinition = {
	id: "coinhave",
	name: "Coinhave",
	website: "https://coin-have.com/",
	description: "CoinHave is a cryptocurrency mining service.",
	icon: "coinhave.png",
	categories: [
		"security",
	],
	rules: [
		{
			id: "coinhave:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/coin-have\\.com\\/c\\/[0-9a-zA-Z]{4}\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "coinhave:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/coin-have\\.com\\/c\\/[0-9a-za-z]{4}\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
