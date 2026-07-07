import type { TechnologyDefinition } from '../../types';

export const tradedoublerTechnologyDefinition = {
	id: "tradedoubler",
	name: "Tradedoubler",
	website: "https://www.tradedoubler.com/",
	description: "Tradedoubler is a global affiliate marketing network.",
	icon: "Tradedoubler.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "tradedoubler:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("swrap\\.tradedoubler\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tradedoubler:dom:1",
			kind: "dom",
			selector: "a[href*='clk.tradedoubler.com/click']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "tradedoubler:dom:2",
			kind: "dom",
			selector: "img[src*='impes.tradedoubler.com/imp']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
