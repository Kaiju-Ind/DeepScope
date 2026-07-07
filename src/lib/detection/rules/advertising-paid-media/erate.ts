import type { TechnologyDefinition } from '../../types';

export const erateTechnologyDefinition = {
	id: "erate",
	name: "eRate",
	website: "https://www.eratead.com",
	description: "eRate is a provider of digital advertising tools and inventory within global ad networks.",
	icon: "ErateAd.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "erate:dom:0",
			kind: "dom",
			selector: "iframe[src*='rep.erate.co']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
