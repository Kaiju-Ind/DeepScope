import type { TechnologyDefinition } from '../../types';

export const maatooTechnologyDefinition = {
	id: "maatoo",
	name: "Maatoo",
	website: "https://maatoo.io",
	description: "Maatoo is an all-in-one marketing tool designed to streamline campaign management, customer engagement, and analytics in a single platform.",
	icon: "Maatoo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "maatoo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.maatoo\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
