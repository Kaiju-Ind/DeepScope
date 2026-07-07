import type { TechnologyDefinition } from '../../types';

export const vortalaTechnologyDefinition = {
	id: "vortala",
	name: "Vortala",
	website: "https://vortala.com",
	description: "Vortala is a website builder for healthcare practitioners, providing tools to create, manage, and maintain clinical websites.",
	icon: "Vortala.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vortala:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.vortala\\.com"),
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
