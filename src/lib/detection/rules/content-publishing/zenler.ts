import type { TechnologyDefinition } from '../../types';

export const zenlerTechnologyDefinition = {
	id: "zenler",
	name: "Zenler",
	website: "https://www.newzenler.com",
	description: "Zenler is a course creation platform that combines live classes, webinars, community building, and marketing tools in one system.",
	icon: "Zenler.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "zenler:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("webtracker\\.newzenler\\.com"),
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
