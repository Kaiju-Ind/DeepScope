import type { TechnologyDefinition } from '../../types';

export const arrevaTechnologyDefinition = {
	id: "arreva",
	name: "Arreva",
	website: "https://www.arreva.com",
	description: "Arreva is a fundraising software that provides the ability to mobilise constituents using the donor tracking system.",
	icon: "Arreva.png",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "arreva:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/Arreva-OnlineDonations-Portlet\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "arreva:dom:1",
			kind: "dom",
			selector: "a[href*='=ArrevaOnlineDonationsPortlet_WA']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "arreva:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/arreva-onlinedonations-portlet\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
