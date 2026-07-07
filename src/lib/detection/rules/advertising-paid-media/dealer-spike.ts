import type { TechnologyDefinition } from '../../types';

export const dealerSpikeTechnologyDefinition = {
	id: "dealer-spike",
	name: "Dealer Spike",
	website: "https://www.dealerspike.com",
	description: "Dealer Spike is a digital marketing and advertising company focused that helps dealers grow their business.",
	icon: "Dealer Spike.svg",
	categories: [
		"advertising-paid-media",
		"marketing-automation",
	],
	rules: [
		{
			id: "dealer-spike:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.dealerspike\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dealer-spike:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.dealerspike\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "dealer-spike:dom:2",
			kind: "dom",
			selector: "meta[name='author'][content*='Dealer Spike']",
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
