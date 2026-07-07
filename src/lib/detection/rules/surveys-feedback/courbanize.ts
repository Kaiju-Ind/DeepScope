import type { TechnologyDefinition } from '../../types';

export const courbanizeTechnologyDefinition = {
	id: "courbanize",
	name: "coUrbanize",
	website: "https://www.courbanize.com",
	description: "coUrbanize is a platform that assists real estate development and planning teams in conducting community engagement online.",
	icon: "coUrbanize.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "courbanize:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("assets\\.courbanize\\.com"),
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
