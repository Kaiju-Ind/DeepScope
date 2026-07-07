import type { TechnologyDefinition } from '../../types';

export const vyveTechnologyDefinition = {
	id: "vyve",
	name: "Vyve+",
	website: "https://vyveplus.ai",
	description: "Vyve+ is an AI-powered platform that integrates marketing and sales automation tools into a single system.",
	icon: "Vyve.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "vyve:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.vyveplus\\.ai"),
			description: "Script content contains a bounded technology signature.",
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
