import type { TechnologyDefinition } from '../../types';

export const trustpulseTechnologyDefinition = {
	id: "trustpulse",
	name: "TrustPulse",
	website: "https://trustpulse.com",
	description: "TrustPulse is a marketing tool that enables marketers to drive more conversions and sales by leveraging the power of social proof and fear of missing out.",
	icon: "TrustPulse.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "trustpulse:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.trstplse\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trustpulse:dom:1",
			kind: "dom",
			selector: "link[href*='.trstplse.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
