import type { TechnologyDefinition } from '../../types';

export const beezerTechnologyDefinition = {
	id: "beezer",
	name: "Beezer",
	website: "https://www.beezer.com",
	description: "Beezer is a no-code web app builder with drag-and-drop functionality for creating applications.",
	icon: "Beezer.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "beezer:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.beezer\\.com"),
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
