import type { TechnologyDefinition } from '../../types';

export const klicklyTechnologyDefinition = {
	id: "klickly",
	name: "Klickly",
	website: "https://www.klickly.com",
	description: "Klickly is an invite-only, commission-based advertising platform.",
	icon: "Klickly.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "klickly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.klickly\\.com\\/pixel\\.js\\?v=([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
