import type { TechnologyDefinition } from '../../types';

export const statuspalTechnologyDefinition = {
	id: "statuspal",
	name: "Statuspal",
	website: "https://statuspal.io",
	description: "Statuspal is a hosted status page and monitoring software for businesses of all kinds.",
	icon: "Statuspal.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "statuspal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/statuspal\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
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
