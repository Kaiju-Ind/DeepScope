import type { TechnologyDefinition } from '../../types';

export const spriiTechnologyDefinition = {
	id: "sprii",
	name: "Sprii",
	website: "https://sprii.io",
	description: "Sprii is a live shopping solution that hosts events across multiple channels to expand customer reach and boost conversion rates.",
	icon: "Sprii.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sprii:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.cdn\\.sprii\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
