import type { TechnologyDefinition } from '../../types';

export const blokidTechnologyDefinition = {
	id: "blokid",
	name: "BlokID",
	website: "https://www.blokid.com",
	description: "BlokID is a real-time digital ad auditing tool, ensuring accurate tracking of all ad interactions with secure records.",
	icon: "BlokID.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "blokid:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pixel\\.blokid\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
