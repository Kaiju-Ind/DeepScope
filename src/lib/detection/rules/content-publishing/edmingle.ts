import type { TechnologyDefinition } from '../../types';

export const edmingleTechnologyDefinition = {
	id: "edmingle",
	name: "Edmingle",
	website: "https://www.edmingle.com",
	description: "Edmingle is a course creation system that enables organizations to design, manage, and deliver online training programs.",
	icon: "Edmingle.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "edmingle:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("edmingle\\.b-cdn\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
