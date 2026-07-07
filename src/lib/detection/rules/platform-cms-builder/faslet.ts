import type { TechnologyDefinition } from '../../types';

export const fasletTechnologyDefinition = {
	id: "faslet",
	name: "Faslet",
	website: "https://site.faslet.me",
	description: "Faslet is a sizing solution platform for online clothing stores that helps reduce returns caused by size discrepancies and improves conversion rates.",
	icon: "Faslet.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "faslet:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.faslet\\.net"),
			description: "Script content contains a bounded technology signature.",
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
