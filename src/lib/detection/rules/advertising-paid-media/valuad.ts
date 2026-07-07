import type { TechnologyDefinition } from '../../types';

export const valuadTechnologyDefinition = {
	id: "valuad",
	name: "Valuad",
	website: "https://valuad.io",
	description: "Valuad is a platform that provides algorithm-based header bidding for publishers to optimize advertising revenue.",
	icon: "Valuad.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "valuad:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.valuad\\.cloud"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
