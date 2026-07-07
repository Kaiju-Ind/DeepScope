import type { TechnologyDefinition } from '../../types';

export const centiumTechnologyDefinition = {
	id: "centium",
	name: "Centium",
	website: "http://centiumsoftware.com",
	description: "Centium is a provider of technology solutions specializing in property and event management software for the hospitality industry, landmark world events, and the aviation sector.",
	icon: "Centium.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "centium:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bookings\\.centiumsoftware\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "centium:dom:1",
			kind: "dom",
			selector: "div#page-footer > div[class*='centiumLink'], form[action*='bookings.centiumsoftware.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
