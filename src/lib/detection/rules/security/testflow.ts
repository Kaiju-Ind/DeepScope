import type { TechnologyDefinition } from '../../types';

export const testflowTechnologyDefinition = {
	id: "testflow",
	name: "Testflow",
	website: "https://testflow.eu",
	description: "Testflow is a platform that digitizes manual workflows for test centers while ensuring secure patient data management in compliance with data protection regulations.",
	icon: "Testflow.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "testflow:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.testflow\\.eu"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
