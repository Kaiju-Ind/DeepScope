import type { TechnologyDefinition } from '../../types';

export const linkminkTechnologyDefinition = {
	id: "linkmink",
	name: "LinkMink",
	website: "https://linkmink.com",
	description: "LinkMink is an affiliate tracking and management for SaaS companies.",
	icon: "LinkMink.svg",
	categories: [
		"analytics",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "linkmink:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.linkmink\\.com\\/lm-js\\/([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "linkmink:jsGlobal:1",
			kind: "jsGlobal",
			property: "LinkMink",
			description: "Page-owned global matches a known technology marker.",
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
