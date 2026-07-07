import type { TechnologyDefinition } from '../../types';

export const thriveLeadsTechnologyDefinition = {
	id: "thrive-leads",
	name: "Thrive Leads",
	website: "https://thrivethemes.com/leads/",
	description: "Thrive Leads is an all-in-one email list building plugin for WordPress.",
	icon: "Thrive.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "thrive-leads:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/thrive-leads\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "thrive-leads:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/thrive-leads/']",
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
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
