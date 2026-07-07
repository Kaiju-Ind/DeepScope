import type { TechnologyDefinition } from '../../types';

export const coinhiveTechnologyDefinition = {
	id: "coinhive",
	name: "CoinHive",
	website: "https://coinhive.com",
	description: "Coinhive is a cryptocurrency mining service.",
	icon: "CoinHive.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "coinhive:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/(?:coinhive|(authedmine))(?:\\.min)?\\.js"),
			version: {
				source: "match",
				template: "$1?opt-in:",
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "coinhive:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("coinhive\\.com\\/lib"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "coinhive:url:2",
			kind: "url",
			pattern: new RegExp("https?:\\/\\/cnhv\\.co\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "coinhive:jsGlobal:3",
			kind: "jsGlobal",
			property: "CoinHive",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
