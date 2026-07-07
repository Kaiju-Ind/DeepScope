import type { TechnologyDefinition } from '../../types';

export const integralAdScienceTechnologyDefinition = {
	id: "integral-ad-science",
	name: "Integral Ad Science",
	website: "https://integralads.com",
	description: "Integral Ad Science is an American publicly owned technology company that analyses the value of digital advertising placements.",
	icon: "Integral Ad Science.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "integral-ad-science:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.adsafeprotected\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "integral-ad-science:dom:1",
			kind: "dom",
			selector: "link[href*='.adsafeprotected.com']",
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
