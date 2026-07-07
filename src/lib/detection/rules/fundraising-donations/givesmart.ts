import type { TechnologyDefinition } from '../../types';

export const givesmartTechnologyDefinition = {
	id: "givesmart",
	name: "GiveSmart",
	website: "https://www.givesmart.com",
	description: "GiveSmart is an event fund gathering technology that offers customisable event size, mobile bidding, text-to-donate, enhanced dashboard and reporting, seating arrangement, and more.",
	icon: "GiveSmart.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "givesmart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.givesmart\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "givesmart:dom:1",
			kind: "dom",
			selector: "a[href*='.givesmart.com/']",
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
