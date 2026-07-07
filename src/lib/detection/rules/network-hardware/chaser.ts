import type { TechnologyDefinition } from '../../types';

export const chaserTechnologyDefinition = {
	id: "chaser",
	name: "Chaser",
	website: "https://chaser.ru",
	description: "Chaser is a telephone callback system designed to connect users by initiating return calls through a central server.",
	icon: "Chaser.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "chaser:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\/\\/chaser\\.ru'"),
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
