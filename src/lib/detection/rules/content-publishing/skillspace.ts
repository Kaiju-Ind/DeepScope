import type { TechnologyDefinition } from '../../types';

export const skillspaceTechnologyDefinition = {
	id: "skillspace",
	name: "Skillspace",
	website: "https://skillspace.ru",
	description: "Skillspace is a platform for creating, managing, and selling online courses, providing tools that support course delivery, learner access, and instructional content management.",
	icon: "Skillspace.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "skillspace:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.storageskillspace\\.ru"),
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
