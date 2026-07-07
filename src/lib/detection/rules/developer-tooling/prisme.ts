import type { TechnologyDefinition } from '../../types';

export const prismeTechnologyDefinition = {
	id: "prisme",
	name: "Prisme",
	website: "https://www.prisme.ai",
	description: "Prisme is an event-driven studio designed for building and automating workflows with minimal coding.",
	icon: "Prisme.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "prisme:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.prisme\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
