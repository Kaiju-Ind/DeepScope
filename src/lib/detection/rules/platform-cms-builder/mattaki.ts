import type { TechnologyDefinition } from '../../types';

export const mattakiTechnologyDefinition = {
	id: "mattaki",
	name: "Mattaki",
	website: "https://www.mattaki.com",
	description: "Mattaki is an automotive platform from Australia.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mattaki:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mattaki\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mattaki:jsGlobal:1",
			kind: "jsGlobal",
			property: "Mattaki",
			description: "Page-owned global matches a known technology marker.",
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
