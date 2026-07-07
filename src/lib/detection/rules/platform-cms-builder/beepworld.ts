import type { TechnologyDefinition } from '../../types';

export const beepworldTechnologyDefinition = {
	id: "beepworld",
	name: "Beepworld",
	website: "https://beepworld.de",
	description: "Beepworld is a modular website-building platform that enables the creation of websites quickly without requiring technical knowledge.",
	icon: "Beepworld.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "beepworld:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.beepworld\\.de"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
