import type { TechnologyDefinition } from '../../types';

export const tiqetsTechnologyDefinition = {
	id: "tiqets",
	name: "Tiqets",
	website: "https://www.tiqets.com/affiliate",
	description: "Tiqets provides a complete overview of a city - museums, attractions, zoos, canal cruises, concerts. Publishers joined to the Tiqets affiliate program can receive 6% commission during our 30-day cookie window from completed total bookings resulting from featuring links to Tiqets products and content across their brand: blog/website, social media, newsletters, etc.",
	icon: "Tiqets.svg",
	categories: [
		"widgets-misc",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "tiqets:dom:0",
			kind: "dom",
			selector: "a[href*='.tiqets.com/'][target='_blank'], iframe[src*='.tiqets.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "tiqets:jsGlobal:1",
			kind: "jsGlobal",
			property: "__TIQETS_LOADER_REINIT",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
