import type { TechnologyDefinition } from '../../types';

export const serchenTechnologyDefinition = {
	id: "serchen",
	name: "Serchen",
	website: "https://www.serchen.com",
	description: "Serchen is a platform that enables buyers to search, compare and evaluate a vast quantity of vendors in an ever increasingly diverse range of industries.",
	icon: "Serchen.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "serchen:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.serchen\\.com\\/"),
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
