import type { TechnologyDefinition } from '../../types';

export const softwaresuggestTechnologyDefinition = {
	id: "softwaresuggest",
	name: "SoftwareSuggest",
	website: "https://www.softwaresuggest.com",
	description: "SoftwareSuggest is a platform assisting businesses in locating suitable software solutions.",
	icon: "SoftwareSuggest.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "softwaresuggest:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("trk\\.softwaresuggest\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "softwaresuggest:dom:1",
			kind: "dom",
			selector: "iframe[src*='trk.softwaresuggest.com']",
			description: "DOM selector matches a known technology marker.",
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
