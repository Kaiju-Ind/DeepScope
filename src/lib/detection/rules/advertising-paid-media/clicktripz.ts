import type { TechnologyDefinition } from '../../types';

export const clicktripzTechnologyDefinition = {
	id: "clicktripz",
	name: "Clicktripz",
	website: "https://site.clicktripz.com",
	description: "Clicktripz is a platform that provides innovative software solutions to serve the needs of suppliers, publishers, advertisers and travelers.",
	icon: "Clicktripz.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "clicktripz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.clicktripz\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
