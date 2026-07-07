import type { TechnologyDefinition } from '../../types';

export const noltTechnologyDefinition = {
	id: "nolt",
	name: "Nolt",
	website: "https://nolt.io",
	description: "Nolt is a collaborative platform for managing user requests, designed to replace outdated spreadsheets and Trello boards while providing actionable customer insights.",
	icon: "Nolt.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "nolt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.nolt\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nolt:jsGlobal:1",
			kind: "jsGlobal",
			property: "Nolt.initialized",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
