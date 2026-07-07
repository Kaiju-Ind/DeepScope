import type { TechnologyDefinition } from '../../types';

export const trafficstarsTechnologyDefinition = {
	id: "trafficstars",
	name: "TrafficStars",
	website: "https://trafficstars.com",
	description: "TrafficStars is a self-served ad network and ad exchange that operates mainly in adult-related verticals.",
	icon: "TrafficStars.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "trafficstars:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tsyndicate\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trafficstars:dom:1",
			kind: "dom",
			selector: "img[src*='tsyndicate.com/'], a[href*='trafficstars.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
