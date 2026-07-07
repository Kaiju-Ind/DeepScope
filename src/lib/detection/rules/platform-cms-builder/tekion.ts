import type { TechnologyDefinition } from '../../types';

export const tekionTechnologyDefinition = {
	id: "tekion",
	name: "Tekion",
	website: "https://tekion.com",
	description: "Tekion is an end-to-end cloud automotive platform.",
	icon: "Tekion.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tekion:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.tekioncloud\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
