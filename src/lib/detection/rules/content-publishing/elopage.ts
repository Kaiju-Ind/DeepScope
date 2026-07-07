import type { TechnologyDefinition } from '../../types';

export const elopageTechnologyDefinition = {
	id: "elopage",
	name: "Elopage",
	website: "https://elopage.com",
	description: "Elopage is a tool made for entrepreneurs to setup, manage, and scale their digital businesses around digital products, online courses, memberships, tickets, and digital services.",
	icon: "Elopage.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "elopage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.myelopage\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "elopage:dom:1",
			kind: "dom",
			selector: "iframe[src*='elopage.com']",
			description: "DOM selector matches a known technology marker.",
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
