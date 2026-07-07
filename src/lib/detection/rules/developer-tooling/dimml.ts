import type { TechnologyDefinition } from '../../types';

export const dimmlTechnologyDefinition = {
	id: "dimml",
	name: "Dimml",
	website: "https://www.dimml.io",
	description: "Dimml is a data flow management software.",
	icon: "Dimml.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "dimml:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dimml\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
