import type { TechnologyDefinition } from '../../types';

export const zocdocTechnologyDefinition = {
	id: "zocdoc",
	name: "Zocdoc",
	website: "https://www.zocdoc.com",
	description: "Zocdoc is a New York City-based company offering an online service that allows people to find and book in-person or telemedicine appointments for medical or dental care.",
	icon: "Zocdoc.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "zocdoc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("offsiteschedule\\.zocdoc\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zocdoc:dom:1",
			kind: "dom",
			selector: "a[href*='www.zocdoc.com'][target='_blank']",
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
